# @liuli-util/vite-plugin-firefox-dist

Converts a built Chrome extension into a Firefox extension, only allowing Firefox versions that support manifest v3. Refer to the [Firefox Manifest v3 Migration Guide](https://extensionworkshop.com/documentation/develop/manifest-v3-migration-guide/).

## Usage

Configure in vite.config.ts:

```ts
import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import { firefox } from '@liuli-util/vite-plugin-firefox-dist'

export default defineConfig({
  plugins: [
    crx({
      manifest,
    }),
    firefox(),
  ],
})
```

This extension will perform some transformations on the manifest.json of the Chrome extension located in the dist directory, and place the converted files in the dist-firefox directory. Later, you can use web-ext to package them into a zip file and submit it.
