<script>
  import { format } from 'date-fns';
  import { marked } from 'marked';

  const root = 'https://www.rheingau.de/data/';

  const promise = fetch('https://api.klickrhein.de/news.php?id=1383')
    .then((res) => res.json())
    .then((content) => {
      return content.map((c) => {
        return {
          author: c.author,
          date: +c.date,
          id: +c.id,
          title: c.title,
          image: c.image
            ? {
                src: root + c.image,
                srcSmall: root + c.imageSmall,
                alt: c.imageDescription
              }
            : null,
          pdf: c.pdf
            ? {
                src: root + c.pdf,
                name: c.pdfName,
                title: c.pdfTitle || c.pdfName
              }
            : null,
          text: marked.parse(c.text.trim()),
          content: c.paragraphs.map((p) => {
            return {
              image: p.image
                ? {
                    src: p.image,
                    alt: p.imageDescription
                  }
                : null,
              text: marked.parse(p.text.trim())
            };
          })
        };
      });
    });
</script>

<div class={['xioni'].toClass($$props)}>
  {#await promise}
    <section>
      <h2>Loading Headline</h2>
      <p>Lorem Ipsum</p>
    </section>
  {:then articles}
    {#each articles as article}
      <article class="-article" data-id={article.id}>
        <h2 class="-title">
          {article.title}
        </h2>
        <ul class="-meta">
          {#if article.author}
            <li class="-meta-author">Von {article.author}</li>
          {/if}
          {#if article.date}
            <li class="-meta-date">
              <time>{format(article.date, 'dd.MM.yyyy')}</time>
            </li>
          {/if}
          {#if article.pdf}
            <li class="-meta-pdf">
              <IconPdf />
              <a href={article.pdf.src} target="_blank" rel="follow" title={article.pdf.name}>{article.pdf.title}</a>
            </li>
          {/if}
        </ul>
        {#if article.image}
          <Picture
            ex-class="-picture"
            src={article.image.src}
            tablet={article.image.srcSmall}
            alt={article.image.alt}
          />
        {/if}
        {@html article.text}
        {#if article.link}
          <a href={article.link} rel="nofollow" target="_blank">{article.link}</a>
        {/if}
      </article>
    {/each}
  {/await}
</div>

<style lang="scss" global>
  .xioni {
    .-meta {
      @include reset-list;

      &-author,
      &-date {
        display: inline-block;
      }

      &-pdf {
        display: flex;
        align-items: center;

        svg {
          max-width: 1rem;
          max-height: 1rem;
          margin-right: 0.333rem;
        }
      }
    }
  }
</style>
