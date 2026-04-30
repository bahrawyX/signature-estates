"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  EntityFormShell,
  FormSection,
  FormGrid,
} from "@/components/admin/EntityForm";
import { useToast } from "@/components/admin/Toast";
import type { Developer } from "@/lib/types";

interface Props {
  mode: "new" | "edit";
  developer?: Developer;
}

export function DeveloperForm({ mode, developer }: Props) {
  const router = useRouter();
  const toast = useToast();
  const [form, setForm] = React.useState({
    name: developer?.name ?? "",
    shortName: developer?.shortName ?? "",
    established:
      developer?.established !== undefined
        ? String(developer.established)
        : String(new Date().getFullYear()),
    description: developer?.description ?? "",
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
          ? "/api/admin/developers"
          : `/api/admin/developers/${developer!.id}`;
      const res = await fetch(url, {
        method: mode === "new" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          shortName: form.shortName.trim() || undefined,
          established: Number(form.established) || new Date().getFullYear(),
          description: form.description,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Save failed");
      }
      toast.push("success", mode === "new" ? "Developer created." : "Developer updated.");
      router.push("/admin/developers");
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
      title={mode === "new" ? "New Developer" : "Edit Developer"}
      subtitle={mode === "new" ? "Add a master developer to the catalogue." : developer?.name}
      backHref="/admin/developers"
      backLabel="Back to developers"
      onSubmit={submit}
      saving={saving}
      primaryLabel={mode === "new" ? "Save Developer" : "Save Changes"}
      error={error}
    >
      <FormSection
        title="Profile"
        description="Name, short name (used in compact UI) and the year established."
      >
        <FormGrid cols={2}>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="dev-name">Name <span className="text-red-500">*</span></Label>
            <Input
              id="dev-name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. ORA Developers"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dev-short">Short Name</Label>
            <Input
              id="dev-short"
              value={form.shortName}
              onChange={(e) => setForm((f) => ({ ...f, shortName: e.target.value }))}
              placeholder="e.g. ORA"
            />
            <p className="text-xs text-[var(--color-gray)]">
              Used in tight UI like property cards.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dev-est">Established</Label>
            <Input
              id="dev-est"
              type="number"
              min="1900"
              max={String(new Date().getFullYear())}
              value={form.established}
              onChange={(e) => setForm((f) => ({ ...f, established: e.target.value }))}
            />
          </div>
        </FormGrid>
      </FormSection>

      <FormSection
        title="Description"
        description="A short paragraph that captures the developer's story and signature projects."
      >
        <div className="space-y-2">
          <Label htmlFor="dev-desc">Description</Label>
          <Textarea
            id="dev-desc"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="A globally minded developer behind some of Egypt's most distinctive masterplans…"
            className="min-h-[140px]"
          />
        </div>
      </FormSection>
    </EntityFormShell>
  );
}
