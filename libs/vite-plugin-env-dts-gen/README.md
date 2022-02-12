# @liuli-util/vite-plugin-env-dts-gen

> [中文](https://github.com/rxliuli/liuli-tools/tree/master/libs/vite-plugin-env-dts-gen/README.zh-CN.md)

Scan environment variables to generate dts type definitions to avoid manually maintaining dts type definitions for environment variables.

## use

```sh
pnpm i -D @liuli-util/vite-plugin-env-dts-gen
```

Configure the plugin

```ts
//vite.config.ts
import { defineConfig } from 'vite'
import { envDtsGen } from '@liuli-util/vite-plugin-env-dts-gen'

export default defineConfig({
  plugins: [envDtsGen()],
})
```

> [Example](https://github.com/rxliuli/liuli-tools/tree/master/examples/vite-plugin-env-dts-gen-example)

## FAQ

### The default plugin has the following behavior

- When the `ImportMetaEnv` interface in `src/vite-env.d.ts` already contains fields, it will not be repeatedly added or replaced, but skipped. This behavior is mainly to allow users to customize environment variables
- never automatically clear an environment variable, even if it no longer exists in .env\*, for the same reason as above
- Forcibly generate an environment variable during build, even if there is no change, this behavior is to avoid building immediately after pulling the code for the first time
