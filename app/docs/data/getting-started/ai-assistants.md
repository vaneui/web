VaneUI styles components with boolean props. An AI assistant that guesses from other libraries writes `variant="filled"` or `size="lg"` instead, and VaneUI ignores both. Giving the assistant VaneUI's own docs prevents this. The MCP server is the most direct way; llms.txt and the Markdown copy of each page work with any tool that can read a URL.

## Connect the `@vaneui/mcp` server

`@vaneui/mcp` is the official [Model Context Protocol](https://modelcontextprotocol.io) server for VaneUI. It exposes every docs page as a resource and provides two tools: `search_docs` searches the docs, and `get_component_props` returns a component's boolean props with their defaults. It is listed in the official MCP Registry as `io.github.vaneui/mcp` and needs Node.js 24.

### Claude Code

```bash
claude mcp add vaneui -- npx -y @vaneui/mcp
```

### Cursor

Add the server to `.cursor/mcp.json` in your project, or to `~/.cursor/mcp.json` for every project:

```json
{
  "mcpServers": {
    "vaneui": { "command": "npx", "args": ["-y", "@vaneui/mcp"] }
  }
}
```

### VS Code

Add the server to `.vscode/mcp.json` in your project. VS Code uses a `servers` key instead of `mcpServers`:

```json
{
  "servers": {
    "vaneui": { "command": "npx", "args": ["-y", "@vaneui/mcp"] }
  }
}
```

### Claude Desktop

Add the same `mcpServers` entry as Cursor to `claude_desktop_config.json`, then restart Claude Desktop.

## llms.txt and Markdown pages

For assistants without MCP support, point them at the plain-text docs:

- [llms.txt](/llms.txt) lists every docs page with a one-line summary and a link to its Markdown copy.
- [llms-full.txt](/llms-full.txt) contains every docs page, including props tables, in one file.
- Every docs page has a Markdown copy at its URL with `.md` appended, for example [/docs/basic-components/button.md](/docs/basic-components/button.md). A request to the normal URL with an `Accept: text/markdown` header also returns Markdown.
- The **Copy as Markdown** button under each page title copies the page for pasting into a chat.

## VaneUI rules for agent instruction files

Add these lines to your project's agent instructions, such as `CLAUDE.md`, `AGENTS.md` or `.cursor/rules`:

```text
- Style VaneUI components with boolean props: <Button danger lg filled>. Never pass variant, size or appearance strings.
- Pass at most one value per category: one size, one appearance, one variant, one shape.
- Leave out props that are already defaults. Button is already sm, primary, outline and rounded.
- Wrap the app once in <ThemeProvider> at the root.
- Prefer VaneUI props to Tailwind classes: fontBold, not className="font-bold".
- Check prop names and defaults on vaneui.com/docs or with the @vaneui/mcp server before guessing.
```

The [Core Concepts](/docs/getting-started/core-concepts) page explains why the props work this way, and [Common Props](/docs/reference/common-props) lists the layout props every component shares.
