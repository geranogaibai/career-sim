import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { familyOrder, roleById, roles } from "@/data/roles";
import { hasLocale, type Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { transitionsFrom } from "@/lib/graph/transitions";
import type { Transition } from "@/lib/graph/types";

type T = Dictionary["explore"];
const TOP_N = 8;

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
  t: T;
  searchParams: PageProps<"/[lang]/explore">["searchParams"];
}) {
  const { from } = await searchParams;
  const fromId = typeof from === "string" && roleById.has(from) ? from : roles[0].id;
  const transitions = transitionsFrom(fromId);
  const top = transitions.slice(0, TOP_N);
  const rest = transitions.slice(TOP_N);

  return (
    <>
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-muted">{t.from}</h2>
        {familyOrder.map((family) => {
          const inFamily = roles.filter((r) => r.family === family);
          if (inFamily.length === 0) return null;
          return (
            <div key={family} className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-3">
              <span className="w-44 shrink-0 text-xs uppercase tracking-wide text-muted">
                {t.families[family]}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {inFamily.map((r) => (
                  <Link
                    key={r.id}
                    href={`/${lang}/explore?from=${r.id}`}
                    className={`rounded-full border px-3 py-1 text-sm ${
                      r.id === fromId
                        ? "border-accent bg-accent text-white"
                        : "border-border hover:border-accent"
                    }`}
                  >
                    {r.title[lang]}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">{t.topMatches}</h2>
        <TransitionGrid items={top} lang={lang} t={t} />
        {rest.length > 0 && (
          <details className="group">
            <summary className="cursor-pointer text-sm text-accent">
              {t.showAll.replace("{n}", String(transitions.length))}
            </summary>
            <div className="mt-4">
              <TransitionGrid items={rest} lang={lang} t={t} />
            </div>
          </details>
        )}
      </section>
    </>
  );
}

function TransitionGrid({ items, lang, t }: { items: Transition[]; lang: Locale; t: T }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {items.map((tr) => (
        <TransitionCard key={tr.to} tr={tr} lang={lang} t={t} />
      ))}
    </ul>
  );
}

function TransitionCard({ tr, lang, t }: { tr: Transition; lang: Locale; t: T }) {
  const role = roleById.get(tr.to)!;
  const pct = Math.round(tr.overlap * 100);
  return (
    <li className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-medium">{role.title[lang]}</h3>
        <div className="flex shrink-0 gap-1.5 text-xs">
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
          <span className="font-medium">
            ~{tr.estimatedMonths} {t.months}
          </span>{" "}
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
      {role.roadmapSlug && (
        <a
          href={`https://roadmap.sh/${role.roadmapSlug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto text-sm text-accent hover:underline"
        >
          {t.roadmapLink} ↗
        </a>
      )}
    </li>
  );
}
