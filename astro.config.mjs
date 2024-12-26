// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import icon from 'astro-icon';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), icon(), svelte()],
    experimental: {
        responsiveImages: true,
        // @ts-ignore
        svg: true,
      },
    // site: 'https://ami-avk.github.io/',
    site: 'https://q-li.ru/',
    base: '/heaton',
});