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
      fallback: false,
      precompress: false
    }),

    trailingSlash: 'always',

    vite: {
      plugins: [
        markdown.plugin({ mode: 'html' }),
        content.default(),
        autoImport({
          components: ['./boilerplate', './src/components'],
          include: ['**/*.svelte'],
          exclude: ['**/node_modules/**']
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
        },
        watch: {
          paths: ['./src/**/*.scss', './src/**/*.svelte', './src/**/*.html', './src/**/*.yml']
        }
      },
      resolve: {
        alias: {
          // Boilderplate
          boilerplate: resolve('./boilerplate/'),
          src: resolve('./src/')
        }
      }
    }
  },

  preprocess: [
    preprocess({
      scss: {
        prependData: `
          @import "boilerplate/styles/variables.scss";
        `
      }
    })
  ]
};

export default config;
