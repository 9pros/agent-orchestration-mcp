/**
 * Represents a specialized agent with its metadata and capabilities
 */
export interface Agent {
  name: string;
  description: string;
  tools: string[];
  category: string;
  systemPrompt: string;
  filePath: string;
}

/**
 * Categories of specialized agents
 */
export enum AgentCategory {
  CORE_DEVELOPMENT = "01-core-development",
  LANGUAGE_SPECIALISTS = "02-language-specialists",
  INFRASTRUCTURE = "03-infrastructure",
  QUALITY_SECURITY = "04-quality-security",
  DATA_AI = "05-data-ai",
  DEVELOPER_EXPERIENCE = "06-developer-experience",
  SPECIALIZED_DOMAINS = "07-specialized-domains",
  BUSINESS_PRODUCT = "08-business-product",
  META_ORCHESTRATION = "09-meta-orchestration",
  RESEARCH_ANALYSIS = "10-research-analysis",
}

/**
 * Task assignment to an agent
 */
export interface TaskAssignment {
  taskId: string;
  agentName: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in_progress" | "completed" | "failed";
  result?: string;
}

/**
 * Workflow definition for multi-agent orchestration
 */
export interface Workflow {
  id: string;
  name: string;
  description: string;
  tasks: TaskAssignment[];
  dependencies: Record<string, string[]>; // taskId -> dependent taskIds
}
