import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllArticles, getArticle } from "@/data/news";
import { Reveal } from "@/components/Reveal";
import { NewsletterStrip } from "@/components/NewsletterStrip";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: `/news/${slug}` },
    openGraph: {
      title: a.title,
      description: a.excerpt,
      type: "article",
      publishedTime: a.publishedAt,
      authors: [a.author],
      images: [{ url: a.cover, width: 1200, height: 800 }],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const allArticles = await getAllArticles();
  const more = allArticles.filter((n) => n.slug !== slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="pt-32 lg:pt-40 pb-12">
          <div className="mx-auto max-w-3xl px-6">
            <Reveal>
              <Link href="/news" className="font-accent text-[10px] tracking-[0.22em] text-[var(--color-gray)] inline-flex items-center gap-2 hover:text-black">
                <ArrowLeft size={12} /> Editorial
              </Link>
              <p className="mt-8 font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold-dark)]">
                {article.category}
              </p>
              <h1 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl text-balance leading-[1.02]">
                {article.title}
              </h1>
              <div className="mt-7 flex flex-wrap items-center gap-3 font-accent text-[10px] tracking-[0.22em] text-[var(--color-gray)]">
                <span>By {article.author}</span>
                <span className="opacity-30">·</span>
                <span>{new Date(article.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                <span className="opacity-30">·</span>
                <span>{article.readMinutes} min read</span>
              </div>
            </Reveal>
          </div>
        </header>

        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden grain">
              <Image src={article.cover} alt={article.title} fill priority sizes="100vw" className="object-cover" />
            </div>
          </Reveal>
        </div>

        <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
          <Reveal>
            <p className="font-display text-2xl lg:text-3xl text-balance leading-snug text-black/80">
              {article.excerpt}
            </p>
          </Reveal>
          <div className="gold-rule my-12" />
          {article.body.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-base lg:text-lg leading-[1.85] text-black/80 mb-6 text-pretty">{p}</p>
            </Reveal>
          ))}
        </div>
      </article>

      <section className="py-20 lg:py-28 bg-[var(--color-cream-dark)]">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <h2 className="font-display text-3xl lg:text-5xl mb-12">Continue reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {more.map((a) => (
              <Link key={a.id} href={`/news/${a.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden mb-5">
                  <Image src={a.cover} alt={a.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <span className="font-accent text-[10px] tracking-[0.22em] text-[var(--color-gold-dark)]">{a.category}</span>
                <h3 className="mt-2 font-display text-2xl text-balance gold-underline inline">{a.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NewsletterStrip />
    </>
  );
}
