-- Signature Estates — Supabase seed data
-- Safe to re-run: every INSERT uses ON CONFLICT (id) DO UPDATE.
-- Order: locations → developers → properties → news.

begin;

-- ────────────────────────────────────────────────────────────────────────────
-- Locations (21)
-- ────────────────────────────────────────────────────────────────────────────

insert into locations (id, name, arabic_name, region, description, image) values
  ('new-cairo','New Cairo','التجمع الخامس','Greater Cairo','The eastern flagship of modern Cairo — gated communities, international schools, and a steady appetite for premium residences.','https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1600&auto=format&fit=crop')
on conflict (id) do update set name=excluded.name, arabic_name=excluded.arabic_name, region=excluded.region, description=excluded.description, image=excluded.image;

insert into locations (id, name, arabic_name, region, description, image) values
  ('sheikh-zayed','Sheikh Zayed','الشيخ زايد','Greater Cairo','Wide boulevards and mature greenery on Cairo''s western edge, anchored by SODIC and Palm Hills neighbourhoods.','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop')
on conflict (id) do update set name=excluded.name, arabic_name=excluded.arabic_name, region=excluded.region, description=excluded.description, image=excluded.image;

insert into locations (id, name, arabic_name, region, description, image) values
  ('october','6th of October City','السادس من أكتوبر','Greater Cairo','A self-contained city west of Cairo with a deep pipeline of villa compounds and family-led communities.','https://images.unsplash.com/photo-1613553474179-e1eda3ea5734?w=1600&auto=format&fit=crop')
on conflict (id) do update set name=excluded.name, arabic_name=excluded.arabic_name, region=excluded.region, description=excluded.description, image=excluded.image;

insert into locations (id, name, arabic_name, region, description, image) values
  ('madinaty','Madinaty','مدينتي','Greater Cairo','TMG''s flagship integrated city — manicured parks, a private golf course, and Egypt''s most legible master plan.','https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1600&auto=format&fit=crop')
on conflict (id) do update set name=excluded.name, arabic_name=excluded.arabic_name, region=excluded.region, description=excluded.description, image=excluded.image;

insert into locations (id, name, arabic_name, region, description, image) values
  ('mostakbal','Mostakbal City','مدينة المستقبل','Greater Cairo','An emerging eastern corridor between New Cairo and the Capital, drawing forward-looking master developers.','https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&auto=format&fit=crop')
on conflict (id) do update set name=excluded.name, arabic_name=excluded.arabic_name, region=excluded.region, description=excluded.description, image=excluded.image;

insert into locations (id, name, arabic_name, region, description, image) values
  ('obour','Obour City','العبور','Greater Cairo','Quiet, established, and increasingly relevant thanks to the Capital ring road and a fresh wave of compounds.','https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&auto=format&fit=crop')
on conflict (id) do update set name=excluded.name, arabic_name=excluded.arabic_name, region=excluded.region, description=excluded.description, image=excluded.image;

insert into locations (id, name, arabic_name, region, description, image) values
  ('badr','Badr City','مدينة بدر','Greater Cairo','An entry point to the eastern expansion belt, with value-positioned residential and industrial-adjacent zones.','https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&auto=format&fit=crop')
on conflict (id) do update set name=excluded.name, arabic_name=excluded.arabic_name, region=excluded.region, description=excluded.description, image=excluded.image;

insert into locations (id, name, arabic_name, region, description, image) values
  ('north-coast-sidi','Sidi Abd El Rahman','سيدي عبد الرحمن','North Coast & Mediterranean','The most coveted stretch of Egypt''s North Coast — turquoise water, white sand, and a roster of marquee resorts.','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop')
on conflict (id) do update set name=excluded.name, arabic_name=excluded.arabic_name, region=excluded.region, description=excluded.description, image=excluded.image;

insert into locations (id, name, arabic_name, region, description, image) values
  ('ras-el-hekma','Ras El Hekma','رأس الحكمة','North Coast & Mediterranean','The country''s most discussed new destination — a planned coastal city positioned to redefine Mediterranean living.','https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1600&auto=format&fit=crop')
on conflict (id) do update set name=excluded.name, arabic_name=excluded.arabic_name, region=excluded.region, description=excluded.description, image=excluded.image;

insert into locations (id, name, arabic_name, region, description, image) values
  ('new-alamein','New Alamein City','العلمين الجديدة','North Coast & Mediterranean','A four-season coastal city of towers, lagoons, and cultural anchors — the only North Coast address that lives year-round.','https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1600&auto=format&fit=crop')
on conflict (id) do update set name=excluded.name, arabic_name=excluded.arabic_name, region=excluded.region, description=excluded.description, image=excluded.image;

insert into locations (id, name, arabic_name, region, description, image) values
  ('marsa-matrouh','Marsa Matrouh','مرسى مطروح','North Coast & Mediterranean','Bays and coves with a quieter rhythm than the central coast — a long-game investment along Egypt''s western shore.','https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=1600&auto=format&fit=crop')
on conflict (id) do update set name=excluded.name, arabic_name=excluded.arabic_name, region=excluded.region, description=excluded.description, image=excluded.image;

insert into locations (id, name, arabic_name, region, description, image) values
  ('hurghada','Hurghada','الغردقة','Red Sea & Sinai','Egypt''s diving capital and a year-round Red Sea hub with a maturing market for branded marina living.','https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1600&auto=format&fit=crop')
