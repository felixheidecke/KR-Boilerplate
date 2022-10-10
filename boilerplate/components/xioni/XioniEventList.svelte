<script>
  import { onMount } from 'svelte'
  import { EVENTS, fetchEvents } from '@/stores/events'

  // --- Components -------------------

  import XioniEvent from './XioniEvent.svelte'
  import Sceleton from '../auxiliary/Sceleton.svelte'
  import { isTrue } from '@/js/utils'

  // --- Props ------------------------

  export let module
  export let limit = 100
  module = +module

  // What to show
  export let registration = false
  export let website = true
  export let pdf = true
  export let ticketshop = true

  const config = {
    show: {
      website: isTrue(website),
      registration: isTrue(registration),
      pdf: isTrue(pdf),
      ticketshop: isTrue(ticketshop)
    }
  }

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
    <XioniEvent {...event} {config} />
  {:else}
    <Sceleton />
  {/each}
</div>

<style lang="scss" global>
  :where(.XioniEvent) + :where(.XioniEvent) {
    margin-top: 1rem;
  }
</style>
