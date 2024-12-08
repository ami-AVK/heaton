import { d as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute } from './astro/server_-1qDrZfG.mjs';
import 'kleur/colors';
import 'clsx';
import pkg from 'papaparse';

const $$Astro = createAstro("https://ami-avk.github.io/");
const $$Table = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Table;
  const { parse } = pkg;
  const { csvData } = Astro2.props;
  const parsedData = parse(csvData, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true
  }).data;
  const headers = parsedData.length > 0 ? Object.keys(parsedData[0]) : [];
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col"> <div class="overflow-x-auto"> <div class="min-w-full inline-block align-middle"> <div class="overflow-hidden  rounded-3xl"> <table class=" min-w-full rounded-xl"> <thead> <tr class="bg-stone-50 py-1"> ${headers.map((header) => renderTemplate`<th scope="col" class="px-2 py-1 text-left text-xs leading-6 font-normal text-stone-600 capitalize whitespace-nowrap first-of-type:pl-3">${header}</th>`)} </tr> </thead> <tbody> ${parsedData.map((row) => renderTemplate`<tr class="odd:bg-stone-50 even:bg-stone-100 hover:bg-stone-200 data-[current]:bg-[#FCD47F]"> ${headers.map((header) => renderTemplate`<td class="px-2 my-1 whitespace-nowrap text-sm leading-6 font-normal text-stone-700 first-of-type:pl-3"${addAttribute(`${header === "\u041D\u043E\u043C\u0435\u043D\u043A\u043B\u0430\u0442\u0443\u0440\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440" ? row[header] : ""}`, "id")}>${row[header]}</td>`)} </tr>`)} </tbody> </table> </div> </div> </div> </div>`;
}, "/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/components/Table.astro", void 0);

export { $$Table as $ };
