#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { AgentRegistry } from "./agent-registry.js";
import { Orchestrator } from "./orchestrator.js";
import { z } from "zod";

/**
 * Agent Orchestration MCP Server
 * Provides tools for managing and orchestrating 130+ specialized AI agents
 */
class AgentOrchestrationServer {
  private server: Server;
  private registry: AgentRegistry;
  private orchestrator: Orchestrator;

  constructor() {
    this.server = new Server(
      {
        name: "agent-orchestration-mcp",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.registry = new AgentRegistry();
    this.orchestrator = new Orchestrator(this.registry);

    this.setupHandlers();
  }

  /**
   * Setup MCP protocol handlers
   */
  private setupHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: this.getTools(),
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "list_agents":
            return await this.handleListAgents(args);
          case "get_agent":
            return await this.handleGetAgent(args);
          case "search_agents":
            return await this.handleSearchAgents(args);
          case "list_categories":
            return await this.handleListCategories(args);
          case "get_agents_by_category":
            return await this.handleGetAgentsByCategory(args);
          case "invoke_agent":
            return await this.handleInvokeAgent(args);
          case "recommend_agents":
            return await this.handleRecommendAgents(args);
          case "create_workflow":
            return await this.handleCreateWorkflow(args);
          case "add_task":
            return await this.handleAddTask(args);
          case "get_workflow":
            return await this.handleGetWorkflow(args);
          case "list_workflows":
            return await this.handleListWorkflows(args);
          case "get_execution_plan":
            return await this.handleGetExecutionPlan(args);
          case "get_next_tasks":
            return await this.handleGetNextTasks(args);
          case "update_task_status":
            return await this.handleUpdateTaskStatus(args);
          case "get_stats":
            return await this.handleGetStats(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: "text",
              text: `Error: ${errorMessage}`,
            },
          ],
        };
      }
    });
  }

  /**
   * Get all available tools
   */
  private getTools(): Tool[] {
    return [
      {
        name: "list_agents",
        description: "List all available specialized agents with their capabilities",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "get_agent",
        description: "Get detailed information about a specific agent including its full system prompt",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The name of the agent",
            },
          },
          required: ["name"],
        },
      },
      {
        name: "search_agents",
        description: "Search for agents by keyword in their name, description, or tools",
        inputSchema: {
          type: "object",
          properties: {
            keyword: {
              type: "string",
              description: "The keyword to search for",
            },
          },
          required: ["keyword"],
        },
      },
      {
        name: "list_categories",
        description: "List all agent categories with their descriptions",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "get_agents_by_category",
        description: "Get all agents in a specific category",
        inputSchema: {
          type: "object",
          properties: {
            category: {
              type: "string",
              description: "The category name (e.g., '01-core-development', '02-language-specialists')",
            },
          },
          required: ["category"],
        },
      },
      {
        name: "invoke_agent",
        description: "Invoke a specialized agent with a task. Returns the agent's system prompt and guidance for the task.",
        inputSchema: {
          type: "object",
          properties: {
            agent_name: {
              type: "string",
              description: "The name of the agent to invoke",
            },
            task_description: {
              type: "string",
              description: "Description of the task for the agent",
            },
          },
          required: ["agent_name", "task_description"],
        },
      },
      {
        name: "recommend_agents",
        description: "Get recommended agents for a given task description",
        inputSchema: {
          type: "object",
          properties: {
            task_description: {
              type: "string",
              description: "Description of the task",
            },
            top_n: {
              type: "number",
              description: "Number of recommendations to return (default: 5)",
            },
          },
          required: ["task_description"],
        },
      },
      {
        name: "create_workflow",
        description: "Create a new multi-agent workflow",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the workflow",
            },
            description: {
              type: "string",
              description: "Description of the workflow",
            },
          },
          required: ["name", "description"],
        },
      },
      {
        name: "add_task",
        description: "Add a task to a workflow",
        inputSchema: {
          type: "object",
          properties: {
            workflow_id: {
              type: "string",
              description: "ID of the workflow",
            },
            agent_name: {
              type: "string",
              description: "Name of the agent to assign",
            },
            description: {
              type: "string",
              description: "Task description",
            },
            priority: {
              type: "string",
              enum: ["high", "medium", "low"],
              description: "Task priority (default: medium)",
            },
            depends_on: {
              type: "array",
              items: { type: "string" },
              description: "IDs of tasks this task depends on",
            },
          },
          required: ["workflow_id", "agent_name", "description"],
        },
      },
      {
        name: "get_workflow",
        description: "Get details of a specific workflow",
        inputSchema: {
          type: "object",
          properties: {
            workflow_id: {
              type: "string",
              description: "ID of the workflow",
            },
          },
          required: ["workflow_id"],
        },
      },
      {
        name: "list_workflows",
        description: "List all workflows",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "get_execution_plan",
        description: "Get the execution plan for a workflow showing task dependencies",
        inputSchema: {
          type: "object",
          properties: {
            workflow_id: {
              type: "string",
              description: "ID of the workflow",
            },
          },
          required: ["workflow_id"],
        },
      },
      {
        name: "get_next_tasks",
        description: "Get the next tasks ready to execute in a workflow",
        inputSchema: {
          type: "object",
          properties: {
            workflow_id: {
              type: "string",
              description: "ID of the workflow",
            },
          },
          required: ["workflow_id"],
        },
      },
      {
        name: "update_task_status",
        description: "Update the status of a task in a workflow",
        inputSchema: {
          type: "object",
          properties: {
            workflow_id: {
              type: "string",
              description: "ID of the workflow",
            },
            task_id: {
              type: "string",
              description: "ID of the task",
            },
            status: {
              type: "string",
              enum: ["pending", "in_progress", "completed", "failed"],
              description: "New status",
            },
            result: {
              type: "string",
              description: "Result or output of the task (optional)",
            },
          },
          required: ["workflow_id", "task_id", "status"],
        },
      },
      {
        name: "get_stats",
        description: "Get statistics about available agents",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ];
  }

  /**
   * Handle list_agents tool call
   */
  private async handleListAgents(args: unknown) {
    const agents = this.registry.getAllAgents();
    const agentList = agents.map(agent => ({
      name: agent.name,
      description: agent.description,
      category: agent.category,
      tools: agent.tools,
    }));

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(agentList, null, 2),
        },
      ],
    };
  }

  /**
   * Handle get_agent tool call
   */
  private async handleGetAgent(args: unknown) {
    const schema = z.object({ name: z.string() });
    const { name } = schema.parse(args);

    const agent = this.registry.getAgent(name);
    if (!agent) {
      throw new Error(`Agent not found: ${name}`);
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(agent, null, 2),
        },
      ],
    };
  }

  /**
   * Handle search_agents tool call
   */
  private async handleSearchAgents(args: unknown) {
    const schema = z.object({ keyword: z.string() });
    const { keyword } = schema.parse(args);

    const agents = this.registry.searchAgents(keyword);
    const agentList = agents.map(agent => ({
      name: agent.name,
      description: agent.description,
      category: agent.category,
      tools: agent.tools,
    }));

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(agentList, null, 2),
        },
      ],
    };
  }

  /**
   * Handle list_categories tool call
   */
  private async handleListCategories(args: unknown) {
    const categories = [
      {
        id: "01-core-development",
        name: "Core Development",
        description: "Essential development subagents for everyday coding tasks",
      },
      {
        id: "02-language-specialists",
        name: "Language Specialists",
        description: "Language-specific experts with deep framework knowledge",
      },
      {
        id: "03-infrastructure",
        name: "Infrastructure",
        description: "DevOps, cloud, and deployment specialists",
      },
      {
        id: "04-quality-security",
        name: "Quality & Security",
        description: "Testing, security, and code quality experts",
      },
      {
        id: "05-data-ai",
        name: "Data & AI",
        description: "Data engineering, ML, and AI specialists",
      },
      {
        id: "06-developer-experience",
        name: "Developer Experience",
        description: "Tooling and developer productivity experts",
      },
      {
        id: "07-specialized-domains",
        name: "Specialized Domains",
        description: "Domain-specific technology experts",
      },
      {
        id: "08-business-product",
        name: "Business & Product",
        description: "Product management and business analysis",
      },
      {
        id: "09-meta-orchestration",
        name: "Meta & Orchestration",
        description: "Agent coordination and meta-programming",
      },
      {
        id: "10-research-analysis",
        name: "Research & Analysis",
        description: "Research, search, and analysis specialists",
      },
    ];

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(categories, null, 2),
        },
      ],
    };
  }

  /**
   * Handle get_agents_by_category tool call
   */
  private async handleGetAgentsByCategory(args: unknown) {
    const schema = z.object({ category: z.string() });
    const { category } = schema.parse(args);

    const agents = this.registry.getAgentsByCategory(category);
    const agentList = agents.map(agent => ({
      name: agent.name,
      description: agent.description,
      tools: agent.tools,
    }));

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(agentList, null, 2),
        },
      ],
    };
  }

  /**
   * Handle invoke_agent tool call
   */
  private async handleInvokeAgent(args: unknown) {
    const schema = z.object({
      agent_name: z.string(),
      task_description: z.string(),
    });
    const { agent_name, task_description } = schema.parse(args);

    const agent = this.registry.getAgent(agent_name);
    if (!agent) {
      throw new Error(`Agent not found: ${agent_name}`);
    }

    const response = {
      agent: agent.name,
      category: agent.category,
      task: task_description,
      system_prompt: agent.systemPrompt,
      tools: agent.tools,
      guidance: `This specialized agent (${agent.name}) has been invoked to handle: ${task_description}\n\nThe agent's expertise includes: ${agent.description}\n\nAvailable tools: ${agent.tools.join(", ")}\n\nFollow the agent's system prompt for best practices and implementation guidelines.`,
    };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response, null, 2),
        },
      ],
    };
  }

  /**
   * Handle recommend_agents tool call
   */
  private async handleRecommendAgents(args: unknown) {
    const schema = z.object({
      task_description: z.string(),
      top_n: z.number().optional().default(5),
    });
    const { task_description, top_n } = schema.parse(args);

    const agents = this.orchestrator.recommendAgents(task_description, top_n);
    const recommendations = agents.map(agent => ({
      name: agent.name,
      description: agent.description,
      category: agent.category,
      tools: agent.tools,
    }));

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(recommendations, null, 2),
        },
      ],
    };
  }

  /**
   * Handle create_workflow tool call
   */
  private async handleCreateWorkflow(args: unknown) {
    const schema = z.object({
      name: z.string(),
      description: z.string(),
    });
    const { name, description } = schema.parse(args);

    const workflow = this.orchestrator.createWorkflow(name, description);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(workflow, null, 2),
        },
      ],
    };
  }

  /**
   * Handle add_task tool call
   */
  private async handleAddTask(args: unknown) {
    const schema = z.object({
      workflow_id: z.string(),
      agent_name: z.string(),
      description: z.string(),
      priority: z.enum(["high", "medium", "low"]).optional().default("medium"),
      depends_on: z.array(z.string()).optional().default([]),
    });
    const { workflow_id, agent_name, description, priority, depends_on } = schema.parse(args);

    const task = this.orchestrator.addTask(
      workflow_id,
      agent_name,
      description,
      priority,
      depends_on
    );

    if (!task) {
      throw new Error(`Failed to add task to workflow ${workflow_id}`);
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(task, null, 2),
        },
      ],
    };
  }

  /**
   * Handle get_workflow tool call
   */
  private async handleGetWorkflow(args: unknown) {
    const schema = z.object({ workflow_id: z.string() });
    const { workflow_id } = schema.parse(args);

    const workflow = this.orchestrator.getWorkflow(workflow_id);
    if (!workflow) {
      throw new Error(`Workflow not found: ${workflow_id}`);
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(workflow, null, 2),
        },
      ],
    };
  }

  /**
   * Handle list_workflows tool call
   */
  private async handleListWorkflows(args: unknown) {
    const workflows = this.orchestrator.getAllWorkflows();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(workflows, null, 2),
        },
      ],
    };
  }

  /**
   * Handle get_execution_plan tool call
   */
  private async handleGetExecutionPlan(args: unknown) {
    const schema = z.object({ workflow_id: z.string() });
    const { workflow_id } = schema.parse(args);

    const plan = this.orchestrator.getExecutionPlan(workflow_id);
    if (!plan) {
      throw new Error(`Workflow not found: ${workflow_id}`);
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(plan, null, 2),
        },
      ],
    };
  }

  /**
   * Handle get_next_tasks tool call
   */
  private async handleGetNextTasks(args: unknown) {
    const schema = z.object({ workflow_id: z.string() });
    const { workflow_id } = schema.parse(args);

    const tasks = this.orchestrator.getNextTasks(workflow_id);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(tasks, null, 2),
        },
      ],
    };
  }

  /**
   * Handle update_task_status tool call
   */
  private async handleUpdateTaskStatus(args: unknown) {
    const schema = z.object({
      workflow_id: z.string(),
      task_id: z.string(),
      status: z.enum(["pending", "in_progress", "completed", "failed"]),
      result: z.string().optional(),
    });
    const { workflow_id, task_id, status, result } = schema.parse(args);

    const success = this.orchestrator.updateTaskStatus(workflow_id, task_id, status, result);
    if (!success) {
      throw new Error(`Failed to update task ${task_id} in workflow ${workflow_id}`);
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ success: true, task_id, status }, null, 2),
        },
      ],
    };
  }

  /**
   * Handle get_stats tool call
   */
  private async handleGetStats(args: unknown) {
    const stats = this.registry.getStats();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(stats, null, 2),
        },
      ],
    };
  }

  /**
   * Start the server
   */
  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Agent Orchestration MCP Server running on stdio");
  }
}

// Start the server
const server = new AgentOrchestrationServer();
server.start().catch(console.error);
