# Agent Orchestration MCP Server

A powerful Model Context Protocol (MCP) server that provides any AI agent with access to 130+ specialized AI subagents and an intelligent orchestration system. This server enables sophisticated multi-agent workflows, task distribution, and team leader + specialized agent patterns for AI development across any IDE or CLI environment.

## 🌟 Features

- **130+ Specialized Agents**: Access to a comprehensive collection of expert agents across 10 categories
- **Intelligent Orchestration**: Team leader pattern with automatic task distribution
- **Multi-Agent Workflows**: Create complex workflows with task dependencies
- **Agent Recommendation**: AI-powered agent selection based on task descriptions
- **Category-Based Organization**: Agents organized into logical domains
- **Production-Ready**: Based on battle-tested agent definitions from the community
- **Universal Compatibility**: Works with any MCP-compatible AI system

## 📚 Agent Categories

### 1. Core Development (11 agents)
Essential development subagents for everyday coding tasks:
- API Designer, Backend Developer, Frontend Developer, Fullstack Developer
- Mobile Developer, UI Designer, Electron Pro, Microservices Architect
- GraphQL Architect, WebSocket Engineer, WordPress Master

### 2. Language Specialists (23 agents)
Language-specific experts with deep framework knowledge:
- TypeScript Pro, Python Pro, JavaScript Pro, Golang Pro, Rust Engineer
- Java Architect, C++ Pro, C# Developer, PHP Pro, Swift Expert
- React Specialist, Vue Expert, Angular Architect, Next.js Developer
- Django Developer, Laravel Specialist, Rails Expert, Spring Boot Engineer
- Flutter Expert, Kotlin Specialist, .NET Framework Expert, and more

### 3. Infrastructure (12 agents)
DevOps, cloud, and deployment specialists:
- Cloud Architect, DevOps Engineer, Kubernetes Specialist, Terraform Engineer
- Database Administrator, Platform Engineer, SRE Engineer
- Security Engineer, Network Engineer, Deployment Engineer, Incident Responder

### 4. Quality & Security (12 agents)
Testing, security, and code quality experts:
- Code Reviewer, QA Expert, Security Auditor, Penetration Tester
- Debugger, Performance Engineer, Test Automator, Chaos Engineer
- Accessibility Tester, Compliance Auditor, Error Detective, Architect Reviewer

### 5. Data & AI (12 agents)
Data engineering, ML, and AI specialists:
- Data Engineer, Data Scientist, ML Engineer, AI Engineer, MLOps Engineer
- Data Analyst, NLP Engineer, LLM Architect, Prompt Engineer
- Database Optimizer, Postgres Pro, Machine Learning Engineer

### 6. Developer Experience (10 agents)
Tooling and developer productivity experts:
- MCP Developer, Documentation Engineer, CLI Developer, Build Engineer
- DX Optimizer, Refactoring Specialist, Tooling Engineer
- Legacy Modernizer, Dependency Manager, Git Workflow Manager

### 7. Specialized Domains (11 agents)
Domain-specific technology experts:
- Blockchain Developer, Game Developer, IoT Engineer, Fintech Engineer
- Mobile App Developer, Embedded Systems, Payment Integration
- API Documenter, SEO Specialist, Quant Analyst, Risk Manager

### 8. Business & Product (10 agents)
Product management and business analysis:
- Product Manager, Project Manager, Business Analyst, Scrum Master
- Technical Writer, UX Researcher, Customer Success Manager
- Sales Engineer, Content Marketer, Legal Advisor

### 9. Meta & Orchestration (8 agents)
Agent coordination and meta-programming:
- Multi-Agent Coordinator, Workflow Orchestrator, Task Distributor
- Agent Organizer, Context Manager, Error Coordinator
- Knowledge Synthesizer, Performance Monitor

### 10. Research & Analysis (6 agents)
Research, search, and analysis specialists:
- Research Analyst, Search Specialist, Trend Analyst
- Competitive Analyst, Market Researcher, Data Researcher

