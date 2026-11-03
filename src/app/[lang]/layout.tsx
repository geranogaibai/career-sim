import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.meta.title, description: dict.meta.description };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const other = lang === "en" ? "ru" : "en";

  return (
    <html lang={lang} className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <header className="border-b border-border">
          <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-4 text-sm">
            <Link href={`/${lang}`} className="font-semibold">
              {dict.meta.title}
            </Link>
            <Link href={`/${lang}/explore`} className="text-muted hover:text-foreground">
              {dict.nav.explore}
            </Link>
            <Link href={`/${other}`} className="ml-auto text-muted hover:text-foreground">
              {dict.nav.switchLang}
            </Link>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
