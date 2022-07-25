<script>
  import { onMount } from 'svelte';
  import { EVENTS, GROUPS, FETCH_EVENTS, ERROR } from '@/stores/events';
  import { uniqueId } from 'lodash-es';
  import { format } from 'date-fns';
  import { de } from 'date-fns/locale/index.js';
  import Textarea from '@/components/form/Textarea.svelte';

  // --- Props ------------------------

  export let module = [];
  export let limit = 100;

  // --- Methods ----------------------

  const handleRegisterButton = (event) => {
    selectedEvent = event;
    modal.open();
  };

  // --- Data -------------------------

  const uid = uniqueId();

  let modal;
  let selectedEvent = {};

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
            <Link
              tag="span"
              icon="fas fa-sign-in-alt"
              on:click={() => handleRegisterButton(event)}
            >
              Zur Anmeldung
            </Link>
          {/if}
        </span>
      </XioniEvent>
    {/each}
  {/if}

  <Modal bind:this={modal} title="Anmeldung">
    <p class="$text-center">
      <strong class="$font-large">{selectedEvent.title}</strong>
      <br />
      <span class="$font-small">
        {format(selectedEvent.starts * 1000, 'PP', { locale: de })} &ndash;
        {format(selectedEvent.ends * 1000, 'PP', { locale: de })}
      </span>
      <span class="$ml $font-small">Nr.: {selectedEvent.id}</span>
    </p>

    <Form
      class="$mt"
      id="4"
      subject={`Anmeldung: ${selectedEvent.title} (${selectedEvent.id})`}
    >
      <Input
        name="name"
        label="Teilnehmer/in"
        placeholder="Vor- und Nachname"
        class="$mt"
        required
      />
      <Input
        type="date"
        name="birthday"
        label="Geburtsdatum"
        class="$mt"
        required
      />
      <Textarea
        name="address"
        label="Adresse/Anschrift"
        placeholder={`Straße Hausnummer\nPLZ Ort\nLand`}
        class="$mt"
        required
      />
      <Input name="phone" label="Telefonnummer" class="$mt" required />
      <Input
        type="email"
        name="email"
        label="E-Mail-Adresse"
        class="$mt"
        required
      />
      <Textarea
        name="address"
        label="Besondere Hinweise"
        placeholder="Allergien, Medikamenteneinnahme, evtl. körperliche Einschränkungen."
        class="$mt"
      />
      <Checkbox
        class="$mt-2"
        name="Einverständnis"
        required
        label="Ich melde mein Kind verbindlich als Teilnehmer/in verbindlich zur
      Freizeit an. Mir ist bewusst, dass wir mit den Kindern auch einen
      Ausflug machen, für den ich hiermit das Einverständnis erteile."
      />

      <Checkbox
        class="$mt-2"
        name="Presse"
        label="Ich erlaube die Nutzung des entstandenen Bild- und
        Filmmaterials zur Nutzung und Veröffentlichung auf den Seiten
        der Veranstalter und der Presse."
      />

      <Submit class="$mt-2" text="Anmeldung abschicken" />

      <Message slot="done">
        Vielen Dank für die Anmeldung zum {selectedEvent.title}
      </Message>
    </Form>
  </Modal>
</div>

<style lang="scss">
  [data-component] :global {
    .Link span {
      text-decoration: underline;
    }

    ul {
      display: flex;
      flex-direction: column;
      list-style: disc;
      padding-left: 1.5rem;
      gap: 0.75rem;
    }
  }

  // table {
  //   width: 100%;

  //   td {
  //     padding: 0;
  //   }

  //   td + td {
  //     padding: 0 0 0 0.5rem;
  //   }
  // }
</style>
