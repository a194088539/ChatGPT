import { _ as __nuxt_component_0 } from "./nuxt-link-f57cd0d9.js";
import { f as useRouter } from "../server.mjs";
import { defineComponent, ref, reactive, resolveComponent, mergeProps, withCtx, createVNode, withDirectives, vModelText, createTextVNode, useSSRContext } from "vue";
import { u as useHead } from "./composables-583e67d3.js";
import "destr";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { u as useCounter, e as reset_password, d as send_email } from "./counter-d2eb9e2d.js";
import { ElMessage } from "element-plus";
import "ufo";
import "ofetch";
import "#internal/nitro";
import "hookable";
import "unctx";
import "@vue/devtools-api";
import "@unhead/vue";
import "@unhead/dom";
import "@unhead/ssr";
import "vue-router";
import "h3";
import "defu";
import "ohash";
import "./asyncData-b7b62de5.js";
import "./cookie-73492d56.js";
import "cookie-es";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "reset",
  __ssrInlineRender: true,
  setup(__props) {
    const counter = useCounter();
    useHead({
      title: "重置密码 - " + counter.setting.title,
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
      email: "",
      email_code: "",
      password: "",
      password_c: ""
    });
    const rules = reactive({
      email: [{
        required: true,
        message: "请输入邮箱",
        trigger: "blur"
      }, {
        type: "email",
        message: "请输入正确的邮箱地址",
        trigger: ["blur", "change"]
      }],
      email_code: [{
        required: true,
        message: "请输入邮箱验证码",
        trigger: "blur"
      }],
      password: [{
        required: true,
        message: "请输入密码",
        trigger: "blur"
      }, {
        min: 8,
        message: "密码长度不能小于8位",
        trigger: "blur"
      }],
      password_c: [{
        required: true,
        message: "请确认密码",
        trigger: "blur"
      }, {
        min: 8,
        message: "密码长度不能小于8位",
        trigger: "blur"
      }]
    });
    const router = useRouter();
    const pass_loading = ref(false);
    const submitForm = async (formEl) => {
      if (!formEl)
        return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          if (ruleForm.password != ruleForm.password_c) {
            ElMessage.error("两次密码不一致");
            return;
          }
          pass_loading.value = true;
          reset_password({
            email: ruleForm.email,
            email_code: ruleForm.email_code,
            password: ruleForm.password
          }).then((res) => {
            if (res._rawValue.status == 200) {
              ElMessage.success(res._rawValue.message);
              formEl.resetFields();
              router.push({
                path: "/login"
              });
              pass_loading.value = false;
            }
          }).catch((err) => {
            pass_loading.value = false;
            ElMessage.error(err.message);
          });
        } else {
          console.log("error submit!", fields);
        }
      });
    };
    const send_code = () => {
      if (ruleForm.email == "") {
        ElMessage.error("请填写邮箱");
        return;
      }
      send_email({
        email: ruleForm.email
      }).then((res) => {
        if (res._rawValue.status == 200) {
          ElMessage.success(res._rawValue.message);
        }
      }).catch((err) => {
        ElMessage.error(err.message);
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
      }, _attrs))}><div class="container d-flex flex-column"><div class="row align-items-center justify-content-center no-gutters min-vh-100"><div class="col-12 col-md-7 col-lg-5 col-xl-4 py-md-11"><div class="card border-0 shadow-sm"><div class="card-body"><h3 class="text-center">重置密码</h3><p class="text-center mb-6"> 请在下面输入你的电子邮件地址，并且发送验证码到你的邮箱。 </p>`);
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
                  _push3(`<div class="input-group mb-2"${_scopeId2}><input type="email" class="form-control form-control-lg"${ssrRenderAttr("value", ruleForm.email)} placeholder="请填写您的邮箱"${_scopeId2}></div>`);
                } else {
                  return [createVNode("div", {
                    class: "input-group mb-2"
                  }, [withDirectives(createVNode("input", {
                    type: "email",
                    class: "form-control form-control-lg",
                    "onUpdate:modelValue": ($event) => ruleForm.email = $event,
                    placeholder: "请填写您的邮箱"
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
                        _push4(`<div class="input-group mb-2"${_scopeId3}><input type="email" class="form-control form-control-lg"${ssrRenderAttr("value", ruleForm.email_code)} placeholder="请填写您的邮箱验证码"${_scopeId3}></div>`);
                      } else {
                        return [createVNode("div", {
                          class: "input-group mb-2"
                        }, [withDirectives(createVNode("input", {
                          type: "email",
                          class: "form-control form-control-lg",
                          "onUpdate:modelValue": ($event) => ruleForm.email_code = $event,
                          placeholder: "请填写您的邮箱验证码"
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
                              _push5(`发送验证码`);
                            } else {
                              return [createTextVNode("发送验证码")];
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
                          default: withCtx(() => [createTextVNode("发送验证码")]),
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
                      placeholder: "请填写您的邮箱验证码"
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
                      default: withCtx(() => [createTextVNode("发送验证码")]),
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
                  _push3(`<div class="input-group mb-2"${_scopeId2}><input type="password" class="form-control form-control-lg"${ssrRenderAttr("value", ruleForm.password)} placeholder="填写您的密码"${_scopeId2}></div>`);
                } else {
                  return [createVNode("div", {
                    class: "input-group mb-2"
                  }, [withDirectives(createVNode("input", {
                    type: "password",
                    class: "form-control form-control-lg",
                    "onUpdate:modelValue": ($event) => ruleForm.password = $event,
                    placeholder: "填写您的密码"
                  }, null, 8, ["onUpdate:modelValue"]), [[vModelText, ruleForm.password]])])];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, {
              prop: "password"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="input-group mb-2"${_scopeId2}><input type="password" class="form-control form-control-lg"${ssrRenderAttr("value", ruleForm.password_c)} placeholder="确认您的密码"${_scopeId2}></div>`);
                } else {
                  return [createVNode("div", {
                    class: "input-group mb-2"
                  }, [withDirectives(createVNode("input", {
                    type: "password",
                    class: "form-control form-control-lg",
                    "onUpdate:modelValue": ($event) => ruleForm.password_c = $event,
                    placeholder: "确认您的密码"
                  }, null, 8, ["onUpdate:modelValue"]), [[vModelText, ruleForm.password_c]])])];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "primary",
                    loading: pass_loading.value,
                    class: "register",
                    size: "large",
                    onClick: ($event) => submitForm(ruleFormRef.value)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 重置密码 `);
                      } else {
                        return [createTextVNode(" 重置密码 ")];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [createVNode(_component_el_button, {
                    type: "primary",
                    loading: pass_loading.value,
                    class: "register",
                    size: "large",
                    onClick: ($event) => submitForm(ruleFormRef.value)
                  }, {
                    default: withCtx(() => [createTextVNode(" 重置密码 ")]),
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
                class: "input-group mb-2"
              }, [withDirectives(createVNode("input", {
                type: "email",
                class: "form-control form-control-lg",
                "onUpdate:modelValue": ($event) => ruleForm.email = $event,
                placeholder: "请填写您的邮箱"
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
                  placeholder: "请填写您的邮箱验证码"
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
                  default: withCtx(() => [createTextVNode("发送验证码")]),
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
                placeholder: "填写您的密码"
              }, null, 8, ["onUpdate:modelValue"]), [[vModelText, ruleForm.password]])])]),
              _: 1
            }), createVNode(_component_el_form_item, {
              prop: "password"
            }, {
              default: withCtx(() => [createVNode("div", {
                class: "input-group mb-2"
              }, [withDirectives(createVNode("input", {
                type: "password",
                class: "form-control form-control-lg",
                "onUpdate:modelValue": ($event) => ruleForm.password_c = $event,
                placeholder: "确认您的密码"
              }, null, 8, ["onUpdate:modelValue"]), [[vModelText, ruleForm.password_c]])])]),
              _: 1
            }), createVNode(_component_el_form_item, null, {
              default: withCtx(() => [createVNode(_component_el_button, {
                type: "primary",
                loading: pass_loading.value,
                class: "register",
                size: "large",
                onClick: ($event) => submitForm(ruleFormRef.value)
              }, {
                default: withCtx(() => [createTextVNode(" 重置密码 ")]),
                _: 1
              }, 8, ["loading", "onClick"])]),
              _: 1
            })];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-center mb-0">已经有账户了？`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "link",
        to: "/login"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`登录`);
          } else {
            return [createTextVNode("登录")];
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/users/reset.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=reset-90b9384d.js.map
