import { c as createComponent, u as unescapeHTML, s as spreadAttributes, r as renderTemplate, d as createAstro, m as maybeRenderHead, a as addAttribute, e as renderComponent, n as Fragment, f as renderScript } from './astro/server_-1qDrZfG.mjs';
import 'kleur/colors';
import 'clsx';
import { getIconData, iconToSVG } from '@iconify/utils';
import { glob } from 'glob';
/* empty css                              */

const countersByPage = /* @__PURE__ */ new WeakMap();
function createSvgComponent({ meta, attributes, children }) {
  const renderedIds = /* @__PURE__ */ new WeakMap();
  const Component = createComponent((result, props) => {
    let counter = countersByPage.get(result) ?? 0;
    const {
      title: titleProp,
      viewBox,
      mode,
      ...normalizedProps
    } = normalizeProps(attributes, props);
    const title = titleProp ? unescapeHTML(`<title>${titleProp}</title>`) : "";
    if (mode === "sprite") {
      let symbol = "";
      let id = renderedIds.get(result);
      if (!id) {
        countersByPage.set(result, ++counter);
        id = `a:${counter}`;
        symbol = unescapeHTML(`<symbol${spreadAttributes({ viewBox, id })}>${children}</symbol>`);
        renderedIds.set(result, id);
      }
      return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${title}${symbol}<use href="#${id}" /></svg>`;
    }
    return renderTemplate`<svg${spreadAttributes({ viewBox, ...normalizedProps })}>${title}${unescapeHTML(children)}</svg>`;
  });
  return Object.assign(Component, meta);
}
const ATTRS_TO_DROP = ["xmlns", "xmlns:xlink", "version"];
const DEFAULT_ATTRS = { role: "img" };
function dropAttributes(attributes) {
  for (const attr of ATTRS_TO_DROP) {
    delete attributes[attr];
  }
  return attributes;
}
function normalizeProps(attributes, { size, ...props }) {
  if (size !== void 0 && props.width === void 0 && props.height === void 0) {
    props.height = size;
    props.width = size;
  }
  return dropAttributes({ ...DEFAULT_ATTRS, ...attributes, ...props });
}

const Logo = createSvgComponent({"meta":{"src":"/heaton/_astro/logo_big.RH5HgNaQ.svg","width":165,"height":69,"format":"svg"},"attributes":{"mode":"inline","id":"Layer_1","viewBox":"0 0 164.6 69.2"},"children":"<!-- Generator: Adobe Illustrator 29.0.0, SVG Export Plug-In . SVG Version: 2.1.0 Build 186)  -->\n  <defs>\n    <style>\n      .st__ {\n        fill: currentColor;\n        fill-rule: evenodd;\n      }\n    </style>\n  </defs>\n  <path class=\"st__\" d=\"M130.1,0c-17.8,0-32.4,13.4-34.4,30.7h2.7c1.7-7.3,8.2-12.7,15.9-12.7s16.3,7.3,16.3,16.3-7.3,16.3-16.3,16.3-14.3-5.5-15.9-12.8h-2.7c1.7,17.5,16.4,31.3,34.4,31.3s34.6-15.5,34.6-34.6S149.2,0,130.1,0ZM158.5,47.2v3h-8.8l-9.6-16.7v11.6c0,4.4-2.1,5-5.5,5h-3v-31.4h0s8.5,0,8.5,0l10,17.2v-13c0-4,3-4.3,3.9-4.3h4.6v28.3ZM114.8,37.9h-8.2c1.3,2.9,4.3,5,7.7,5s8.5-3.8,8.5-8.5-3.8-8.5-8.5-8.5-6.3,2-7.7,4.8h8.1c4.5,0,4.5,7.2,0,7.2h0ZM25.6,18.9h-8.5v8.5h8.5v-8.5ZM66.8,27.4h5.9l-3-8.5h-8.4l-3,8.5h8.5ZM33.8,18.9h-4.7v11.9H8.5v-11.9H3c-1.7,0-3,1.4-3,3.1v28.4h8.5v-12.4h20.6v12.2h0c0,.1,20.6.1,20.6.1v-8.5h-12.2v-3.8h12.2v-7.2h-12.2v-3.4h12.2v-8.5h-15.9ZM50.5,50.3h8.5l2.8-8.5h-8.5l-2.8,8.5ZM69.2,41.8l2.8,8.5h8.5l-2.8-8.5h-8.5ZM17.1,50.3h8.5v-8.5h-8.5v8.5ZM89.7,37.9v-10.5h6.5v-8.5h-20.5v8.5h5.5v14.5c0,5.9,3.6,8.4,9.5,8.4h3.6v-8.5h-1.6c-2.8,0-3-1.2-3-3.9h0ZM73.4,30.8h-16.1l-2.5,7.2h21.1l-2.5-7.2Z\" />\n"});

const LogoSmall = createSvgComponent({"meta":{"src":"/heaton/_astro/logo_small.BEM2QT3F.svg","width":69,"height":71,"format":"svg"},"attributes":{"mode":"inline","viewBox":"0 0 69 71","fill":"currentColor"},"children":"\n<g clip-path=\"url(#clip0_602_1257)\">\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M34.42 0.169998C16.64 0.169998 1.99 13.6 0.06 30.87H2.71C4.37 23.61 10.87 18.19 18.64 18.19C27.67 18.19 34.98 25.51 34.98 34.53C34.98 43.55 27.66 50.87 18.64 50.87C10.83 50.87 4.3 45.39 2.69 38.07H0C1.67 55.61 16.45 69.33 34.42 69.33C53.52 69.33 69 53.84 69 34.75C69 15.66 53.52 0.169998 34.42 0.169998ZM62.82 47.4V50.45H62.48H53.98L44.35 33.78V45.43C44.35 49.83 42.28 50.45 38.89 50.45H35.86V19.07V19.06H44.36L54.33 36.31V23.32C54.33 19.29 57.36 19.06 58.26 19.06H62.82V47.4ZM19.11 38.08H10.91C12.25 41.01 15.21 43.04 18.64 43.04C23.33 43.04 27.14 39.24 27.14 34.54C27.14 29.84 23.33 26.04 18.64 26.04C15.26 26.04 12.34 28.01 10.97 30.87H19.11C23.59 30.87 23.6 38.07 19.11 38.07V38.08Z\" />\n</g>\n<defs>\n<clipPath id=\"clip0_602_1257\">\n<rect width=\"69\" height=\"70\" transform=\"translate(0 0.169998)\" />\n</clipPath>\n</defs>\n"});

const icons = {"local":{"prefix":"local","lastModified":1733694145,"icons":{"At sign":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path stroke-linecap=\"round\" d=\"M12 18a6 6 0 1 1 5.64-3.946 1.54 1.54 0 0 1-.413.599l-.08.074a1.637 1.637 0 0 1-2.747-1.203V12m0 0a2.4 2.4 0 1 1-4.8 0 2.4 2.4 0 0 1 4.8 0Z\"/><path d=\"M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Z\"/></g>"},"Bold/Call/Phone Calling":{"body":"<g fill=\"#1C274C\"><path d=\"m15.556 14.548-.455.48s-1.083 1.139-4.038-1.972-1.872-4.25-1.872-4.25l.287-.303c.706-.744.773-1.938.156-2.81L8.374 3.91C7.61 2.83 6.135 2.688 5.26 3.609L3.691 5.26c-.433.457-.723 1.048-.688 1.705.09 1.68.808 5.293 4.812 9.51 4.247 4.47 8.232 4.648 9.861 4.487.516-.05.964-.329 1.325-.709l1.42-1.496c.96-1.01.69-2.74-.538-3.446l-1.91-1.1c-.806-.463-1.787-.327-2.417.336M13.26 1.88a.75.75 0 0 1 .861-.62c.025.005.107.02.15.03q.129.027.352.09c.297.087.712.23 1.21.458.996.457 2.321 1.256 3.697 2.631 1.376 1.376 2.175 2.702 2.632 3.698.228.498.37.912.457 1.21a6 6 0 0 1 .113.454l.005.031a.765.765 0 0 1-.617.878.75.75 0 0 1-.86-.617 3 3 0 0 0-.081-.327 7.4 7.4 0 0 0-.38-1.004c-.39-.85-1.092-2.024-2.33-3.262s-2.411-1.939-3.262-2.329a7.4 7.4 0 0 0-1.003-.38 6 6 0 0 0-.318-.08.76.76 0 0 1-.626-.861\"/><path fill-rule=\"evenodd\" d=\"M13.486 5.33a.75.75 0 0 1 .927-.516l-.206.721.206-.72h.003l.003.001.008.002.02.006.056.02q.067.023.177.07c.146.062.345.158.59.303.489.29 1.157.77 1.942 1.556.785.785 1.266 1.453 1.556 1.942.145.245.241.444.303.59a3 3 0 0 1 .09.233l.005.02.003.008v.003l.001.001s0 .002-.72.208l.72-.206a.75.75 0 0 1-1.439.422l-.003-.01-.035-.088a4 4 0 0 0-.216-.417c-.223-.376-.626-.946-1.326-1.646s-1.269-1.102-1.646-1.325a4 4 0 0 0-.504-.25l-.01-.004a.75.75 0 0 1-.505-.925\" clip-rule=\"evenodd\"/></g>"},"Bold/Essentional, UI/Close Circle":{"body":"<path fill=\"#1C274C\" fill-rule=\"evenodd\" d=\"M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10M8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06\" clip-rule=\"evenodd\"/>"},"Bold/Essentional, UI/Mention Circle":{"body":"<g fill=\"#1C274C\"><path d=\"M12 10.35a1.65 1.65 0 1 1 0 3.3 1.65 1.65 0 0 1 0-3.3\"/><path fill-rule=\"evenodd\" d=\"M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2M6.75 12a5.25 5.25 0 1 1 10.185 1.797.8.8 0 0 1-.217.304l-.08.075a.887.887 0 0 1-1.488-.652V12a3.15 3.15 0 1 0-1.277 2.533 2.386 2.386 0 0 0 3.782.745l.08-.074c.25-.23.476-.528.609-.893A6.75 6.75 0 1 0 12 18.75a.75.75 0 0 0 0-1.501A5.25 5.25 0 0 1 6.75 12\" clip-rule=\"evenodd\"/></g>"},"Bold/Notes/Clipboard Check":{"body":"<g fill=\"#1C274C\"><path d=\"M9.5 2A1.5 1.5 0 0 0 8 3.5v1A1.5 1.5 0 0 0 9.5 6h5A1.5 1.5 0 0 0 16 4.5v-1A1.5 1.5 0 0 0 14.5 2z\"/><path fill-rule=\"evenodd\" d=\"M6.5 4.037c-1.258.07-2.052.27-2.621.84C3 5.756 3 7.17 3 9.998v6c0 2.829 0 4.243.879 5.122.878.878 2.293.878 5.121.878h6c2.828 0 4.243 0 5.121-.878.879-.88.879-2.293.879-5.122v-6c0-2.828 0-4.242-.879-5.121-.569-.57-1.363-.77-2.621-.84V4.5a3 3 0 0 1-3 3h-5a3 3 0 0 1-3-3zm9.012 8.511a.75.75 0 1 0-1.024-1.096l-3.774 3.522-1.202-1.122a.75.75 0 0 0-1.024 1.096l1.715 1.6a.75.75 0 0 0 1.023 0z\" clip-rule=\"evenodd\"/></g>"},"Bold/Notes/Document":{"body":"<path fill=\"#1C274C\" fill-rule=\"evenodd\" d=\"M4.172 3.172C3 4.343 3 6.229 3 10v4c0 3.771 0 5.657 1.172 6.828S7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172S21 17.771 21 14v-4c0-3.771 0-5.657-1.172-6.828S16.771 2 13 2h-2C7.229 2 5.343 2 4.172 3.172M8 9.25a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zm0 4a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z\" clip-rule=\"evenodd\"/>"},"Bold/Search/Minimalistic Magnifer":{"body":"<g fill=\"#1C274C\"><path d=\"M20.313 11.157a9.157 9.157 0 1 1-18.313 0 9.157 9.157 0 0 1 18.313 0\"/><path fill-rule=\"evenodd\" d=\"M18.838 18.838a.723.723 0 0 1 1.023 0l1.927 1.928a.723.723 0 0 1-1.022 1.022l-1.928-1.927a.723.723 0 0 1 0-1.023\" clip-rule=\"evenodd\"/></g>"},"Document":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M3 10c0-3.771 0-5.657 1.172-6.828S7.229 2 11 2h2c3.771 0 5.657 0 6.828 1.172S21 6.229 21 10v4c0 3.771 0 5.657-1.172 6.828S16.771 22 13 22h-2c-3.771 0-5.657 0-6.828-1.172S3 17.771 3 14z\"/><path stroke-linecap=\"round\" d=\"M8 10h8m-8 4h5\"/></g>"},"Phone call":{"body":"<g fill=\"none\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\" d=\"M13.5 2s2.334.212 5.303 3.182c2.97 2.97 3.182 5.303 3.182 5.303m-7.778-4.949s.99.282 2.475 1.767 1.768 2.475 1.768 2.475\"/><path fill=\"currentColor\" d=\"m15.1 15.027-.543-.516zm.456-.48.544.517zm2.417-.335-.374.65zm1.91 1.1-.374.65zm.539 3.446.543.517zm-1.42 1.496-.545-.517zm-1.326.71.074.745zm-9.86-4.489.543-.516zm-4.813-9.51-.749.041zm6.475 1.538.543.517zm.156-2.81.613-.433zM8.374 3.91l-.613.433zM5.26 3.609l.544.516zM3.691 5.26l-.543-.516zm7.372 7.795.544-.517zm4.582 2.488.455-.48-1.088-1.033-.455.48zm1.954-.682 1.91 1.1.749-1.3-1.911-1.1zm2.279 3.38-1.42 1.495 1.087 1.034 1.42-1.496zm-2.275 1.975c-1.435.141-5.18.02-9.244-4.258l-1.087 1.033c4.429 4.663 8.654 4.898 10.478 4.717zm-9.244-4.258c-3.876-4.081-4.526-7.523-4.607-9.033l-1.498.08c.1 1.85.884 5.634 5.018 9.986zm1.376-6.637.286-.302-1.087-1.033-.287.302zm.512-4.062L8.986 3.477l-1.225.866 1.26 1.783zm-5.53-2.168L3.149 4.745l1.088 1.033 1.57-1.653zm4.474 5.713a38 38 0 0 0-.545-.515l-.002.002-.003.003-.05.058a1.6 1.6 0 0 0-.23.427c-.098.275-.15.639-.084 1.093.13.892.715 2.091 2.242 3.7l1.088-1.034c-1.428-1.503-1.78-2.428-1.846-2.884-.032-.22 0-.335.013-.372l.008-.019-.028.037-.018.02s-.002 0-.545-.516m1.328 4.767c1.523 1.604 2.673 2.234 3.55 2.377.451.073.816.014 1.092-.095a1.5 1.5 0 0 0 .421-.25l.036-.034.014-.014.007-.006.003-.003.001-.002s.002-.001-.542-.518c-.544-.516-.543-.517-.543-.518l.002-.001.002-.003.005-.005.01-.01.037-.032q.015-.008-.004.001c-.02.008-.11.04-.3.009-.402-.066-1.27-.42-2.703-1.929zM8.986 3.477C7.972 2.043 5.944 1.8 4.718 3.092l1.087 1.033c.523-.55 1.444-.507 1.956.218zM3.752 6.926c-.022-.4.152-.8.484-1.148L3.148 4.745c-.536.564-.943 1.347-.894 2.261zm14.705 12.811c-.279.294-.57.452-.854.48l.147 1.492c.747-.073 1.352-.472 1.795-.939zM10.021 9.02c.968-1.019 1.036-2.613.226-3.76l-1.225.866c.422.597.357 1.392-.088 1.86zm9.488 6.942c.821.473.982 1.635.369 2.28l1.087 1.033c1.305-1.374.925-3.673-.707-4.613zm-3.409-.898c.385-.406.986-.497 1.499-.202l.748-1.3c-1.099-.632-2.46-.45-3.335.47z\"/></g>"},"Search":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><circle cx=\"11.5\" cy=\"11.5\" r=\"9.5\"/><path stroke-linecap=\"round\" d=\"m20 20 2 2\"/></g>"},"Sertificate":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M16.5 4c2.175.012 3.353.109 4.121.877.879.879.879 2.293.879 5.121v6c0 2.829 0 4.243-.879 5.122-.878.878-2.293.878-5.121.878h-6c-2.828 0-4.243 0-5.121-.878-.879-.88-.879-2.293-.879-5.122v-6c0-2.828 0-4.242.879-5.121C5.147 4.109 6.325 4.012 8.5 4\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m9.5 13.4 1.714 1.6 4.286-4\"/><path d=\"M8.5 3.5A1.5 1.5 0 0 1 10 2h5a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 15 6h-5a1.5 1.5 0 0 1-1.5-1.5z\"/></g>","width":25},"X":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path stroke-linecap=\"round\" d=\"m14.5 9.5-5 5m0-5 5 5\"/></g>"}},"width":24,"height":24}};

const cache = /* @__PURE__ */ new WeakMap();

const $$Astro$2 = createAstro("https://ami-avk.github.io/");
const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Icon;
  class AstroIconError extends Error {
    constructor(message) {
      super(message);
      this.hint = "";
    }
  }
  const req = Astro2.request;
  const { name = "", title, desc, "is:inline": inline = false, ...props } = Astro2.props;
  const map = cache.get(req) ?? /* @__PURE__ */ new Map();
  const i = map.get(name) ?? 0;
  map.set(name, i + 1);
  cache.set(req, map);
  const includeSymbol = !inline && i === 0;
  let [setName, iconName] = name.split(":");
  if (!setName && iconName) {
    const err = new AstroIconError(`Invalid "name" provided!`);
    throw err;
  }
  if (!iconName) {
    iconName = setName;
    setName = "local";
    if (!icons[setName]) {
      const err = new AstroIconError('Unable to load the "local" icon set!');
      throw err;
    }
    if (!(iconName in icons[setName].icons)) {
      const err = new AstroIconError(`Unable to locate "${name}" icon!`);
      throw err;
    }
  }
  const collection = icons[setName];
  if (!collection) {
    const err = new AstroIconError(`Unable to locate the "${setName}" icon set!`);
    throw err;
  }
  const iconData = getIconData(collection, iconName ?? setName);
  if (!iconData) {
    const err = new AstroIconError(`Unable to locate "${name}" icon!`);
    throw err;
  }
  const id = `ai:${collection.prefix}:${iconName ?? setName}`;
  if (props.size) {
    props.width = props.size;
    props.height = props.size;
    delete props.size;
  }
  const renderData = iconToSVG(iconData);
  const normalizedProps = { ...renderData.attributes, ...props };
  const normalizedBody = renderData.body;
  const { viewBox } = normalizedProps;
  if (includeSymbol) {
    delete normalizedProps.viewBox;
  }
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(normalizedProps)}${addAttribute(name, "data-icon")}> ${title && renderTemplate`<title>${title}</title>`} ${desc && renderTemplate`<desc>${desc}</desc>`} ${inline ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "id": id }, { "default": ($$result2) => renderTemplate`${unescapeHTML(normalizedBody)}` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${includeSymbol && renderTemplate`<symbol${addAttribute(id, "id")}${addAttribute(viewBox, "viewBox")}>${unescapeHTML(normalizedBody)}</symbol>`}<use${addAttribute(`#${id}`, "href")}></use> ` })}`} </svg>`;
}, "/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/node_modules/astro-icon/components/Icon.astro", void 0);

const $$Astro$1 = createAstro("https://ami-avk.github.io/");
const $$NavBar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$NavBar;
  const currentURL = new URL(Astro2.request.url).pathname;
  const mainpage = currentURL === "/";
  const collection = await glob(["./src/data/**/**/*.csv"]);
  const paths = collection.map((file) => ({
    props: { filePath: file.toString(), category: file.split("/")[2], model: file.split("/")[3], type: file.split("/")[4].replace(".csv", "") }
  }));
  const pathname = `${"/heaton"}/${paths[0].props.category}/${paths[0].props.model}/${paths[0].props.type}`;
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-row items-center justify-between relative"> <div class="flex items-center gap-4"> <a${addAttribute(`${"/heaton"}/`, "href")}${addAttribute(`cursor-pointer text-[#FCD47F] ${mainpage ? "pointer-events-none" : ""}`, "class")}> ${renderComponent($$result, "Logo", Logo, { "class": "w-20 md:w-32 lg:w-40 hidden md:block" })} ${renderComponent($$result, "LogoSmall", LogoSmall, { "class": "w-16 md:hidden" })} </a> <div class="flex flex-col gap-2"> <div class="flex gap-2 items-center text-stone-100"> ${renderComponent($$result, "Icon", $$Icon, { "name": "Phone call" })} <div class="text-base leading-5 font-semibold relative  tracking-wider">8 499 645-00-00</div> </div> <div class="flex gap-2 items-center text-stone-100"> ${renderComponent($$result, "Icon", $$Icon, { "name": "At sign" })} <div class="text-base leading-5 font-semibold relative  tracking-wider">retail@heaton.ru</div> </div> </div> </div> <div class="flex flex-row gap-8 items-center justify-start shrink-0 relative"> <div class="bg-stone-600 text-stone-100 rounded-full pt-1 pr-1 pb-1 pl-4 flex flex-row gap-4 items-center justify-start shrink-0 relative data-[active]:bg-[#FCD47F] data-[active]:text-[#FCD47F]  overflow-clip group/container" id="search-container"> <div class="p-2.5 flex flex-row gap-2.5 items-center justify-center shrink-0 relative"> <ul class="flex flex-row gap-6 items-center justify-start shrink-0 relative"> <li class=" text-left font-['Exo2-Medium',_sans-serif] text-sm leading-5 font-medium relative" style="letter-spacing: 0.02em"> <a${addAttribute(`${"/heaton"}/#models`, "href")}>Модели</a> </li> <li class=" text-left font-['Exo2-Medium',_sans-serif] text-sm leading-5 font-medium relative" style="letter-spacing: 0.02em"> <a${addAttribute(pathname, "href")}>Продукция</a> </li> <li class=" text-left font-['Exo2-Medium',_sans-serif] text-sm leading-5 font-medium relative" style="letter-spacing: 0.02em"> <a${addAttribute(`${"/heaton"}/`, "href")}>Документация</a> </li> </ul> </div> <button class="rounded-full bg-[#FCD47F] flex flex-row items-end justify-end shrink-0 right-0 transition-all text-stone-800 p-3 cursor-pointer  relative data-[active]:right-[calc(100%-40px)] group/btn" id="search-btn"> ${renderComponent($$result, "Icon", $$Icon, { "name": "Search", "height": "24", "width": "24", "class": "text-stone-800 " })} <div class="flex flex-row  w-0 transition-all group-data-[active]/btn:w-80 overflow-clip absolute left-12 gap-4"> <input type="search" name="main-search" id="main-search-input" class=" focus:outline-none bg-[#FCD47F] opacity-0 text-stone-800 transition-colors shad  group-data-[active]/btn:shadow-2xl  group-data-[active]/btn:opacity-100 border-stone-600 border-b-[1px] w-[17rem]"> </div> </button> <button class="text-[#FCD47F] p-1 bg-stone-600 transition-all scale-50 rounded-full absolute invisible opacity-0 right-3 group-data-[active]/container:opacity-100 group-data-[active]/container:scale-100 group-data-[active]/container:visible flex items-center hover:bg-stone-800" id="main-search-close">${renderComponent($$result, "Icon", $$Icon, { "name": "X", "height": "24", "width": "24" })}</button> </div> </div> </div> ${renderScript($$result, "/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/components/NavBar.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/components/NavBar.astro", void 0);

const $$Astro = createAstro("https://ami-avk.github.io/");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/node_modules/astro/components/ClientRouter.astro", void 0);

export { $$Icon as $, Logo as L, $$ClientRouter as a, $$NavBar as b, createSvgComponent as c, LogoSmall as d };
