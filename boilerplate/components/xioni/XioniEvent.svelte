<script>
  import classnames from 'classnames'
  import { formatFromTo } from '@/js/format-date'
  import { selectEvent } from '@/stores/events'
  import { slide } from 'svelte/transition'

  // --- Components -------------------

  import Picture from '../Picture.svelte'
  import Button from '../Button.svelte'
  import Link from '../Link.svelte'

  // --- Date & Props -----------------

  let expanded = false

  export let description = null
  export let details = null
  export let ends = null
  export let id
  export let image = null
  export let module
  export let pdf = null
  export let starts = null
  export let title
  export let website = null
  export let flags = []
  export let registration = false

  const startDate = starts * 1000
  const endDate = ends * 1000

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'XioniEvent'

  $: className = classnames(baseName, $$props.class)
</script>

<div data-component class={className} data-xioni-mid="{module}/{id}">
  {#if image}
    <Picture class={baseName + '__image'} src={image.thumbSrc} tablet={image.src} alt={image.alt} />
  {/if}
  <h2 class={baseName + '__title $mt-0@tablet-up'}>
    {title}
  </h2>
  <h3 class={baseName + '__date'}>
    <date>
      {@html formatFromTo(startDate, endDate)}
    </date>
  </h3>
  <div class={baseName + '__description'}>
    {@html description}
    {#if !expanded}
      <Link tag="span" class="{baseName}__expand" on:click={() => (expanded = true)}>
        ... weiterlesen
      </Link>
    {/if}
  </div>
  {#if expanded}
    <div class={baseName + '__details'} transition:slide>
      {@html details}
    </div>
  {/if}
  {#if website}
    <Link to={website} class={baseName + '__website'} icon="fas fa-link" />
  {/if}
  <div class="$mt">
    {#if pdf}
      <Button to={pdf.src} target="_blank" class={baseName + '__pdf'} icon="fas fa-file-pdf">
        {pdf.title}
      </Button>
    {/if}
    {#if registration && flags.includes('Anmeldung')}
      <Button
        on:click={() => selectEvent(id)}
        class="{baseName}__register"
        icon="fas fa-sign-in-alt"
      >
        Zur Anmeldung
      </Button>
    {/if}
  </div>
  <slot />
</div>

<style global lang="scss">
  :where(.XioniEvent) {
    display: flow-root;
    background-color: rgba(0, 0, 0, 0.05);
    padding: 1rem;
    position: relative;
  }

  :where(.XioniEvent__image) {
    width: 100%;
    max-height: 65vw;
    object-fit: cover;

    @include breakpoint('tablet-up') {
      float: right;
      margin: 0 0 1.5rem 1.5rem;
      width: 280px;
      height: 210px;
    }
  }

  :where(.XioniEvent__expand) {
    transform: translateY(-0.5rem);
    display: block;
    text-decoration: underline;
  }

  :where(.XioniEvent__meta) {
    display: flex;
    gap: 0.25rem;
    font-size: 0.875rem;
    transform: translateY(-1rem);
    font-style: italic;
  }

  :where(.XioniEvent__content-image) {
    display: inline-block;
    max-width: 18rem;
  }

  :where(.XioniEvent__content-image--right) {
    float: right;
    margin-left: 1rem;
  }

  :where(.XioniEvent__content-image--left) {
    float: left;
    margin-right: 1rem;
  }

  :where(.XioniEvent__content ul) {
    list-style-type: disc;
    padding-left: 2rem;
  }

  :where(.XioniEvent__pdf) {
    display: inline-flex;
    align-items: center;
    width: fit-content;
  }

  :where(.XioniEvent__pdf svg) {
    max-width: 1rem;
    max-height: 1rem;
    margin-right: 0.333rem;
  }
</style>