on conflict (id) do update set name=excluded.name, arabic_name=excluded.arabic_name, region=excluded.region, description=excluded.description, image=excluded.image;

insert into locations (id, name, arabic_name, region, description, image) values
  ('el-gouna','El Gouna','الجونة','Red Sea & Sinai','Orascom''s lagoon-laced town — design-conscious, walkable, and quietly the most international community in Egypt.','https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600&auto=format&fit=crop')
on conflict (id) do update set name=excluded.name, arabic_name=excluded.arabic_name, region=excluded.region, description=excluded.description, image=excluded.image;

insert into locations (id, name, arabic_name, region, description, image) values
  ('sharm-el-sheikh','Sharm El Sheikh','شرم الشيخ','Red Sea & Sinai','A protected coastline of reefs and coves — chalet ownership here remains one of the most resilient holiday plays.','https://images.unsplash.com/photo-1535827841776-24afc1e255ac?w=1600&auto=format&fit=crop')
on conflict (id) do update set name=excluded.name, arabic_name=excluded.arabic_name, region=excluded.region, description=excluded.description, image=excluded.image;

insert into locations (id, name, arabic_name, region, description, image) values
  ('ain-sokhna','Ain Sokhna','العين السخنة','Red Sea & Sinai','Cairo''s nearest coast — under two hours from the city — and the most actively traded second-home market.','https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=1600&auto=format&fit=crop')
on conflict (id) do update set name=excluded.name, arabic_name=excluded.arabic_name, region=excluded.region, description=excluded.description, image=excluded.image;

insert into locations (id, name, arabic_name, region, description, image) values
  ('luxor','Luxor','الأقصر','Upper Egypt','An open-air museum on the Nile — boutique hospitality and heritage residences for a particular kind of buyer.','https://images.unsplash.com/photo-1539768942893-daf53e448371?w=1600&auto=format&fit=crop')
on conflict (id) do update set name=excluded.name, arabic_name=excluded.arabic_name, region=excluded.region, description=excluded.description, image=excluded.image;

insert into locations (id, name, arabic_name, region, description, image) values
  ('aswan','Aswan','أسوان','Upper Egypt','Granite islands and Nubian colour — a measured, design-led market focused on riverfront retreats.','https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=1600&auto=format&fit=crop')
on conflict (id) do update set name=excluded.name, arabic_name=excluded.arabic_name, region=excluded.region, description=excluded.description, image=excluded.image;

insert into locations (id, name, arabic_name, region, description, image) values
  ('new-capital','New Administrative Capital','العاصمة الإدارية','New Capital','The state''s purpose-built capital — a fast-rising business spine with downtown towers and high-density compounds.','https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&auto=format&fit=crop')
on conflict (id) do update set name=excluded.name, arabic_name=excluded.arabic_name, region=excluded.region, description=excluded.description, image=excluded.image;

insert into locations (id, name, arabic_name, region, description, image) values
  ('new-mansoura','New Mansoura','المنصورة الجديدة','Delta & Canal Zone','A planned coastal extension of the Delta''s largest city — accessible pricing on a clean Mediterranean strip.','https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=1600&auto=format&fit=crop')
on conflict (id) do update set name=excluded.name, arabic_name=excluded.arabic_name, region=excluded.region, description=excluded.description, image=excluded.image;

insert into locations (id, name, arabic_name, region, description, image) values
  ('ismailia','Ismailia','الإسماعيلية','Delta & Canal Zone','Lakeside calm at the centre of the Canal Zone — a slower, leafier alternative to Cairo''s compound life.','https://images.unsplash.com/photo-1465778893808-9b3d1b443be4?w=1600&auto=format&fit=crop')
on conflict (id) do update set name=excluded.name, arabic_name=excluded.arabic_name, region=excluded.region, description=excluded.description, image=excluded.image;

insert into locations (id, name, arabic_name, region, description, image) values
  ('damietta','Damietta','دمياط','Delta & Canal Zone','Ras El Bar and the New Damietta strip — a maturing coastal market with a distinct Delta character.','https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1600&auto=format&fit=crop')
on conflict (id) do update set name=excluded.name, arabic_name=excluded.arabic_name, region=excluded.region, description=excluded.description, image=excluded.image;


-- ────────────────────────────────────────────────────────────────────────────
-- Developers (12)
-- ────────────────────────────────────────────────────────────────────────────

insert into developers (id, name, short_name, established, description) values
  ('ora','ORA Developers','ORA',2017,'A globally minded developer behind some of Egypt''s most distinctive masterplans, from ZED to Silver Sands.')
on conflict (id) do update set name=excluded.name, short_name=excluded.short_name, established=excluded.established, description=excluded.description;

insert into developers (id, name, short_name, established, description) values
  ('emaar-misr','Emaar Misr','Emaar',2005,'The Egyptian arm of Emaar Properties — Mivida, Marassi, Cairo Gate and Uptown Cairo trace back to its drawing board.')
on conflict (id) do update set name=excluded.name, short_name=excluded.short_name, established=excluded.established, description=excluded.description;

insert into developers (id, name, short_name, established, description) values
  ('tmg','Talaat Moustafa Group','TMG',1973,'Builder of Egypt''s largest integrated cities — Madinaty, Al Rehab, Celia and Noor — and the country''s most-watched developer.')
