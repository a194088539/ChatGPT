import { _ as __nuxt_component_0 } from "./nuxt-link-f57cd0d9.js";
import { f as useRouter } from "../server.mjs";
import { defineComponent, ref, reactive, resolveComponent, mergeProps, withCtx, createVNode, withDirectives, vModelText, createTextVNode, useSSRContext } from "vue";
import { u as useHead } from "./composables-583e67d3.js";
import { u as useCookie } from "./cookie-73492d56.js";
import { u as useCounter, l as logins } from "./counter-d2eb9e2d.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { ElMessage } from "element-plus";
import "ufo";
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
import "defu";
import "cookie-es";
import "ohash";
import "./asyncData-b7b62de5.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const counter = useCounter();
    useHead({
      title: "登录 - " + counter.setting.title,
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
        message: "请输入邮箱",
        trigger: "blur"
      }, {
        type: "email",
        message: "请输入正确的邮箱地址",
        trigger: ["blur", "change"]
      }],
      password: [{
        required: true,
        message: "请输入密码",
        trigger: "blur"
      }, {
        min: 6,
        max: 20,
        message: "密码长度在 6 到 20 个字符",
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
      }, _attrs))}><div class="container d-flex flex-column"><div class="row align-items-center justify-content-center no-gutters min-vh-100"><div class="col-12 col-md-7 col-lg-5 col-xl-4 py-md-11"><div class="card border-0 shadow-sm"><div class="card-body"><h3 class="text-center">登录</h3><p class="text-center mb-6">登录自主用户，开始聊天</p>`);
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
                  _push3(`<div class="input-group"${_scopeId2}><input type="email" class="form-control form-control-lg"${ssrRenderAttr("value", ruleForm.email)} placeholder="输入你的邮箱"${_scopeId2}></div>`);
                } else {
                  return [createVNode("div", {
                    class: "input-group"
                  }, [withDirectives(createVNode("input", {
                    type: "email",
                    class: "form-control form-control-lg",
                    "onUpdate:modelValue": ($event) => ruleForm.email = $event,
                    placeholder: "输入你的邮箱"
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
                  _push3(`<div class="input-group"${_scopeId2}><input type="password" class="form-control form-control-lg"${ssrRenderAttr("value", ruleForm.password)} placeholder="输入你的密码"${_scopeId2}></div>`);
                } else {
                  return [createVNode("div", {
                    class: "input-group"
                  }, [withDirectives(createVNode("input", {
                    type: "password",
                    class: "form-control form-control-lg",
                    "onUpdate:modelValue": ($event) => ruleForm.password = $event,
                    placeholder: "输入你的密码"
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
                  _push3(`忘记密码`);
                } else {
                  return [createTextVNode("忘记密码")];
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
                        _push4(` 登录 `);
                      } else {
                        return [createTextVNode(" 登录 ")];
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
                    default: withCtx(() => [createTextVNode(" 登录 ")]),
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
                placeholder: "输入你的邮箱"
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
                placeholder: "输入你的密码"
              }, null, 8, ["onUpdate:modelValue"]), [[vModelText, ruleForm.password]])])]),
              _: 1
            }), createVNode("div", {
              class: "form-group d-flex justify-content-between mb-4"
            }, [createVNode(_component_NuxtLink, {
              class: "link",
              href: "/users/reset"
            }, {
              default: withCtx(() => [createTextVNode("忘记密码")]),
              _: 1
            })]), createVNode(_component_el_form_item, null, {
              default: withCtx(() => [createVNode(_component_el_button, {
                loading: login_loading.value,
                size: "large",
                type: "primary",
                onClick: ($event) => submitForm(ruleFormRef.value),
                class: "login"
              }, {
                default: withCtx(() => [createTextVNode(" 登录 ")]),
                _: 1
              }, 8, ["loading", "onClick"])]),
              _: 1
            })];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-center mb-0">还没有账户？ `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "link",
        to: "/register"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`注册一个`);
          } else {
            return [createTextVNode("注册一个")];
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
export {
  _sfc_main as default
};
//# sourceMappingURL=login-9922119c.js.map
