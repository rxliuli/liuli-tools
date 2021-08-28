function slice(s: string) {
  return s.slice(0, s.length - 1)
}

console.log('NPM_TOKEN', slice(process.env.NPM_TOKEN))
console.log('GITHUB_TOKEN', slice(process.env.GITHUB_TOKEN))