on conflict (id) do update set name=excluded.name, short_name=excluded.short_name, established=excluded.established, description=excluded.description;

insert into developers (id, name, short_name, established, description) values
  ('sodic','SODIC',null,1996,'Design-led communities across East and West Cairo and the North Coast — Eastown, Westown, June and Caesar.')
on conflict (id) do update set name=excluded.name, short_name=excluded.short_name, established=excluded.established, description=excluded.description;

insert into developers (id, name, short_name, established, description) values
  ('palm-hills','Palm Hills Developments','Palm Hills',2005,'A long-running master developer with a deep portfolio across Sheikh Zayed, October, New Cairo and the North Coast.')
on conflict (id) do update set name=excluded.name, short_name=excluded.short_name, established=excluded.established, description=excluded.description;

insert into developers (id, name, short_name, established, description) values
  ('mountain-view','Mountain View',null,2005,'Concept-driven communities — iCity, Aliva, LVLS — defined by clean lines and a distinct lifestyle vocabulary.')
on conflict (id) do update set name=excluded.name, short_name=excluded.short_name, established=excluded.established, description=excluded.description;

insert into developers (id, name, short_name, established, description) values
  ('marakez','Marakez',null,2014,'A retail-first developer expanding into mixed-use destinations across Cairo and the New Capital.')
on conflict (id) do update set name=excluded.name, short_name=excluded.short_name, established=excluded.established, description=excluded.description;

insert into developers (id, name, short_name, established, description) values
  ('hassan-allam','Hassan Allam Properties','Hassan Allam',2017,'The real estate arm of one of Egypt''s oldest engineering houses — Park View, Swanlake and Seasons in Cairo.')
on conflict (id) do update set name=excluded.name, short_name=excluded.short_name, established=excluded.established, description=excluded.description;

insert into developers (id, name, short_name, established, description) values
  ('misr-italia','Misr Italia Properties','Misr Italia',1998,'Design-forward communities including IL Bosco, Vinci and Kai — a recurring name in Egypt''s architectural awards.')
on conflict (id) do update set name=excluded.name, short_name=excluded.short_name, established=excluded.established, description=excluded.description;

insert into developers (id, name, short_name, established, description) values
  ('tatweer-misr','Tatweer Misr',null,2014,'Wellness-led masterplans on the North Coast and Sokhna — Fouka Bay, Il Monte Galala and Bloomfields.')
on conflict (id) do update set name=excluded.name, short_name=excluded.short_name, established=excluded.established, description=excluded.description;

insert into developers (id, name, short_name, established, description) values
  ('inertia','Inertia Egypt','Inertia',2007,'Compact, design-rich communities in Cairo and on the coast — G-Cribs, Joulz, Jefaira and Brix.')
on conflict (id) do update set name=excluded.name, short_name=excluded.short_name, established=excluded.established, description=excluded.description;

insert into developers (id, name, short_name, established, description) values
  ('lmd','LMD',null,2007,'A regional developer working across Egypt, the UAE and Europe — Three Sixty, Stei8ht and One Ninety in East Cairo.')
on conflict (id) do update set name=excluded.name, short_name=excluded.short_name, established=excluded.established, description=excluded.description;


-- ────────────────────────────────────────────────────────────────────────────
-- Properties (14)
-- ────────────────────────────────────────────────────────────────────────────

insert into properties (id, slug, name, type, status, location_id, developer_id, bedrooms, bathrooms, area_sqm, floor_number, price_egp, description, amenities, images, featured, map_url, delivery_year) values
  ('p-001','marquee-villa-zed-east','Marquee Villa — ZED East','Standalone Villa','Off-Plan','new-cairo','ora',5,6,612,null,42500000,
   'A standalone villa on a corner plot with double-height living, a private pool, and direct frontage onto ZED East''s central spine. Designed by an internationally awarded studio for a buyer who notices proportion before finish.',
   ARRAY['Private pool','Smart home system','Italian kitchen','Private garden','Maid''s quarters','Two-car garage','Walk-in wardrobes','Backup generator'],
   '[{"src":"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop","alt":"Villa exterior at dusk"},{"src":"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop","alt":"Open-plan living"},{"src":"https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&auto=format&fit=crop","alt":"Master bedroom"},{"src":"https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1600&auto=format&fit=crop","alt":"Pool view"}]'::jsonb,
   true,'https://www.google.com/maps?q=ZED+East+New+Cairo&output=embed',2027)
on conflict (id) do update set slug=excluded.slug,name=excluded.name,type=excluded.type,status=excluded.status,location_id=excluded.location_id,developer_id=excluded.developer_id,bedrooms=excluded.bedrooms,bathrooms=excluded.bathrooms,area_sqm=excluded.area_sqm,floor_number=excluded.floor_number,price_egp=excluded.price_egp,description=excluded.description,amenities=excluded.amenities,images=excluded.images,featured=excluded.featured,map_url=excluded.map_url,delivery_year=excluded.delivery_year;

