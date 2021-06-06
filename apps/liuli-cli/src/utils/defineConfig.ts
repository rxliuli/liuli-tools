import { RollupOptions } from 'rollup'

export function defineConfig(options: RollupOptions): RollupOptions
export function defineConfig(options: RollupOptions[]): RollupOptions[]
/**
 * Auxiliary function for defining rollup configuration
 * Mainly to facilitate IDE code prompts, after all, export default does not prompt, even if you add @type annotations, it is not accurate
 * @param options
 */
export function defineConfig<T extends RollupOptions | RollupOptions[]>(
  options: T,
): T {
  return options
}
