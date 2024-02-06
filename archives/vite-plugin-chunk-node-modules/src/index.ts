import { defineConfig, Plugin, splitVendorChunkPlugin } from 'vite'

function chunkNodeModulesDynamic(): Plugin {
  return {
    name: 'vite-plugin-chunk-node-modules',
    enforce: 'pre',
    config() {
      return {
        build: {
          rollupOptions: {
            output: {
              manualChunks(id) {
                if (id.includes('node_modules')) {
                  const regex = /.*node_modules\/((?:@[^\/]+\/)?[^\/]+)/
                  const match = regex.exec(id)
                  if (match) {
                    return match[1]
                  }
                  return 'vender'
                }
              },
            },
          },
        },
      }
    },
    apply: 'build',
  }
}

export function chunk(): Plugin[] {
  return [splitVendorChunkPlugin(), chunkNodeModulesDynamic()]
}
