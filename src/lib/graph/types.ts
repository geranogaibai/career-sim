import type { Locale } from "@/i18n/config";

/** Any user-facing text, always provided in every supported language. */
export type LocalizedText = Record<Locale, string>;

export type SkillId = string;
export type RoleId = string;

export interface Skill {
  id: SkillId;
  name: LocalizedText;
  /** Rough months to reach working proficiency from zero, studying part-time. Draft estimate. */
  learnMonths: number;
}

export type RoleFamily =
  | "marketing"
  | "product"
  | "data"
  | "customer"
  | "research"
  | "creator"
  | "ai"
  | "engineering"
  | "design"
  | "security"
  | "trades";

export interface RoleSkill {
  skill: SkillId;
  /** Core skills define the role; supporting skills are nice to have. */
  weight: "core" | "supporting";
}

export interface Role {
  id: RoleId;
  title: LocalizedText;
  family: RoleFamily;
  skills: RoleSkill[];
  /** New professions (AI, creator economy…) that lack long historical career data. */
  emerging?: boolean;
  /**
   * Regulated work that needs a licence/apprenticeship. Credentials usually don't
   * transfer across countries, which matters for relocation paths.
   */
  licensing?: { typicalMonths: number };
  /** Slug of the matching learning roadmap on roadmap.sh, linked from the app (content is not copied). */
  roadmapSlug?: string;
  /** Typical next roles on the linear ladder (reference paths go here). */
  nextRoles?: RoleId[];
}

/** Country profile used by the relocation layer. Values must carry a source. */
export interface CountryProfile {
  code: string; // ISO 3166-1 alpha-2
  name: LocalizedText;
  /** Salary multiplier relative to a reference market; null until sourced. */
  salaryIndex: number | null;
  workVisaDifficulty: "low" | "medium" | "high" | null;
  mainLanguages: string[];
  source?: string;
}

export interface Transition {
  from: RoleId;
  to: RoleId;
  /** 0–1: share of the target role's weighted skill set the starting role already covers. */
  overlap: number;
  gaps: { skill: Skill; weight: RoleSkill["weight"] }[];
  /** Rough months to reskill, including licensing for regulated roles. */
  estimatedMonths: number;
}
