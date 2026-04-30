"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EntityFormShell,
  FormSection,
  FormGrid,
} from "@/components/admin/EntityForm";
import { StringList, ImageList } from "@/components/admin/DynamicList";
import { useToast } from "@/components/admin/Toast";
import { formatEGP, slugify } from "@/lib/utils";
import {
  RES_APARTMENTS,
  RES_VILLAS,
} from "@/lib/propertyTypes";
import type { Property, Location, Developer, PropertyType, PropertyStatus } from "@/lib/types";

type FormState = {
  name: string;
  slug: string;
  type: string;
  status: string;
  featured: boolean;
  deliveryYear: string;
  locationId: string;
  developerId: string;
  bedrooms: string;
  bathrooms: string;
  areaSqm: string;
  floor: string;
  priceEGP: string;
  description: string;
  amenities: string[];
  images: { src: string; alt: string }[];
  mapUrl: string;
};

function initialFromProperty(p?: Property): FormState {
  return {
    name: p?.name ?? "",
    slug: p?.slug ?? "",
    type: p?.type ?? "Flat Apartment",
    status: p?.status ?? "Ready to Move",
    featured: p?.featured ?? false,
    deliveryYear: p?.deliveryYear !== undefined ? String(p.deliveryYear) : "",
    locationId: p?.locationId ?? "",
    developerId: p?.developerId ?? "",
    bedrooms: p?.bedrooms !== undefined ? String(p.bedrooms) : "0",
    bathrooms: p?.bathrooms !== undefined ? String(p.bathrooms) : "1",
    areaSqm: p?.areaSqm !== undefined ? String(p.areaSqm) : "0",
    floor: p?.floor !== undefined ? String(p.floor) : "",
    priceEGP: p?.priceEGP !== undefined ? String(p.priceEGP) : "0",
    description: p?.description ?? "",
    amenities: p?.amenities ?? [],
    images: p?.images ?? [],
    mapUrl: p?.mapUrl ?? "",
  };
}

interface PropertyFormProps {
  mode: "new" | "edit";
  property?: Property;
  locations: Location[];
  developers: Developer[];
}

