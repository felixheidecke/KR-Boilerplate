import { sveltekit } from '@sveltejs/kit/vite';
import content from '@originjs/vite-plugin-content'
import autoImport from 'sveltekit-autoimport'

import { resolve } from 'path'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    content.default(),
    autoImport({
      components: [
        {
          name: './boilerplate/components',
          flat: true
        },
        {
          name: './src/components',
          flat: true
        }
      ],
      include: ['**/*.svelte'],
      exclude: ['**/node_modules/**']
    }),
    sveltekit()
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
      src: resolve('./src/'),
      style: resolve('./boilerplate/styles/style.scss')
    }
  }
};

export default config;