## 🚀 Installation

### Using npm

```bash
npm install -g @9pros/agent-orchestration-mcp
```

### From source

```bash
git clone https://github.com/9pros/agent-orchestration-mcp.git
cd agent-orchestration-mcp
npm install
npm run build
```

## 🔧 Configuration

Add the server to your MCP settings file:

### Claude Desktop

Edit your `claude_desktop_config.json`:

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

### Cline / Other MCP Clients

```json
{
  "mcpServers": {
    "agent-orchestration": {
      "command": "node",
      "args": ["/path/to/agent-orchestration-mcp/dist/index.js"]
    }
  }
}
```

## 📖 Usage

### Basic Agent Operations

#### List All Agents
```typescript
// Returns all 130+ specialized agents
list_agents()
```

#### Get Agent Details
```typescript
// Get full details and system prompt for a specific agent
get_agent({ name: "python-pro" })
```

#### Search for Agents
```typescript
// Find agents by keyword
search_agents({ keyword: "testing" })
// Returns: qa-expert, test-automator, penetration-tester, etc.
```

#### Get Agents by Category
```typescript
// List all agents in a category
get_agents_by_category({ category: "02-language-specialists" })
```

#### Invoke a Specialized Agent
```typescript
// Invoke an agent for a specific task
invoke_agent({
  agent_name: "react-specialist",
  task_description: "Optimize React component rendering performance"
})
// Returns the agent's system prompt and guidance
```

#### Get Agent Recommendations
```typescript
// Get AI-powered agent recommendations
recommend_agents({
  task_description: "Build a REST API with authentication",
  top_n: 5
})
// Returns: backend-developer, api-designer, security-engineer, etc.
```

### Workflow Orchestration

#### Create a Workflow
```typescript
// Create a multi-agent workflow
const workflow = create_workflow({
  name: "Full-Stack Feature Development",
  description: "Build a complete user authentication system"
})
```

#### Add Tasks to Workflow
```typescript
// Add tasks with dependencies
add_task({
  workflow_id: workflow.id,
  agent_name: "api-designer",
  description: "Design authentication API endpoints",
  priority: "high"
})

add_task({
  workflow_id: workflow.id,
  agent_name: "backend-developer",
  description: "Implement authentication backend",
  priority: "high",
  depends_on: [apiDesignTaskId]  // Wait for API design
})

add_task({
  workflow_id: workflow.id,
  agent_name: "frontend-developer",
  description: "Build login UI components",
  priority: "medium",
  depends_on: [apiDesignTaskId]
})
```

#### Execute Workflow
```typescript
// Get execution plan showing task levels
get_execution_plan({ workflow_id: workflow.id })

// Get next tasks ready to execute
const nextTasks = get_next_tasks({ workflow_id: workflow.id })

// Update task status
update_task_status({
  workflow_id: workflow.id,
  task_id: taskId,
  status: "completed",
  result: "API endpoints designed and documented"
})
```

### Statistics

```typescript
// Get statistics about available agents
get_stats()
// Returns total count and breakdown by category
```

## 🎯 Use Cases

### Solo Developer Workflow
Use agent recommendations to get the right expert for each task:
```typescript
recommend_agents({ task_description: "Deploy Python app to AWS" })
// Returns: devops-engineer, cloud-architect, python-pro, deployment-engineer
```

### Team Leader Pattern
Create workflows that distribute work across specialized agents:
```typescript
const workflow = create_workflow({
  name: "Microservices Migration",
  description: "Migrate monolith to microservices"
})

// Architecture phase
add_task({...agent: "microservices-architect", priority: "high"})

// Implementation phase (parallel)
add_task({...agent: "backend-developer", depends_on: [archTask]})
add_task({...agent: "devops-engineer", depends_on: [archTask]})

// Testing phase
add_task({...agent: "qa-expert", depends_on: [backendTask]})
```

