import { execSync } from 'child_process'
import { parsePackageJson } from './bin'

export async function forward() {
  const cfg = await parsePackageJson()
  const args = process.argv.slice(2).join(' ')
  const cmd = `${cfg.name} ${args}`
  execSync(cmd, { cwd: '.cache/', stdio: 'inherit' })
}
