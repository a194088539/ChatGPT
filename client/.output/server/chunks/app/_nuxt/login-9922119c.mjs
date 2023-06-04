import { _ as __nuxt_component_0 } from './nuxt-link-f57cd0d9.mjs';
import { f as useRouter } from '../server.mjs';
import { defineComponent, ref, reactive, resolveComponent, mergeProps, withCtx, createVNode, withDirectives, vModelText, createTextVNode, useSSRContext } from 'vue';
import { u as useHead } from './composables-583e67d3.mjs';
import { u as useCookie } from './cookie-73492d56.mjs';
import { u as useCounter, l as logins } from './counter-d2eb9e2d.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { ElMessage } from 'element-plus';
import 'ufo';
import 'ofetch';
import 'hookable';
import 'unctx';
import '@unhead/vue';
import '@unhead/dom';
import '@unhead/ssr';
import 'vue-router';
import 'h3';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'unstorage/drivers/overlay';
import 'unstorage/drivers/memory';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'unified';
import 'mdast-util-to-string';
import 'micromark/lib/preprocess.js';
import 'micromark/lib/postprocess.js';
import 'unist-util-stringify-position';
import 'micromark-util-character';
import 'micromark-util-chunked';
import 'micromark-util-resolve-all';
import 'remark-emoji';
import 'rehype-slug';
import 'remark-squeeze-paragraphs';
import 'rehype-external-links';
import 'remark-gfm';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'remark-mdc';
import 'remark-parse';
import 'remark-rehype';
import 'mdast-util-to-hast';
import 'detab';
import 'unist-builder';
import 'mdurl';
import 'slugify';
import 'unist-util-position';
import 'unist-util-visit';
import 'shiki-es';
import 'unenv/runtime/npm/consola';
import 'cookie-es';
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
