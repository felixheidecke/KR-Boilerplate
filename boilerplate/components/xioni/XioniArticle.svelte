<script>
  import classnames from 'classnames';
  import { format } from 'date-fns';
  import { de } from 'date-fns/locale';

  // --- Components -------------------

  import Picture from '../Picture.svelte';
  import Link from '../Link.svelte';

  // --- Props ------------------------

  export let author;
  export let content;
  export let date;
  export let id;
  export let image;
  export let link;
  export let pdf;
  export let text;
  export let title;

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'XioniArticle';

  $: className = classnames(baseName, $$props.class);
</script>

<article class={className} id={`article-${id}`}>
  <h2 class={baseName + '__title'}>
    {title}
  </h2>
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
  {#if image}
    <Picture
      ex-class={baseName + '__image'}
      src={image.srcSmall}
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
            ex-class={baseName + '__content-image'}
            src={image.src}
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

<style global>
  :where(.XioniArticle) {
    display: flow-root;
  }

  :where(.XioniArticle__author),
  :where(.XioniArticle__date) {
    display: inline-block;
  }

  :where(.XioniArticle__image img) {
    max-width: 10rem;
    float: left;
    margin-right: 2rem;
  }

  :where(.XioniArticle__content-image img) {
    max-width: 100%;
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
