# Quick Start Guide

Get started with the Agent Orchestration MCP Server in 5 minutes.

## Installation

### Option 1: Using npx (Recommended)

No installation needed! Just configure and run:

```json
{
  "mcpServers": {
    "agent-orchestration": {
      "command": "npx",
      "args": ["-y", "@9pros/agent-orchestration-mcp"]
    }
  }
}
```

### Option 2: Global Installation

```bash
npm install -g @9pros/agent-orchestration-mcp
```

Then configure:

```json
{
  "mcpServers": {
    "agent-orchestration": {
      "command": "agent-orchestration-mcp"
    }
  }
}
```

## Configuration Locations

### Claude Desktop

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

### Cline (VS Code Extension)

Open settings and add to MCP configuration.

### Other MCP Clients

Check your client's documentation for the MCP configuration file location.

## First Steps

Once configured and restarted, try these commands:

### 1. See What's Available

```
List all available agents
```

You'll see 130+ specialized agents across 10 categories.

### 2. Find the Right Agent

```
Recommend agents for building a REST API with authentication
```

Get AI-powered recommendations for your specific task.

### 3. Get Agent Details

```
Show me details about the python-pro agent
```

See full capabilities and system prompt.

### 4. Invoke an Agent

```
Invoke the react-specialist to help optimize component performance
```

Get specialized guidance for your task.

### 5. Create a Workflow

```
Create a workflow for building a full-stack authentication system
```

Build multi-agent workflows with automatic orchestration.

## Common Use Cases

### Solo Development

**"I need to add a feature but not sure where to start"**

```
Recommend agents for [describe your feature]
```

Then invoke the top recommendations one by one.

### Code Review

**"Review my code changes"**

```
Invoke code-reviewer to review my latest changes
Then invoke security-auditor for security check
Then invoke performance-engineer for optimization suggestions
```

### Learning New Technology

**"I want to learn Kubernetes"**

```
Get details about the kubernetes-specialist agent
```

Read the agent's system prompt to learn best practices.

### Complex Project

**"I'm building a multi-service application"**

```
Create a workflow for microservices architecture implementation
Add tasks for microservices-architect, backend-developer, devops-engineer
Get execution plan to see the task sequence
```

## Natural Language Interface

The MCP server works with natural language. You can say:

- "Find me an agent that knows TypeScript"
- "I need help with database optimization"
- "Create a workflow for deploying to AWS"
- "What agents are available for testing?"
- "Show me all infrastructure agents"
- "Invoke the python expert to help with async code"

## Tips for Best Results

### Be Specific

❌ "Help with code"
✅ "Optimize React component rendering performance"

### Use Workflows for Complex Tasks

For multi-step projects, create workflows:
1. Create workflow
2. Add tasks with dependencies
3. Execute step by step

### Explore Categories

Browse by category to discover capabilities:
- Core Development
- Language Specialists
- Infrastructure
- Quality & Security
- Data & AI
- Developer Experience
- Specialized Domains
- Business & Product
- Meta & Orchestration
- Research & Analysis

### Combine Multiple Agents

Don't rely on just one agent. For best results:
1. Start with business/architecture agent
2. Use specialized agents for implementation
3. Finish with quality/security agents

## Example Session

Here's a complete example session:

```
You: I need to add payment processing to my e-commerce site

AI: Let me help you with that. First, let me recommend the best agents for this task.
    [calls recommend_agents with "payment processing e-commerce"]
    
    I recommend:
    1. payment-integration - Payment systems expert
    2. backend-developer - For API implementation
    3. security-auditor - For payment security review
    4. frontend-developer - For payment UI
    
    Would you like me to create a workflow or work with one agent at a time?

You: Create a workflow

AI: [calls create_workflow]
    I've created "Payment Integration" workflow.
    [calls add_task for each agent with appropriate dependencies]
    
    Execution plan:
    Level 1: payment-integration (design payment flow)
    Level 2: backend-developer, frontend-developer (parallel implementation)
    Level 3: security-auditor (security review)
    
    Let's start with the payment-integration agent.

You: Yes, proceed

AI: [calls invoke_agent for payment-integration]
    The payment-integration agent recommends:
    1. Use Stripe for PCI compliance
    2. Implement webhook handling
    3. Add idempotency keys
    4. Set up proper error handling
    ...
```

## Next Steps

- Read [EXAMPLES.md](EXAMPLES.md) for detailed usage examples
- See [README.md](README.md) for complete API reference
- Join [VoltAgent Discord](https://s.voltagent.dev/discord) for community support

## Troubleshooting

### Server Not Starting

1. Check MCP configuration file syntax
2. Ensure npm/npx is in your PATH
3. Try global installation instead of npx
4. Restart your MCP client

### Agents Not Responding

1. Check that server is listed in your MCP client
2. Look for errors in MCP client logs
3. Try invoking with exact agent names from the list

### Need Help?

- GitHub Issues: https://github.com/9pros/agent-orchestration-mcp/issues
- Discord: https://s.voltagent.dev/discord
