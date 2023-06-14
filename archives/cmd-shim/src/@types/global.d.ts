declare module 'cmd-shim' {
  export function ifExists(from: string, to: string): Promise<void>
  export default function cmdShim(from: string, to: string): Promise<void>
}
