// Single data-access layer for the entire app.
// Every Supabase call goes through this file — components and pages should
// import from here, not from @supabase/supabase-js directly.

import { supabase, createAdminClient } from "./supabase";
import type { Property, Location, Developer, NewsArticle } from "./types";

// ── Row mappers: DB snake_case → TypeScript camelCase ─────────────────────

function toProperty(r: Record<string, unknown>): Property {
  return {
    id: r.id as string,
    slug: r.slug as string,
    name: r.name as string,
    type: r.type as Property["type"],
    status: r.status as Property["status"],
    locationId: r.location_id as string,
    developerId: r.developer_id as string,
    bedrooms: Number(r.bedrooms),
    bathrooms: Number(r.bathrooms),
    areaSqm: Number(r.area_sqm),
    floor: r.floor_number != null ? Number(r.floor_number) : undefined,
    priceEGP: Number(r.price_egp),
    description: r.description as string,
    amenities: (r.amenities as string[]) ?? [],
    images: (r.images as Property["images"]) ?? [],
    featured: Boolean(r.featured),
    mapUrl: r.map_url as string,
    deliveryYear: r.delivery_year != null ? Number(r.delivery_year) : undefined,
  };
}

function toLocation(r: Record<string, unknown>): Location {
  return {
    id: r.id as string,
    name: r.name as string,
    arabicName: (r.arabic_name as string | null) ?? undefined,
    region: r.region as Location["region"],
    description: r.description as string,
    image: r.image as string,
  };
}

function toDeveloper(r: Record<string, unknown>): Developer {
  return {
    id: r.id as string,
    name: r.name as string,
    shortName: (r.short_name as string | null) ?? undefined,
    established: Number(r.established),
    description: r.description as string,
  };
}

function toArticle(r: Record<string, unknown>): NewsArticle {
  return {
    id: r.id as string,
    slug: r.slug as string,
    title: r.title as string,
    excerpt: r.excerpt as string,
    body: (r.body as string[]) ?? [],
    category: r.category as NewsArticle["category"],
    author: r.author as string,
    publishedAt: r.published_at as string,
    readMinutes: Number(r.read_minutes),
    cover: r.cover as string,
  };
}

// ── Row mappers: TypeScript camelCase → DB snake_case ─────────────────────
// Each "from*" returns only the keys that were defined on the input — so
// PUT updates only touch the columns the caller actually changed.

function fromProperty(p: Partial<Property>): Record<string, unknown> {
  const r: Record<string, unknown> = {};
  if (p.id !== undefined) r.id = p.id;
  if (p.slug !== undefined) r.slug = p.slug;
  if (p.name !== undefined) r.name = p.name;
  if (p.type !== undefined) r.type = p.type;
  if (p.status !== undefined) r.status = p.status;
  if (p.locationId !== undefined) r.location_id = p.locationId;
  if (p.developerId !== undefined) r.developer_id = p.developerId;
  if (p.bedrooms !== undefined) r.bedrooms = p.bedrooms;
  if (p.bathrooms !== undefined) r.bathrooms = p.bathrooms;
  if (p.areaSqm !== undefined) r.area_sqm = p.areaSqm;
  if (p.floor !== undefined) r.floor_number = p.floor;
  if (p.priceEGP !== undefined) r.price_egp = p.priceEGP;
  if (p.description !== undefined) r.description = p.description;
  if (p.amenities !== undefined) r.amenities = p.amenities;
  if (p.images !== undefined) r.images = p.images;
  if (p.featured !== undefined) r.featured = p.featured;
  if (p.mapUrl !== undefined) r.map_url = p.mapUrl;
  if (p.deliveryYear !== undefined) r.delivery_year = p.deliveryYear;
  return r;
}

function fromLocation(l: Partial<Location>): Record<string, unknown> {
  const r: Record<string, unknown> = {};
  if (l.id !== undefined) r.id = l.id;
  if (l.name !== undefined) r.name = l.name;
  if (l.arabicName !== undefined) r.arabic_name = l.arabicName;
  if (l.region !== undefined) r.region = l.region;
  if (l.description !== undefined) r.description = l.description;
  if (l.image !== undefined) r.image = l.image;
  return r;
}

function fromDeveloper(d: Partial<Developer>): Record<string, unknown> {
  const r: Record<string, unknown> = {};
  if (d.id !== undefined) r.id = d.id;
  if (d.name !== undefined) r.name = d.name;
  if (d.shortName !== undefined) r.short_name = d.shortName;
  if (d.established !== undefined) r.established = d.established;
  if (d.description !== undefined) r.description = d.description;
  return r;
}

