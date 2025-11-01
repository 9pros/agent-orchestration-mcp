import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { Agent, AgentCategory } from "./types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * AgentRegistry manages all specialized agents
 */
export class AgentRegistry {
  private agents: Map<string, Agent> = new Map();
  private agentsByCategory: Map<string, Agent[]> = new Map();

  constructor() {
    this.loadAgents();
  }

  /**
   * Load all agents from the agents directory
   */
  private loadAgents(): void {
    const agentsDir = join(__dirname, "..", "agents");
    
    // Initialize category maps
    for (const category of Object.values(AgentCategory)) {
      this.agentsByCategory.set(category, []);
    }

    // Read all category directories
    const categories = readdirSync(agentsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const category of categories) {
      const categoryPath = join(agentsDir, category);
      const files = readdirSync(categoryPath)
        .filter(file => file.endsWith(".md"));

      for (const file of files) {
        const filePath = join(categoryPath, file);
        const agent = this.parseAgentFile(filePath, category);
        if (agent) {
          this.agents.set(agent.name, agent);
          const categoryAgents = this.agentsByCategory.get(category) || [];
          categoryAgents.push(agent);
          this.agentsByCategory.set(category, categoryAgents);
        }
      }
    }
  }

  /**
   * Parse an agent markdown file
   */
  private parseAgentFile(filePath: string, category: string): Agent | null {
    try {
      const content = readFileSync(filePath, "utf-8");
      
      // Extract frontmatter
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) {
        return null;
      }

      const frontmatter = frontmatterMatch[1];
      const systemPrompt = content.substring(frontmatterMatch[0].length).trim();

      // Parse frontmatter fields
      const nameMatch = frontmatter.match(/name:\s*(.+)/);
      const descriptionMatch = frontmatter.match(/description:\s*(.+)/);
      const toolsMatch = frontmatter.match(/tools:\s*(.+)/);

      if (!nameMatch || !descriptionMatch) {
        return null;
      }

      const name = nameMatch[1].trim();
      const description = descriptionMatch[1].trim();
      const tools = toolsMatch 
        ? toolsMatch[1].split(",").map(t => t.trim())
        : [];

      return {
        name,
        description,
        tools,
        category,
        systemPrompt,
        filePath,
      };
    } catch (error) {
      console.error(`Error parsing agent file ${filePath}:`, error);
      return null;
    }
  }

  /**
   * Get an agent by name
   */
  getAgent(name: string): Agent | undefined {
    return this.agents.get(name);
  }

  /**
   * Get all agents
   */
  getAllAgents(): Agent[] {
    return Array.from(this.agents.values());
  }

  /**
   * Get agents by category
   */
  getAgentsByCategory(category: string): Agent[] {
    return this.agentsByCategory.get(category) || [];
  }

  /**
   * Search agents by keyword
   */
  searchAgents(keyword: string): Agent[] {
    const lowerKeyword = keyword.toLowerCase();
    return this.getAllAgents().filter(agent => 
      agent.name.toLowerCase().includes(lowerKeyword) ||
      agent.description.toLowerCase().includes(lowerKeyword) ||
      agent.tools.some(tool => tool.toLowerCase().includes(lowerKeyword))
    );
  }

  /**
   * Get agent statistics
   */
  getStats(): { total: number; byCategory: Record<string, number> } {
    const byCategory: Record<string, number> = {};
    for (const [category, agents] of this.agentsByCategory.entries()) {
      byCategory[category] = agents.length;
    }
    return {
      total: this.agents.size,
      byCategory,
    };
  }
}