insert into properties (id, slug, name, type, status, location_id, developer_id, bedrooms, bathrooms, area_sqm, floor_number, price_egp, description, amenities, images, featured, map_url, delivery_year) values
  ('p-002','penthouse-mivida-park','Penthouse — Mivida Park','Penthouse','Ready to Move','new-cairo','emaar-misr',4,5,380,6,28900000,
   'A duplex penthouse on the central park, with a private rooftop terrace and uninterrupted views over Mivida''s tree canopy. Move-in ready, with a full white-box premium finish.',
   ARRAY['Rooftop terrace','Private elevator','Park view','Underfloor heating','Concierge','Two parking spots','Storage room'],
   '[{"src":"https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600&auto=format&fit=crop","alt":"Penthouse living room"},{"src":"https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&auto=format&fit=crop","alt":"Open kitchen"},{"src":"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&auto=format&fit=crop","alt":"Bedroom suite"},{"src":"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&auto=format&fit=crop","alt":"Terrace"}]'::jsonb,
   true,'https://www.google.com/maps?q=Mivida+New+Cairo&output=embed',null)
on conflict (id) do update set slug=excluded.slug,name=excluded.name,type=excluded.type,status=excluded.status,location_id=excluded.location_id,developer_id=excluded.developer_id,bedrooms=excluded.bedrooms,bathrooms=excluded.bathrooms,area_sqm=excluded.area_sqm,floor_number=excluded.floor_number,price_egp=excluded.price_egp,description=excluded.description,amenities=excluded.amenities,images=excluded.images,featured=excluded.featured,map_url=excluded.map_url,delivery_year=excluded.delivery_year;

insert into properties (id, slug, name, type, status, location_id, developer_id, bedrooms, bathrooms, area_sqm, floor_number, price_egp, description, amenities, images, featured, map_url, delivery_year) values
  ('p-003','twin-house-belle-vie','Twin House — Belle Vie','Twin House','Under Construction','sheikh-zayed','emaar-misr',4,4,295,null,22400000,
   'A garden twin in Belle Vie''s most mature cluster — south-facing, set across three levels with a basement studio and a generous garden footprint.',
   ARRAY['Private garden','Basement studio','Roof access','Laundry room','Reserved parking','Compound clubhouse'],
   '[{"src":"https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&auto=format&fit=crop","alt":"Twin house exterior"},{"src":"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&auto=format&fit=crop","alt":"Living area"},{"src":"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&auto=format&fit=crop","alt":"Kitchen detail"}]'::jsonb,
   true,'https://www.google.com/maps?q=Belle+Vie+Sheikh+Zayed&output=embed',2026)
on conflict (id) do update set slug=excluded.slug,name=excluded.name,type=excluded.type,status=excluded.status,location_id=excluded.location_id,developer_id=excluded.developer_id,bedrooms=excluded.bedrooms,bathrooms=excluded.bathrooms,area_sqm=excluded.area_sqm,floor_number=excluded.floor_number,price_egp=excluded.price_egp,description=excluded.description,amenities=excluded.amenities,images=excluded.images,featured=excluded.featured,map_url=excluded.map_url,delivery_year=excluded.delivery_year;

insert into properties (id, slug, name, type, status, location_id, developer_id, bedrooms, bathrooms, area_sqm, floor_number, price_egp, description, amenities, images, featured, map_url, delivery_year) values
  ('p-004','chalet-silver-sands','Lagoon Chalet — Silver Sands','Chalet','Off-Plan','north-coast-sidi','ora',3,3,165,1,18750000,
   'First-row chalet on Silver Sands'' crystal lagoon, with a 9m terrace and direct access to the white-sand beach club.',
   ARRAY['Lagoon view','Beach access','Outdoor kitchen','Smart shading','Resort-style pools','Beach club membership'],
   '[{"src":"https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1600&auto=format&fit=crop","alt":"Lagoon view"},{"src":"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&auto=format&fit=crop","alt":"Chalet interior"},{"src":"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop","alt":"Beach"}]'::jsonb,
   true,'https://www.google.com/maps?q=Silver+Sands+Sidi+Abdel+Rahman&output=embed',2027)
on conflict (id) do update set slug=excluded.slug,name=excluded.name,type=excluded.type,status=excluded.status,location_id=excluded.location_id,developer_id=excluded.developer_id,bedrooms=excluded.bedrooms,bathrooms=excluded.bathrooms,area_sqm=excluded.area_sqm,floor_number=excluded.floor_number,price_egp=excluded.price_egp,description=excluded.description,amenities=excluded.amenities,images=excluded.images,featured=excluded.featured,map_url=excluded.map_url,delivery_year=excluded.delivery_year;

insert into properties (id, slug, name, type, status, location_id, developer_id, bedrooms, bathrooms, area_sqm, floor_number, price_egp, description, amenities, images, featured, map_url, delivery_year) values
  ('p-005','apartment-eastown-residences','Apartment — Eastown Residences','Flat Apartment','Ready to Move','new-cairo','sodic',3,3,215,4,14900000,
   'A corner unit on Eastown''s pedestrian street — walkable to the boulevard cafés, with a quiet rear-facing master suite.',
   ARRAY['Walkable amenities','Storage room','Underground parking','24/7 security','Compound gym'],
   '[{"src":"https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1600&auto=format&fit=crop","alt":"Apartment exterior"},{"src":"https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600&auto=format&fit=crop","alt":"Living area"},{"src":"https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1600&auto=format&fit=crop","alt":"Bedroom"}]'::jsonb,
   false,'https://www.google.com/maps?q=Eastown+New+Cairo&output=embed',null)
