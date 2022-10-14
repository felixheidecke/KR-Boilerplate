<script>
  import classnames from 'classnames'
  import { onMount, createEventDispatcher } from 'svelte'
  import Message from '../Message.svelte'
  import { API_URL } from '@/js/constants'
  import { formToJson } from '@/js/utils'
  import { fetchJSON } from '@/js/fetch'

  const emit = createEventDispatcher()

  // --- Data -------------------------

  export let subject = 'Kontakformular'
  export let id = 0
  export let attach = false

  let form
  let required = []
  let errors = []
  let isLoading = false
  let isDone = false
  let isDoneEl

  // --- Methods ----------------------

  const scrollToDoneText = () => {
    if (!isDoneEl || !$$slots.done) return

    isDoneEl.scrollIntoView({
      behavior: `smooth`
    })
  }

  export const submit = async () => {
    if (isDone) return

    // Reset status
    isLoading = true
    errors = []

    try {
      const url = [API_URL, 'form'].join('/')
      const { data, status } = await fetchJSON(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: formToJson(form),
        params: attach === 'csv' ? { attach: 'csv' } : null
      })

      if (status >= 400) throw responseBody

      if (data.error) {
        errors = data.message.split(',')
        isDone = false
        emit('error', data.error)
        return
      }

      isDone = true
      emit('done')
      setTimeout(scrollToDoneText, 500)
    } catch (error) {
      isDone = false
      errors = [error]
      emit('error', error)
    } finally {
      isLoading = false
    }
  }

  // collect required entries
  onMount(() => {
    form.querySelectorAll('[required]').forEach((element) => {
      required = [...required, element.getAttribute('name')]
    })
  })

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'Form'

  $: className = classnames(baseName, $$props.class)
</script>

<form class={className} bind:this={form} on:submit|preventDefault={submit}>
  <input type="hidden" name="subject" value={subject} />
  <input type="hidden" name="id" value={id} />
  <input type="hidden" name="required" value={required.join(',')} />
  <input type="text" name="honig" style="position:absolute;left:-9999px;" />

  {#if isDone}
    <div bind:this={isDoneEl} class={baseName + '__done'}>
      <slot name="done" />
    </div>
  {:else}
    <div class={baseName + '__body'}>
      <slot />
    </div>
  {/if}

  {#if errors.length}
    <Message class="{baseName}__errors $mt" type="error" title="Fehler aufgetreten">
      <ul>
        {#each errors as { message }}
          <li>{message}</li>
        {/each}
      </ul>
    </Message>
  {/if}
</form>
