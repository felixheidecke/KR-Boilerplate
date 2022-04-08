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

    prerender: {
      // News fallback
      // entries: ['/news/0-fallback/']
    },

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
          paths: ['./src/**/*.scss', './src/**/*.svelte', './src/**/*.yml']
        }
      },
      resolve: {
        alias: {
          // Boilderplate
          '@': resolve('./boilerplate/'),
          src: resolve('./src/')
        }
      }
    }
  },

  preprocess: [
    preprocess({
      scss: {
        prependData: `
          @import "boilerplate/styles/variables";
          @import "src/styles/variables";
          @import 'src/styles/extend/extend';
          `
      }
    })
  ]
};

export default config;
