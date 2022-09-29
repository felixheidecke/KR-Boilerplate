import { readable } from 'svelte/store'
import { getJSON } from '@/js/fetch'
import { browser } from '$app/env'

export const BP_INFO = readable({ version: 'dev', build: 'dev' }, (set) => {
  if (!browser) return

  getJSON('/info.json').then(set)
})
