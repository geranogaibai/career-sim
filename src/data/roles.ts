import type { Role } from "@/lib/graph/types";

// DRAFT seed roles — to be replaced/extended with the reference career paths.
export const roles: Role[] = [
  {
    id: "performance_marketer",
    title: { en: "Performance Marketer", ru: "Performance-маркетолог" },
    family: "marketing",
    skills: [
      { skill: "paid_ads", weight: "core" },
      { skill: "marketing_analytics", weight: "core" },
      { skill: "ab_testing", weight: "core" },
      { skill: "copywriting", weight: "supporting" },
      { skill: "dashboards", weight: "supporting" },
      { skill: "stakeholder_mgmt", weight: "supporting" },
    ],
  },
  {
    id: "marketing_specialist",
    title: { en: "Marketing Specialist", ru: "Маркетолог" },
    family: "marketing",
    skills: [
      { skill: "content_strategy", weight: "core" },
      { skill: "copywriting", weight: "core" },
      { skill: "marketing_analytics", weight: "supporting" },
      { skill: "paid_ads", weight: "supporting" },
      { skill: "stakeholder_mgmt", weight: "supporting" },
      { skill: "user_research", weight: "supporting" },
    ],
  },
  {
    id: "product_analyst",
    title: { en: "Product Analyst", ru: "Продуктовый аналитик" },
    family: "data",
    skills: [
      { skill: "sql", weight: "core" },
      { skill: "product_metrics", weight: "core" },
      { skill: "ab_testing", weight: "core" },
      { skill: "statistics", weight: "core" },
      { skill: "dashboards", weight: "supporting" },
      { skill: "python_data", weight: "supporting" },
      { skill: "stakeholder_mgmt", weight: "supporting" },
    ],
  },
  {
    id: "product_manager",
    title: { en: "Product Manager", ru: "Продакт-менеджер" },
    family: "product",
    skills: [
      { skill: "roadmapping", weight: "core" },
      { skill: "stakeholder_mgmt", weight: "core" },
      { skill: "user_research", weight: "core" },
      { skill: "product_metrics", weight: "core" },
      { skill: "ab_testing", weight: "supporting" },
      { skill: "sql", weight: "supporting" },
    ],
  },
  {
    id: "customer_success_manager",
    title: { en: "Customer Success Manager", ru: "Менеджер по успеху клиентов" },
    family: "customer",
    skills: [
      { skill: "customer_comms", weight: "core" },
      { skill: "account_mgmt", weight: "core" },
      { skill: "stakeholder_mgmt", weight: "core" },
      { skill: "dashboards", weight: "supporting" },
      { skill: "user_research", weight: "supporting" },
    ],
  },
  {
    id: "cx_researcher",
    title: { en: "CX Researcher", ru: "CX-исследователь" },
    family: "research",
    skills: [
      { skill: "user_research", weight: "core" },
      { skill: "research_synthesis", weight: "core" },
      { skill: "survey_design", weight: "core" },
      { skill: "customer_comms", weight: "supporting" },
      { skill: "statistics", weight: "supporting" },
    ],
  },
  {
    id: "ugc_creator",
    title: { en: "UGC Creator", ru: "UGC-креатор" },
    family: "creator",
    emerging: true,
    skills: [
      { skill: "video_production", weight: "core" },
      { skill: "copywriting", weight: "core" },
      { skill: "audience_building", weight: "core" },
      { skill: "content_strategy", weight: "supporting" },
      { skill: "marketing_analytics", weight: "supporting" },
      { skill: "small_business", weight: "supporting" },
    ],
  },
  {
    id: "ai_automation_specialist",
    title: { en: "AI Automation Specialist", ru: "Специалист по AI-автоматизации" },
    family: "ai",
    emerging: true,
    skills: [
      { skill: "workflow_automation", weight: "core" },
      { skill: "ai_tools", weight: "core" },
      { skill: "stakeholder_mgmt", weight: "supporting" },
      { skill: "python_data", weight: "supporting" },
      { skill: "dashboards", weight: "supporting" },
    ],
  },
  {
    id: "electrician",
    title: { en: "Electrician", ru: "Электрик" },
    family: "trades",
    licensing: { typicalMonths: 36 },
    skills: [
      { skill: "electrical_systems", weight: "core" },
      { skill: "safety_codes", weight: "core" },
      { skill: "hands_on_troubleshooting", weight: "core" },
      { skill: "customer_comms", weight: "supporting" },
      { skill: "small_business", weight: "supporting" },
    ],
  },
  {
    id: "plumber",
    title: { en: "Plumber", ru: "Сантехник" },
    family: "trades",
    licensing: { typicalMonths: 36 },
    skills: [
      { skill: "plumbing_systems", weight: "core" },
      { skill: "safety_codes", weight: "core" },
      { skill: "hands_on_troubleshooting", weight: "core" },
      { skill: "customer_comms", weight: "supporting" },
      { skill: "small_business", weight: "supporting" },
    ],
  },
];

export const roleById = new Map(roles.map((r) => [r.id, r]));
