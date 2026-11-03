import type { Role, RoleFamily, SkillId } from "@/lib/graph/types";

/**
 * DRAFT seed roles. Skill profiles are drafted from general knowledge and are
 * placeholders until reviewed against the reference career paths. Role names
 * for the engineering, data and AI families follow the role list on
 * roadmap.sh; only links to roadmap.sh are used, no content is copied.
 */
function role(
  id: string,
  title: Role["title"],
  family: RoleFamily,
  core: SkillId[],
  supporting: SkillId[],
  extra: Partial<Pick<Role, "emerging" | "licensing" | "roadmapSlug" | "nextRoles">> = {},
): Role {
  return {
    id,
    title,
    family,
    skills: [
      ...core.map((skill) => ({ skill, weight: "core" as const })),
      ...supporting.map((skill) => ({ skill, weight: "supporting" as const })),
    ],
    ...extra,
  };
}

export const roles: Role[] = [
  // Marketing and growth
  role("performance_marketer", { en: "Performance Marketer", ru: "Performance-маркетолог" }, "marketing",
    ["paid_ads", "marketing_analytics", "ab_testing"], ["copywriting", "dashboards", "stakeholder_mgmt", "spreadsheets"]),
  role("marketing_specialist", { en: "Marketing Specialist", ru: "Маркетолог" }, "marketing",
    ["content_strategy", "copywriting"], ["marketing_analytics", "paid_ads", "stakeholder_mgmt", "user_research"]),

  // Product
  role("product_manager", { en: "Product Manager", ru: "Продакт-менеджер" }, "product",
    ["roadmapping", "stakeholder_mgmt", "user_research", "product_metrics"], ["ab_testing", "sql"],
    { roadmapSlug: "product-manager" }),

  // Customer and research
  role("customer_success_manager", { en: "Customer Success Manager", ru: "Менеджер по успеху клиентов" }, "customer",
    ["customer_comms", "account_mgmt", "stakeholder_mgmt"], ["dashboards", "user_research"]),
  role("cx_researcher", { en: "CX Researcher", ru: "CX-исследователь" }, "research",
    ["user_research", "research_synthesis", "survey_design"], ["customer_comms", "statistics"]),

  // Data
  role("product_analyst", { en: "Product Analyst", ru: "Продуктовый аналитик" }, "data",
    ["sql", "product_metrics", "ab_testing", "statistics"], ["dashboards", "python_data", "stakeholder_mgmt"]),
  role("data_analyst", { en: "Data Analyst", ru: "Аналитик данных" }, "data",
    ["sql", "spreadsheets", "dashboards", "statistics"], ["python_data", "stakeholder_mgmt"],
    { roadmapSlug: "data-analyst" }),
  role("bi_analyst", { en: "BI Analyst", ru: "BI-аналитик" }, "data",
    ["sql", "dashboards", "spreadsheets", "stakeholder_mgmt"], ["databases", "data_pipelines"],
    { roadmapSlug: "bi-analyst" }),
  role("data_engineer", { en: "Data Engineer", ru: "Дата-инженер" }, "data",
    ["sql", "data_pipelines", "databases", "programming_language"], ["cloud", "containers", "linux"],
    { roadmapSlug: "data-engineer" }),
  role("data_scientist", { en: "Data Scientist", ru: "Data Scientist" }, "data",
    ["statistics", "ml_fundamentals", "python_data", "sql"], ["ab_testing", "dashboards", "stakeholder_mgmt"],
    { roadmapSlug: "ai-data-scientist" }),

  // AI and machine learning
  role("ai_automation_specialist", { en: "AI Automation Specialist", ru: "Специалист по AI-автоматизации" }, "ai",
    ["workflow_automation", "ai_tools"], ["stakeholder_mgmt", "python_data", "dashboards"], { emerging: true }),
  role("ai_engineer", { en: "AI Engineer", ru: "AI-инженер" }, "ai",
    ["llm_apps", "programming_language", "apis"], ["ml_fundamentals", "cloud", "ai_tools"],
    { emerging: true, roadmapSlug: "ai-engineer" }),
  role("ml_engineer", { en: "Machine Learning Engineer", ru: "ML-инженер" }, "ai",
    ["ml_fundamentals", "deep_learning", "python_data", "programming_language"], ["mlops_tooling", "cloud"],
    { roadmapSlug: "machine-learning" }),
  role("mlops_engineer", { en: "MLOps Engineer", ru: "MLOps-инженер" }, "ai",
    ["mlops_tooling", "containers", "ci_cd", "cloud"], ["ml_fundamentals", "python_data", "infra_as_code"],
    { roadmapSlug: "mlops" }),
  role("ai_product_builder", { en: "AI Product Builder", ru: "Создатель AI-продуктов" }, "ai",
    ["llm_apps", "ai_tools", "roadmapping", "user_research"], ["javascript", "product_metrics"],
    { emerging: true, roadmapSlug: "ai-product-builder" }),
  role("forward_deployed_engineer", { en: "Forward Deployed Engineer", ru: "Forward Deployed-инженер" }, "ai",
    ["programming_language", "llm_apps", "customer_comms", "apis"], ["stakeholder_mgmt", "cloud", "data_pipelines"],
    { emerging: true, roadmapSlug: "forward-deployed-engineer" }),
  role("ai_red_teamer", { en: "AI Red Teamer", ru: "Специалист по AI red teaming" }, "ai",
    ["llm_apps", "threat_analysis", "security_fundamentals"], ["ai_tools", "technical_writing", "python_data"],
    { emerging: true, roadmapSlug: "ai-red-teaming" }),

  // Software engineering
  role("frontend_developer", { en: "Frontend Developer", ru: "Фронтенд-разработчик" }, "engineering",
    ["html_css", "javascript", "frontend_frameworks"], ["git", "testing", "apis"],
    { roadmapSlug: "frontend" }),
  role("backend_developer", { en: "Backend Developer", ru: "Бэкенд-разработчик" }, "engineering",
    ["programming_language", "apis", "databases"], ["sql", "git", "testing", "linux", "containers"],
    { roadmapSlug: "backend" }),
  role("fullstack_developer", { en: "Full-Stack Developer", ru: "Фулстек-разработчик" }, "engineering",
    ["javascript", "frontend_frameworks", "programming_language", "apis", "databases"], ["html_css", "git", "cloud"],
    { roadmapSlug: "full-stack" }),
  role("android_developer", { en: "Android Developer", ru: "Android-разработчик" }, "engineering",
    ["mobile_android", "apis", "git"], ["testing", "ci_cd"], { roadmapSlug: "android" }),
  role("ios_developer", { en: "iOS Developer", ru: "iOS-разработчик" }, "engineering",
    ["mobile_ios", "apis", "git"], ["testing", "ci_cd"], { roadmapSlug: "ios" }),
  role("game_developer", { en: "Game Developer", ru: "Разработчик игр" }, "engineering",
    ["game_engines", "programming_language"], ["visual_design", "git", "testing"],
    { roadmapSlug: "game-developer" }),
  role("blockchain_developer", { en: "Blockchain Developer", ru: "Блокчейн-разработчик" }, "engineering",
    ["smart_contracts", "programming_language", "security_fundamentals"], ["javascript", "apis"],
    { roadmapSlug: "blockchain" }),
  role("qa_engineer", { en: "QA Engineer", ru: "QA-инженер" }, "engineering",
    ["testing", "apis"], ["javascript", "sql", "ci_cd", "git"], { roadmapSlug: "qa" }),
  role("devops_engineer", { en: "DevOps Engineer", ru: "DevOps-инженер" }, "engineering",
    ["linux", "cloud", "containers", "ci_cd", "infra_as_code"], ["networking", "programming_language", "security_fundamentals"],
    { roadmapSlug: "devops" }),
  role("software_architect", { en: "Software Architect", ru: "Архитектор ПО" }, "engineering",
    ["system_design", "cloud", "apis", "stakeholder_mgmt"], ["databases", "security_fundamentals", "programming_language"],
    { roadmapSlug: "software-architect" }),
  role("engineering_manager", { en: "Engineering Manager", ru: "Руководитель разработки" }, "engineering",
    ["people_mgmt", "stakeholder_mgmt", "system_design", "roadmapping"], ["programming_language"],
    { roadmapSlug: "engineering-manager" }),
  role("devrel_engineer", { en: "Developer Relations (DevRel)", ru: "Developer Relations (DevRel)" }, "engineering",
    ["public_speaking", "technical_writing", "programming_language"], ["customer_comms", "content_strategy", "apis"],
    { roadmapSlug: "devrel" }),
  role("technical_writer", { en: "Technical Writer", ru: "Технический писатель" }, "engineering",
    ["technical_writing", "apis"], ["git", "stakeholder_mgmt", "html_css"], { roadmapSlug: "technical-writer" }),

  // Security and infrastructure
  role("security_analyst", { en: "Cyber Security Analyst", ru: "Аналитик по кибербезопасности" }, "security",
    ["security_fundamentals", "threat_analysis", "networking"], ["linux", "technical_writing"],
    { roadmapSlug: "cyber-security" }),
  role("devsecops_engineer", { en: "DevSecOps Engineer", ru: "DevSecOps-инженер" }, "security",
    ["security_fundamentals", "ci_cd", "cloud", "containers"], ["threat_analysis", "infra_as_code", "linux"],
    { roadmapSlug: "devsecops" }),
  role("network_engineer", { en: "Network Engineer", ru: "Сетевой инженер" }, "security",
    ["networking", "linux", "security_fundamentals"], ["cloud", "infra_as_code"], { roadmapSlug: "network-engineer" }),

  // Design
  role("ux_designer", { en: "UX Designer", ru: "UX-дизайнер" }, "design",
    ["user_research", "interaction_design", "research_synthesis"], ["visual_design", "stakeholder_mgmt"],
    { roadmapSlug: "ux-design" }),
  role("product_designer", { en: "Product Designer", ru: "Продуктовый дизайнер" }, "design",
    ["interaction_design", "visual_design", "user_research"], ["product_metrics", "stakeholder_mgmt", "html_css"],
    { roadmapSlug: "product-design" }),

  // Creator economy
  role("ugc_creator", { en: "UGC Creator", ru: "UGC-креатор" }, "creator",
    ["video_production", "copywriting", "audience_building"], ["content_strategy", "marketing_analytics", "small_business"],
    { emerging: true }),

  // Trades
  role("electrician", { en: "Electrician", ru: "Электрик" }, "trades",
    ["electrical_systems", "safety_codes", "hands_on_troubleshooting"], ["customer_comms", "small_business"],
    { licensing: { typicalMonths: 36 } }),
  role("plumber", { en: "Plumber", ru: "Сантехник" }, "trades",
    ["plumbing_systems", "safety_codes", "hands_on_troubleshooting"], ["customer_comms", "small_business"],
    { licensing: { typicalMonths: 36 } }),
];

export const roleById = new Map(roles.map((r) => [r.id, r]));

export const familyOrder: RoleFamily[] = [
  "marketing", "product", "customer", "research", "data", "ai",
  "engineering", "security", "design", "creator", "trades",
];
