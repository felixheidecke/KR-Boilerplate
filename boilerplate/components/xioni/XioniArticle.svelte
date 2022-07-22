<script>
  import classnames from 'classnames';
  import { format } from 'date-fns';
  import { de } from 'date-fns/locale';

  // --- Components -------------------

  import Picture from '../Picture.svelte';
  import Link from '../Link.svelte';

  // --- Props ------------------------

  export let author = null;
  export let content = null;
  export let date = null;
  export let id;
  export let image = null;
  export let link = null;
  export let pdf = null;
  export let text = null;
  export let title = null;

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'XioniArticle';

  $: className = classnames(baseName, $$props.class);
</script>

<article class={className} id={`article-${id}`}>
  <h2 class={baseName + '__title'}>
    {title}
  </h2>
  {#if author || date}
    <div class={baseName + '__meta'}>
      {#if author}
        <span class={baseName + '__author'}>Von {author}</span>
      {/if}
      {#if date}
        <time class={baseName + '__date'}>
          {format(date * 1000, 'PP', { locale: de })}
        </time>
      {/if}
    </div>
  {/if}
  {#if image}
    <Picture
      class={baseName + '__image'}
      src={image.thumbSrc}
      tablet={image.src}
      alt={image.alt}
    />
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
    <a
      href={pdf.src}
      class={baseName + '__pdf'}
      target="_blank"
      rel="follow"
      title={pdf.name}
    >
      {pdf.title}
    </a>
  {/if}

  {#if link}
    <Link to={link} ex-class={baseName + '__link'}>{link}</Link>
  {/if}
</article>

<style global lang="scss">
  :where(.XioniArticle) {
    display: flow-root;
  }

  :where(.XioniArticle__meta) {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  :where(.XioniArticle__image) {
    max-width: 10rem;
    float: left;
    margin-right: 1.5rem;
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