on conflict (id) do update set slug=excluded.slug,name=excluded.name,type=excluded.type,status=excluded.status,location_id=excluded.location_id,developer_id=excluded.developer_id,bedrooms=excluded.bedrooms,bathrooms=excluded.bathrooms,area_sqm=excluded.area_sqm,floor_number=excluded.floor_number,price_egp=excluded.price_egp,description=excluded.description,amenities=excluded.amenities,images=excluded.images,featured=excluded.featured,map_url=excluded.map_url,delivery_year=excluded.delivery_year;

insert into properties (id, slug, name, type, status, location_id, developer_id, bedrooms, bathrooms, area_sqm, floor_number, price_egp, description, amenities, images, featured, map_url, delivery_year) values
  ('p-006','townhouse-o-west','Townhouse — O West','Town House','Under Construction','october','ora',4,4,245,null,19800000,
   'An end-corner townhouse on O West''s tree-lined avenue, with a wraparound garden and a clean, contemporary façade.',
   ARRAY['Wraparound garden','Roof terrace','Two-car garage','Smart entry','Central park access'],
   '[{"src":"https://images.unsplash.com/photo-1613553474179-e1eda3ea5734?w=1600&auto=format&fit=crop","alt":"Townhouse exterior"},{"src":"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop","alt":"Living"},{"src":"https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1600&auto=format&fit=crop","alt":"Bedroom"}]'::jsonb,
   false,'https://www.google.com/maps?q=O+West+October&output=embed',2026)
on conflict (id) do update set slug=excluded.slug,name=excluded.name,type=excluded.type,status=excluded.status,location_id=excluded.location_id,developer_id=excluded.developer_id,bedrooms=excluded.bedrooms,bathrooms=excluded.bathrooms,area_sqm=excluded.area_sqm,floor_number=excluded.floor_number,price_egp=excluded.price_egp,description=excluded.description,amenities=excluded.amenities,images=excluded.images,featured=excluded.featured,map_url=excluded.map_url,delivery_year=excluded.delivery_year;

insert into properties (id, slug, name, type, status, location_id, developer_id, bedrooms, bathrooms, area_sqm, floor_number, price_egp, description, amenities, images, featured, map_url, delivery_year) values
  ('p-007','office-tower-new-capital','Office Floor — Capital Diamond Tower','Office','Ready to Move','new-capital','marakez',0,4,540,18,36000000,
   'A full floor in the New Capital''s CBD — column-free with a 360° glass envelope and dedicated lift access.',
   ARRAY['Dedicated lift','Raised flooring','VRF cooling','Backup power','On-site retail','Valet parking'],
   '[{"src":"https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop","alt":"Office floor"},{"src":"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&auto=format&fit=crop","alt":"Tower exterior"},{"src":"https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&auto=format&fit=crop","alt":"Meeting room"}]'::jsonb,
   false,'https://www.google.com/maps?q=New+Administrative+Capital+CBD&output=embed',null)
on conflict (id) do update set slug=excluded.slug,name=excluded.name,type=excluded.type,status=excluded.status,location_id=excluded.location_id,developer_id=excluded.developer_id,bedrooms=excluded.bedrooms,bathrooms=excluded.bathrooms,area_sqm=excluded.area_sqm,floor_number=excluded.floor_number,price_egp=excluded.price_egp,description=excluded.description,amenities=excluded.amenities,images=excluded.images,featured=excluded.featured,map_url=excluded.map_url,delivery_year=excluded.delivery_year;

insert into properties (id, slug, name, type, status, location_id, developer_id, bedrooms, bathrooms, area_sqm, floor_number, price_egp, description, amenities, images, featured, map_url, delivery_year) values
  ('p-008','villa-hacienda-bay','Beachfront Villa — Hacienda Bay','Standalone Villa','Ready to Move','north-coast-sidi','palm-hills',5,6,720,null,78000000,
   'A first-row beachfront villa on Hacienda Bay''s quiet southern stretch — fully renovated, sleeping ten, with a 22-metre pool.',
   ARRAY['Beachfront','22m pool','Outdoor cinema','Staff quarters','Smart shading','Fully furnished'],
   '[{"src":"https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600&auto=format&fit=crop","alt":"Beachfront villa"},{"src":"https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=1600&auto=format&fit=crop","alt":"Pool"},{"src":"https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&auto=format&fit=crop","alt":"Living"}]'::jsonb,
   true,'https://www.google.com/maps?q=Hacienda+Bay+North+Coast&output=embed',null)
on conflict (id) do update set slug=excluded.slug,name=excluded.name,type=excluded.type,status=excluded.status,location_id=excluded.location_id,developer_id=excluded.developer_id,bedrooms=excluded.bedrooms,bathrooms=excluded.bathrooms,area_sqm=excluded.area_sqm,floor_number=excluded.floor_number,price_egp=excluded.price_egp,description=excluded.description,amenities=excluded.amenities,images=excluded.images,featured=excluded.featured,map_url=excluded.map_url,delivery_year=excluded.delivery_year;

