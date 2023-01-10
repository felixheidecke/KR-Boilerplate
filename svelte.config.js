import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'

export default {
  onwarn: (warning, handler) => {
    if (warning.code.startsWith('a11y-')) {
      return
    }
    handler(warning)
  },
  kit: {
    adapter: adapter({
      pages: 'htdocs',
      assets: 'htdocs',
      fallback: false,
      precompress: false
    }),

    prerender: {
      default: true,
      entries: [
        '*',
        '/sitemap.xml',
        '/info.json'
        // '/article-0',
        // '/event-0',
      ]
    },

    trailingSlash: 'never'
  },

  preprocess: [
    preprocess({
      scss: {
        prependData: `
          @import "boilerplate/styles/variables";
          @import "src/styles/variables";
          `
      }
    })
  ]
}
