import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import { o as NOOP_MIDDLEWARE_HEADER, p as decodeKey } from './chunks/astro/server_-1qDrZfG.mjs';
import 'clsx';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/","adapterName":"","routes":[{"file":"file:///Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/dist/404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/dist/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://ami-avk.github.io/","base":"/heaton","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/pages/[category]/[model]/[type].astro",{"propagation":"none","containsHead":true}],["/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/pages/[category]/[model].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[category]/[model]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/pages/[category].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[category]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/[category]/[model]/[type]@_@astro":"pages/_category_/_model_/_type_.astro.mjs","\u0000@astro-page:src/pages/[category]/[model]@_@astro":"pages/_category_/_model_.astro.mjs","\u0000@astro-page:src/pages/[category]@_@astro":"pages/_category_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_CnHCKBMN.mjs","/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/data/Стальные панельные радиаторы/Compact (C)/11.webp":"chunks/11_BwejvI9x.mjs","/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/data/Стальные панельные радиаторы/Compact (C)/21.webp":"chunks/21_vI9yU6uS.mjs","/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/data/Стальные панельные радиаторы/Compact (C)/22.webp":"chunks/22_CmUbbdix.mjs","/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/data/Стальные панельные радиаторы/Compact (C)/33.webp":"chunks/33_4WBpgiAG.mjs","/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/data/Стальные панельные радиаторы/Hygiene Compact (HC)/10.webp":"chunks/10_CV3m5tQz.mjs","/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/data/Стальные панельные радиаторы/Hygiene Compact (HC)/20.webp":"chunks/20_LtVOxaTw.mjs","/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/data/Стальные панельные радиаторы/Hygiene Compact (HC)/30.webp":"chunks/30_Cf-T-P7O.mjs","/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/data/Стальные панельные радиаторы/Hygiene Ventil Compact (HVC)/10.webp":"chunks/10_ClDHmkei.mjs","/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/data/Стальные панельные радиаторы/Hygiene Ventil Compact (HVC)/20.webp":"chunks/20_BlG47oud.mjs","/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/data/Стальные панельные радиаторы/Hygiene Ventil Compact (HVC)/30 copy 2.webp":"chunks/30 copy 2_DtnvXSsy.mjs","/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/data/Стальные панельные радиаторы/Hygiene Ventil Compact (HVC)/30 copy.webp":"chunks/30 copy_ykscpr7-.mjs","/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/data/Стальные панельные радиаторы/Hygiene Ventil Compact (HVC)/30.webp":"chunks/30_jDfJBuBz.mjs","/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/data/Стальные панельные радиаторы/Ventil Compact (VC)/11.webp":"chunks/11_rXK2bAOK.mjs","/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/data/Стальные панельные радиаторы/Ventil Compact (VC)/21.webp":"chunks/21_DA82glQv.mjs","/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/data/Стальные панельные радиаторы/Ventil Compact (VC)/22.webp":"chunks/22_CfCs7G8Q.mjs","/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/data/Стальные панельные радиаторы/Ventil Compact (VC)/33.webp":"chunks/33_BZVSLZD9.mjs","/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/data/Стальные панельные радиаторы/Compact (C)/pasport.pdf":"chunks/pasport_gPGUa1Zy.mjs","/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Ctc1olyR.mjs","@astrojs/svelte/client.js":"_astro/client.svelte.w5NZITPx.js","/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/pages/[category]/[model]/[type].astro?astro&type=script&index=0&lang.ts":"_astro/_type_.astro_astro_type_script_index_0_lang.ngE3QeKL.js","/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/components/NavBar.astro?astro&type=script&index=0&lang.ts":"_astro/NavBar.astro_astro_type_script_index_0_lang.CA_TqhQO.js","/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.BScVxmeO.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/pages/[category]/[model]/[type].astro?astro&type=script&index=0&lang.ts","function e(){try{const t=window.location.href.substring(window.location.href.lastIndexOf(\"#\")+1);document.getElementById(t).parentElement.setAttribute(\"data-current\",\"\")}catch{}}document.addEventListener(\"astro:page-load\",e);document.addEventListener(\"astro:before-swap\",()=>{localStorage.____y=window.scrollY});document.addEventListener(\"astro:after-swap\",()=>{localStorage.____y&&(window.scrollTo({top:localStorage.____y,behavior:\"instant\"}),localStorage.clear())});"],["/Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/src/components/NavBar.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"astro:page-load\",()=>{const t=document.getElementById(\"search-btn\"),n=document.getElementById(\"main-search-input\");t.addEventListener(\"click\",e=>a()),document.addEventListener(\"keydown\",e=>e.key===\"Escape\"?c():\"\"),n.addEventListener(\"blur\",e=>c())});function a(){const t=document.getElementById(\"search-btn\"),n=document.getElementById(\"search-container\"),e=document.getElementById(\"main-search-input\");t.setAttribute(\"data-active\",\"\"),n.setAttribute(\"data-active\",\"\"),e.setAttribute(\"data-active\",\"\"),e.focus()}function c(){const t=document.getElementById(\"search-btn\"),n=document.getElementById(\"search-container\"),e=document.getElementById(\"main-search-input\");t.removeAttribute(\"data-active\"),n.removeAttribute(\"data-active\"),e.removeAttribute(\"data-active\"),e.blur(),t.blur()}"]],"assets":["/heaton/file:///Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/dist/404.html","/heaton/file:///Users/santech/Documents/My/WebProjects/Heaton/heaton_/heaton/dist/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"lDopbQnOm22RQzgCeJA4730h6mbknERi4inF8+sYSII=","envGetSecretEnabled":false});

export { manifest };