insert into properties (id, slug, name, type, status, location_id, developer_id, bedrooms, bathrooms, area_sqm, floor_number, price_egp, description, amenities, images, featured, map_url, delivery_year) values
  ('p-009','studio-il-monte-galala','Studio — Il Monte Galala','Flat Apartment','Ready to Move','ain-sokhna','tatweer-misr',0,1,58,3,4950000,
   'A sea-view studio on Il Monte Galala''s upper terraces — perfectly sized for a low-maintenance Sokhna pied-à-terre.',
   ARRAY['Sea view','Furnished kitchenette','Resort beach access','Cable car','Concierge'],
   '[{"src":"https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=1600&auto=format&fit=crop","alt":"Sokhna view"},{"src":"https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1600&auto=format&fit=crop","alt":"Studio interior"}]'::jsonb,
   false,'https://www.google.com/maps?q=Il+Monte+Galala+Ain+Sokhna&output=embed',null)
on conflict (id) do update set slug=excluded.slug,name=excluded.name,type=excluded.type,status=excluded.status,location_id=excluded.location_id,developer_id=excluded.developer_id,bedrooms=excluded.bedrooms,bathrooms=excluded.bathrooms,area_sqm=excluded.area_sqm,floor_number=excluded.floor_number,price_egp=excluded.price_egp,description=excluded.description,amenities=excluded.amenities,images=excluded.images,featured=excluded.featured,map_url=excluded.map_url,delivery_year=excluded.delivery_year;

insert into properties (id, slug, name, type, status, location_id, developer_id, bedrooms, bathrooms, area_sqm, floor_number, price_egp, description, amenities, images, featured, map_url, delivery_year) values
  ('p-010','chalet-fouka-bay','Chalet — Fouka Bay','Chalet','Ready to Move','ras-el-hekma','tatweer-misr',3,3,175,null,14200000,
   'Second-row chalet at Fouka Bay''s most active phase, with a step-down terrace and view across the inner lagoon.',
   ARRAY['Lagoon view','Roof terrace','Beach access','Resort facilities'],
   '[{"src":"https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=1600&auto=format&fit=crop","alt":"Lagoon"},{"src":"https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1600&auto=format&fit=crop","alt":"Chalet"}]'::jsonb,
   false,'https://www.google.com/maps?q=Fouka+Bay+Ras+El+Hekma&output=embed',null)
on conflict (id) do update set slug=excluded.slug,name=excluded.name,type=excluded.type,status=excluded.status,location_id=excluded.location_id,developer_id=excluded.developer_id,bedrooms=excluded.bedrooms,bathrooms=excluded.bathrooms,area_sqm=excluded.area_sqm,floor_number=excluded.floor_number,price_egp=excluded.price_egp,description=excluded.description,amenities=excluded.amenities,images=excluded.images,featured=excluded.featured,map_url=excluded.map_url,delivery_year=excluded.delivery_year;

insert into properties (id, slug, name, type, status, location_id, developer_id, bedrooms, bathrooms, area_sqm, floor_number, price_egp, description, amenities, images, featured, map_url, delivery_year) values
  ('p-011','apartment-aliva-mostakbal','Apartment — Aliva, Mostakbal City','Flat Apartment','Off-Plan','mostakbal','mountain-view',3,2,168,2,8750000,
   'An Aliva phase-one apartment with a long balcony and a layout that''s optimised for natural cross-ventilation.',
   ARRAY['Balcony','Compound park','Underground parking','Smart entry'],
   '[{"src":"https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&auto=format&fit=crop","alt":"Aliva"},{"src":"https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600&auto=format&fit=crop","alt":"Apartment"}]'::jsonb,
   false,'https://www.google.com/maps?q=Aliva+Mostakbal+City&output=embed',2028)
on conflict (id) do update set slug=excluded.slug,name=excluded.name,type=excluded.type,status=excluded.status,location_id=excluded.location_id,developer_id=excluded.developer_id,bedrooms=excluded.bedrooms,bathrooms=excluded.bathrooms,area_sqm=excluded.area_sqm,floor_number=excluded.floor_number,price_egp=excluded.price_egp,description=excluded.description,amenities=excluded.amenities,images=excluded.images,featured=excluded.featured,map_url=excluded.map_url,delivery_year=excluded.delivery_year;

insert into properties (id, slug, name, type, status, location_id, developer_id, bedrooms, bathrooms, area_sqm, floor_number, price_egp, description, amenities, images, featured, map_url, delivery_year) values
  ('p-012','land-il-bosco-new-capital','Land Plot — IL Bosco, New Capital','Land','Ready to Move','new-capital','misr-italia',0,0,850,null,32000000,
   'A standalone plot inside IL Bosco''s villa cluster — already serviced, with build approvals on the master plan.',
   ARRAY['Serviced plot','Build-ready','Compound infrastructure'],
   '[{"src":"https://images.unsplash.com/photo-1465778893808-9b3d1b443be4?w=1600&auto=format&fit=crop","alt":"Land"},{"src":"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&auto=format&fit=crop","alt":"Aerial"}]'::jsonb,
   false,'https://www.google.com/maps?q=IL+Bosco+New+Capital&output=embed',null)
on conflict (id) do update set slug=excluded.slug,name=excluded.name,type=excluded.type,status=excluded.status,location_id=excluded.location_id,developer_id=excluded.developer_id,bedrooms=excluded.bedrooms,bathrooms=excluded.bathrooms,area_sqm=excluded.area_sqm,floor_number=excluded.floor_number,price_egp=excluded.price_egp,description=excluded.description,amenities=excluded.amenities,images=excluded.images,featured=excluded.featured,map_url=excluded.map_url,delivery_year=excluded.delivery_year;

