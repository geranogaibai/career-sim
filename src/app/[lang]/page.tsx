import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = (await getDictionary(lang)).home;

  return (
    <div className="flex flex-col gap-14">
      <section className="flex max-w-3xl flex-col gap-5 pt-6">
        <p className="text-sm font-medium uppercase tracking-wide text-accent">{t.eyebrow}</p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{t.title}</h1>
        <p className="text-lg text-muted">{t.subtitle}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href={`/${lang}/explore`}
            className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-white hover:opacity-90"
          >
            {t.ctaExplore}
          </Link>
          <span className="rounded-full border border-border px-5 py-3 text-sm text-muted">
            {t.ctaUpload} · {t.comingSoon}
          </span>
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-3">
        {t.pillars.map((p) => (
          <div key={p.title} className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-medium">{p.title}</h2>
            <p className="mt-2 text-sm text-muted">{p.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
