declare module 'spinnies' {
  type Spinnie = (
    id: string,
    args: {
      text: string
    },
  ) => void

  export default class Spinnies {
    add: Spinnie
    succeed: Spinnie
    fail: Spinnie
  }
}
