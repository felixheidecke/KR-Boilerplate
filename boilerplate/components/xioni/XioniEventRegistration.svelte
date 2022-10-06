<script>
  import * as date from '@/js/format-date'
  import { SELECTED_EVENT as event, resetSelection } from '@/stores/events'

  // --- props & data -----------------

  const formId = $$props['form-id']

  $: fromToDate = $event ? date.formatFromTo($event.starts * 1000, $event.ends * 1000) : ''
</script>

<Modal title="Anmeldung" isOpen={!!$event} on:close={resetSelection}>
  {#if $event}
    <div class="$text-center">
      <h4 class="$text-center $font-large $mb-1/4">{$event.title}</h4>
      <time class="$font-small">{@html fromToDate}</time>
    </div>

    <Form id={formId} subject="Event Anmeldung ({$event.id})" class="$mt-2" attach="csv">
      <input type="hidden" name="Event" value="{$event.title} ({$event.id})" />
      <input type="hidden" name="Datum" value={date.format($event.starts * 1000, 'P')} />

      <slot />

      <div slot="done">
        <slot name="done" />
      </div>

      <div class="$text-right">
        <Submit />
      </div>
    </Form>
  {/if}
</Modal>
