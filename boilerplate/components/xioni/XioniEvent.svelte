<script>
  import classnames from 'classnames'
  import formatFromToDate from '@/js/format-from-to-date'

  // --- Components -------------------

  import Picture from '../Picture.svelte'
  import Button from '../Button.svelte'
  import Link from '../Link.svelte'

  // --- Props ------------------------

  export let description = null
  export let details = null
  export let ends = null
  export let id
  export let image = null
  export let pdf = null
  export let starts = null
  export let website = null
  export let title

  const startDate = starts * 1000
  const endDate = ends * 1000

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'XioniEvent'

  $: className = classnames(baseName, $$props.class)
</script>

<div data-component class={className} id={'xioni-event-' + id}>
  {#if image}
    <Picture class={baseName + '__image'} src={image.thumbSrc} tablet={image.src} alt={image.alt} />
  {/if}
  <h2 class={baseName + '__title $mt-0@tablet-up'}>
    {title}
  </h2>
  <h3 class={baseName + '__date'}>
    <date>
      {@html formatFromToDate(startDate, endDate)}
    </date>
  </h3>
  <div class={baseName + '__description'}>
    {@html description}
  </div>
  <div class={baseName + '__details'}>
    {@html details}
  </div>
  {#if website}
    <Link to={website} class={baseName + '__website'} icon="fas fa-link" />
  {/if}
  {#if pdf}
    <Button to={pdf.src} target="_blank" class={baseName + '__pdf'} icon="fas fa-file-pdf">
      {pdf.title}
    </Button>
  {/if}
  <slot />
</div>

<style global lang="scss">
  :where(.XioniEvent) {
    display: flow-root;
    background-color: rgba(0, 0, 0, 0.05);
    padding: 1rem;
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
