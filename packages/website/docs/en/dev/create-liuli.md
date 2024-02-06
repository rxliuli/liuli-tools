# create-liuli

Template application for creating lib/cli that I use personally. Instructions for usage:

```bash
pnpm create liuli
# Then enter the project name and type according to the prompts
```

Currently supported types are:

*   lib: Create a lib template based on vite/vitest, providing the correct exports configuration and default support for esm.
*   cli: Create a cli template based on vite/vitest/vite-node, with default support for esm.

Planned supported templates:

*   [ ] preact web application
*   [ ] vscode plugin
*   [ ] chrome plugin
*   [ ] nodejs service
*   [ ] userscript
*   [ ] electron application
