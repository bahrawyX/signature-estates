"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EntityFormShell,
  FormSection,
  FormGrid,
} from "@/components/admin/EntityForm";
import { ImageUrlInput } from "@/components/admin/ImageUrlInput";
import { useToast } from "@/components/admin/Toast";
import type { Location } from "@/lib/types";

const REGIONS: Location["region"][] = [
  "Greater Cairo",
  "North Coast & Mediterranean",
  "Red Sea & Sinai",
  "Upper Egypt",
  "New Capital",
  "Delta & Canal Zone",
];

interface Props {
  mode: "new" | "edit";
  location?: Location;
}

export function LocationForm({ mode, location }: Props) {
  const router = useRouter();
  const toast = useToast();
  const [form, setForm] = React.useState({
    name: location?.name ?? "",
    arabicName: location?.arabicName ?? "",
    region: (location?.region as string) ?? "Greater Cairo",
    description: location?.description ?? "",
    image: location?.image ?? "",
  });
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.name.trim()) return setError("Name is required.");
    setSaving(true);

    try {
      const url =
        mode === "new"
          ? "/api/admin/locations"
          : `/api/admin/locations/${location!.id}`;
      const res = await fetch(url, {
        method: mode === "new" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          arabicName: form.arabicName.trim() || undefined,
          region: form.region,
          description: form.description,
          image: form.image,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Save failed");
      }
      toast.push("success", mode === "new" ? "Location created." : "Location updated.");
      router.push("/admin/locations");
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Could not save.";
      setError(message);
      toast.push("error", message);
      setSaving(false);
    }
  }

  return (
    <EntityFormShell
      title={mode === "new" ? "New Location" : "Edit Location"}
      subtitle={mode === "new" ? "Add a new Egyptian hotspot." : location?.name}
      backHref="/admin/locations"
      backLabel="Back to locations"
      onSubmit={submit}
      saving={saving}
      primaryLabel={mode === "new" ? "Save Location" : "Save Changes"}
      error={error}
    >
      <FormSection
        title="Basic Info"
        description="The English and Arabic names of the location, and which region it belongs to."
      >
        <FormGrid cols={2}>
          <div className="space-y-2">
            <Label htmlFor="loc-name">Name <span className="text-red-500">*</span></Label>
            <Input
              id="loc-name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. New Cairo"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="loc-ar">Arabic Name</Label>
            <Input
              id="loc-ar"
              value={form.arabicName}
              onChange={(e) => setForm((f) => ({ ...f, arabicName: e.target.value }))}
              placeholder="مثال: التجمع الخامس"
              dir="rtl"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Region <span className="text-red-500">*</span></Label>
            <Select value={form.region} onValueChange={(v) => setForm((f) => ({ ...f, region: v }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {REGIONS.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </FormGrid>
      </FormSection>

      <FormSection
        title="Description"
        description="A short, considered paragraph that gives buyers a sense of the place."
      >
        <div className="space-y-2">
          <Label htmlFor="loc-desc">Description</Label>
          <Textarea
            id="loc-desc"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="min-h-[140px]"
            placeholder="One or two sentences that capture the character of this location."
          />
        </div>
      </FormSection>

      <FormSection
        title="Cover Image"
        description="The hero photo shown on the homepage location card."
      >
        <ImageUrlInput
          label="Image URL"
          value={form.image}
          onChange={(v) => setForm((f) => ({ ...f, image: v }))}
          hint="Format: https://images.unsplash.com/photo-XXXXX?w=1600&auto=format&fit=crop"
        />
      </FormSection>
    </EntityFormShell>
  );
}