### Quality Assurance Pipeline
Chain quality checks:
```typescript
1. code-reviewer → Review code quality
2. security-auditor → Security scan
3. performance-engineer → Performance analysis
4. accessibility-tester → A11y compliance
```

### Learning & Exploration
Search and explore agents by domain:
```typescript
search_agents({ keyword: "machine learning" })
// Discover: ml-engineer, mlops-engineer, data-scientist, etc.

get_agent({ name: "mlops-engineer" })
// Learn about MLOps best practices from the agent's system prompt
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│         MCP Client (Claude, Cline, etc)     │
└─────────────────┬───────────────────────────┘
                  │
                  │ MCP Protocol
                  │
┌─────────────────▼───────────────────────────┐
│      Agent Orchestration MCP Server         │
│  ┌─────────────────────────────────────┐   │
│  │      Agent Registry                 │   │
│  │   - 130+ Specialized Agents         │   │
│  │   - Category Management             │   │
│  │   - Search & Discovery              │   │
│  └─────────────────────────────────────┘   │
│  ┌─────────────────────────────────────┐   │
│  │      Orchestrator                   │   │
│  │   - Workflow Management             │   │
│  │   - Task Distribution               │   │
│  │   - Dependency Resolution           │   │
│  │   - Agent Recommendation            │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
                  │
                  │
┌─────────────────▼───────────────────────────┐
│         Agent Definitions (Markdown)        │
│  - Core Development                         │
│  - Language Specialists                     │
│  - Infrastructure                           │
│  - Quality & Security                       │
│  - Data & AI                                │
│  - Developer Experience                     │
│  - Specialized Domains                      │
│  - Business & Product                       │
│  - Meta & Orchestration                     │
│  - Research & Analysis                      │
└─────────────────────────────────────────────┘
```

## 🛠️ Tools Reference

| Tool | Description | Parameters |
|------|-------------|------------|
| `list_agents` | List all available agents | None |
| `get_agent` | Get agent details | `name` |
| `search_agents` | Search agents by keyword | `keyword` |
| `list_categories` | List all categories | None |
| `get_agents_by_category` | Get agents in category | `category` |
| `invoke_agent` | Invoke specialized agent | `agent_name`, `task_description` |
| `recommend_agents` | Get agent recommendations | `task_description`, `top_n` |
| `create_workflow` | Create new workflow | `name`, `description` |
| `add_task` | Add task to workflow | `workflow_id`, `agent_name`, `description`, `priority`, `depends_on` |
| `get_workflow` | Get workflow details | `workflow_id` |
| `list_workflows` | List all workflows | None |
| `get_execution_plan` | Get workflow execution plan | `workflow_id` |
| `get_next_tasks` | Get next executable tasks | `workflow_id` |
| `update_task_status` | Update task status | `workflow_id`, `task_id`, `status`, `result` |
| `get_stats` | Get agent statistics | None |

## 🤝 Contributing

Contributions are welcome! This project is based on the [awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) repository maintained by the VoltAgent community.

To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Credits

This MCP server is built upon the excellent work of the [VoltAgent](https://github.com/voltagent/voltagent) community and their [awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) collection.

Special thanks to all contributors who have helped create and maintain the 130+ specialized agent definitions.

## 🔗 Related Projects

- [VoltAgent Framework](https://github.com/voltagent/voltagent) - Open-source AI agent framework
- [Model Context Protocol](https://modelcontextprotocol.io) - MCP specification
- [Awesome Claude Code Subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) - Original agent collection

## 📞 Support

- GitHub Issues: [Report a bug](https://github.com/9pros/agent-orchestration-mcp/issues)
- Discussions: [Ask questions](https://github.com/9pros/agent-orchestration-mcp/discussions)
- VoltAgent Discord: [Join community](https://s.voltagent.dev/discord)

---

Made with ❤️ for the AI development community