insert into properties (id, slug, name, type, status, location_id, developer_id, bedrooms, bathrooms, area_sqm, floor_number, price_egp, description, amenities, images, featured, map_url, delivery_year) values
  ('p-013','villa-jefaira-ras-el-hekma','Villa — Jefaira','Standalone Villa','Under Construction','ras-el-hekma','inertia',4,4,410,null,33500000,
   'A standalone Jefaira villa on the marina spine — a calmer, design-led answer to the central coast circuit.',
   ARRAY['Marina view','Private pool','Beach club','Boardwalk access','Storage'],
   '[{"src":"https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&auto=format&fit=crop","alt":"Villa"},{"src":"https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1600&auto=format&fit=crop","alt":"Coast"}]'::jsonb,
   false,'https://www.google.com/maps?q=Jefaira+Ras+El+Hekma&output=embed',2026)
on conflict (id) do update set slug=excluded.slug,name=excluded.name,type=excluded.type,status=excluded.status,location_id=excluded.location_id,developer_id=excluded.developer_id,bedrooms=excluded.bedrooms,bathrooms=excluded.bathrooms,area_sqm=excluded.area_sqm,floor_number=excluded.floor_number,price_egp=excluded.price_egp,description=excluded.description,amenities=excluded.amenities,images=excluded.images,featured=excluded.featured,map_url=excluded.map_url,delivery_year=excluded.delivery_year;

insert into properties (id, slug, name, type, status, location_id, developer_id, bedrooms, bathrooms, area_sqm, floor_number, price_egp, description, amenities, images, featured, map_url, delivery_year) values
  ('p-014','retail-ninety-five-east-cairo','Retail Unit — Ninety Five Avenue','Retail','Ready to Move','new-cairo','lmd',0,1,120,0,19500000,
   'Ground-floor retail on Ninety Five Avenue''s pedestrian strip — a high-footfall corner with full glass frontage.',
   ARRAY['High footfall','Glass frontage','Storage mezzanine','Kitchenette'],
   '[{"src":"https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop","alt":"Retail"},{"src":"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop","alt":"Strip"}]'::jsonb,
   false,'https://www.google.com/maps?q=Ninety+Five+Avenue+New+Cairo&output=embed',null)
on conflict (id) do update set slug=excluded.slug,name=excluded.name,type=excluded.type,status=excluded.status,location_id=excluded.location_id,developer_id=excluded.developer_id,bedrooms=excluded.bedrooms,bathrooms=excluded.bathrooms,area_sqm=excluded.area_sqm,floor_number=excluded.floor_number,price_egp=excluded.price_egp,description=excluded.description,amenities=excluded.amenities,images=excluded.images,featured=excluded.featured,map_url=excluded.map_url,delivery_year=excluded.delivery_year;


-- ────────────────────────────────────────────────────────────────────────────
-- News (6)
-- ────────────────────────────────────────────────────────────────────────────

insert into news (id, slug, title, excerpt, body, category, author, published_at, read_minutes, cover) values
  ('n-001','ras-el-hekma-rewrites-the-coast','Ras El Hekma Is Quietly Rewriting Egypt''s Coast',
   'A planned coastal city, sovereign-grade investment, and the largest reset of North Coast pricing in a decade — what it means for buyers today.',
   ARRAY[
     'Ras El Hekma has graduated from a strip of land on the western coast to a strategic project with the weight of the state behind it. The result is the most significant repricing of Mediterranean Egypt in living memory — and a new pace for every developer competing along the road.',
     'For buyers, the lesson is positioning. First-row product on the older central coast still trades at a premium, but the velocity has moved west. Off-plan launches in adjacent micro-markets are clearing in days rather than months, and the standard payment plan has compressed by two years.',
     'We expect the next 18 months to bring a wave of integrated launches — branded residences, year-round operating models, and a different class of master-planning. The fundamentals are unchanged: location, plot, and developer track record. The variables that move them are.'
   ],
   'Market Insights','Yasmine El Sharkawy','2026-04-12',5,'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop')
on conflict (id) do update set slug=excluded.slug,title=excluded.title,excerpt=excluded.excerpt,body=excluded.body,category=excluded.category,author=excluded.author,published_at=excluded.published_at,read_minutes=excluded.read_minutes,cover=excluded.cover;

insert into news (id, slug, title, excerpt, body, category, author, published_at, read_minutes, cover) values
  ('n-002','what-makes-a-great-new-cairo-compound','What Actually Makes a Great New Cairo Compound',
   'Past the brochure renders and the celebrity ribbon-cuttings, the test of a compound is everything you can''t photograph.',
   ARRAY[
     'Walk a compound at 8 a.m. on a Tuesday. Watch the school run, the security rotation, the speed bumps, the shaded benches. The buildings sell themselves; the operations don''t.',
     'We measure four things at handover: how the developer maintains common areas, how transparent the service-charge structure is, how live the resale market is, and how present senior management remains five years after the launch event.',
     'It''s an unglamorous list, and it''s precisely why it works. The compound that scores well across these four is the compound that holds value through the cycles that always come.'
   ],
   'Investment Tips','Karim Hosny','2026-03-28',4,'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1600&auto=format&fit=crop')
