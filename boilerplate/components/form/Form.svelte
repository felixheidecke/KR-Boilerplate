<script>
  import classnames from 'classnames';
  import { onMount, createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';
  import Message from '../Message.svelte';

  const emit = createEventDispatcher();

  // --- Data -------------------------

  export let subject = 'Kontakformular';
  export let id = 0;

  let form;
  let required = [];
  let errors = [];
  let isLoading = false;
  let isDone = false;
  let isDoneEl;

  $: if (errors.length) {
    setTimeout(() => (errors = []), 5000);
  }

  // --- Methods ----------------------

  const scrollToDoneText = () => {
    if (!isDoneEl) return;

    isDoneEl.scrollIntoView({
      behavior: `smooth`
    });
  };

  const submit = async () => {
    const formData = new FormData(form);
    const body = new URLSearchParams(formData).toString();

    // Reset status
    isLoading = true;
    errors = [];

    try {
      const response = await fetch('https://api.klickrhein.de/v2/form/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
      });

      errors = response.ok ? [] : await response.json();
      isDone = !errors.length;
      emit('done');

      setTimeout(scrollToDoneText, 500);
    } catch (error) {
      console.error(error);
      isDone = false;
      emit('error', error);
    } finally {
      isLoading = false;
    }
  };

  // collect required entries
  onMount(() => {
    form.querySelectorAll('[required]').forEach((element) => {
      required = [...required, element.getAttribute('name')];
    });
  });

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'Form';

  $: className = classnames(baseName, $$props.class);
</script>

<form class={className} bind:this={form} on:submit|preventDefault={submit}>
  <input type="hidden" name="subject" value={subject} />
  <input type="hidden" name="id" value={id} />
  <input type="hidden" name="required" value={required.join(',')} />
  <input type="text" name="honig" style="position:absolute;left:-9999px;" />

  {#if isDone}
    <section bind:this={isDoneEl} class={baseName + '__done'} transition:slide>
      <slot name="done" />
    </section>
  {:else}
    <section class={baseName + '__body'}>
      <slot />
    </section>
  {/if}

  {#if errors.length}
    <Message
      class={baseName + '__errors'}
      type="error"
      title="Fehler aufgetreten"
    >
      <ul>
        {#each errors as { message }}
          <li>{message}</li>
        {/each}
      </ul>
    </Message>
  {/if}
</form>
