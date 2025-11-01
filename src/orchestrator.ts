import { Agent, Workflow, TaskAssignment } from "./types.js";
import { AgentRegistry } from "./agent-registry.js";

/**
 * Orchestrator manages multi-agent workflows and task distribution
 */
export class Orchestrator {
  private registry: AgentRegistry;
  private workflows: Map<string, Workflow> = new Map();
  private activeWorkflowId: string | null = null;

  constructor(registry: AgentRegistry) {
    this.registry = registry;
  }

  /**
   * Create a new workflow
   */
  createWorkflow(name: string, description: string): Workflow {
    const workflow: Workflow = {
      id: this.generateId(),
      name,
      description,
      tasks: [],
      dependencies: {},
    };
    this.workflows.set(workflow.id, workflow);
    return workflow;
  }

  /**
   * Add a task to a workflow
   */
  addTask(
    workflowId: string,
    agentName: string,
    description: string,
    priority: "high" | "medium" | "low" = "medium",
    dependsOn: string[] = []
  ): TaskAssignment | null {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      return null;
    }

    const agent = this.registry.getAgent(agentName);
    if (!agent) {
      return null;
    }

    const task: TaskAssignment = {
      taskId: this.generateId(),
      agentName,
      description,
      priority,
      status: "pending",
    };

    workflow.tasks.push(task);
    if (dependsOn.length > 0) {
      workflow.dependencies[task.taskId] = dependsOn;
    }

    return task;
  }

  /**
   * Get workflow by ID
   */
  getWorkflow(workflowId: string): Workflow | undefined {
    return this.workflows.get(workflowId);
  }

  /**
   * Get all workflows
   */
  getAllWorkflows(): Workflow[] {
    return Array.from(this.workflows.values());
  }

  /**
   * Set active workflow
   */
  setActiveWorkflow(workflowId: string): boolean {
    if (this.workflows.has(workflowId)) {
      this.activeWorkflowId = workflowId;
      return true;
    }
    return false;
  }

  /**
   * Get active workflow
   */
  getActiveWorkflow(): Workflow | null {
    if (!this.activeWorkflowId) {
      return null;
    }
    return this.workflows.get(this.activeWorkflowId) || null;
  }

  /**
   * Get next tasks ready to execute in a workflow
   */
  getNextTasks(workflowId: string): TaskAssignment[] {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      return [];
    }

    return workflow.tasks.filter(task => {
      // Task must be pending
      if (task.status !== "pending") {
        return false;
      }

      // Check if all dependencies are completed
      const dependencies = workflow.dependencies[task.taskId] || [];
      return dependencies.every(depId => {
        const depTask = workflow.tasks.find(t => t.taskId === depId);
        return depTask?.status === "completed";
      });
    });
  }

  /**
   * Update task status
   */
  updateTaskStatus(
    workflowId: string,
    taskId: string,
    status: TaskAssignment["status"],
    result?: string
  ): boolean {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      return false;
    }

    const task = workflow.tasks.find(t => t.taskId === taskId);
    if (!task) {
      return false;
    }

    task.status = status;
    if (result !== undefined) {
      task.result = result;
    }

    return true;
  }

  /**
   * Recommend agents for a task description
   */
  recommendAgents(taskDescription: string, topN: number = 5): Agent[] {
    const allAgents = this.registry.getAllAgents();
    const keywords = taskDescription.toLowerCase().split(/\s+/);

    // Score agents based on relevance
    const scoredAgents = allAgents.map(agent => {
      let score = 0;
      const agentText = `${agent.name} ${agent.description} ${agent.tools.join(" ")}`.toLowerCase();

      for (const keyword of keywords) {
        if (agentText.includes(keyword)) {
          score += 1;
        }
      }

      return { agent, score };
    });

    // Sort by score and return top N
    return scoredAgents
      .filter(sa => sa.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topN)
      .map(sa => sa.agent);
  }

  /**
   * Generate a unique ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Get workflow execution plan
   */
  getExecutionPlan(workflowId: string): { levels: TaskAssignment[][] } | null {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      return null;
    }

    const levels: TaskAssignment[][] = [];
    const processed = new Set<string>();

    while (processed.size < workflow.tasks.length) {
      const level: TaskAssignment[] = [];

      for (const task of workflow.tasks) {
        if (processed.has(task.taskId)) {
          continue;
        }

        const dependencies = workflow.dependencies[task.taskId] || [];
        const allDepsProcessed = dependencies.every(depId => processed.has(depId));

        if (allDepsProcessed) {
          level.push(task);
          processed.add(task.taskId);
        }
      }

      if (level.length === 0 && processed.size < workflow.tasks.length) {
        // Circular dependency detected
        break;
      }

      if (level.length > 0) {
        levels.push(level);
      }
    }

    return { levels };
  }
}
