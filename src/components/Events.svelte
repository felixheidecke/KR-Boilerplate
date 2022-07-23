<script>
  import { onMount } from 'svelte';
  import { EVENTS, GROUPS, FETCH_EVENTS, ERROR } from '@/stores/events';
  import { uniqueId } from 'lodash-es';

  // --- Props ------------------------

  export let module = [];
  export let limit = 100;

  // --- Data -------------------------

  const uid = uniqueId();

  let modal;
  let eventSelected = {};

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

<div data-component>
  {#if $ERROR}
    <Message title="Ein Fehler ist aufgetreten" type="error">
      <div slot="code">{JSON.stringify($ERROR, null, 2)}</div>
    </Message>
  {:else}
    {#each listOfEvents as event}
      <XioniEvent {...event}>
        <span slot="append" class="register">
          {#if event.flags.includes('Anmeldung')}
            <Link tag="span" icon="fas fa-sign-in-alt" on:click={modal.open}>
              Zur Anmeldung
            </Link>
          {/if}
        </span>
      </XioniEvent>
    {/each}
  {/if}

  <Modal bind:this={modal}>hello</Modal>
</div>

<style lang="scss">
  [data-component] :global {
    .Link span {
      text-decoration: underline;
    }
  }
</style>
