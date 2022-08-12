<script>
  import classnames from 'classnames'
  import { format } from 'date-fns'
  import { de } from 'date-fns/locale/index.js'

  // --- Components -------------------

  import Picture from '../Picture.svelte'
  import Link from '../Link.svelte'

  // --- Props ------------------------

  export let author = null
  export let content = null
  export let date = null
  export let id
  export let image = null
  export let link = null
  export let pdf = null
  export let text = null
  export let title = null
  export let website = null

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'XioniArticle'

  $: className = classnames(baseName, $$props.class)
</script>

<article class={className} id={'xioni-article-' + id}>
  {#if image}
    <Picture
      class={baseName + '__image'}
      src={image.thumbSrc}
      tablet={image.src}
      alt={image.alt}
    />
  {/if}
  <h2 class={baseName + '__title $mt-0@tablet-up'}>
    {title}
  </h2>
  {#if author || date}
    <div class={baseName + '__meta'}>
      {#if author}
        <span class={baseName + '__author'}>Von {author}</span>
      {/if}
      {#if date}
        <time class={baseName + '__date'}>
          {format(date * 1000, 'PPP', { locale: de })}
        </time>
      {/if}
    </div>
  {/if}
  <div class={baseName + '__teaser'}>
    {@html text}
  </div>

  {#if content}
    <div class={baseName + '__content'}>
      {#each content as { image, text }}
        {#if image}
          <Picture
            src={image.src}
            ex-class={baseName + '__content-image'}
            alt={image.alt}
            align={image.position}
          />
        {/if}
        {#if text}
          {@html text}
        {/if}
      {/each}
    </div>
  {/if}

  {#if pdf}
    <Link to={pdf.src} class={baseName + '__pdf'} icon="fas fa-file-pdf">
      {pdf.title}
    </Link>
  {/if}

  {#if link}
    <Link to={website} class={baseName + '__website'} icon="fas fa-link" />
  {/if}

  <slot />
</article>

<style global lang="scss">
  :where(.XioniArticle) {
    display: flow-root;
    background-color: rgba(0, 0, 0, 0.05);
    padding: 1rem;
  }
  :where(.XioniArticle__image) {
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

  :where(.XioniArticle__meta) {
    display: flex;
    gap: 0.25rem;
    font-size: 0.875rem;
    transform: translateY(-1rem);
    font-style: italic;
  }

  :where(.XioniArticle__content-image) {
    display: inline-block;
    max-width: 18rem;
  }

  :where(.XioniArticle__content-image--right) {
    float: right;
    margin-left: 1rem;
  }

  :where(.XioniArticle__content-image--left) {
    float: left;
    margin-right: 1rem;
  }

  :where(.XioniArticle__content ul) {
    list-style-type: disc;
    padding-left: 2rem;
  }

  :where(.XioniArticle__pdf) {
    display: flex;
    align-items: center;
  }

  :where(.XioniArticle__pdf svg) {
    max-width: 1rem;
    max-height: 1rem;
    margin-right: 0.333rem;
  }
</style>
