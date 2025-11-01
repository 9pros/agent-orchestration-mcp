# Contributing to Agent Orchestration MCP

Thank you for your interest in contributing! This project aims to provide the best multi-agent orchestration experience for AI development.

## 🤝 Ways to Contribute

### 1. Report Issues

Found a bug or have a feature request? [Open an issue](https://github.com/9pros/agent-orchestration-mcp/issues/new).

**For bugs, please include:**
- Description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Your environment (OS, Node version, MCP client)
- Relevant logs or error messages

**For feature requests, please include:**
- Clear description of the feature
- Use case and benefits
- Suggested implementation (optional)

### 2. Improve Documentation

Help make the project more accessible:
- Fix typos or clarify confusing sections
- Add more examples to EXAMPLES.md
- Improve API documentation
- Translate documentation to other languages
- Create video tutorials or blog posts

### 3. Add or Improve Agents

The agent definitions come from [awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents). To add or improve agents:

1. Fork the [awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) repository
2. Make your changes following their [contribution guidelines](https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/CONTRIBUTING.md)
3. Submit a PR to that repository
4. Once merged, we'll update this server to include the changes

### 4. Improve the Server

Enhance the MCP server itself:
- Add new tools or features
- Improve orchestration algorithms
- Optimize performance
- Fix bugs
- Add tests

### 5. Share Your Experience

Help others learn:
- Write blog posts about using the server
- Create example projects
- Share workflows you've created
- Answer questions in discussions
- Help other users in Discord

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- TypeScript knowledge (for code contributions)

### Setup Development Environment

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/agent-orchestration-mcp.git
   cd agent-orchestration-mcp
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Build the Project**
   ```bash
   npm run build
   ```

4. **Test Locally**
   ```bash
   node dist/index.js
   ```

   The server should output: `Agent Orchestration MCP Server running on stdio`

### Development Workflow

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Edit TypeScript files in `src/`
   - Follow the existing code style
   - Add comments for complex logic

3. **Build and Test**
   ```bash
   npm run build
   npm run test
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   Use conventional commit messages:
   - `feat:` new feature
   - `fix:` bug fix
   - `docs:` documentation changes
   - `refactor:` code refactoring
   - `test:` adding tests
   - `chore:` maintenance tasks

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   
   Then create a Pull Request on GitHub.

## 📝 Code Guidelines

### TypeScript Style

- Use TypeScript strict mode
- Add type annotations for public APIs
- Use interfaces for data structures
- Document complex functions with JSDoc comments
- Follow existing naming conventions

### Code Structure

```
src/
├── index.ts           # Main MCP server
├── types.ts           # Type definitions
├── agent-registry.ts  # Agent loading and management
└── orchestrator.ts    # Workflow orchestration
```

### Adding New Tools

To add a new MCP tool:

1. **Add Tool Definition** in `getTools()`:
   ```typescript
   {
     name: "your_tool_name",
     description: "Clear description of what the tool does",
     inputSchema: {
       type: "object",
       properties: {
         param1: {
           type: "string",
           description: "Parameter description"
         }
       },
       required: ["param1"]
     }
   }
   ```

2. **Add Handler** in `setupHandlers()`:
   ```typescript
   case "your_tool_name":
     return await this.handleYourTool(args);
   ```

3. **Implement Handler Method**:
   ```typescript
   private async handleYourTool(args: unknown) {
     const schema = z.object({ 
       param1: z.string() 
     });
     const { param1 } = schema.parse(args);
     
     // Your implementation
     
     return {
       content: [{
         type: "text",
         text: JSON.stringify(result, null, 2)
       }]
     };
   }
   ```

4. **Update Documentation**:
   - Add to README.md tools table
   - Add examples to EXAMPLES.md
   - Update QUICKSTART.md if relevant

## 🧪 Testing

### Manual Testing

1. Build the project: `npm run build`
2. Configure in your MCP client
3. Test all modified functionality
4. Verify with multiple agents and workflows

### Test Checklist

- [ ] Agent listing works
- [ ] Agent search returns correct results
- [ ] Agent invocation provides proper guidance
- [ ] Workflow creation and task management works
- [ ] Execution plans are correct
- [ ] Dependencies are respected
- [ ] Error handling is appropriate
- [ ] Documentation is updated

## 📚 Documentation

### Documentation Structure

- **README.md** - Main documentation, features, installation, API reference
- **QUICKSTART.md** - Quick start guide for new users
- **EXAMPLES.md** - Detailed usage examples
- **CONTRIBUTING.md** - This file
- **LICENSE** - MIT license

### Writing Good Documentation

- Use clear, concise language
- Provide code examples
- Include both simple and complex use cases
- Keep examples up-to-date with code changes
- Use consistent formatting

## 🎯 Pull Request Process

### Before Submitting

- [ ] Code builds without errors
- [ ] Code follows project style
- [ ] All tools still work
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] Branch is up-to-date with main

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How you tested your changes

## Checklist
- [ ] Code builds successfully
- [ ] Documentation updated
- [ ] Tested with MCP client
```

### Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged
4. Your contribution will be included in the next release

## 🌟 Recognition

Contributors are recognized in:
- GitHub contributors list
- Release notes
- Project README (for significant contributions)

## 📧 Contact

- GitHub Issues: Bug reports and feature requests
- GitHub Discussions: Questions and general discussion
- Discord: Real-time chat and community support

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Every contribution, no matter how small, helps make this project better. Thank you for being part of the community!
