/* empty css                                      */
import { c as createComponent, r as renderTemplate, a as addAttribute, b as renderHead } from '../chunks/astro/server_-1qDrZfG.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="ru"> <head><meta charset="utf-8"><!-- <meta name="viewport" content="width=device-width" /> --><meta name="viewport" content="width=device-width, height=device-height, minimum-scale=1.0, initial-scale=1.0"><link rel="icon" type="image/svg+xml"${addAttribute(`${"/heaton"}/favicon.svg`, "href")}><title>404</title>${renderHead()}</head> <body class="bg-stone-100"> <!-- hero --> <div class="w-full bg-gradient-to-br from-stone-700 to-stone-600"> <div class="max-w-6xl mx-auto min-h-96 py-8 relative px-16 pb-16"></div> </div> <!-- content --> </body></html>`;
}, "/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/pages/404.astro", void 0);
const $$file = "/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/pages/404.astro";
const $$url = "/heaton/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$404,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
