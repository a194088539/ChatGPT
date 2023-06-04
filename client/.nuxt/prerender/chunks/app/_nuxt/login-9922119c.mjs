import { _ as __nuxt_component_0 } from './nuxt-link-f57cd0d9.mjs';
import { f as useRouter } from '../server.mjs';
import { defineComponent, ref, reactive, resolveComponent, mergeProps, withCtx, createVNode, withDirectives, vModelText, createTextVNode, useSSRContext } from 'file:///home/chatgpt/client/node_modules/vue/index.mjs';
import { u as useHead } from './composables-583e67d3.mjs';
import { u as useCookie } from './cookie-73492d56.mjs';
import { u as useCounter, l as logins } from './counter-d2eb9e2d.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'file:///home/chatgpt/client/node_modules/vue/server-renderer/index.mjs';
import { ElMessage } from 'file:///home/chatgpt/client/node_modules/element-plus/es/index.mjs';
import 'file:///home/chatgpt/client/node_modules/ufo/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/ofetch/dist/node.mjs';
import 'file:///home/chatgpt/client/node_modules/hookable/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/unctx/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/@unhead/vue/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/@unhead/dom/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/@unhead/ssr/dist/index.mjs';
import 'file:///home/chatgpt/client/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///home/chatgpt/client/node_modules/h3/dist/index.mjs';
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
import 'file:///home/chatgpt/client/node_modules/cookie-es/dist/index.mjs';
import './asyncData-b7b62de5.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const counter = useCounter();
    useHead({
      title: "\u767B\u5F55 - " + counter.setting.title,
      meta: [{
        name: "description",
        content: counter.setting.description
      }, {
        name: "keywords",
        content: counter.setting.keywords
      }]
    });
    ref("");
    ref("");
    const ruleFormRef = ref();
    const ruleForm = reactive({
      email: "",
      password: ""
    });
    const rules = reactive({
      email: [{
        required: true,
        message: "\u8BF7\u8F93\u5165\u90AE\u7BB1",
        trigger: "blur"
      }, {
        type: "email",
        message: "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u90AE\u7BB1\u5730\u5740",
        trigger: ["blur", "change"]
      }],
      password: [{
        required: true,
        message: "\u8BF7\u8F93\u5165\u5BC6\u7801",
        trigger: "blur"
      }, {
        min: 6,
        max: 20,
        message: "\u5BC6\u7801\u957F\u5EA6\u5728 6 \u5230 20 \u4E2A\u5B57\u7B26",
        trigger: "blur"
      }]
    });
    const login_loading = ref(false);
    const token = useCookie("token");
    const user_info = useCookie("user_info");
    const router = useRouter();
    const submitForm = async (formEl) => {
      if (!formEl)
        return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          login_loading.value = true;
          logins({
            email: ruleForm.email,
            password: ruleForm.password
          }).then((res) => {
            login_loading.value = false;
            if (res._rawValue.status == 200) {
              token.value = res._rawValue.token;
              user_info.value = res._rawValue.user_info;
              ElMessage.success(res._rawValue.message);
              router.push("/");
            }
          }).catch((err) => {
            login_loading.value = false;
          });
        } else {
          console.log("error submit!", fields);
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_form = resolveComponent("el-form");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_NuxtLink = __nuxt_component_0;
      const _component_el_button = resolveComponent("el-button");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "authentication"
      }, _attrs))}><div class="container d-flex flex-column"><div class="row align-items-center justify-content-center no-gutters min-vh-100"><div class="col-12 col-md-7 col-lg-5 col-xl-4 py-md-11"><div class="card border-0 shadow-sm"><div class="card-body"><h3 class="text-center">\u767B\u5F55</h3><p class="text-center mb-6">\u767B\u5F55\u81EA\u4E3B\u7528\u6237\uFF0C\u5F00\u59CB\u804A\u5929</p>`);
      _push(ssrRenderComponent(_component_el_form, {
        ref_key: "ruleFormRef",
        ref: ruleFormRef,
        model: ruleForm,
        rules,
        class: "demo-ruleForm",
        "status-icon": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form_item, {
              prop: "email"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="input-group"${_scopeId2}><input type="email" class="form-control form-control-lg"${ssrRenderAttr("value", ruleForm.email)} placeholder="\u8F93\u5165\u4F60\u7684\u90AE\u7BB1"${_scopeId2}></div>`);
                } else {
                  return [createVNode("div", {
                    class: "input-group"
                  }, [withDirectives(createVNode("input", {
                    type: "email",
                    class: "form-control form-control-lg",
                    "onUpdate:modelValue": ($event) => ruleForm.email = $event,
                    placeholder: "\u8F93\u5165\u4F60\u7684\u90AE\u7BB1"
                  }, null, 8, ["onUpdate:modelValue"]), [[vModelText, ruleForm.email]])])];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, {
              prop: "password"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="input-group"${_scopeId2}><input type="password" class="form-control form-control-lg"${ssrRenderAttr("value", ruleForm.password)} placeholder="\u8F93\u5165\u4F60\u7684\u5BC6\u7801"${_scopeId2}></div>`);
                } else {
                  return [createVNode("div", {
                    class: "input-group"
                  }, [withDirectives(createVNode("input", {
                    type: "password",
                    class: "form-control form-control-lg",
                    "onUpdate:modelValue": ($event) => ruleForm.password = $event,
                    placeholder: "\u8F93\u5165\u4F60\u7684\u5BC6\u7801"
                  }, null, 8, ["onUpdate:modelValue"]), [[vModelText, ruleForm.password]])])];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="form-group d-flex justify-content-between mb-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              class: "link",
              href: "/users/reset"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u5FD8\u8BB0\u5BC6\u7801`);
                } else {
                  return [createTextVNode("\u5FD8\u8BB0\u5BC6\u7801")];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_el_form_item, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    loading: login_loading.value,
                    size: "large",
                    type: "primary",
                    onClick: ($event) => submitForm(ruleFormRef.value),
                    class: "login"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` \u767B\u5F55 `);
                      } else {
                        return [createTextVNode(" \u767B\u5F55 ")];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [createVNode(_component_el_button, {
                    loading: login_loading.value,
                    size: "large",
                    type: "primary",
                    onClick: ($event) => submitForm(ruleFormRef.value),
                    class: "login"
                  }, {
                    default: withCtx(() => [createTextVNode(" \u767B\u5F55 ")]),
                    _: 1
                  }, 8, ["loading", "onClick"])];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [createVNode(_component_el_form_item, {
              prop: "email"
            }, {
              default: withCtx(() => [createVNode("div", {
                class: "input-group"
              }, [withDirectives(createVNode("input", {
                type: "email",
                class: "form-control form-control-lg",
                "onUpdate:modelValue": ($event) => ruleForm.email = $event,
                placeholder: "\u8F93\u5165\u4F60\u7684\u90AE\u7BB1"
              }, null, 8, ["onUpdate:modelValue"]), [[vModelText, ruleForm.email]])])]),
              _: 1
            }), createVNode(_component_el_form_item, {
              prop: "password"
            }, {
              default: withCtx(() => [createVNode("div", {
                class: "input-group"
              }, [withDirectives(createVNode("input", {
                type: "password",
                class: "form-control form-control-lg",
                "onUpdate:modelValue": ($event) => ruleForm.password = $event,
                placeholder: "\u8F93\u5165\u4F60\u7684\u5BC6\u7801"
              }, null, 8, ["onUpdate:modelValue"]), [[vModelText, ruleForm.password]])])]),
              _: 1
            }), createVNode("div", {
              class: "form-group d-flex justify-content-between mb-4"
            }, [createVNode(_component_NuxtLink, {
              class: "link",
              href: "/users/reset"
            }, {
              default: withCtx(() => [createTextVNode("\u5FD8\u8BB0\u5BC6\u7801")]),
              _: 1
            })]), createVNode(_component_el_form_item, null, {
              default: withCtx(() => [createVNode(_component_el_button, {
                loading: login_loading.value,
                size: "large",
                type: "primary",
                onClick: ($event) => submitForm(ruleFormRef.value),
                class: "login"
              }, {
                default: withCtx(() => [createTextVNode(" \u767B\u5F55 ")]),
                _: 1
              }, 8, ["loading", "onClick"])]),
              _: 1
            })];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-center mb-0">\u8FD8\u6CA1\u6709\u8D26\u6237\uFF1F `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "link",
        to: "/register"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u6CE8\u518C\u4E00\u4E2A`);
          } else {
            return [createTextVNode("\u6CE8\u518C\u4E00\u4E2A")];
          }
        }),
        _: 1
      }, _parent));
      _push(`.</p></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-9922119c.mjs.map