function fromArticle(a: Partial<NewsArticle>): Record<string, unknown> {
  const r: Record<string, unknown> = {};
  if (a.id !== undefined) r.id = a.id;
  if (a.slug !== undefined) r.slug = a.slug;
  if (a.title !== undefined) r.title = a.title;
  if (a.excerpt !== undefined) r.excerpt = a.excerpt;
  if (a.body !== undefined) r.body = a.body;
  if (a.category !== undefined) r.category = a.category;
  if (a.author !== undefined) r.author = a.author;
  if (a.publishedAt !== undefined) r.published_at = a.publishedAt;
  if (a.readMinutes !== undefined) r.read_minutes = a.readMinutes;
  if (a.cover !== undefined) r.cover = a.cover;
  return r;
}

// ── PUBLIC reads (anon key, used by website + server pages) ───────────────

export async function dbGetAllProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []).map(toProperty);
}

export async function dbGetFeaturedProperties(limit = 6): Promise<Property[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("featured", true)
    .limit(limit);
  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []).map(toProperty);
}

export async function dbGetProperty(slug: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !data) return null;
  return toProperty(data as Record<string, unknown>);
}

export async function dbGetPropertyById(id: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return toProperty(data as Record<string, unknown>);
}

export async function dbGetRelatedProperties(
  currentSlug: string,
  locationId: string,
  type: string,
  limit = 3,
): Promise<Property[]> {
  const { data } = await supabase
    .from("properties")
    .select("*")
    .neq("slug", currentSlug)
    .or(`location_id.eq.${locationId},type.eq.${type}`)
    .limit(limit);
  return (data ?? []).map(toProperty);
}

export async function dbGetAllPropertySlugs(): Promise<string[]> {
  const { data } = await supabase.from("properties").select("slug");
  return (data ?? []).map((r: Record<string, unknown>) => r.slug as string);
}

export async function dbGetAllLocations(): Promise<Location[]> {
  const { data, error } = await supabase
    .from("locations")
    .select("*")
    .order("name");
  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []).map(toLocation);
}

export async function dbGetLocation(id: string): Promise<Location | null> {
  const { data, error } = await supabase
    .from("locations")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return toLocation(data as Record<string, unknown>);
}

export async function dbGetAllDevelopers(): Promise<Developer[]> {
  const { data, error } = await supabase
    .from("developers")
    .select("*")
    .order("name");
  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []).map(toDeveloper);
}

export async function dbGetDeveloper(id: string): Promise<Developer | null> {
  const { data, error } = await supabase
    .from("developers")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return toDeveloper(data as Record<string, unknown>);
}

export async function dbGetAllArticles(): Promise<NewsArticle[]> {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("published_at", { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []).map(toArticle);
}

export async function dbGetArticle(slug: string): Promise<NewsArticle | null> {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !data) return null;
  return toArticle(data as Record<string, unknown>);
}

export async function dbGetArticleById(id: string): Promise<NewsArticle | null> {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return toArticle(data as Record<string, unknown>);
}

// ── ADMIN writes (service role key, only inside /api/ routes) ─────────────
// NEVER import these in any page or client component.

export async function dbAdminGetAllProperties(): Promise<Property[]> {
  const { data, error } = await createAdminClient()
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(toProperty);
}

export async function dbAdminGetProperty(id: string): Promise<Property | null> {
  const { data, error } = await createAdminClient()
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return toProperty(data as Record<string, unknown>);
}

export async function dbAdminCreateProperty(p: Property): Promise<Property> {
  const { data, error } = await createAdminClient()
    .from("properties")
    .insert(fromProperty(p))
    .select()
    .single();
  if (error) throw new Error(error.message);
  return toProperty(data as Record<string, unknown>);
}

export async function dbAdminUpdateProperty(
  id: string,
  updates: Partial<Property>,
): Promise<Property> {
  const { data, error } = await createAdminClient()
    .from("properties")
    .update(fromProperty(updates))
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return toProperty(data as Record<string, unknown>);
}

