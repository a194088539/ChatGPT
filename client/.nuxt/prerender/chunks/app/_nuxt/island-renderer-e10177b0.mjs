import { defineComponent, createBlock, Teleport, h } from 'file:///home/chatgpt/client/node_modules/vue/index.mjs';
import { c as createError } from '../server.mjs';
import 'file:///home/chatgpt/client/node_modules/ofetch/dist/node.mjs';
import 'file:///home/chatgpt/client/node_modules/hookable/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/unctx/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/@unhead/vue/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/@unhead/dom/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/@unhead/ssr/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///home/chatgpt/client/node_modules/h3/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/ufo/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/element-plus/es/index.mjs';
import 'file:///home/chatgpt/client/node_modules/vue/server-renderer/index.mjs';
import 'file:///home/chatgpt/client/node_modules/defu/dist/defu.mjs';
import '../../nitro/nitro-prerenderer.mjs';
import 'file:///home/chatgpt/client/node_modules/node-fetch-native/dist/polyfill.mjs';
import 'file:///home/chatgpt/client/node_modules/destr/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///home/chatgpt/client/node_modules/scule/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/ohash/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/unstorage/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/unstorage/drivers/fs.mjs';
import 'file:///home/chatgpt/client/node_modules/radix3/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/pathe/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/unified/index.js';
import 'file:///home/chatgpt/client/node_modules/mdast-util-to-string/index.js';
import 'file:///home/chatgpt/client/node_modules/micromark/lib/preprocess.js';
import 'file:///home/chatgpt/client/node_modules/micromark/lib/postprocess.js';
import 'file:///home/chatgpt/client/node_modules/unist-util-stringify-position/index.js';
import 'file:///home/chatgpt/client/node_modules/micromark-util-character/index.js';
import 'file:///home/chatgpt/client/node_modules/micromark-util-chunked/index.js';
import 'file:///home/chatgpt/client/node_modules/micromark-util-resolve-all/index.js';
import 'file:///home/chatgpt/client/node_modules/remark-emoji/index.js';
import 'file:///home/chatgpt/client/node_modules/rehype-slug/index.js';
import 'file:///home/chatgpt/client/node_modules/remark-squeeze-paragraphs/index.js';
import 'file:///home/chatgpt/client/node_modules/rehype-external-links/index.js';
import 'file:///home/chatgpt/client/node_modules/remark-gfm/index.js';
import 'file:///home/chatgpt/client/node_modules/rehype-sort-attribute-values/index.js';
import 'file:///home/chatgpt/client/node_modules/rehype-sort-attributes/index.js';
import 'file:///home/chatgpt/client/node_modules/rehype-raw/index.js';
import 'file:///home/chatgpt/client/node_modules/remark-mdc/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/remark-parse/index.js';
import 'file:///home/chatgpt/client/node_modules/remark-rehype/index.js';
import 'file:///home/chatgpt/client/node_modules/mdast-util-to-hast/index.js';
import 'file:///home/chatgpt/client/node_modules/detab/index.js';
import 'file:///home/chatgpt/client/node_modules/unist-builder/index.js';
import 'file:///home/chatgpt/client/node_modules/mdurl/index.js';
import 'file:///home/chatgpt/client/node_modules/slugify/slugify.js';
import 'file:///home/chatgpt/client/node_modules/unist-util-position/index.js';
import 'file:///home/chatgpt/client/node_modules/unist-util-visit/index.js';
import 'file:///home/chatgpt/client/node_modules/shiki-es/dist/shiki.node.mjs';
import 'file:///home/chatgpt/client/node_modules/unenv/runtime/npm/consola.mjs';

const components_islands = {};
const islandComponents = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: components_islands
});
const islandRenderer = /* @__PURE__ */ defineComponent({
  props: {
    context: {
      type: Object,
      required: true
    }
  },
  async setup(props) {
    var _a;
    const component = islandComponents[props.context.name];
    if (!component) {
      throw createError({
        statusCode: 404,
        statusMessage: `Island component not found: ${JSON.stringify(component)}`
      });
    }
    if (typeof component === "object") {
      await ((_a = component.__asyncLoader) == null ? void 0 : _a.call(component));
    }
    return () => [
      createBlock(Teleport, { to: "nuxt-island" }, [h(component || "span", props.context.props)])
    ];
  }
});

export { islandRenderer as default };
//# sourceMappingURL=island-renderer-e10177b0.mjs.map