on conflict (id) do update set slug=excluded.slug,title=excluded.title,excerpt=excluded.excerpt,body=excluded.body,category=excluded.category,author=excluded.author,published_at=excluded.published_at,read_minutes=excluded.read_minutes,cover=excluded.cover;

insert into news (id, slug, title, excerpt, body, category, author, published_at, read_minutes, cover) values
  ('n-003','silver-sands-phase-three-launch','ORA''s Silver Sands Reveals Phase Three',
   'The lagoon-led masterplan opens its quietest cluster yet — fewer units, larger plots, and a different conversation with the coast.',
   ARRAY[
     'The third phase at Silver Sands is the project''s most restrained. Plot counts are down by a third on the launch phase, density is lower, and the lagoon footprint has been redrawn to read as a single sheet of water rather than a chain of pools.',
     'Pricing has stepped up accordingly. The first-row chalets are positioned against Hacienda''s resale comparables; second-row trades at a discount that reflects the phase''s earlier delivery date.',
     'Signature Estates clients on the priority list will receive launch unit options before public release. Speak to your advisor for first-look access and the latest payment-plan structure.'
   ],
   'Project Launches','Signature Estates Editorial','2026-04-22',3,'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1600&auto=format&fit=crop')
on conflict (id) do update set slug=excluded.slug,title=excluded.title,excerpt=excluded.excerpt,body=excluded.body,category=excluded.category,author=excluded.author,published_at=excluded.published_at,read_minutes=excluded.read_minutes,cover=excluded.cover;

insert into news (id, slug, title, excerpt, body, category, author, published_at, read_minutes, cover) values
  ('n-004','second-home-strategy-2026','A Second-Home Strategy for 2026',
   'The case for buying once, renting most weekends, and using your second home as a capital instrument rather than a liability.',
   ARRAY[
     'The most disciplined second-home buyers we work with treat the asset as a working balance-sheet item — not a sentimental purchase. The maths are not complicated; they''re just rarely done in advance.',
     'Three principles tend to define the buyers who get it right: a clear-eyed view of net rental yield (after furnishings, management fees, and seasonality), a decision framework about how many weekends per year are ''family use'', and a refinancing plan if the property appreciates faster than expected.',
     'We have a one-page worksheet we share with private clients before they shortlist. It changes the conversation immediately. If you''d like a copy, ask the team.'
   ],
   'Investment Tips','Mariam Saleh','2026-02-10',6,'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=1600&auto=format&fit=crop')
on conflict (id) do update set slug=excluded.slug,title=excluded.title,excerpt=excluded.excerpt,body=excluded.body,category=excluded.category,author=excluded.author,published_at=excluded.published_at,read_minutes=excluded.read_minutes,cover=excluded.cover;

insert into news (id, slug, title, excerpt, body, category, author, published_at, read_minutes, cover) values
  ('n-005','the-quiet-rise-of-el-gouna','The Quiet Rise of El Gouna',
   'Year-round operation, design-led architecture, and the most international community in Egypt — El Gouna is no longer a holiday town.',
   ARRAY[
     'El Gouna''s evolution from beach town to year-round community has been gradual enough that it''s easy to miss. Schools, healthcare, restaurants and a working creative scene have changed the resident-to-tourist ratio in the centre permanently.',
     'Resale liquidity has followed. A well-positioned three-bedroom in West Golf trades faster than equivalent stock on the North Coast, and the rental market has tightened across both seasonal and full-year contracts.',
     'For families with flexible work, El Gouna is one of the few Egyptian addresses where the rhythm of the year actually changes. That''s a different kind of value, and it''s reflected in the pricing.'
   ],
   'Lifestyle','Hana Refaat','2026-01-30',4,'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600&auto=format&fit=crop')
on conflict (id) do update set slug=excluded.slug,title=excluded.title,excerpt=excluded.excerpt,body=excluded.body,category=excluded.category,author=excluded.author,published_at=excluded.published_at,read_minutes=excluded.read_minutes,cover=excluded.cover;

insert into news (id, slug, title, excerpt, body, category, author, published_at, read_minutes, cover) values
  ('n-006','office-market-pivot-new-capital','The New Capital''s Office Market Has Quietly Pivoted',
   'Government anchoring is doing what every CBD launch since the millennium has tried to do — actually move occupiers out of the city.',
   ARRAY[
     'The story of the New Capital''s office market in 2025 was supply. The story of 2026 is occupancy. Anchor leases by ministries and state-adjacent occupiers have triggered a chain of corporate moves we did not see at this pace last year.',
     'The result is a yield gap that''s worth understanding. Grade-A floors on the CBD spine still carry a discount to Cairo''s central business addresses, but the trend line on rents is the inverse of what the headlines suggest.',
     'Investors looking at full floors should be focused on the lift core, the floorplate efficiency, and the operator on the ground. The towers that hit those three reliably are pulling away from the rest of the market.'
   ],
   'Market Insights','Tarek Abdelaziz','2026-04-05',5,'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&auto=format&fit=crop')
on conflict (id) do update set slug=excluded.slug,title=excluded.title,excerpt=excluded.excerpt,body=excluded.body,category=excluded.category,author=excluded.author,published_at=excluded.published_at,read_minutes=excluded.read_minutes,cover=excluded.cover;

commit;
