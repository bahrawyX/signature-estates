"use client";
import * as React from "react";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

/* ─────────────────── Simple string list (amenities, paragraphs) ─────────────────── */

interface StringListProps {
  label?: string;
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  multiline?: boolean;
  addLabel?: string;
  hint?: string;
}

export function StringList({
  label,
  values,
  onChange,
  placeholder = "Enter value",
  multiline = false,
  addLabel = "Add item",
  hint,
}: StringListProps) {
  const update = (i: number, v: string) => {
    const next = [...values];
    next[i] = v;
    onChange(next);
  };
  const remove = (i: number) => {
    onChange(values.filter((_, idx) => idx !== i));
  };
  const add = () => onChange([...values, ""]);

  return (
    <div className="space-y-3">
      {label && <Label>{label}</Label>}
      {hint && <p className="text-xs text-[var(--color-gray)]">{hint}</p>}
      <div className="space-y-2">
        {values.length === 0 && (
          <p className="text-xs italic text-[var(--color-gray)]">No items yet.</p>
        )}
        {values.map((v, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="font-accent text-[10px] tracking-[0.2em] text-[var(--color-gray)] pt-3 w-6 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            {multiline ? (
              <Textarea
                value={v}
                onChange={(e) => update(i, e.target.value)}
                placeholder={placeholder}
                className="flex-1 min-h-[80px]"
              />
            ) : (
              <Input
                value={v}
                onChange={(e) => update(i, e.target.value)}
                placeholder={placeholder}
                className="flex-1"
              />
            )}
            <button
              type="button"
              onClick={() => remove(i)}
              className="shrink-0 w-10 h-10 flex items-center justify-center text-[var(--color-gray)] hover:text-red-600 hover:bg-red-50 transition-colors"
              aria-label="Remove"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-2 font-accent text-[10px] tracking-[0.22em] text-[var(--color-gold-dark)] hover:text-[var(--color-gold)] transition-colors"
      >
        <Plus size={14} />
        {addLabel}
      </button>
    </div>
  );
}

/* ─────────────────── Image list (URL + alt + preview) ─────────────────── */

export interface ImageListItem {
  src: string;
  alt: string;
}

interface ImageListProps {
  label?: string;
  values: ImageListItem[];
  onChange: (next: ImageListItem[]) => void;
  hint?: string;
}

export function ImageList({ label, values, onChange, hint }: ImageListProps) {
  const update = (i: number, patch: Partial<ImageListItem>) => {
    const next = [...values];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));
  const add = () => onChange([...values, { src: "", alt: "" }]);

  return (
    <div className="space-y-3">
      {label && <Label>{label}</Label>}
      {hint && <p className="text-xs text-[var(--color-gray)] leading-relaxed">{hint}</p>}
      <div className="space-y-3">
        {values.length === 0 && (
          <p className="text-xs italic text-[var(--color-gray)]">No images yet.</p>
        )}
        {values.map((item, i) => (
          <ImageListRow
            key={i}
            index={i}
            value={item}
            onChange={(patch) => update(i, patch)}
            onRemove={() => remove(i)}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-2 font-accent text-[10px] tracking-[0.22em] text-[var(--color-gold-dark)] hover:text-[var(--color-gold)] transition-colors"
      >
        <Plus size={14} />
        Add image
      </button>
    </div>
  );
}

function ImageListRow({
  index,
  value,
  onChange,
  onRemove,
}: {
  index: number;
  value: ImageListItem;
  onChange: (patch: Partial<ImageListItem>) => void;
  onRemove: () => void;
}) {
  const [err, setErr] = React.useState(false);
  React.useEffect(() => setErr(false), [value.src]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_auto] gap-3 p-3 border border-black/8 bg-white">
      {/* Thumbnail */}
      <div className="aspect-square bg-[var(--color-cream-dark)] flex items-center justify-center overflow-hidden">
        {value.src && !err ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value.src}
            alt={value.alt || `Image ${index + 1}`}
            className="w-full h-full object-cover"
            onError={() => setErr(true)}
          />
        ) : (
          <span className="font-accent text-[9px] tracking-[0.2em] text-[var(--color-gray)]">
            {err ? "Bad URL" : `#${index + 1}`}
          </span>
        )}
      </div>
      {/* Inputs */}
      <div className="space-y-2">
        <Input
          type="url"
          value={value.src}
          onChange={(e) => onChange({ src: e.target.value })}
          placeholder="https://images.unsplash.com/photo-XXXXX?w=1600&auto=format&fit=crop"
        />
        <Input
          value={value.alt}
          onChange={(e) => onChange({ alt: e.target.value })}
          placeholder="Alt text (e.g. Pool view at dusk)"
        />
      </div>
      {/* Remove */}
      <button
        type="button"
        onClick={onRemove}
        className="self-start w-10 h-10 flex items-center justify-center text-[var(--color-gray)] hover:text-red-600 hover:bg-red-50 transition-colors"
        aria-label="Remove image"
      >
        <X size={16} />
      </button>
    </div>
  );
}
