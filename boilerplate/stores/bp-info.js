import { readable } from 'svelte/store'
import { fetchJSON } from '@/js/fetch'
import { browser } from '$app/env'

export const BP_INFO = readable({ version: 'dev', build: 'dev' }, (set) => {
  if (!browser) return

  fetchJSON(document.location.origin + '/info.json').then(({ data }) => set(data))
})
