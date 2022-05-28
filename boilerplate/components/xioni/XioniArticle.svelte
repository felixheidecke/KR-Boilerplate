<script>
  import { classNameHelper } from '@/js/utils';
  import { format } from 'date-fns';
  import { de } from 'date-fns/locale';

  // --- Props --------
  export let author;
  export let content;
  export let date;
  export let id;
  export let image;
  export let link;
  export let pdf;
  export let text;
  export let title;
</script>

<article class={classNameHelper(['XioniArticle'], $$props)} id={`article-${id}`}>
  <h2 class="-title">
    {title}
  </h2>
  <div class="-meta">
    {#if author}
      <span class="-meta-author">Von {author}</span>
    {/if}
    {#if date}
      <time class="-meta-date">{format(date * 1000, 'PP', { locale: de })}</time>
    {/if}
  </div>
  {#if image}
    <Picture ex-class="-picture" src={image.srcSmall} tablet={image.src} alt={image.alt} />
  {/if}
  <div class="-teaser">
    {@html text}
  </div>

  {#if content}
    <div class="-text">
      {#each content as { image, text }}
        {#if image}
          <Picture ex-class="-text-picture" src={image.src} alt={image.alt} align={image.position} />
        {/if}
        {#if text}
          {@html text}
        {/if}
      {/each}
    </div>
  {/if}

  {#if pdf}
    <a href={pdf.src} class="-pdf" target="_blank" rel="follow" title={pdf.name}>{pdf.title}</a>
  {/if}

  {#if link}
    <a href={link} class="-link" rel="nofollow" target="_blank">{link}</a>
  {/if}
</article>

<style lang="scss" global>
  :where(.XioniArticle) {
    display: flow-root;

    .-meta-author,
    .-meta-date {
      display: inline-block;
    }

    .-picture img {
      max-width: 10rem;
      float: left;
      margin-right: 2rem;
    }

    .-text-picture img {
      max-width: 100%;
    }

    .-text ul {
      list-style-type: disc;
      padding-left: 2rem;
    }

    .-pdf {
      display: flex;
      align-items: center;

      svg {
        max-width: 1rem;
        max-height: 1rem;
        margin-right: 0.333rem;
      }
    }
  }
</style>
