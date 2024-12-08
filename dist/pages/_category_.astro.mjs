/* empty css                                      */
import { d as createAstro, c as createComponent, r as renderTemplate, a as addAttribute, b as renderHead, e as renderComponent, g as renderTransition } from '../chunks/astro/server_-1qDrZfG.mjs';
import 'kleur/colors';
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { a as $$ClientRouter, b as $$NavBar } from '../chunks/ClientRouter_JO4vnJ_i.mjs';
import { $ as $$Table } from '../chunks/Table_BvUqkQ1M.mjs';
/* empty css                                      */
/* empty css                                      */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://ami-avk.github.io/");
async function getStaticPaths() {
  const collection = await glob(["./src/data/**/**/*.csv"]);
  const paths = collection.map((file) => ({
    params: {
      category: file.split("/")[2],
      model: file.split("/")[3],
      type: file.split("/")[4].replace(".csv", "")
    },
    props: {
      filePath: file.toString(),
      category: file.split("/")[2],
      model: file.split("/")[3],
      type: file.split("/")[4].replace(".csv", "")
    }
  }));
  return paths;
}
const $$category = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$category;
  const csvCollection = await glob(["./src/data/**/**/*.csv"]);
  const csvFile = Astro2.props.filePath;
  const model = Astro2.props.model;
  const type = Astro2.props.type;
  if (!csvFile) {
    throw new Error("CSV file not found");
  }
  const csvFilePath = path.join(process.cwd(), csvFile);
  const csvData = fs.readFileSync(csvFilePath, "utf-8");
  new URL(Astro2.request.url).pathname;
  return renderTemplate`<html lang="ru"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, height=device-height, minimum-scale=1.0, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Astro + TailwindCSS</title>${renderHead()}</head> <body class="bg-stone-100"> ${renderComponent($$result, "ClientRouter", $$ClientRouter, {})} <!-- hero --> <div class="w-full bg-gradient-to-br from-stone-700 to-stone-600"> <div class="max-w-6xl mx-auto py-8 relative px-16"> ${renderComponent($$result, "NavBar", $$NavBar, {})} </div> </div> <div class="max-w-5xl mx-auto"> <!--  --> <div class="h-96 flex-col justify-start items-start inline-flex"> <h1 class="self-stretch text-stone-800 text-2xl font-light leading-9 tracking-widest">
Описание модели <br>Heaton ${model} </h1> <div class="self-stretch justify-start items-start gap-2.5 inline-flex"> <div class="grow shrink basis-0 flex-col justify-center items-start gap-2.5 inline-flex"> <div class="self-stretch h-96 flex-col justify-start items-start gap-2.5 flex"> <img class="w-96 h-56" src="https://via.placeholder.com/366x226"> <div class="self-stretch text-stone-800 text-base font-light leading-normal tracking-wider">
Панельные радиаторы с боковым подключением широкого применения.
                С конвекционными пластинами, боковыми защитными панелями и
                защитной решеткой сверху. Имеют четыре боковых присоединительных
                отверстия в каждом углу радиатора с внутренней резьбой G1/2
</div> </div> <div class="self-stretch py-4 justify-center items-center gap-2.5 inline-flex"> <div class="grow shrink basis-0 text-stone-800 text-base font-bold leading-normal tracking-wider">
Паспорт
</div> </div> <div class="self-stretch py-4 justify-center items-center gap-2.5 inline-flex"> <div class="grow shrink basis-0 text-stone-800 text-base font-bold leading-normal tracking-wider">
Сертификаты
</div> </div> </div> <div class="w-96 p-8 bg-white rounded-3xl flex-col justify-start items-start gap-2.5 inline-flex"> <div class="self-stretch h-96 flex-col justify-start items-start gap-8 flex"> <div class="self-stretch text-stone-800 text-lg font-light uppercase leading-normal tracking-wider">
Технические характеристики
</div> <div class="self-stretch text-stone-800 text-sm font-light leading-normal tracking-wide">
Максимальное рабочее давление – 10 Бар
<br>Испытательное давление – 15 Бар
<br>Материал изготовления панелей- высококачественная
                низкоуглеродистая холоднокатаная сталь, с толщиной 1,3 мм
<br>Максимальная температура воды — 110°С
<br>Цвет RAL 9016 (белый)
<br>Выпускаемые типы: 10,11,20,21,22,30,33
<br>Выпускаемые высоты: 300, 400, 500, 600, 900 мм
<br>Выпускаемые длины: 400-3000 мм (с шагом 100 мм) <br>Гарантия 10 лет
</div> </div> </div> </div> </div> <!--  --> <ul class="flex"> ${csvCollection.filter((file) => file.includes(`/${model}/`)).map((file) => (
    // тут надо добавить выборку внутри модели
    renderTemplate`<li class="p-2 rounded-full bg-stone-200 flex"> <a${addAttribute(`./${file.split("/")[4].replace(".csv", "")}`, "href")}${addAttribute(`${file.split("/")[4].replace(".csv", "") === type && "pointer-events-none"}`, "class")}>${file.split("/")[4].replace(".csv", "")}</a> </li>`
  ))} </ul> <div class=""${addAttribute(renderTransition($$result, "sqwvnk5e"), "data-astro-transition-scope")}>${renderComponent($$result, "Table", $$Table, { "csvData": csvData })}</div> </div> </body></html>`;
}, "/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/pages/[category].astro", "self");

const $$file = "/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/pages/[category].astro";
const $$url = "/heaton/[category]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$category,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
