// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  fonts: [{
    name: "spezia",
    provider: fontProviders.local(),
    cssVariable: "--font-spezia",
    options: {
      variants: [{
        src: ['./src/assets/fonts/SpeziaWeb-Regular.woff2', './src/assets/fonts/SpeziaWeb-Regular.woff'],
        weight: 'normal',
        style: 'normal'
      }, {
        src: ['./src/assets/fonts/SpeziaWeb-SemiBold.woff2', './src/assets/fonts/SpeziaWeb-SemiBold.woff'],
        weight: '600',
        style: 'normal'
      },{
        src: ['./src/assets/fonts/SpeziaWeb-RegularItalic.woff2', './src/assets/fonts/SpeziaWeb-RegularItalic.woff'],
        weight: 'normal',
        style: 'italic'
      },{
        src: ['./src/assets/fonts/SpeziaWeb-SemiBoldItalic.woff2', './src/assets/fonts/SpeziaWeb-SemiBoldItalic.woff'],
        weight: '600',
        style: 'italic'
      }]
    }
  }],
});