import { defineComponent, getCurrentInstance, useSlots, computed, h, useSSRContext } from "vue";
import { b as useUnwrap } from "./utils-79c48fb6.js";
import "ufo";
import "../server.mjs";
import "ofetch";
import "#internal/nitro";
import "hookable";
import "unctx";
import "@vue/devtools-api";
import "destr";
import "@unhead/vue";
import "@unhead/dom";
import "@unhead/ssr";
import "vue-router";
import "h3";
import "element-plus";
import "vue/server-renderer";
import "defu";
const _sfc_main = /* @__PURE__ */ defineComponent({
  name: "ContentSlot",
  functional: true,
  props: {
    /**
      * A slot name or function
     */
    use: {
      type: Function,
      default: void 0
    },
    /**
     * Tags to unwrap separated by spaces
     * Example: 'ul li'
     */
    unwrap: {
      type: [Boolean, String],
      default: false
    }
  },
  setup(props) {
    const { parent } = getCurrentInstance();
    const { between, default: fallbackSlot } = useSlots();
    const tags = computed(() => {
      if (typeof props.unwrap === "string") {
        return props.unwrap.split(" ");
      }
      return ["*"];
    });
    return {
      fallbackSlot,
      tags,
      between,
      parent
    };
  },
  render({ use, unwrap, fallbackSlot, between, tags, parent }) {
    var _a;
    try {
      let slot = use;
      if (typeof use === "string") {
        slot = (parent == null ? void 0 : parent.slots[use]) || ((_a = parent == null ? void 0 : parent.parent) == null ? void 0 : _a.slots[use]);
        console.warn(`Please set :use="$slots.${use}" in <ContentSlot> component to enable reactivity`);
      }
      if (!slot) {
        return fallbackSlot ? fallbackSlot() : h("div");
      }
      if (!unwrap) {
        return [slot()];
      }
      const { flatUnwrap } = useUnwrap();
      const unwrapped = flatUnwrap(slot(), tags);
      if (between) {
        return unwrapped.flatMap(
          (vnode, index) => index === 0 ? [vnode] : [between(), vnode]
        );
      }
      return unwrapped.reduce((acc, item) => {
        if (typeof item.children === "string") {
          if (typeof acc[acc.length - 1] === "string") {
            acc[acc.length - 1] += item.children;
          } else {
            acc.push(item.children);
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    } catch (e) {
      return h("div");
    }
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/content/dist/runtime/components/ContentSlot.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=ContentSlot-c13ece71.js.map
