# Usage Examples

This document provides practical examples of using the Agent Orchestration MCP Server.

## Quick Start Examples

### Example 1: Find the Right Agent

**Scenario**: You need to build a REST API but aren't sure which agent to use.

```typescript
// Ask for recommendations
recommend_agents({
  task_description: "Build a REST API with authentication and database integration",
  top_n: 5
})

// Returns:
// 1. backend-developer - Server-side expert for scalable APIs
// 2. api-designer - REST and GraphQL API architect
// 3. database-administrator - Database management expert
// 4. security-engineer - Infrastructure security specialist
// 5. fullstack-developer - End-to-end feature development
```

### Example 2: Get Detailed Agent Information

**Scenario**: You want to understand what a specific agent can do.

```typescript
// Get complete agent details
get_agent({ name: "python-pro" })

// Returns:
// {
//   "name": "python-pro",
//   "description": "Python ecosystem master",
//   "category": "02-language-specialists",
//   "tools": ["Read", "Write", "Bash", "pip", "pytest", "pylint"],
//   "systemPrompt": "You are a senior Python engineer with expertise in..."
// }
```

### Example 3: Search for Specific Capabilities

**Scenario**: You need agents specialized in testing.

```typescript
// Search by keyword
search_agents({ keyword: "testing" })

// Returns agents like:
// - qa-expert: Test automation specialist
// - test-automator: Test automation framework expert
// - penetration-tester: Ethical hacking specialist
// - accessibility-tester: A11y compliance expert
// - chaos-engineer: System resilience testing expert
```

## Workflow Examples

### Example 4: Simple Linear Workflow

**Scenario**: Code review pipeline

```typescript
// Step 1: Create workflow
const workflow = create_workflow({
  name: "Code Review Pipeline",
  description: "Automated code review and quality checks"
})

// Step 2: Add tasks in sequence
const reviewTask = add_task({
  workflow_id: workflow.id,
  agent_name: "code-reviewer",
  description: "Review code quality and best practices",
  priority: "high"
})

const securityTask = add_task({
  workflow_id: workflow.id,
  agent_name: "security-auditor",
  description: "Scan for security vulnerabilities",
  priority: "high",
  depends_on: [reviewTask.taskId]  // Wait for code review
})

const perfTask = add_task({
  workflow_id: workflow.id,
  agent_name: "performance-engineer",
  description: "Analyze performance bottlenecks",
  priority: "medium",
  depends_on: [reviewTask.taskId]  // Wait for code review
})

// Step 3: View execution plan
get_execution_plan({ workflow_id: workflow.id })
// Level 1: [code-reviewer]
// Level 2: [security-auditor, performance-engineer] (parallel)
```

### Example 5: Complex Feature Development

**Scenario**: Build a complete e-commerce feature

```typescript
// Create workflow
const workflow = create_workflow({
  name: "Payment Integration Feature",
  description: "Add payment processing to e-commerce site"
})

// Phase 1: Planning
const businessTask = add_task({
  workflow_id: workflow.id,
  agent_name: "business-analyst",
  description: "Define payment requirements and user stories",
  priority: "high"
})

const apiDesignTask = add_task({
  workflow_id: workflow.id,
  agent_name: "api-designer",
  description: "Design payment API endpoints",
  priority: "high",
  depends_on: [businessTask.taskId]
})

// Phase 2: Implementation (parallel)
const backendTask = add_task({
  workflow_id: workflow.id,
  agent_name: "backend-developer",
  description: "Implement payment backend logic",
  priority: "high",
  depends_on: [apiDesignTask.taskId]
})

const frontendTask = add_task({
  workflow_id: workflow.id,
  agent_name: "frontend-developer",
  description: "Build payment UI components",
  priority: "high",
  depends_on: [apiDesignTask.taskId]
})

const paymentTask = add_task({
  workflow_id: workflow.id,
  agent_name: "payment-integration",
  description: "Integrate Stripe payment gateway",
  priority: "high",
  depends_on: [apiDesignTask.taskId]
})

// Phase 3: Quality & Security
const testTask = add_task({
  workflow_id: workflow.id,
  agent_name: "qa-expert",
  description: "Create automated tests for payment flow",
  priority: "high",
  depends_on: [backendTask.taskId, frontendTask.taskId]
})

const securityTask = add_task({
  workflow_id: workflow.id,
  agent_name: "security-auditor",
  description: "Security audit of payment handling",
  priority: "high",
  depends_on: [paymentTask.taskId]
})

// Phase 4: Documentation
const docsTask = add_task({
  workflow_id: workflow.id,
  agent_name: "documentation-engineer",
  description: "Document payment integration",
  priority: "medium",
  depends_on: [testTask.taskId, securityTask.taskId]
})

// Execute workflow
const plan = get_execution_plan({ workflow_id: workflow.id })
// Level 1: [business-analyst]
// Level 2: [api-designer]
// Level 3: [backend-developer, frontend-developer, payment-integration]
// Level 4: [qa-expert, security-auditor]
// Level 5: [documentation-engineer]
```

