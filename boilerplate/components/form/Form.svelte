<script>
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';

  export let subject = 'Subject';
  export let id = 0;

  let form; // Form HTML Element

  // State ------------

  let required = [];
  let errors = [];
  let isLoading = false;
  let isDone = false;

  $: if (errors.length) {
    setTimeout(() => (errors = []), 5000);
  }

  // Methods ----------

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
    } catch (error) {
      console.error(error);
      isDone = false;
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
</script>

<form class="Form" bind:this={form} on:submit|preventDefault={submit}>
  <input type="hidden" name="subject" value={subject} />
  <input type="hidden" name="id" value={id} />
  <input type="hidden" name="required" value={required.join(',')} />

  {#if isDone}
    <section class="-done" transition:slide>
      <slot name="done" />
    </section>
  {:else}
    <section class="-body" transition:slide>
      <slot />
    </section>
  {/if}

  <ul class="-errors">
    {#each errors as { message }}
      <li class="-error" transition:slide>
        <Error>{message}</Error>
      </li>
    {/each}
  </ul>
</form>

<style lang="scss" global>
  .Form {
    @if mixin-exists(Form-reset) {
      @include Form-reset;
    } @else {
      .-body {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .-errors {
        @include reset-list;
        position: absolute;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        bottom: 1rem;
        left: 1rem;
        right: 1rem;
      }

      @if mixin-exists(Form) {
        @include Form;
      }
    }
  }
</style>
