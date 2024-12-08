/* empty css                                            */
import { d as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, s as spreadAttributes, a as addAttribute, e as renderComponent, b as renderHead, f as renderScript } from '../../../chunks/astro/server_-1qDrZfG.mjs';
import 'kleur/colors';
import fs, { readFileSync } from 'fs';
import path from 'path';
import { glob } from 'glob';
import { $ as $$Icon, a as $$ClientRouter, b as $$NavBar } from '../../../chunks/ClientRouter_JO4vnJ_i.mjs';
import { $ as $$Table } from '../../../chunks/Table_BvUqkQ1M.mjs';
import 'clsx';
import * as xlsx from 'ts-xlsx';
/* empty css                                            */
import '@astrojs/internal-helpers/path';
import { $ as $$Image, a as $$Footer } from '../../../chunks/Footer_BYlqvPRt.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro$3 = createAstro("https://ami-avk.github.io/");
const $$CircleLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$CircleLink;
  const { fileName, current, href } = Astro2.props;
  const attributes = { "data-current": current };
  return renderTemplate`${maybeRenderHead()}<li class="text-stone-800 p-2 w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center hover:bg-stone-100 cursor-pointer hover:shadow-lg data-[current=true]:bg-[#FCD47F]"${spreadAttributes(attributes)}> <a${addAttribute(href, "href")}${addAttribute(`${current ? "pointer-events-none" : ""}`, "class")}> ${fileName} </a> </li>`;
}, "/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/components/CircleLink.astro", void 0);

const $$Astro$2 = createAstro("https://ami-avk.github.io/");
const $$ProductData = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ProductData;
  const { excelFilePath } = Astro2.props;
  const workbook = xlsx.read(readFileSync(excelFilePath), { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  const listItems = jsonData.slice(1).map((row) => ({
    key: row[0],
    value: row[1]
  }));
  const description = jsonData.find((row) => row[0] === "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435")[1];
  return renderTemplate`${maybeRenderHead()}<p class="leading-snug tracking-wider text-base">${description}</p> <ul class="leading-snug tracking-wider text-sm"> ${listItems.map((item) => renderTemplate`<li class="pb-1.5 font-normal"> <strong class="font-semibold">${item.key}:</strong> ${item.value} </li>`)} </ul>`;
}, "/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/components/ProductData.astro", void 0);