### Example 6: Execute Workflow Step-by-Step

**Scenario**: Manual workflow execution with status tracking

```typescript
// Get next tasks to execute
const nextTasks = get_next_tasks({ workflow_id: workflow.id })
// Returns: [business-analyst task] (no dependencies)

// Start first task
update_task_status({
  workflow_id: workflow.id,
  task_id: nextTasks[0].taskId,
  status: "in_progress"
})

// ... do the work with the agent ...

// Mark as completed
update_task_status({
  workflow_id: workflow.id,
  task_id: nextTasks[0].taskId,
  status: "completed",
  result: "Requirements documented: 5 user stories, 3 edge cases, 2 integrations needed"
})

// Get next tasks (now api-designer is ready)
const nextBatch = get_next_tasks({ workflow_id: workflow.id })
// Returns: [api-designer task]
```

## Category-Based Examples

### Example 7: Browse by Category

**Scenario**: Explore all available language specialists

```typescript
// List all categories
list_categories()

// Get agents in a specific category
get_agents_by_category({ category: "02-language-specialists" })

// Returns all 23 language specialists:
// - python-pro, javascript-pro, typescript-pro
// - react-specialist, vue-expert, angular-architect
// - golang-pro, rust-engineer, java-architect
// ... and 14 more
```

### Example 8: Infrastructure Setup Workflow

**Scenario**: Set up a complete cloud infrastructure

```typescript
const workflow = create_workflow({
  name: "Cloud Infrastructure Setup",
  description: "Deploy production-ready infrastructure on AWS"
})

// Get all infrastructure agents
const infraAgents = get_agents_by_category({ category: "03-infrastructure" })

// Architecture phase
const archTask = add_task({
  workflow_id: workflow.id,
  agent_name: "cloud-architect",
  description: "Design AWS infrastructure architecture",
  priority: "high"
})

// Infrastructure as Code
const terraformTask = add_task({
  workflow_id: workflow.id,
  agent_name: "terraform-engineer",
  description: "Write Terraform configurations",
  priority: "high",
  depends_on: [archTask.taskId]
})

// Container orchestration
const k8sTask = add_task({
  workflow_id: workflow.id,
  agent_name: "kubernetes-specialist",
  description: "Configure Kubernetes cluster",
  priority: "high",
  depends_on: [terraformTask.taskId]
})

// CI/CD pipeline
const devopsTask = add_task({
  workflow_id: workflow.id,
  agent_name: "devops-engineer",
  description: "Set up CI/CD pipeline",
  priority: "high",
  depends_on: [k8sTask.taskId]
})

// Monitoring and reliability
const sreTask = add_task({
  workflow_id: workflow.id,
  agent_name: "sre-engineer",
  description: "Configure monitoring and alerting",
  priority: "medium",
  depends_on: [devopsTask.taskId]
})
```

## Agent Invocation Examples

### Example 9: Direct Agent Invocation

**Scenario**: Get specific guidance from an agent

```typescript
// Invoke specialized agent
invoke_agent({
  agent_name: "react-specialist",
  task_description: "Optimize React component rendering with useMemo and useCallback"
})

// Returns:
// {
//   "agent": "react-specialist",
//   "category": "02-language-specialists",
//   "task": "Optimize React component rendering...",
//   "system_prompt": "You are a React 18+ expert specializing in...",
//   "tools": ["Read", "Write", "Bash", "npm", "webpack", "vite"],
//   "guidance": "This specialized agent has been invoked..."
// }
```

### Example 10: Multiple Agent Consultation

**Scenario**: Get perspectives from multiple agents

```typescript
// Get frontend perspective
const frontendView = invoke_agent({
  agent_name: "frontend-developer",
  task_description: "Design responsive user dashboard"
})

// Get UI design perspective
const designView = invoke_agent({
  agent_name: "ui-designer",
  task_description: "Design responsive user dashboard"
})

// Get accessibility perspective
const a11yView = invoke_agent({
  agent_name: "accessibility-tester",
  task_description: "Ensure dashboard is WCAG 2.1 AA compliant"
})

// Combine insights from all three agents
```

