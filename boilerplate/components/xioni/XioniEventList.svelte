<script>
  import { onMount } from 'svelte'
  import { EVENTS, fetchEvents } from '@/stores/events'

  // --- Components -------------------

  import XioniEvent from './XioniEvent.svelte'
  import Sceleton from '../auxiliary/Sceleton.svelte'

  // --- Props ------------------------

  export let limit = 100
  export let module = ''
  export let registration = false

  module = +module

  // --- Data -------------------------

  $: listOfEvents = $EVENTS.filter((event) => event.module === module).splice(0, limit) || []

  // --- Lifecycle --------------------

  onMount(() => fetchEvents(module, { limit }))
</script>

<svelte:head>
  <link rel="preconnect" href="https://www.rheingau.de" />
</svelte:head>

<div class="XioniEventList">
  {#each listOfEvents as event}
    <XioniEvent {...event} {registration} />
  {:else}
    <Sceleton />
  {/each}
</div>

<style lang="scss" global>
  :where(.XioniEvent) + :where(.XioniEvent) {
    margin-top: 1rem;
  }
</style>
