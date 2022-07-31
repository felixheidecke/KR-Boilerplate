<script>
  import classnames from 'classnames'
  import { format } from 'date-fns'
  import { de } from 'date-fns/locale/index.js'

  // --- Components -------------------

  // --- Props ------------------------

  export let description = null
  export let details = null
  export let ends = null
  // export let flags = [];
  export let id
  export let image = null
  export let pdf = null
  export let starts = null
  export let website = null
  export let title

  // --- Data -------------------------

  const startDate = format(starts * 1000, 'PP', { locale: de })
  const endDate = format(ends * 1000, 'PP', { locale: de })

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'XioniEvent'

  $: className = classnames(baseName, $$props.class)
</script>

<div class={className} id={'xioni-event-' + id}>
  <h2 class={baseName + '__title'}>
    {title}
  </h2>
  <h3 class={baseName + '__date'}>
    Vom <time class={baseName + '__starts'}>
      {startDate}
    </time>
    bis
    <time class={baseName + '__ends'}>
      {endDate}
    </time>
  </h3>
  {#if image}
    <Picture
      class={baseName + '__image'}
      src={image.thumbSrc}
      tablet={image.src}
      alt={image.alt}
    />
  {/if}
  <div class={baseName + '__description'}>
    {@html description}
  </div>
  <div class={baseName + '__details'}>
    {@html details}
  </div>
  {#if pdf}
    <Link to={pdf.src} class={baseName + '__pdf'} icon="fas fa-file-pdf">
      {pdf.title}
    </Link>
  {/if}
  {#if website}
    <Link to={website} class={baseName + '__website'} icon="fas fa-link" />
  {/if}
  <slot />
</div>
