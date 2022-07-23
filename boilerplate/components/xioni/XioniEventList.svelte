<script>
  import { onMount } from 'svelte';
  import { EVENTS, GROUPS, FETCH_EVENTS, ERROR } from '@/stores/events';
  import { uniqueId } from 'lodash-es';
  import XioniEvent from './XioniEvent.svelte';

  // --- Components -------------------

  // --- Props ------------------------

  export let module = [];
  export let limit = 100;

  // --- Data -------------------------

  const uid = uniqueId();

  $: listOfEvents =
    $EVENTS.filter((event) => module.includes(event.module)) || [];

  // --- Lifecycle --------------------

  onMount(async () => {
    if ($GROUPS.includes(uid)) return;
    await FETCH_EVENTS(uid, { module, limit });
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://www.rheingau.de" />
</svelte:head>

<div class="XioniEventList">
  {#if $ERROR}
    <Message title="Ein Fehler ist aufgetreten" type="error">
      <div slot="code">{JSON.stringify($ERROR, null, 2)}</div>
    </Message>
  {:else}
    {#each listOfEvents as event}
      <XioniEvent {...event} />
    {/each}
  {/if}
</div>
