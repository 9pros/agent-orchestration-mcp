# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-01

### Added
- Initial release of Agent Orchestration MCP Server
- Support for 126+ specialized AI agents across 10 categories
- Agent registry with search and discovery capabilities
- Multi-agent workflow orchestration system
- Team leader pattern implementation
- 15 MCP tools for agent management and orchestration:
  - `list_agents` - List all available agents
  - `get_agent` - Get detailed agent information
  - `search_agents` - Search agents by keyword
  - `list_categories` - List agent categories
  - `get_agents_by_category` - Get agents in a category
  - `invoke_agent` - Invoke specialized agent
  - `recommend_agents` - Get AI-powered recommendations
  - `create_workflow` - Create multi-agent workflow
  - `add_task` - Add task to workflow
  - `get_workflow` - Get workflow details
  - `list_workflows` - List all workflows
  - `get_execution_plan` - Get workflow execution plan
  - `get_next_tasks` - Get next executable tasks
  - `update_task_status` - Update task status
  - `get_stats` - Get agent statistics
- Comprehensive documentation:
  - README.md with full API reference
  - QUICKSTART.md for new users
  - EXAMPLES.md with 15+ usage examples
  - CONTRIBUTING.md for contributors
- All agent definitions from awesome-claude-code-subagents:
  - 11 Core Development agents
  - 23 Language Specialists agents
  - 12 Infrastructure agents
  - 12 Quality & Security agents
  - 12 Data & AI agents
  - 10 Developer Experience agents
  - 11 Specialized Domains agents
  - 11 Business & Product agents
  - 8 Meta & Orchestration agents
  - 6 Research & Analysis agents

### Categories
- **Core Development**: Essential development tasks
- **Language Specialists**: Language-specific experts
- **Infrastructure**: DevOps and cloud specialists
- **Quality & Security**: Testing and security experts
- **Data & AI**: ML and data engineering specialists
- **Developer Experience**: Tooling and productivity
- **Specialized Domains**: Domain-specific experts
- **Business & Product**: Product and business analysis
- **Meta & Orchestration**: Agent coordination
- **Research & Analysis**: Research specialists

### Technical Details
- Built with TypeScript and MCP SDK 1.19.1
- Stdio transport for universal MCP client compatibility
- Zod for runtime schema validation
- Comprehensive type safety
- Agent definitions loaded from markdown files
- Workflow dependency resolution
- Task priority and status management
- AI-powered agent recommendation system

[1.0.0]: https://github.com/9pros/agent-orchestration-mcp/releases/tag/v1.0.0
