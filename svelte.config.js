import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import content from '@originjs/vite-plugin-content';
import autoImport from 'vite-plugin-autoimport';
import { resolve } from 'path';

export default {
  kit: {
    adapter: adapter({
      // default options are shown
      pages: 'htdocs',
      assets: 'htdocs',
      fallback: false,
      precompress: false
    }),

    prerender: {
      default: true
      // entries: ['/news/0_fallback/']
    },

    trailingSlash: 'never',

    vite: {
      plugins: [
        autoImport({
          // components: [
          //   {
          //     name: './boilerplate/components',
          //     flat: true
          //   },
          //   {
          //     name: './src/components',
          //     flat: true
          //   }
          // ],
          // include: ['**/*.svelte'],
          // exclude: ['**/node_modules/**']
        }),
        content.default()
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
          paths: ['./src/**/*.scss', './src/**/*.svelte', './src/**/*.yml']
        }
      },
      resolve: {
        alias: {
          // Boilderplate
          boilerplate: resolve('./boilerplate/'),
          '@': resolve('./boilerplate/'),
          src: resolve('./src/'),
          style: resolve('./boilerplate/styles/style.scss')
        }
      }
    },
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
};
