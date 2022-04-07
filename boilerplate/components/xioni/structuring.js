import { marked } from 'marked';
import slugify from 'slugify';

export default function (c) {
  const root = 'https://www.rheingau.de/data/';

  return {
    id: +c.id,
    module: +c.module,
    slug: slugify(`${c.id}-${c.title}`, { lower: true }),
    date: +c.date,
    author: c.author,
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
    text: c.text ? marked.parse(c.text.trim()) : null,
    content: c.paragraphs.map((p) => {
      return {
        image: p.image
          ? {
              src: root + p.image,
              alt: p.imageDescription
            }
          : null,
        text: p.text ? marked.parse(p.text.trim()) : null
      };
    })
  };
}
