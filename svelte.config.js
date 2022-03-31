import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import content from '@originjs/vite-plugin-content';
import autoImport from 'vite-plugin-autoimport';
import { resolve } from 'path';
import markdown from 'vite-plugin-markdown';

const config = {
  kit: {
    adapter: adapter({
      // default options are shown
      pages: 'htdocs',
      assets: 'htdocs',
      fallback: null,
      precompress: true
    }),

    target: '#app',

    vite: {
      plugins: [
        markdown.plugin({ mode: 'html' }),
        content.default(),
        autoImport({
          components: ['./boilerplate', './src/components'],
          include: ['**/*.svelte'],
          exclude: ['**/node_modules/**'],

          mapping: {
            foo: `import { breakpoints } from 'boilerplate/stores/breakpoints'`
          }
        })
      ],
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `
              @import "boilerplate/styles/variables.scss";
              @import "src/styles/variables.scss";
            `
          }
        }
      },
      server: {
        fs: {
          allow: ['./boilerplate']
        }
      },
      resolve: {
        alias: {
          // Boilderplate
          boilerplate: resolve('./boilerplate/'),
          src: resolve('./src/'),
        }
      }
    }
  },

  preprocess: [
    preprocess({
      scss: {
        prependData: `
          @import "boilerplate/styles/variables.scss";
          @import "src/styles/variables.scss";
        `
      }
    })
  ]
};

export default config;