const $$Astro$1 = createAstro("https://ami-avk.github.io/");
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Button;
  const { text, icon, type = "button", link } = Astro2.props;
  const isDownload = type === "download";
  return renderTemplate`${isDownload ? renderTemplate`${maybeRenderHead()}<a${addAttribute(link, "href")} class="px-5 py-2.5 text-sm font-medium text-stone-700 inline-flex items-center bg-[#FCD47F] hover:bg-[#ffe09c] focus:ring-1 border-none outline-none focus:outline-[#ffeec9] rounded-full text-center ">${icon ? renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon, "width": "24" })}` : ""}${text}</a>` : renderTemplate`<button${addAttribute(type, "type")} class="px-5 py-2.5 text-sm font-medium text-stone-700 inline-flex items-center bg-[#FCD47F] hover:bg-[#ffe09c] focus:ring-1 border-none outline-none focus:outline-[#ffeec9] rounded-full text-center ">${icon ? renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon, "width": "24" })}` : ""}${text}</button>`}`;
}, "/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/components/Button.astro", void 0);

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
      type: file.split("/")[4].replace(".csv", ""),
      image: `../../../${file.toString().replace(".csv", ".webp")}`
    }
  }));
  return paths;
}
const $$type = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$type;
  const csvCollection = await glob(["./src/data/**/**/*.csv"]);
  const csvFile = Astro2.props.filePath;
  const category = Astro2.props.category;
  const model = Astro2.props.model;
  const type = Astro2.props.type;
  if (!csvFile) {
    throw new Error("CSV file not found");
  }
  const csvFilePath = path.join(process.cwd(), csvFile);
  path.join(process.cwd(), `${csvFile.substring(0, csvFile.lastIndexOf(".csv"))}_data.json`);
  path.join(process.cwd(), `${csvFile.substring(0, csvFile.lastIndexOf(".csv"))}.pdf`);
  const csvData = fs.readFileSync(csvFilePath, "utf-8");
  new URL(Astro2.request.url);
  const images = /* #__PURE__ */ Object.assign({"../../../data/Стальные панельные радиаторы/Compact (C)/11.webp": () => import('../../../chunks/11_BwejvI9x.mjs'),"../../../data/Стальные панельные радиаторы/Compact (C)/21.webp": () => import('../../../chunks/21_vI9yU6uS.mjs'),"../../../data/Стальные панельные радиаторы/Compact (C)/22.webp": () => import('../../../chunks/22_CmUbbdix.mjs'),"../../../data/Стальные панельные радиаторы/Compact (C)/33.webp": () => import('../../../chunks/33_4WBpgiAG.mjs'),"../../../data/Стальные панельные радиаторы/Hygiene Compact (HC)/10.webp": () => import('../../../chunks/10_CV3m5tQz.mjs'),"../../../data/Стальные панельные радиаторы/Hygiene Compact (HC)/20.webp": () => import('../../../chunks/20_LtVOxaTw.mjs'),"../../../data/Стальные панельные радиаторы/Hygiene Compact (HC)/30.webp": () => import('../../../chunks/30_Cf-T-P7O.mjs'),"../../../data/Стальные панельные радиаторы/Hygiene Ventil Compact (HVC)/10.webp": () => import('../../../chunks/10_ClDHmkei.mjs'),"../../../data/Стальные панельные радиаторы/Hygiene Ventil Compact (HVC)/20.webp": () => import('../../../chunks/20_BlG47oud.mjs'),"../../../data/Стальные панельные радиаторы/Hygiene Ventil Compact (HVC)/30 copy 2.webp": () => import('../../../chunks/30 copy 2_DtnvXSsy.mjs'),"../../../data/Стальные панельные радиаторы/Hygiene Ventil Compact (HVC)/30 copy.webp": () => import('../../../chunks/30 copy_ykscpr7-.mjs'),"../../../data/Стальные панельные радиаторы/Hygiene Ventil Compact (HVC)/30.webp": () => import('../../../chunks/30_jDfJBuBz.mjs'),"../../../data/Стальные панельные радиаторы/Ventil Compact (VC)/11.webp": () => import('../../../chunks/11_rXK2bAOK.mjs'),"../../../data/Стальные панельные радиаторы/Ventil Compact (VC)/21.webp": () => import('../../../chunks/21_DA82glQv.mjs'),"../../../data/Стальные панельные радиаторы/Ventil Compact (VC)/22.webp": () => import('../../../chunks/22_CfCs7G8Q.mjs'),"../../../data/Стальные панельные радиаторы/Ventil Compact (VC)/33.webp": () => import('../../../chunks/33_BZVSLZD9.mjs')});
  const pdf = /* #__PURE__ */ Object.assign({"../../../data/Стальные панельные радиаторы/Compact (C)/pasport.pdf": () => import('../../../chunks/pasport_gPGUa1Zy.mjs')});
  const imageFilePath = images[Astro2.props.image.replace("src/", "")]();
  pdf[`../../../data/${category}/${model}/pasport.pdf`]();
  const links = [
    { href: "/Стальные панельные радиаторы", text: "Продукция" },
    { href: "#", text: "Документация" }
  ];
  const sitemap = [{ name: "Compact (C)", url: `${"/heaton"}/Стальные панельные радиаторы/Compact (C)/11` }, { name: "Ventil Compact (VC)", url: `${"/heaton"}/Стальные панельные радиаторы/Ventil Compact (VC)/11` }, { name: "Hygiene Compact (HC)", url: `${"/heaton"}/Стальные панельные радиаторы/Hygiene Compact (HC)/10` }, { name: "Hygiene Ventil Compact (HVC)", url: `${"/heaton"}/Стальные панельные радиаторы/Hygiene Ventil Compact (HVC)/10` }];
  const modeltypes = csvCollection.filter((file) => file.includes(`/${model}/`));
  return renderTemplate`<html lang="ru" class="bg-stone-700"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, height=device-height, minimum-scale=1.0, initial-scale=1.0"><link rel="icon" type="image/svg+xml"${addAttribute(`${"/heaton"}/favicon.svg`, "href")}><!-- <meta name="generator" content={Astro.generator} /> --><title>Heaton</title>${renderHead()}</head> <body class="bg-stone-100"> ${renderComponent($$result, "ClientRouter", $$ClientRouter, {})} <!-- hero --> <div class="w-full bg-gradient-to-br from-stone-700 to-stone-600"> <div class="max-w-6xl mx-auto py-8 relative px-4 md:px-8 lg:px-16"> ${renderComponent($$result, "NavBar", $$NavBar, {})} </div> </div> <div class="max-w-5xl mx-auto px-4 lg:px-4 mb-16"> <!--  --> <div class="flex-col justify-start items-start inline-flex py-12 "> <h2 class="grow shrink basis-0 self-stretch text-stone-800 text-base font-bold leading-normal tracking-wider pb-2">Стальные панельные радиаторы:</h2> <div class="justify-start items-center gap-6 inline-flex"> ${sitemap.map((model2) => renderTemplate`<div class="justify-center items-start gap-1 flex"> <a${addAttribute(model2.url, "href")} class="px-2 py-1 rounded-3xl justify-start items-center gap-1 flex hover:bg-gray-50"> <img class="w-16 h-16 rounded-xl" src="https://via.placeholder.com/64x64"> <div class="text-stone-700 text-sm font-normal leading-normal tracking-wide">${model2.name}</div> </a> </div>`)} </div> </div> <!--  --> <div class="flex-col justify-start items-start"> <div class="self-stretch justify-start items-start gap-2.5 flex flex-col sm:flex-row"> <div class="flex self-stretch grow shrink basis-0 flex-col gap-2.5 pb-8"> <div class="self-stretch sm:min-w-64"> ${renderComponent($$result, "Image", $$Image, { "src": imageFilePath, "alt": "", "class": "rounded-3xl" })} </div> <div class="flex gap-4 mt-auto"> ${renderComponent($$result, "Button", $$Button, { "text": "Паспорт", "icon": "Document", "type": "download", "link": `${"/heaton"}/pasports/pasport.pdf` })} ${renderComponent($$result, "Button", $$Button, { "text": "Сертификаты", "icon": "Sertificate" })} </div> </div> <div class="sm:w-1/2 p-8 rounded-3xl flex-col justify-start items-start gap-2.5 inline-flex"> <div class="self-stretch flex-col justify-start items-start gap-6 flex text-stone-800"> <h1 class="text-3xl">Heaton ${model}</h1> ${renderComponent($$result, "ProductData", $$ProductData, { "excelFilePath": "./src/data/Стальные панельные радиаторы/Compact (C)/11.xlsx" })} </div> </div> </div> </div> <!--  --> <div class="flex justify-between items-start pb-2 flex-col sm:items-center sm:flex-row px-8 sm:px-0"> <h2 class="text-2xl">Характеристики</h2> <div class="flex gap-4 items-center"> <h3 class="font-bold ">Типы радиаторов:</h3> <ul class="flex gap-3 py-4"> ${modeltypes.map((file) => renderTemplate`${renderComponent($$result, "CircleLink", $$CircleLink, { "fileName": `${file.substring(file.lastIndexOf("/") + 1, file.lastIndexOf("."))}`, "current": file.substring(file.lastIndexOf("/") + 1, file.lastIndexOf(".")) == type, "href": `${"/heaton"}/${category}/${model}/${file.substring(file.lastIndexOf("/") + 1, file.lastIndexOf("."))}` })}`)} </ul> </div> </div> <div class="">${renderComponent($$result, "Table", $$Table, { "csvData": csvData })}</div> </div> ${renderComponent($$result, "Footer", $$Footer, { "links": links })} ${renderScript($$result, "/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/pages/[category]/[model]/[type].astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/pages/[category]/[model]/[type].astro", void 0);
const $$file = "/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/pages/[category]/[model]/[type].astro";
const $$url = "/heaton/[category]/[model]/[type]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$type,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
