import { _ as __nuxt_component_0 } from "./nuxt-link-f57cd0d9.js";
import { _ as __nuxt_component_1 } from "./client-only-7e9de0b5.js";
import { u as useCounter, n as get_nav_config } from "./counter-d2eb9e2d.js";
import { defineComponent, withCtx, unref, createVNode, useSSRContext, mergeProps } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
import { ElMessage } from "element-plus";
import { _ as _export_sfc } from "../server.mjs";
import "ufo";
import "ohash";
import "./asyncData-b7b62de5.js";
import "./cookie-73492d56.js";
import "cookie-es";
import "h3";
import "destr";
import "ofetch";
import "#internal/nitro";
import "hookable";
import "unctx";
import "@vue/devtools-api";
import "@unhead/vue";
import "@unhead/dom";
import "@unhead/ssr";
import "vue-router";
import "defu";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Navigation",
  __ssrInlineRender: true,
  setup(__props) {
    const counter = useCounter();
    const get_config = () => {
      get_nav_config().then((res) => {
        counter.setting = res._rawValue.data;
      }).catch((err) => {
        ElMessage.error(err);
      });
    };
    get_config();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_client_only = __nuxt_component_1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        title: "Postman",
        class: "brand"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", unref(counter).setting.logo)} alt="logo"${_scopeId}>`);
          } else {
            return [createVNode("img", {
              src: unref(counter).setting.logo,
              alt: "logo"
            }, null, 8, ["src"])];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="nav flex-md-column nav-pills flex-grow-1" role="tablist" aria-orientation="vertical">`);
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(`</div><div class="nav flex-md-column nav-pills flex-grow-2" role="tablist" aria-orientation="vertical">`);
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navigation.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Navigation = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(mergeProps({
    id: "layout",
    class: "theme-cyan"
  }, _attrs))}><div class="navigation navbar justify-content-center py-xl-4 py-md-3 py-0 px-3">`);
  _push(ssrRenderComponent(_component_Navigation, null, null, _parent));
  _push(`</div>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  _default as default
};
//# sourceMappingURL=default-c704890f.js.map
