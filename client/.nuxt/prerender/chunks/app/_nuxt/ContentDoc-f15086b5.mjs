import { a as useRoute, u as useRuntimeConfig } from '../server.mjs';
import { defineComponent, useSlots, h, useSSRContext, unref, watch } from 'file:///home/chatgpt/client/node_modules/vue/index.mjs';
import { withTrailingSlash, joinURL, withoutTrailingSlash, hasProtocol } from 'file:///home/chatgpt/client/node_modules/ufo/dist/index.mjs';
import { u as useHead } from './composables-583e67d3.mjs';
import _sfc_main$2 from './ContentRenderer-7875d416.mjs';
import _sfc_main$1 from './ContentQuery-bea94d3d.mjs';
import 'file:///home/chatgpt/client/node_modules/ofetch/dist/node.mjs';
import 'file:///home/chatgpt/client/node_modules/hookable/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/unctx/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/@unhead/vue/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/@unhead/dom/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/@unhead/ssr/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///home/chatgpt/client/node_modules/h3/dist/index.mjs';
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
import './ContentRendererMarkdown-6c0d6f8b.mjs';
import 'file:///home/chatgpt/client/node_modules/property-information/index.js';
import './asyncData-b7b62de5.mjs';
import './query-6e89bffd.mjs';
import './cookie-73492d56.mjs';
import 'file:///home/chatgpt/client/node_modules/cookie-es/dist/index.mjs';
import './utils-79c48fb6.mjs';

const useContentHead = (_content, to = useRoute()) => {
  const content = unref(_content);
  const config = useRuntimeConfig();
  const refreshHead = (data = content) => {
    var _a;
    if (!to.path || !data) {
      return;
    }
    const head = Object.assign({}, (data == null ? void 0 : data.head) || {});
    head.meta = [...head.meta || []];
    head.link = [...head.link || []];
    const title = head.title || (data == null ? void 0 : data.title);
    if (title) {
      head.title = title;
      if (!head.meta.some((m) => m.property === "og:title")) {
        head.meta.push({
          name: "og:title",
          content: title
        });
      }
    }
    const host = config.public.content.host;
    if (host) {
      const _url = joinURL(host != null ? host : "/", config.app.baseURL, to.fullPath);
      const url = config.public.content.trailingSlash ? withTrailingSlash(_url) : withoutTrailingSlash(_url);
      if (!head.meta.some((m) => m.property === "og:url")) {
        head.meta.push({
          name: "og:url",
          content: url
        });
      }
      if (!head.link.some((m) => m.rel === "canonical")) {
        head.link.push({
          rel: "canonical",
          href: url
        });
      }
    }
    const description = (head == null ? void 0 : head.description) || (data == null ? void 0 : data.description);
    if (description && head.meta.filter((m) => m.name === "description").length === 0) {
      head.meta.push({
        name: "description",
        content: description
      });
    }
    if (description && !head.meta.some((m) => m.property === "og:description")) {
      head.meta.push({
        name: "og:description",
        content: description
      });
    }
    const image = (head == null ? void 0 : head.image) || (data == null ? void 0 : data.image);
    if (image && head.meta.filter((m) => m.property === "og:image").length === 0) {
      if (typeof image === "string") {
        head.meta.push({
          property: "og:image",
          // @ts-ignore - We expect `head.image` from Nuxt configurations...
          content: host && !hasProtocol(image) ? new URL(joinURL(config.app.baseURL, image), host).href : image
        });
      }
      if (typeof image === "object") {
        const imageKeys = [
          "src",
          "secure_url",
          "type",
          "width",
          "height",
          "alt"
        ];
        for (const key of imageKeys) {
          if (key === "src" && image.src) {
            const isAbsoluteURL = hasProtocol(image.src);
            const imageURL = isAbsoluteURL ? image.src : joinURL(config.app.baseURL, (_a = image.src) != null ? _a : "/");
            head.meta.push({
              property: "og:image",
              content: host && !isAbsoluteURL ? new URL(imageURL, host).href : imageURL
            });
          } else if (image[key]) {
            head.meta.push({
              property: `og:image:${key}`,
              content: image[key]
            });
          }
        }
      }
    }
    {
      useHead(head);
    }
  };
  watch(() => unref(_content), refreshHead, { immediate: true });
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  name: "ContentDoc",
  props: {
    /**
     * Renderer props
     */
    /**
     * The tag to use for the renderer element if it is used.
     * @default 'div'
     */
    tag: {
      type: String,
      required: false,
      default: "div"
    },
    /**
     * Whether or not to render the excerpt.
     * @default false
     */
    excerpt: {
      type: Boolean,
      default: false
    },
    /**
     * Query props
     */
    /**
     * The path of the content to load from content source.
     * @default useRoute().path
     */
    path: {
      type: String,
      required: false,
      default: void 0
    },
    /**
     * A query builder params object to be passed to <ContentQuery /> component.
     */
    query: {
      type: Object,
      required: false,
      default: void 0
    },
    /**
     * Whether or not to map the document data to the `head` property.
     */
    head: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  /**
   * Document empty fallback
   * @slot empty
   */
  /**
   * Document not found fallback
   * @slot not-found
   */
  render(ctx) {
    const slots = useSlots();
    const { tag, excerpt, path, query, head } = ctx;
    const contentQueryProps = {
      ...query || {},
      path: path || (query == null ? void 0 : query.path) || withTrailingSlash(useRoute().path),
      find: "one"
    };
    const emptyNode = (slot, data) => h("pre", null, JSON.stringify({ message: "You should use slots with <ContentDoc>", slot, data }, null, 2));
    return h(
      _sfc_main$1,
      contentQueryProps,
      {
        // Default slot
        default: (slots == null ? void 0 : slots.default) ? ({ data, refresh, isPartial }) => {
          var _a;
          if (head) {
            useContentHead(data);
          }
          return (_a = slots.default) == null ? void 0 : _a.call(slots, { doc: data, refresh, isPartial, excerpt, ...this.$attrs });
        } : ({ data }) => {
          if (head) {
            useContentHead(data);
          }
          return h(
            _sfc_main$2,
            { value: data, excerpt, tag, ...this.$attrs },
            // Forward local `empty` slots to ContentRenderer if it is used.
            { empty: (bindings) => (slots == null ? void 0 : slots.empty) ? slots.empty(bindings) : emptyNode("default", data) }
          );
        },
        // Empty slot
        empty: (bindings) => {
          var _a;
          return ((_a = slots == null ? void 0 : slots.empty) == null ? void 0 : _a.call(slots, bindings)) || h("p", null, "Document is empty, overwrite this content with #empty slot in <ContentDoc>.");
        },
        // Not Found slot
        "not-found": (bindings) => {
          var _a;
          return ((_a = slots == null ? void 0 : slots["not-found"]) == null ? void 0 : _a.call(slots, bindings)) || h("p", null, "Document not found, overwrite this content with #not-found slot in <ContentDoc>.");
        }
      }
    );
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ContentDoc-f15086b5.mjs.map
