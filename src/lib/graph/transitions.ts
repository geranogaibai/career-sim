import { skillById } from "@/data/skills";
import { roleById, roles } from "@/data/roles";
import type { Role, RoleId, Transition } from "./types";

const WEIGHT = { core: 1, supporting: 0.5 } as const;

/**
 * Computes how well a starting role's skills transfer to a target role.
 * Draft heuristic: weighted skill overlap, and reskilling time as the sum of
 * missing skills' learning months (supporting skills count half). Regulated
 * roles can't be faster than their licensing period.
 */
export function computeTransition(from: Role, to: Role): Transition {
  const have = new Set(from.skills.map((s) => s.skill));
  let total = 0;
  let covered = 0;
  let months = 0;
  const gaps: Transition["gaps"] = [];

  for (const { skill: id, weight } of to.skills) {
    const w = WEIGHT[weight];
    total += w;
    if (have.has(id)) {
      covered += w;
      continue;
    }
    const skill = skillById.get(id);
    if (!skill) throw new Error(`Role "${to.id}" references unknown skill "${id}"`);
    gaps.push({ skill, weight });
    months += skill.learnMonths * w;
  }

  if (to.licensing) months = Math.max(months, to.licensing.typicalMonths);

  return {
    from: from.id,
    to: to.id,
    overlap: total ? covered / total : 0,
    gaps: gaps.sort((a, b) => WEIGHT[b.weight] - WEIGHT[a.weight]),
    estimatedMonths: Math.round(months),
  };
}

/** All transitions out of a role, best skill overlap first. */
export function transitionsFrom(fromId: RoleId): Transition[] {
  const from = roleById.get(fromId);
  if (!from) return [];
  return roles
    .filter((r) => r.id !== fromId)
    .map((to) => computeTransition(from, to))
    .sort((a, b) => b.overlap - a.overlap || a.estimatedMonths - b.estimatedMonths);
}