export async function dbAdminDeleteProperty(id: string): Promise<void> {
  const { error } = await createAdminClient()
    .from("properties")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function dbAdminPropertySlugTaken(
  slug: string,
  excludeId?: string,
): Promise<boolean> {
  const q = createAdminClient().from("properties").select("id").eq("slug", slug);
  const { data, error } = excludeId ? await q.neq("id", excludeId) : await q;
  if (error) throw new Error(error.message);
  return (data ?? []).length > 0;
}

export async function dbAdminGetAllLocations(): Promise<Location[]> {
  const { data, error } = await createAdminClient()
    .from("locations")
    .select("*")
    .order("name");
  if (error) throw new Error(error.message);
  return (data ?? []).map(toLocation);
}

export async function dbAdminGetLocation(id: string): Promise<Location | null> {
  const { data, error } = await createAdminClient()
    .from("locations")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return toLocation(data as Record<string, unknown>);
}

export async function dbAdminCreateLocation(l: Location): Promise<Location> {
  const { data, error } = await createAdminClient()
    .from("locations")
    .insert(fromLocation(l))
    .select()
    .single();
  if (error) throw new Error(error.message);
  return toLocation(data as Record<string, unknown>);
}

export async function dbAdminUpdateLocation(
  id: string,
  updates: Partial<Location>,
): Promise<Location> {
  const { data, error } = await createAdminClient()
    .from("locations")
    .update(fromLocation(updates))
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return toLocation(data as Record<string, unknown>);
}

export async function dbAdminDeleteLocation(id: string): Promise<void> {
  const { error } = await createAdminClient()
    .from("locations")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function dbAdminLocationIdTaken(id: string): Promise<boolean> {
  const { data, error } = await createAdminClient()
    .from("locations")
    .select("id")
    .eq("id", id);
  if (error) throw new Error(error.message);
  return (data ?? []).length > 0;
}

export async function dbAdminGetAllDevelopers(): Promise<Developer[]> {
  const { data, error } = await createAdminClient()
    .from("developers")
    .select("*")
    .order("name");
  if (error) throw new Error(error.message);
  return (data ?? []).map(toDeveloper);
}

export async function dbAdminGetDeveloper(id: string): Promise<Developer | null> {
  const { data, error } = await createAdminClient()
    .from("developers")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return toDeveloper(data as Record<string, unknown>);
}

export async function dbAdminCreateDeveloper(d: Developer): Promise<Developer> {
  const { data, error } = await createAdminClient()
    .from("developers")
    .insert(fromDeveloper(d))
    .select()
    .single();
  if (error) throw new Error(error.message);
  return toDeveloper(data as Record<string, unknown>);
}

export async function dbAdminUpdateDeveloper(
  id: string,
  updates: Partial<Developer>,
): Promise<Developer> {
  const { data, error } = await createAdminClient()
    .from("developers")
    .update(fromDeveloper(updates))
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return toDeveloper(data as Record<string, unknown>);
}

export async function dbAdminDeleteDeveloper(id: string): Promise<void> {
  const { error } = await createAdminClient()
    .from("developers")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function dbAdminDeveloperIdTaken(id: string): Promise<boolean> {
  const { data, error } = await createAdminClient()
    .from("developers")
    .select("id")
    .eq("id", id);
  if (error) throw new Error(error.message);
  return (data ?? []).length > 0;
}

export async function dbAdminGetAllArticles(): Promise<NewsArticle[]> {
  const { data, error } = await createAdminClient()
    .from("news")
    .select("*")
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(toArticle);
}

export async function dbAdminGetArticle(id: string): Promise<NewsArticle | null> {
  const { data, error } = await createAdminClient()
    .from("news")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return toArticle(data as Record<string, unknown>);
}

export async function dbAdminCreateArticle(a: NewsArticle): Promise<NewsArticle> {
  const { data, error } = await createAdminClient()
    .from("news")
    .insert(fromArticle(a))
    .select()
    .single();
  if (error) throw new Error(error.message);
  return toArticle(data as Record<string, unknown>);
}

export async function dbAdminUpdateArticle(
  id: string,
  updates: Partial<NewsArticle>,
): Promise<NewsArticle> {
  const { data, error } = await createAdminClient()
    .from("news")
    .update(fromArticle(updates))
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return toArticle(data as Record<string, unknown>);
}

export async function dbAdminDeleteArticle(id: string): Promise<void> {
  const { error } = await createAdminClient()
    .from("news")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function dbAdminArticleSlugTaken(
  slug: string,
  excludeId?: string,
): Promise<boolean> {
  const q = createAdminClient().from("news").select("id").eq("slug", slug);
  const { data, error } = excludeId ? await q.neq("id", excludeId) : await q;
  if (error) throw new Error(error.message);
  return (data ?? []).length > 0;
}

// ── ID + slug helpers (admin-only) ────────────────────────────────────────

const ID_PREFIX = {
  properties: "p",
  news: "n",
} as const;

/** Generate a unique `{prefix}-{NNN}` id by scanning the table for the next gap. */
export async function dbAdminGenerateId(
  table: keyof typeof ID_PREFIX,
): Promise<string> {
  const { data, error } = await createAdminClient().from(table).select("id");
  if (error) throw new Error(error.message);
  const prefix = ID_PREFIX[table];
  let max = 0;
  for (const row of data ?? []) {
    const id = String((row as Record<string, unknown>).id ?? "");
    const m = id.match(new RegExp(`^${prefix}-(\\d+)$`));
    if (m) {
      const n = parseInt(m[1], 10);
      if (n > max) max = n;
    }
  }
  return `${prefix}-${String(max + 1).padStart(3, "0")}`;
}

/** Append `-2`, `-3`, ... to a base slug until it's unique in `table`. */
export async function dbAdminUniqueSlug(
  table: "properties" | "news",
  baseSlug: string,
  excludeId?: string,
): Promise<string> {
  let slug = baseSlug;
  let i = 2;
  // Cheap loop: each call hits one indexed row by slug.
  while (true) {
    const taken =
      table === "properties"
        ? await dbAdminPropertySlugTaken(slug, excludeId)
        : await dbAdminArticleSlugTaken(slug, excludeId);
    if (!taken) return slug;
    slug = `${baseSlug}-${i++}`;
    if (i > 100) return slug; // safety
  }
}
