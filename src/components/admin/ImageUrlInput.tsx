"use client";
import * as React from "react";
import { Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUrlInputProps {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  required?: boolean;
}

/**
 * URL input with live preview.
 * Uses a plain <img> (not next/image) so any hostname works without next.config remotePatterns.
 */
export function ImageUrlInput({
  label = "Image URL",
  value,
  onChange,
  placeholder = "https://images.unsplash.com/photo-XXXXX?w=1600&auto=format&fit=crop",
  hint,
  required,
}: ImageUrlInputProps) {
  const [previewError, setPreviewError] = React.useState(false);

  React.useEffect(() => {
    setPreviewError(false);
  }, [value]);

  return (
    <div className="space-y-2">
      <Label>{label}{required && <span className="text-red-500"> *</span>}</Label>
      <Input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
      {hint && (
        <p className="text-xs text-[var(--color-gray)] leading-relaxed">{hint}</p>
      )}

      {/* Preview */}
      <div className="mt-2 aspect-[16/9] max-w-md bg-[var(--color-cream-dark)] border border-black/8 flex items-center justify-center overflow-hidden">
        {value && !previewError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={() => setPreviewError(true)}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-[var(--color-gray)]">
            <ImageIcon size={28} strokeWidth={1.2} />
            <p className="font-accent text-[9px] tracking-[0.22em]">
              {previewError ? "Could not load image" : "Preview will appear here"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
