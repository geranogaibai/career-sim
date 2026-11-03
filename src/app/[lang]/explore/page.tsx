import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { roleById, roles } from "@/data/roles";
import { hasLocale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { transitionsFrom } from "@/lib/graph/transitions";

export default async function Explore({ params, searchParams }: PageProps<"/[lang]/explore">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = (await getDictionary(lang)).explore;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex max-w-3xl flex-col gap-3">
        <h1 className="text-3xl font-semibold">{t.title}</h1>
        <p className="text-muted">{t.intro}</p>
        <p className="rounded-lg bg-accent-soft px-3 py-2 text-sm">{t.draftNote}</p>
      </header>
      <Suspense>
        <Transitions lang={lang} t={t} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Transitions({
  lang,
  t,
  searchParams,
}: {
  lang: Locale;
  t: Dictionary["explore"];
  searchParams: PageProps<"/[lang]/explore">["searchParams"];
}) {
  const { from } = await searchParams;
  const fromId = typeof from === "string" && roleById.has(from) ? from : roles[0].id;
  const transitions = transitionsFrom(fromId);

  return (
    <>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted">{t.from}</h2>
        <div className="flex flex-wrap gap-2">
          {roles.map((r) => (
            <Link
              key={r.id}
              href={`/${lang}/explore?from=${r.id}`}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                r.id === fromId
                  ? "border-accent bg-accent text-white"
                  : "border-border hover:border-accent"
              }`}
            >
              {r.title[lang]}
            </Link>
          ))}
        </div>
      </section>

      <ul className="grid gap-4 md:grid-cols-2">
        {transitions.map((tr) => {
          const role = roleById.get(tr.to)!;
          const pct = Math.round(tr.overlap * 100);
          return (
            <li key={tr.to} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-medium">{role.title[lang]}</h3>
                <div className="flex gap-1.5 text-xs">
                  {role.emerging && <span className="rounded-full bg-accent-soft px-2 py-0.5">{t.emerging}</span>}
                  {role.family === "trades" && <span className="rounded-full bg-accent-soft px-2 py-0.5">{t.trade}</span>}
                </div>
              </div>
              <div>
                <div className="h-2 overflow-hidden rounded-full bg-border">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-1.5 text-sm">
                  <span className="font-medium">{pct}%</span> <span className="text-muted">{t.overlap}</span>
                  {" · "}
                  <span className="font-medium">~{tr.estimatedMonths} {t.months}</span>{" "}
                  <span className="text-muted">{t.reskill}</span>
                </p>
                {role.licensing && <p className="mt-1 text-xs text-muted">{t.licensed}</p>}
              </div>
              <div className="text-sm">
                {tr.gaps.length === 0 ? (
                  <p className="text-muted">{t.noGaps}</p>
                ) : (
                  <>
                    <p className="mb-1.5 text-muted">{t.gaps}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tr.gaps.map((g) => (
                        <span
                          key={g.skill.id}
                          className={`rounded-md border px-2 py-0.5 text-xs ${
                            g.weight === "core" ? "border-foreground/30" : "border-border text-muted"
                          }`}
                        >
                          {g.skill.name[lang]}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
