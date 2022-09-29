import { expect, it } from 'vitest'

it('locale', () => {
  console.log(Intl.DateTimeFormat().resolvedOptions().locale)
})
