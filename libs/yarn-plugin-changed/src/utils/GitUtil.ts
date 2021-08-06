import path from 'path'
import { CheckRepoActions, SimpleGit } from 'simple-git'

async function findParent(
  cwd: string,
  predicate: (dir: string) => Promise<boolean>,
): Promise<string | null> {
  if (await predicate(cwd)) {
    return cwd
  }
  const parent = path.dirname(cwd)
  if (parent === cwd) {
    return null
  }
  return findParent(parent, predicate)
}

/**
 * 找到 git 的根目录
 * @param git
 * @param cwd
 */
export async function findGitRoot(
  git: SimpleGit,
  cwd: string,
): Promise<string> {
  return (await findParent(cwd, async (dir) => {
    await git.cwd(dir)
    return git.checkIsRepo(CheckRepoActions.IS_REPO_ROOT)
  }))!
}
