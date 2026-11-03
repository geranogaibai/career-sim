import type { Skill } from "@/lib/graph/types";

// DRAFT seed data — learnMonths are rough placeholders to be reviewed.
export const skills: Skill[] = [
  { id: "paid_ads", name: { en: "Paid acquisition", ru: "Платный трафик" }, learnMonths: 4 },
  { id: "marketing_analytics", name: { en: "Marketing analytics & attribution", ru: "Маркетинговая аналитика и атрибуция" }, learnMonths: 3 },
  { id: "ab_testing", name: { en: "A/B testing & experimentation", ru: "A/B-тесты и эксперименты" }, learnMonths: 3 },
  { id: "sql", name: { en: "SQL", ru: "SQL" }, learnMonths: 3 },
  { id: "python_data", name: { en: "Python for data analysis", ru: "Python для анализа данных" }, learnMonths: 5 },
  { id: "statistics", name: { en: "Statistics", ru: "Статистика" }, learnMonths: 4 },
  { id: "product_metrics", name: { en: "Product metrics (retention, funnels, LTV)", ru: "Продуктовые метрики (удержание, воронки, LTV)" }, learnMonths: 2 },
  { id: "dashboards", name: { en: "Dashboards & BI", ru: "Дашборды и BI" }, learnMonths: 2 },
  { id: "copywriting", name: { en: "Copywriting", ru: "Копирайтинг" }, learnMonths: 3 },
  { id: "content_strategy", name: { en: "Content strategy", ru: "Контент-стратегия" }, learnMonths: 3 },
  { id: "video_production", name: { en: "Short-form video production", ru: "Производство коротких видео" }, learnMonths: 4 },
  { id: "audience_building", name: { en: "Audience building", ru: "Построение аудитории" }, learnMonths: 6 },
  { id: "stakeholder_mgmt", name: { en: "Stakeholder management", ru: "Работа со стейкхолдерами" }, learnMonths: 6 },
  { id: "roadmapping", name: { en: "Roadmapping & prioritisation", ru: "Роадмап и приоритизация" }, learnMonths: 4 },
  { id: "user_research", name: { en: "User research & interviews", ru: "Пользовательские исследования и интервью" }, learnMonths: 4 },
  { id: "customer_comms", name: { en: "Customer communication", ru: "Коммуникация с клиентами" }, learnMonths: 3 },
  { id: "account_mgmt", name: { en: "Account management & retention", ru: "Управление аккаунтами и удержание" }, learnMonths: 4 },
  { id: "research_synthesis", name: { en: "Research synthesis", ru: "Синтез результатов исследований" }, learnMonths: 3 },
  { id: "survey_design", name: { en: "Survey design", ru: "Дизайн опросов" }, learnMonths: 2 },
  { id: "ai_tools", name: { en: "Prompting & AI tools", ru: "Промптинг и AI-инструменты" }, learnMonths: 2 },
  { id: "workflow_automation", name: { en: "Workflow automation (no-code)", ru: "Автоматизация процессов (no-code)" }, learnMonths: 3 },
  { id: "electrical_systems", name: { en: "Electrical installation & wiring", ru: "Электромонтаж и проводка" }, learnMonths: 18 },
  { id: "plumbing_systems", name: { en: "Plumbing installation", ru: "Монтаж сантехники" }, learnMonths: 18 },
  { id: "safety_codes", name: { en: "Safety codes & regulations", ru: "Нормы и правила безопасности" }, learnMonths: 6 },
  { id: "hands_on_troubleshooting", name: { en: "Hands-on troubleshooting", ru: "Практическая диагностика неисправностей" }, learnMonths: 6 },
  { id: "small_business", name: { en: "Running a small business", ru: "Ведение малого бизнеса" }, learnMonths: 6 },
];

export const skillById = new Map(skills.map((s) => [s.id, s]));