export function PropertyForm({ mode, property, locations, developers }: PropertyFormProps) {
  const router = useRouter();
  const toast = useToast();
  const [form, setForm] = React.useState<FormState>(initialFromProperty(property));
  const [slugTouched, setSlugTouched] = React.useState(mode === "edit");
  const [saving, setSaving] = React.useState(false);
  const [saveAndAdd, setSaveAndAdd] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Auto-generate slug while user is typing the name (only on /new and only if untouched)
  React.useEffect(() => {
    if (!slugTouched) {
      setForm((f) => ({ ...f, slug: slugify(f.name) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.name]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.name.trim()) return setError("Name is required.");
    if (!form.locationId) return setError("Please select a location.");
    if (!form.developerId) return setError("Please select a developer.");

    setSaving(true);

    const payload: Partial<Property> = {
      name: form.name.trim(),
      slug: form.slug.trim() || undefined,
      type: form.type as PropertyType,
      status: form.status as PropertyStatus,
      featured: form.featured,
      deliveryYear: form.deliveryYear ? Number(form.deliveryYear) : undefined,
      locationId: form.locationId,
      developerId: form.developerId,
      bedrooms: Number(form.bedrooms || 0),
      bathrooms: Number(form.bathrooms || 0),
      areaSqm: Number(form.areaSqm || 0),
      floor: form.floor ? Number(form.floor) : undefined,
      priceEGP: Number(form.priceEGP || 0),
      description: form.description,
      amenities: form.amenities.filter((a) => a.trim() !== ""),
      images: form.images.filter((i) => i.src.trim() !== ""),
      mapUrl: form.mapUrl,
    };

    try {
      const url =
        mode === "new"
          ? "/api/admin/properties"
          : `/api/admin/properties/${property!.id}`;
      const res = await fetch(url, {
        method: mode === "new" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Save failed");
      }

      toast.push("success", mode === "new" ? "Property created." : "Property updated.");

      if (mode === "new" && saveAndAdd) {
        // Reset form for another entry
        setForm(initialFromProperty());
        setSlugTouched(false);
        setSaveAndAdd(false);
        setSaving(false);
        return;
      }
      router.push("/admin/properties");
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Could not save property.";
      setError(message);
      toast.push("error", message);
      setSaving(false);
    }
  }

  return (
    <EntityFormShell
      title={mode === "new" ? "New Property" : "Edit Property"}
      subtitle={mode === "new" ? "Add a new listing to the catalogue." : property?.name}
      backHref="/admin/properties"
      backLabel="Back to properties"
      previewHref={mode === "edit" && property?.slug ? `/properties/${property.slug}` : undefined}
      onSubmit={submit}
      saving={saving}
      primaryLabel={mode === "new" ? "Save Property" : "Save Changes"}
      secondaryLabel={mode === "new" ? "Save & Add Another" : undefined}
      onSecondary={
        mode === "new"
          ? () => {
              setSaveAndAdd(true);
              // Submit programmatically by triggering form submit on next tick
              const form = document.querySelector("form");
              if (form) form.requestSubmit();
            }
          : undefined
      }
      error={error}
    >
      {/* ── Section 1: Basic Info ── */}
      <FormSection
        title="Basic Info"
        description="Name, type, status and the high-level positioning of the listing."
      >
        <FormGrid cols={2}>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. Marquee Villa — ZED East"
              required
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="slug">URL slug</Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => {
                update("slug", e.target.value);
                setSlugTouched(true);
              }}
              placeholder="auto-generated-from-name"
            />
            <p className="text-xs text-[var(--color-gray)]">
              Public URL: <code className="text-[var(--color-gold-dark)]">/properties/{form.slug || "your-slug"}</code>
            </p>
          </div>

          <div className="space-y-2">
            <Label>Property Type <span className="text-red-500">*</span></Label>
            <Select value={form.type} onValueChange={(v) => update("type", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent className="max-h-[380px]">
                <SelectGroup>
                  <SelectLabel className="font-accent text-[9px] tracking-[0.22em] text-[var(--color-gold-dark)] uppercase">
                    Residential · Apartments
                  </SelectLabel>
                  {RES_APARTMENTS.map((t) => (
                    <SelectItem key={t} value={t} className="pl-5">{t}</SelectItem>
                  ))}
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel className="font-accent text-[9px] tracking-[0.22em] text-[var(--color-gold-dark)] uppercase">
                    Residential · Villas
                  </SelectLabel>
                  {RES_VILLAS.map((t) => (
                    <SelectItem key={t} value={t} className="pl-5">{t}</SelectItem>
                  ))}
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel className="font-accent text-[9px] tracking-[0.22em] text-[var(--color-gold-dark)] uppercase">
                    Beach & Resort
                  </SelectLabel>
                  <SelectItem value="Chalet" className="pl-5">Chalet</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel className="font-accent text-[9px] tracking-[0.22em] text-[var(--color-gold-dark)] uppercase">
                    Commercial
                  </SelectLabel>
                  <SelectItem value="Retail" className="pl-5">Retail</SelectItem>
                  <SelectItem value="F&B" className="pl-5">Food & Beverage (F&B)</SelectItem>
                  <SelectItem value="Office" className="pl-5">Office</SelectItem>
                  <SelectItem value="Clinic" className="pl-5">Clinic</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel className="font-accent text-[9px] tracking-[0.22em] text-[var(--color-gray)] uppercase">
                    Other
                  </SelectLabel>
                  <SelectItem value="Land" className="pl-5">Land</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Status <span className="text-red-500">*</span></Label>
            <Select value={form.status} onValueChange={(v) => update("status", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Ready to Move">Ready to Move</SelectItem>
                <SelectItem value="Off-Plan">Off-Plan</SelectItem>
                <SelectItem value="Under Construction">Under Construction</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliveryYear">Delivery Year</Label>
            <Input
              id="deliveryYear"
              type="number"
              min="2020"
              max="2050"
              value={form.deliveryYear}
              onChange={(e) => update("deliveryYear", e.target.value)}
              placeholder="e.g. 2027"
            />
            <p className="text-xs text-[var(--color-gray)]">
              Leave blank for ready-to-move properties.
            </p>
          </div>

          <div className="space-y-2 flex flex-col">
            <Label>Featured</Label>
            <label className="inline-flex items-center gap-3 cursor-pointer mt-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => update("featured", e.target.checked)}
                className="w-4 h-4 accent-[var(--color-gold)]"
              />
              <span className="text-sm">Show on homepage carousel</span>
            </label>
          </div>
        </FormGrid>
      </FormSection>

      {/* ── Section 2: Location & Developer ── */}
      <FormSection
        title="Location & Developer"
        description="Where the property sits and who built it."
      >
        <FormGrid cols={2}>
          <div className="space-y-2">
            <Label>Location <span className="text-red-500">*</span></Label>
            <Select value={form.locationId} onValueChange={(v) => update("locationId", v)}>
              <SelectTrigger><SelectValue placeholder="Select a location…" /></SelectTrigger>
              <SelectContent>
                {locations.map((l) => (
                  <SelectItem key={l.id} value={l.id}>
                    {l.name}
                    {l.region ? <span className="text-[var(--color-gray)]"> · {l.region}</span> : null}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Developer <span className="text-red-500">*</span></Label>
            <Select value={form.developerId} onValueChange={(v) => update("developerId", v)}>
              <SelectTrigger><SelectValue placeholder="Select a developer…" /></SelectTrigger>
              <SelectContent>
                {developers.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.shortName ?? d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </FormGrid>
      </FormSection>

      {/* ── Section 3: Specs ── */}
      <FormSection
        title="Specifications"
        description="Bedrooms, bathrooms, area and pricing."
      >
        <FormGrid cols={3}>
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input
              id="bedrooms"
              type="number"
              min="0"
              value={form.bedrooms}
              onChange={(e) => update("bedrooms", e.target.value)}
            />
            <p className="text-xs text-[var(--color-gray)]">Use 0 for Studio.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input
              id="bathrooms"
              type="number"
              min="0"
              value={form.bathrooms}
              onChange={(e) => update("bathrooms", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="areaSqm">Area (m²)</Label>
            <Input
              id="areaSqm"
              type="number"
              min="0"
              value={form.areaSqm}
              onChange={(e) => update("areaSqm", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="floor">Floor</Label>
            <Input
              id="floor"
              type="number"
              value={form.floor}
              onChange={(e) => update("floor", e.target.value)}
              placeholder="Optional"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="priceEGP">Price (EGP)</Label>
            <Input
              id="priceEGP"
              type="number"
              min="0"
              step="100000"
              value={form.priceEGP}
              onChange={(e) => update("priceEGP", e.target.value)}
            />
            <p className="text-xs text-[var(--color-gold-dark)] font-accent tracking-[0.16em]">
              {Number(form.priceEGP) > 0
                ? `Display price: ${formatEGP(Number(form.priceEGP))}`
                : "Enter a price to see the formatted display."}
            </p>
          </div>
        </FormGrid>
      </FormSection>

      {/* ── Section 4: Description & Amenities ── */}
      <FormSection
        title="Description & Amenities"
        description="The narrative copy and the amenities grid shown on the detail page."
      >
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="A few crisp sentences on what makes this property worth a brief."
            className="min-h-[140px]"
          />
        </div>
        <StringList
          label="Amenities"
          values={form.amenities}
          onChange={(v) => update("amenities", v)}
          placeholder="e.g. Private pool"
          addLabel="Add amenity"
          hint="Each amenity becomes a chip in the property detail page."
        />
      </FormSection>

      {/* ── Section 5: Images ── */}
      <FormSection
        title="Images"
        description="The first image is used as the cover. Additional images appear in the gallery."
      >
        <ImageList
          values={form.images}
          onChange={(v) => update("images", v)}
          hint="Use Unsplash URLs in the format: https://images.unsplash.com/photo-XXXXX?w=1600&auto=format&fit=crop"
        />
      </FormSection>

      {/* ── Section 6: Map ── */}
      <FormSection
        title="Map"
        description="The Google Maps embed shown in the location block of the detail page."
      >
        <div className="space-y-2">
          <Label htmlFor="mapUrl">Map embed URL</Label>
          <Input
            id="mapUrl"
            type="url"
            value={form.mapUrl}
            onChange={(e) => update("mapUrl", e.target.value)}
            placeholder="https://www.google.com/maps?q=...&output=embed"
          />
          <p className="text-xs text-[var(--color-gray)] leading-relaxed">
            On Google Maps: search the location → click <em>Share</em> → <em>Embed a map</em> → copy the URL inside <code>src=&quot;…&quot;</code>.
            A simpler alternative: use <code>https://www.google.com/maps?q=YOUR+QUERY&output=embed</code>.
          </p>
        </div>
      </FormSection>
    </EntityFormShell>
  );
}
