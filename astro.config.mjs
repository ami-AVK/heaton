// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import icon from 'astro-icon';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), icon(), vue()],
    site: 'https://q-li.ru/',
    base: '/heaton',
    // experimental: {
    //     responsiveImages: true,
    //     // @ts-ignore
    //     svg: true,
    //   },
    // site: 'https://ami-avk.github.io/',
});