## Real-World Scenarios

### Example 11: Legacy System Modernization

```typescript
const workflow = create_workflow({
  name: "Legacy Modernization Project",
  description: "Migrate legacy .NET Framework app to .NET 8"
})

// Assessment
add_task({
  workflow_id: workflow.id,
  agent_name: "legacy-modernizer",
  description: "Assess legacy codebase and create migration plan",
  priority: "high"
})

// ... add more tasks for incremental migration
```

### Example 12: ML Model Deployment

```typescript
const workflow = create_workflow({
  name: "ML Model Production Deployment",
  description: "Deploy sentiment analysis model to production"
})

// Development
add_task({
  workflow_id: workflow.id,
  agent_name: "ml-engineer",
  description: "Train and validate sentiment analysis model",
  priority: "high"
})

// Deployment
add_task({
  workflow_id: workflow.id,
  agent_name: "mlops-engineer",
  description: "Set up model serving and monitoring",
  priority: "high"
})

// Integration
add_task({
  workflow_id: workflow.id,
  agent_name: "api-designer",
  description: "Design API for model inference",
  priority: "high"
})
```

### Example 13: Security Audit Pipeline

```typescript
// Create comprehensive security workflow
const workflow = create_workflow({
  name: "Quarterly Security Audit",
  description: "Complete security assessment of production systems"
})

// Static analysis
add_task({
  workflow_id: workflow.id,
  agent_name: "security-auditor",
  description: "Perform static code security analysis"
})

// Penetration testing
add_task({
  workflow_id: workflow.id,
  agent_name: "penetration-tester",
  description: "Conduct penetration testing on APIs"
})

// Compliance check
add_task({
  workflow_id: workflow.id,
  agent_name: "compliance-auditor",
  description: "Verify GDPR and SOC2 compliance"
})
```

## Statistics and Discovery

### Example 14: Get Overview

```typescript
// Get system statistics
get_stats()

// Returns:
// {
//   "total": 126,
//   "byCategory": {
//     "01-core-development": 11,
//     "02-language-specialists": 23,
//     "03-infrastructure": 12,
//     "04-quality-security": 12,
//     "05-data-ai": 12,
//     "06-developer-experience": 10,
//     "07-specialized-domains": 11,
//     "08-business-product": 11,
//     "09-meta-orchestration": 8,
//     "10-research-analysis": 6
//   }
// }
```

### Example 15: Smart Search

```typescript
// Search for database experts
search_agents({ keyword: "database" })
// Returns: database-administrator, database-optimizer, data-engineer, postgres-pro

// Search for mobile development
search_agents({ keyword: "mobile" })
// Returns: mobile-developer, mobile-app-developer, flutter-expert, swift-expert

// Search for AI/ML
search_agents({ keyword: "machine learning" })
// Returns: ml-engineer, machine-learning-engineer, mlops-engineer, data-scientist
```

## Tips and Best Practices

### Tip 1: Use Recommendations for Unknown Domains

When you're not familiar with a domain, use `recommend_agents` to discover the right experts:

```typescript
recommend_agents({
  task_description: "Set up blockchain smart contract deployment pipeline",
  top_n: 3
})
// Discover: blockchain-developer, devops-engineer, security-auditor
```

### Tip 2: Combine Multiple Categories

For complex projects, create workflows that span multiple categories:

```typescript
// Full-stack feature = Core Dev + Language Specialist + Quality
// Infrastructure project = Infrastructure + DevOps + Security
// ML pipeline = Data & AI + Infrastructure + Quality
```

### Tip 3: Start with High-Level Planning

Begin workflows with business or architecture agents:

```typescript
// Always start with:
// - business-analyst (for requirements)
// - architect-reviewer (for system design)
// - product-manager (for feature planning)
```

### Tip 4: End with Quality and Documentation

Always finish workflows with quality checks and documentation:

```typescript
// Always end with:
// - qa-expert or test-automator (testing)
// - security-auditor (security check)
// - documentation-engineer (documentation)
```

## Troubleshooting

### List All Available Agents

```typescript
// See everything available
list_agents()
```

### Check Workflow Status

```typescript
// View workflow details
get_workflow({ workflow_id: "your-workflow-id" })

// See execution plan
get_execution_plan({ workflow_id: "your-workflow-id" })

// Check what's ready to run
get_next_tasks({ workflow_id: "your-workflow-id" })
```

### Search When Stuck

```typescript
// Not sure what you need? Search!
search_agents({ keyword: "your-technology-here" })
```
