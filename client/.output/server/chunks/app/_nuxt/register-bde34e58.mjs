import { _ as __nuxt_component_0 } from './nuxt-link-f57cd0d9.mjs';
import { f as useRouter } from '../server.mjs';
import { defineComponent, ref, reactive, resolveComponent, mergeProps, withCtx, createVNode, withDirectives, vModelText, createTextVNode, useSSRContext } from 'vue';
import { u as useHead } from './composables-583e67d3.mjs';
import { u as useCounter, r as register, d as send_email } from './counter-d2eb9e2d.mjs';
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
import './asyncData-b7b62de5.mjs';
import './cookie-73492d56.mjs';
import 'cookie-es';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const counter = useCounter();
    useHead({
      title: "\u6CE8\u518C - " + counter.setting.title,
      meta: [{
        name: "description",
        content: counter.setting.description
      }, {
        name: "keywords",
        content: counter.setting.keywords
      }]
    });
    const ruleFormRef = ref();
    const ruleForm = reactive({
      name: "",
      email: "",
      password: "",
      email_code: "",
      invite_code: ""
    });
    const rules = reactive({
      name: [{
        required: true,
        message: "\u8BF7\u8F93\u5165\u7528\u6237\u540D",
        trigger: "blur"
      }],
      email: [{
        required: true,
        message: "\u8BF7\u8F93\u5165\u90AE\u7BB1\u5730\u5740",
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
      }],
      email_code: [{
        required: true,
        message: "\u8BF7\u8F93\u5165\u90AE\u7BB1\u9A8C\u8BC1\u7801",
        trigger: "blur"
      }]
    });
    const router = useRouter();
    const reg_loading = ref(false);
    const submitForm = async (formEl) => {
      if (!formEl)
        return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          reg_loading.value = true;
          register({
            name: ruleForm.name,
            email: ruleForm.email,
            password: ruleForm.password,
            email_code: ruleForm.email_code,
            invite_code: ruleForm.invite_code
          }).then((res) => {
            if (res._rawValue.status == 200) {
              ElMessage.success(res._rawValue.message);
              formEl.resetFields();
              router.push({
                path: "/login"
              });
              reg_loading.value = false;
            }
          }).catch((err) => {
            reg_loading.value = false;
          });
        } else {
          console.log("error submit!", fields);
        }
      });
    };
    const send_code = () => {
      if (ruleForm.email == "") {
        ElMessage.error("\u8BF7\u586B\u5199\u90AE\u7BB1");
        return;
      }
      send_email({
        email: ruleForm.email
      }).then((res) => {
        if (res._rawValue.status == 200) {
          ElMessage.success(res._rawValue.message);
        }
      }).catch((err) => {
        console.log(err);
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_form = resolveComponent("el-form");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_col = resolveComponent("el-col");
      const _component_el_button = resolveComponent("el-button");
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "authentication"
      }, _attrs))}><div class="container d-flex flex-column"><div class="row align-items-center justify-content-center no-gutters min-vh-100"><div class="col-12 col-md-7 col-lg-5 col-xl-4 py-md-11"><div class="card border-0 shadow-sm"><div class="card-body"><h3 class="text-center">\u6CE8\u518C</h3><p class="text-center mb-6">\u521B\u5EFA\u4E00\u4E2A\u514D\u8D39\u8D26\u6237</p>`);
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
              prop: "name"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="input-group mb-2"${_scopeId2}><input type="text" class="form-control form-control-lg"${ssrRenderAttr("value", ruleForm.name)} placeholder="\u586B\u5199\u60A8\u7684\u7528\u6237\u540D"${_scopeId2}></div>`);
                } else {
                  return [createVNode("div", {
                    class: "input-group mb-2"
                  }, [withDirectives(createVNode("input", {
                    type: "text",
                    class: "form-control form-control-lg",
                    "onUpdate:modelValue": ($event) => ruleForm.name = $event,
                    placeholder: "\u586B\u5199\u60A8\u7684\u7528\u6237\u540D"
                  }, null, 8, ["onUpdate:modelValue"]), [[vModelText, ruleForm.name]])])];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, {
              prop: "email"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="input-group mb-2"${_scopeId2}><input type="email" class="form-control form-control-lg"${ssrRenderAttr("value", ruleForm.email)} placeholder="\u8BF7\u586B\u5199\u60A8\u7684\u90AE\u7BB1"${_scopeId2}></div>`);
                } else {
                  return [createVNode("div", {
                    class: "input-group mb-2"
                  }, [withDirectives(createVNode("input", {
                    type: "email",
                    class: "form-control form-control-lg",
                    "onUpdate:modelValue": ($event) => ruleForm.email = $event,
                    placeholder: "\u8BF7\u586B\u5199\u60A8\u7684\u90AE\u7BB1"
                  }, null, 8, ["onUpdate:modelValue"]), [[vModelText, ruleForm.email]])])];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, {
              prop: "email_code"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_col, {
                    span: 16
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="input-group mb-2"${_scopeId3}><input type="email" class="form-control form-control-lg"${ssrRenderAttr("value", ruleForm.email_code)} placeholder="\u8BF7\u586B\u5199\u60A8\u7684\u90AE\u7BB1\u9A8C\u8BC1\u7801"${_scopeId3}></div>`);
                      } else {
                        return [createVNode("div", {
                          class: "input-group mb-2"
                        }, [withDirectives(createVNode("input", {
                          type: "email",
                          class: "form-control form-control-lg",
                          "onUpdate:modelValue": ($event) => ruleForm.email_code = $event,
                          placeholder: "\u8BF7\u586B\u5199\u60A8\u7684\u90AE\u7BB1\u9A8C\u8BC1\u7801"
                        }, null, 8, ["onUpdate:modelValue"]), [[vModelText, ruleForm.email_code]])])];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_col, {
                    span: 6,
                    class: "text-center"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="input-group mb-2 ml-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_el_button, {
                          type: "primary",
                          class: "form-control form-control-lg pd-2",
                          onClick: ($event) => send_code()
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`\u53D1\u9001\u9A8C\u8BC1\u7801`);
                            } else {
                              return [createTextVNode("\u53D1\u9001\u9A8C\u8BC1\u7801")];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [createVNode("div", {
                          class: "input-group mb-2 ml-2"
                        }, [createVNode(_component_el_button, {
                          type: "primary",
                          class: "form-control form-control-lg pd-2",
                          onClick: ($event) => send_code()
                        }, {
                          default: withCtx(() => [createTextVNode("\u53D1\u9001\u9A8C\u8BC1\u7801")]),
                          _: 1
                        }, 8, ["onClick"])])];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [createVNode(_component_el_col, {
                    span: 16
                  }, {
                    default: withCtx(() => [createVNode("div", {
                      class: "input-group mb-2"
                    }, [withDirectives(createVNode("input", {
                      type: "email",
                      class: "form-control form-control-lg",
                      "onUpdate:modelValue": ($event) => ruleForm.email_code = $event,
                      placeholder: "\u8BF7\u586B\u5199\u60A8\u7684\u90AE\u7BB1\u9A8C\u8BC1\u7801"
                    }, null, 8, ["onUpdate:modelValue"]), [[vModelText, ruleForm.email_code]])])]),
                    _: 1
                  }), createVNode(_component_el_col, {
                    span: 6,
                    class: "text-center"
                  }, {
                    default: withCtx(() => [createVNode("div", {
                      class: "input-group mb-2 ml-2"
                    }, [createVNode(_component_el_button, {
                      type: "primary",
                      class: "form-control form-control-lg pd-2",
                      onClick: ($event) => send_code()
                    }, {
                      default: withCtx(() => [createTextVNode("\u53D1\u9001\u9A8C\u8BC1\u7801")]),
                      _: 1
                    }, 8, ["onClick"])])]),
                    _: 1
                  })];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, {
              prop: "password"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="input-group mb-2"${_scopeId2}><input type="password" class="form-control form-control-lg"${ssrRenderAttr("value", ruleForm.password)} placeholder="\u586B\u5199\u60A8\u7684\u5BC6\u7801"${_scopeId2}></div>`);
                } else {
                  return [createVNode("div", {
                    class: "input-group mb-2"
                  }, [withDirectives(createVNode("input", {
                    type: "password",
                    class: "form-control form-control-lg",
                    "onUpdate:modelValue": ($event) => ruleForm.password = $event,
                    placeholder: "\u586B\u5199\u60A8\u7684\u5BC6\u7801"
                  }, null, 8, ["onUpdate:modelValue"]), [[vModelText, ruleForm.password]])])];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, {
              prop: "invite_code"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="input-group mb-2"${_scopeId2}><input type="invite_code" class="form-control form-control-lg"${ssrRenderAttr("value", ruleForm.invite_code)} placeholder="\u586B\u5199\u60A8\u7684\u9080\u8BF7\u7801\uFF08\u53EF\u9009\uFF09"${_scopeId2}></div>`);
                } else {
                  return [createVNode("div", {
                    class: "input-group mb-2"
                  }, [withDirectives(createVNode("input", {
                    type: "invite_code",
                    class: "form-control form-control-lg",
                    "onUpdate:modelValue": ($event) => ruleForm.invite_code = $event,
                    placeholder: "\u586B\u5199\u60A8\u7684\u9080\u8BF7\u7801\uFF08\u53EF\u9009\uFF09"
                  }, null, 8, ["onUpdate:modelValue"]), [[vModelText, ruleForm.invite_code]])])];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "primary",
                    loading: reg_loading.value,
                    class: "register",
                    size: "large",
                    onClick: ($event) => submitForm(ruleFormRef.value)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` \u6CE8\u518C `);
                      } else {
                        return [createTextVNode(" \u6CE8\u518C ")];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [createVNode(_component_el_button, {
                    type: "primary",
                    loading: reg_loading.value,
                    class: "register",
                    size: "large",
                    onClick: ($event) => submitForm(ruleFormRef.value)
                  }, {
                    default: withCtx(() => [createTextVNode(" \u6CE8\u518C ")]),
                    _: 1
                  }, 8, ["loading", "onClick"])];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [createVNode(_component_el_form_item, {
              prop: "name"
            }, {
              default: withCtx(() => [createVNode("div", {
                class: "input-group mb-2"
              }, [withDirectives(createVNode("input", {
                type: "text",
                class: "form-control form-control-lg",
                "onUpdate:modelValue": ($event) => ruleForm.name = $event,
                placeholder: "\u586B\u5199\u60A8\u7684\u7528\u6237\u540D"
              }, null, 8, ["onUpdate:modelValue"]), [[vModelText, ruleForm.name]])])]),
              _: 1
            }), createVNode(_component_el_form_item, {
              prop: "email"
            }, {
              default: withCtx(() => [createVNode("div", {
                class: "input-group mb-2"
              }, [withDirectives(createVNode("input", {
                type: "email",
                class: "form-control form-control-lg",
                "onUpdate:modelValue": ($event) => ruleForm.email = $event,
                placeholder: "\u8BF7\u586B\u5199\u60A8\u7684\u90AE\u7BB1"
              }, null, 8, ["onUpdate:modelValue"]), [[vModelText, ruleForm.email]])])]),
              _: 1
            }), createVNode(_component_el_form_item, {
              prop: "email_code"
            }, {
              default: withCtx(() => [createVNode(_component_el_col, {
                span: 16
              }, {
                default: withCtx(() => [createVNode("div", {
                  class: "input-group mb-2"
                }, [withDirectives(createVNode("input", {
                  type: "email",
                  class: "form-control form-control-lg",
                  "onUpdate:modelValue": ($event) => ruleForm.email_code = $event,
                  placeholder: "\u8BF7\u586B\u5199\u60A8\u7684\u90AE\u7BB1\u9A8C\u8BC1\u7801"
                }, null, 8, ["onUpdate:modelValue"]), [[vModelText, ruleForm.email_code]])])]),
                _: 1
              }), createVNode(_component_el_col, {
                span: 6,
                class: "text-center"
              }, {
                default: withCtx(() => [createVNode("div", {
                  class: "input-group mb-2 ml-2"
                }, [createVNode(_component_el_button, {
                  type: "primary",
                  class: "form-control form-control-lg pd-2",
                  onClick: ($event) => send_code()
                }, {
                  default: withCtx(() => [createTextVNode("\u53D1\u9001\u9A8C\u8BC1\u7801")]),
                  _: 1
                }, 8, ["onClick"])])]),
                _: 1
              })]),
              _: 1
            }), createVNode(_component_el_form_item, {
              prop: "password"
            }, {
              default: withCtx(() => [createVNode("div", {
                class: "input-group mb-2"
              }, [withDirectives(createVNode("input", {
                type: "password",
                class: "form-control form-control-lg",
                "onUpdate:modelValue": ($event) => ruleForm.password = $event,
                placeholder: "\u586B\u5199\u60A8\u7684\u5BC6\u7801"
              }, null, 8, ["onUpdate:modelValue"]), [[vModelText, ruleForm.password]])])]),
              _: 1
            }), createVNode(_component_el_form_item, {
              prop: "invite_code"
            }, {
              default: withCtx(() => [createVNode("div", {
                class: "input-group mb-2"
              }, [withDirectives(createVNode("input", {
                type: "invite_code",
                class: "form-control form-control-lg",
                "onUpdate:modelValue": ($event) => ruleForm.invite_code = $event,
                placeholder: "\u586B\u5199\u60A8\u7684\u9080\u8BF7\u7801\uFF08\u53EF\u9009\uFF09"
              }, null, 8, ["onUpdate:modelValue"]), [[vModelText, ruleForm.invite_code]])])]),
              _: 1
            }), createVNode(_component_el_form_item, null, {
              default: withCtx(() => [createVNode(_component_el_button, {
                type: "primary",
                loading: reg_loading.value,
                class: "register",
                size: "large",
                onClick: ($event) => submitForm(ruleFormRef.value)
              }, {
                default: withCtx(() => [createTextVNode(" \u6CE8\u518C ")]),
                _: 1
              }, 8, ["loading", "onClick"])]),
              _: 1
            })];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-center mb-0">\u5DF2\u7ECF\u6709\u8D26\u6237\u4E86? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "link",
        to: "/login"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u767B\u5F55`);
          } else {
            return [createTextVNode("\u767B\u5F55")];
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-bde34e58.mjs.map
