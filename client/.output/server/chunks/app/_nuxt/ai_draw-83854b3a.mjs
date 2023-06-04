import { b as buildAssetsURL } from '../../handlers/renderer.mjs';
import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { u as useHead } from './composables-583e67d3.mjs';
import { u as useCookie } from './cookie-73492d56.mjs';
import { u as useCounter, a as ai_draw_openai, g as get_me_draw, s as send_public } from './counter-d2eb9e2d.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { ElMessage } from 'element-plus';
import 'vue-bundle-renderer/runtime';
import 'h3';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'unstorage/drivers/overlay';
import 'unstorage/drivers/memory';
import 'defu';
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
import '../server.mjs';
import 'unctx';
import '@unhead/vue';
import '@unhead/dom';
import '@unhead/ssr';
import 'vue-router';
import 'cookie-es';
import './asyncData-b7b62de5.mjs';

const _imports_0 = "" + buildAssetsURL("loading2.429677c0.gif");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ai_draw",
  __ssrInlineRender: true,
  setup(__props) {
    const counter = useCounter();
    useHead({
      title: "AI\u7ED8\u753B - " + counter.setting.title,
      meta: [{
        name: "description",
        content: counter.setting.description
      }, {
        name: "keywords",
        content: counter.setting.keywords
      }]
    });
    useCookie("user_info");
    const input2 = ref("");
    const size = ref("256x256");
    const image_select = ref(1);
    const all_size = [{
      name: "256x256(\u5C0F\u56FE)",
      value: "256x256"
    }, {
      name: "512x512(\u4E2D\u56FE)",
      value: "512x512"
    }, {
      name: "1024x1024(\u5927\u56FE)",
      value: "1024x1024"
    }];
    const images_list = ref([{
      name: "1\u5F20",
      value: 1
    }, {
      name: "2\u5F20",
      value: 2
    }, {
      name: "3\u5F20",
      value: 3
    }, {
      name: "4\u5F20",
      value: 4
    }, {
      name: "5\u5F20",
      value: 5
    }, {
      name: "6\u5F20",
      value: 6
    }, {
      name: "7\u5F20",
      value: 7
    }, {
      name: "8\u5F20",
      value: 8
    }, {
      name: "9\u5F20",
      value: 9
    }, {
      name: "10\u5F20",
      value: 10
    }]);
    const prompt_info = ref("\u8D85\u7EA7\u903C\u771F\u7684\u672A\u6765\u4E16\u754C\uFF0C\u771F\u5B9E\u7167\u7247\uFF0C\u865A\u5E7B\u5F15\u64CE");
    const r_images = ref([]);
    const draw_loading = ref(false);
    const is_sc = ref(false);
    const is_finish = ref(false);
    const activeName = ref("first");
    const me_draw = ref([]);
    const public_draw = ref([]);
    const ai_draw = () => {
      if (input2.value == "") {
        ElMessage.error("\u8BF7\u586B\u5199\u5173\u952E\u8BCD");
        return false;
      }
      is_sc.value = true;
      draw_loading.value = true;
      ai_draw_openai({
        prompt: input2.value,
        size: size.value,
        number: image_select.value
      }).then((res) => {
        r_images.value = res._rawValue.data;
        is_finish.value = true;
        is_sc.value = false;
        ElMessage.success("\u751F\u6210\u6210\u529F");
        get_me_d();
        draw_loading.value = false;
      }).catch((err) => {
        ElMessage.error("\u751F\u6210\u5931\u8D25");
        is_sc.value = false;
        draw_loading.value = false;
      });
    };
    const ai_draw_pay = ref("0");
    const dw_new_desc = ref("\u6BCF\u5F20\u56FE\u751F\u6210\u9700\u8981\u6263\u8D39" + ai_draw_pay.value + "\u4F1A\u5458\u6263\u9664\u6B21\u6570~");
    const get_me_d = () => {
      get_me_draw().then((res) => {
        me_draw.value = res._rawValue.data;
        public_draw.value = res._rawValue.public;
        ai_draw_pay.value = res._rawValue.dw_m;
        dw_new_desc.value = "\u6BCF\u5F20\u56FE\u751F\u6210\u9700\u8981\u6263\u8D39" + ai_draw_pay.value + ",\u4F1A\u5458\u6263\u9664\u6B21\u6570~";
      }).catch((err) => {
        console.log(err);
      });
    };
    get_me_d();
    const send_pub = (c, mid) => {
      send_public({
        draw_id: mid
      }).then((res) => {
        ElMessage.success(res._rawValue.message);
        get_me_d();
      }).catch((err) => {
        console.log(err);
      });
    };
    const image_type = ref([{
      name: "\u53E4\u98CE"
    }, {
      name: "\u4E8C\u6B21\u5143"
    }, {
      name: "\u5199\u5B9E\u7167\u7247"
    }, {
      name: "\u6CB9\u753B"
    }, {
      name: "\u6C34\u5F69\u753B"
    }, {
      name: "\u6CB9\u58A8\u753B"
    }, {
      name: "\u9ED1\u767D\u96D5\u7248\u753B"
    }, {
      name: "\u96D5\u5851"
    }, {
      name: "3D\u6A21\u578B"
    }, {
      name: "\u624B\u7ED8\u8349\u56FE"
    }, {
      name: "\u70AD\u7B14\u753B"
    }, {
      name: "\u6781\u7B80\u7EBF\u6761\u753B"
    }, {
      name: "\u6D6E\u4E16\u7ED8"
    }, {
      name: "\u7535\u5F71\u8D28\u611F"
    }, {
      name: "\u673A\u68B0\u611F"
    }]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_alert = resolveComponent("el-alert");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_tabs = resolveComponent("el-tabs");
      const _component_el_tab_pane = resolveComponent("el-tab-pane");
      const _component_el_row = resolveComponent("el-row");
      const _component_el_col = resolveComponent("el-col");
      const _component_el_card = resolveComponent("el-card");
      const _component_el_popover = resolveComponent("el-popover");
      const _component_el_empty = resolveComponent("el-empty");
      const _component_el_tooltip = resolveComponent("el-tooltip");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "main px-xl-5 px-lg-4 px-3 overflow-auto bg-ai"
      }, _attrs))}><div class="body-header border-bottom py-xl-3 py-2"><div class="container px-0"><div class="row align-items-center"><div class="col-12"><div class="media"><div class="avatar sm"><a href="/" class="link" title=""><i class="zmdi zmdi-arrow-left zmdi-hc-lg"></i></a></div><div class="media-body overflow-hidden"><div class="d-flex align-items-center mb-1"><h6 class="fw-bold text-truncate mb-0 me-auto">AI\u7ED8\u56FE</h6></div><div class="text-truncate">\u7ED8\u56FE\u6709\u597D\u6709\u574F\uFF0C\u6839\u636E\u5173\u952E\u8BCD\u751F\u6210~\u5927\u7EA6\u9700\u898130s\u5DE6\u53F3\u65F6\u95F4</div></div></div></div></div></div></div><div class="main-body mt-2"><div class="rlshRpVg"><div class="ant-form ant-form-horizontal">`);
      _push(ssrRenderComponent(_component_el_alert, {
        title: dw_new_desc.value,
        type: "primary",
        class: "mb-2 mt-2"
      }, null, _parent));
      _push(`<div class="c79YxChY"><div class="QfmmweN6"><div class="ROxH2OCe">\u6362\u793A\u4F8B</div><div class="EhlHQai2">Prompt\u793A\u4F8B\uFF1A<span>${ssrInterpolate(prompt_info.value)}</span></div></div></div><div class="mt-4">`);
      _push(ssrRenderComponent(_component_el_input, {
        modelValue: input2.value,
        "onUpdate:modelValue": ($event) => input2.value = $event,
        onKeydown: ($event) => ai_draw(),
        placeholder: "\u8BF7\u7528\u4E2D\u6587\u8F93\u5165Prompt\uFF0C\u53C2\u8003\u5F62\u5F0F\uFF1A\u753B\u9762\u4E3B\u4F53\uFF0C\u7EC6\u8282\u63CF\u8FF0\uFF0C\u4FEE\u9970\u8BCD",
        size: "large"
      }, {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => ai_draw(),
              loading: draw_loading.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="zmdi zmdi-collection-image-o up_images"${_scopeId2}></i>\u751F\u6210 `);
                } else {
                  return [createVNode("i", {
                    class: "zmdi zmdi-collection-image-o up_images"
                  }), createTextVNode("\u751F\u6210 ")];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [createVNode(_component_el_button, {
              onClick: ($event) => ai_draw(),
              loading: draw_loading.value
            }, {
              default: withCtx(() => [createVNode("i", {
                class: "zmdi zmdi-collection-image-o up_images"
              }), createTextVNode("\u751F\u6210 ")]),
              _: 1
            }, 8, ["onClick", "loading"])];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="IBB02stq"><div class="IJeKKhVO"><strong>\u53C2\u6570\u8BBE\u7F6E</strong><div class="BjFvnDFr"><div><div class="tJ3Uxp5n"><span class="d1v8F9_X">\u56FE\u7247\u5C3A\u5BF8\uFF1A</span><div class="UXmDHLrm"><!--[-->`);
      ssrRenderList(all_size, (s, s_index) => {
        _push(`<span class="${ssrRenderClass(size.value == s.value ? "OMJ2YPhL" : "")}">${ssrInterpolate(s.name)}</span>`);
      });
      _push(`<!--]--></div></div><div class="tJ3Uxp5n"><span class="O8rMyJiP">\u56FE\u7247\u6570\u91CF\uFF1A</span><div class="UXmDHLrm"><!--[-->`);
      ssrRenderList(images_list.value, (i, i_index) => {
        _push(`<span class="${ssrRenderClass(image_select.value == i.value ? "OMJ2YPhL" : "")}">${ssrInterpolate(i.name)}</span>`);
      });
      _push(`<!--]--></div></div></div></div></div><div class="LD_v91KZ"><div class="i6ZRhNSs"><strong>\u4FEE\u9970\u8BCD\u53C2\u8003</strong><span class="Ml1AlIeV">\u60A8\u53EF\u53C2\u8003\u6216\u9009\u7528\u4E0B\u5217\u5404\u7C7B\u4FEE\u9970\u8BCD\u4E30\u5BCC\u60A8\u7684\u8F93\u5165\u6587\u672C\uFF0C\u5C1D\u8BD5\u751F\u6210\u66F4\u52A0\u591A\u6837\u7684\u56FE\u50CF\uFF0C\u66F4\u591A\u4FEE\u9970\u8BCD\u53EF\u53C2\u8003 <span>Prompt\u6307\u5357</span> \u6216 \u81EA\u7531\u8F93\u5165 \u63A2\u7D22\u5927\u6A21\u578B\u4F5C\u753B\u66F4\u591A\u672A\u77E5\u80FD\u529B</span></div><div class="eTPUL0mm"><div class="rANRXgV2"><strong>\u56FE\u50CF\u7C7B\u578B</strong><div class="k9FL7lPf"><!--[-->`);
      ssrRenderList(image_type.value, (ty, ty_index) => {
        _push(`<span>${ssrInterpolate(ty.name)} ${ssrInterpolate(ty_index != image_type.value.length - 1 ? "\u3001" : "")}</span>`);
      });
      _push(`<!--]--></div></div></div></div></div></div>`);
      if (is_sc.value || is_finish.value) {
        _push(`<div class="ernie-vilg-image"><div>`);
        if (is_sc.value || is_finish.value) {
          _push(`<div class="ernie-vilg-item-desc" style="${ssrRenderStyle({
            "margin-bottom": "0px"
          })}">\u6B63\u5728\u751F\u6210\u4E2D\uFF0C\u9884\u8BA1\u9700\u8981 30s</div>`);
        } else {
          _push(`<!---->`);
        }
        if (is_sc.value) {
          _push(`<div class="eE9d1okq" style="${ssrRenderStyle({
            "margin-top": "20px"
          })}"><!--[-->`);
          ssrRenderList(image_select.value, (item) => {
            _push(`<div class="ernie-vilg-image-item"><img class="ernie-vilg-image-item-img"${ssrRenderAttr("src", _imports_0)}></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (is_finish.value) {
          _push(`<div class="eE9d1okq" style="${ssrRenderStyle({
            "margin-top": "20px"
          })}"><!--[-->`);
          ssrRenderList(r_images.value, (image, fi_index) => {
            _push(`<div class="ernie-vilg-image-item"><img class="ernie-vilg-image-item-img"${ssrRenderAttr("src", image.url)}></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_el_tabs, {
        modelValue: activeName.value,
        "onUpdate:modelValue": ($event) => activeName.value = $event,
        class: "mt-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_tab_pane, {
              label: "\u6211\u7684\u751F\u6210",
              name: "first"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (me_draw.value.length > 0) {
                    _push3(ssrRenderComponent(_component_el_row, {
                      gutter: 20
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(me_draw.value, (m, m_index) => {
                            _push4(ssrRenderComponent(_component_el_col, {
                              key: m_index,
                              span: 6
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(_component_el_card, {
                                    "body-style": {
                                      padding: "0px"
                                    },
                                    class: "mb-2"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<img${ssrRenderAttr("src", m.image)} class="image"${_scopeId5}><div style="${ssrRenderStyle({
                                          "padding": "10px 0px"
                                        })}" class="me_show_pic"${_scopeId5}>`);
                                        _push6(ssrRenderComponent(_component_el_popover, {
                                          placement: "top-start",
                                          title: "Prompt:",
                                          width: 200,
                                          trigger: "hover",
                                          content: m.title
                                        }, {
                                          reference: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<span${_scopeId6}>${ssrInterpolate(m.title)}</span>`);
                                            } else {
                                              return [createVNode("span", null, toDisplayString(m.title), 1)];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(`<div class="bottom"${_scopeId5}>`);
                                        if (m.is_public == 0) {
                                          _push6(ssrRenderComponent(_component_el_button, {
                                            type: "danger",
                                            text: "",
                                            class: "button",
                                            onClick: ($event) => send_pub(0, m.id)
                                          }, {
                                            default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(`\u79C1\u5BC6 `);
                                              } else {
                                                return [createTextVNode("\u79C1\u5BC6 ")];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                        } else {
                                          _push6(ssrRenderComponent(_component_el_button, {
                                            type: "primary",
                                            text: "",
                                            class: "button",
                                            onClick: ($event) => send_pub(1, m.id)
                                          }, {
                                            default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(`\u516C\u5F00 `);
                                              } else {
                                                return [createTextVNode("\u516C\u5F00 ")];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                        }
                                        _push6(`</div></div>`);
                                      } else {
                                        return [createVNode("img", {
                                          src: m.image,
                                          class: "image"
                                        }, null, 8, ["src"]), createVNode("div", {
                                          style: {
                                            "padding": "10px 0px"
                                          },
                                          class: "me_show_pic"
                                        }, [createVNode(_component_el_popover, {
                                          placement: "top-start",
                                          title: "Prompt:",
                                          width: 200,
                                          trigger: "hover",
                                          content: m.title
                                        }, {
                                          reference: withCtx(() => [createVNode("span", null, toDisplayString(m.title), 1)]),
                                          _: 2
                                        }, 1032, ["content"]), createVNode("div", {
                                          class: "bottom"
                                        }, [m.is_public == 0 ? (openBlock(), createBlock(_component_el_button, {
                                          key: 0,
                                          type: "danger",
                                          text: "",
                                          class: "button",
                                          onClick: ($event) => send_pub(0, m.id)
                                        }, {
                                          default: withCtx(() => [createTextVNode("\u79C1\u5BC6 ")]),
                                          _: 2
                                        }, 1032, ["onClick"])) : (openBlock(), createBlock(_component_el_button, {
                                          key: 1,
                                          type: "primary",
                                          text: "",
                                          class: "button",
                                          onClick: ($event) => send_pub(1, m.id)
                                        }, {
                                          default: withCtx(() => [createTextVNode("\u516C\u5F00 ")]),
                                          _: 2
                                        }, 1032, ["onClick"]))])])];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [createVNode(_component_el_card, {
                                    "body-style": {
                                      padding: "0px"
                                    },
                                    class: "mb-2"
                                  }, {
                                    default: withCtx(() => [createVNode("img", {
                                      src: m.image,
                                      class: "image"
                                    }, null, 8, ["src"]), createVNode("div", {
                                      style: {
                                        "padding": "10px 0px"
                                      },
                                      class: "me_show_pic"
                                    }, [createVNode(_component_el_popover, {
                                      placement: "top-start",
                                      title: "Prompt:",
                                      width: 200,
                                      trigger: "hover",
                                      content: m.title
                                    }, {
                                      reference: withCtx(() => [createVNode("span", null, toDisplayString(m.title), 1)]),
                                      _: 2
                                    }, 1032, ["content"]), createVNode("div", {
                                      class: "bottom"
                                    }, [m.is_public == 0 ? (openBlock(), createBlock(_component_el_button, {
                                      key: 0,
                                      type: "danger",
                                      text: "",
                                      class: "button",
                                      onClick: ($event) => send_pub(0, m.id)
                                    }, {
                                      default: withCtx(() => [createTextVNode("\u79C1\u5BC6 ")]),
                                      _: 2
                                    }, 1032, ["onClick"])) : (openBlock(), createBlock(_component_el_button, {
                                      key: 1,
                                      type: "primary",
                                      text: "",
                                      class: "button",
                                      onClick: ($event) => send_pub(1, m.id)
                                    }, {
                                      default: withCtx(() => [createTextVNode("\u516C\u5F00 ")]),
                                      _: 2
                                    }, 1032, ["onClick"]))])])]),
                                    _: 2
                                  }, 1024)];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [(openBlock(true), createBlock(Fragment, null, renderList(me_draw.value, (m, m_index) => {
                            return openBlock(), createBlock(_component_el_col, {
                              key: m_index,
                              span: 6
                            }, {
                              default: withCtx(() => [createVNode(_component_el_card, {
                                "body-style": {
                                  padding: "0px"
                                },
                                class: "mb-2"
                              }, {
                                default: withCtx(() => [createVNode("img", {
                                  src: m.image,
                                  class: "image"
                                }, null, 8, ["src"]), createVNode("div", {
                                  style: {
                                    "padding": "10px 0px"
                                  },
                                  class: "me_show_pic"
                                }, [createVNode(_component_el_popover, {
                                  placement: "top-start",
                                  title: "Prompt:",
                                  width: 200,
                                  trigger: "hover",
                                  content: m.title
                                }, {
                                  reference: withCtx(() => [createVNode("span", null, toDisplayString(m.title), 1)]),
                                  _: 2
                                }, 1032, ["content"]), createVNode("div", {
                                  class: "bottom"
                                }, [m.is_public == 0 ? (openBlock(), createBlock(_component_el_button, {
                                  key: 0,
                                  type: "danger",
                                  text: "",
                                  class: "button",
                                  onClick: ($event) => send_pub(0, m.id)
                                }, {
                                  default: withCtx(() => [createTextVNode("\u79C1\u5BC6 ")]),
                                  _: 2
                                }, 1032, ["onClick"])) : (openBlock(), createBlock(_component_el_button, {
                                  key: 1,
                                  type: "primary",
                                  text: "",
                                  class: "button",
                                  onClick: ($event) => send_pub(1, m.id)
                                }, {
                                  default: withCtx(() => [createTextVNode("\u516C\u5F00 ")]),
                                  _: 2
                                }, 1032, ["onClick"]))])])]),
                                _: 2
                              }, 1024)]),
                              _: 2
                            }, 1024);
                          }), 128))];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(_component_el_empty, {
                      description: "\u6682\u65E0\u6570\u636E\u54E6~"
                    }, null, _parent3, _scopeId2));
                  }
                } else {
                  return [me_draw.value.length > 0 ? (openBlock(), createBlock(_component_el_row, {
                    key: 0,
                    gutter: 20
                  }, {
                    default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(me_draw.value, (m, m_index) => {
                      return openBlock(), createBlock(_component_el_col, {
                        key: m_index,
                        span: 6
                      }, {
                        default: withCtx(() => [createVNode(_component_el_card, {
                          "body-style": {
                            padding: "0px"
                          },
                          class: "mb-2"
                        }, {
                          default: withCtx(() => [createVNode("img", {
                            src: m.image,
                            class: "image"
                          }, null, 8, ["src"]), createVNode("div", {
                            style: {
                              "padding": "10px 0px"
                            },
                            class: "me_show_pic"
                          }, [createVNode(_component_el_popover, {
                            placement: "top-start",
                            title: "Prompt:",
                            width: 200,
                            trigger: "hover",
                            content: m.title
                          }, {
                            reference: withCtx(() => [createVNode("span", null, toDisplayString(m.title), 1)]),
                            _: 2
                          }, 1032, ["content"]), createVNode("div", {
                            class: "bottom"
                          }, [m.is_public == 0 ? (openBlock(), createBlock(_component_el_button, {
                            key: 0,
                            type: "danger",
                            text: "",
                            class: "button",
                            onClick: ($event) => send_pub(0, m.id)
                          }, {
                            default: withCtx(() => [createTextVNode("\u79C1\u5BC6 ")]),
                            _: 2
                          }, 1032, ["onClick"])) : (openBlock(), createBlock(_component_el_button, {
                            key: 1,
                            type: "primary",
                            text: "",
                            class: "button",
                            onClick: ($event) => send_pub(1, m.id)
                          }, {
                            default: withCtx(() => [createTextVNode("\u516C\u5F00 ")]),
                            _: 2
                          }, 1032, ["onClick"]))])])]),
                          _: 2
                        }, 1024)]),
                        _: 2
                      }, 1024);
                    }), 128))]),
                    _: 1
                  })) : (openBlock(), createBlock(_component_el_empty, {
                    key: 1,
                    description: "\u6682\u65E0\u6570\u636E\u54E6~"
                  }))];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_tab_pane, {
              label: "\u516C\u5171\u751F\u6210",
              name: "second"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (public_draw.value.length > 0) {
                    _push3(ssrRenderComponent(_component_el_row, {
                      gutter: 20
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(public_draw.value, (p, p_index) => {
                            _push4(ssrRenderComponent(_component_el_col, {
                              key: p_index,
                              span: 6
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(_component_el_card, {
                                    "body-style": {
                                      padding: "0px"
                                    },
                                    class: "mb-2"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<img${ssrRenderAttr("src", p.image)} class="image"${_scopeId5}><div style="${ssrRenderStyle({
                                          "padding": "10px 0px"
                                        })}" class="me_show_pic"${_scopeId5}>`);
                                        _push6(ssrRenderComponent(_component_el_tooltip, {
                                          class: "box-item",
                                          effect: "dark",
                                          content: p.title,
                                          placement: "bottom"
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<span${_scopeId6}>${ssrInterpolate(p.title)}</span>`);
                                            } else {
                                              return [createVNode("span", null, toDisplayString(p.title), 1)];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(`</div>`);
                                      } else {
                                        return [createVNode("img", {
                                          src: p.image,
                                          class: "image"
                                        }, null, 8, ["src"]), createVNode("div", {
                                          style: {
                                            "padding": "10px 0px"
                                          },
                                          class: "me_show_pic"
                                        }, [createVNode(_component_el_tooltip, {
                                          class: "box-item",
                                          effect: "dark",
                                          content: p.title,
                                          placement: "bottom"
                                        }, {
                                          default: withCtx(() => [createVNode("span", null, toDisplayString(p.title), 1)]),
                                          _: 2
                                        }, 1032, ["content"])])];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [createVNode(_component_el_card, {
                                    "body-style": {
                                      padding: "0px"
                                    },
                                    class: "mb-2"
                                  }, {
                                    default: withCtx(() => [createVNode("img", {
                                      src: p.image,
                                      class: "image"
                                    }, null, 8, ["src"]), createVNode("div", {
                                      style: {
                                        "padding": "10px 0px"
                                      },
                                      class: "me_show_pic"
                                    }, [createVNode(_component_el_tooltip, {
                                      class: "box-item",
                                      effect: "dark",
                                      content: p.title,
                                      placement: "bottom"
                                    }, {
                                      default: withCtx(() => [createVNode("span", null, toDisplayString(p.title), 1)]),
                                      _: 2
                                    }, 1032, ["content"])])]),
                                    _: 2
                                  }, 1024)];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [(openBlock(true), createBlock(Fragment, null, renderList(public_draw.value, (p, p_index) => {
                            return openBlock(), createBlock(_component_el_col, {
                              key: p_index,
                              span: 6
                            }, {
                              default: withCtx(() => [createVNode(_component_el_card, {
                                "body-style": {
                                  padding: "0px"
                                },
                                class: "mb-2"
                              }, {
                                default: withCtx(() => [createVNode("img", {
                                  src: p.image,
                                  class: "image"
                                }, null, 8, ["src"]), createVNode("div", {
                                  style: {
                                    "padding": "10px 0px"
                                  },
                                  class: "me_show_pic"
                                }, [createVNode(_component_el_tooltip, {
                                  class: "box-item",
                                  effect: "dark",
                                  content: p.title,
                                  placement: "bottom"
                                }, {
                                  default: withCtx(() => [createVNode("span", null, toDisplayString(p.title), 1)]),
                                  _: 2
                                }, 1032, ["content"])])]),
                                _: 2
                              }, 1024)]),
                              _: 2
                            }, 1024);
                          }), 128))];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(_component_el_empty, {
                      description: "\u6682\u65E0\u6570\u636E\u54E6~"
                    }, null, _parent3, _scopeId2));
                  }
                } else {
                  return [public_draw.value.length > 0 ? (openBlock(), createBlock(_component_el_row, {
                    key: 0,
                    gutter: 20
                  }, {
                    default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(public_draw.value, (p, p_index) => {
                      return openBlock(), createBlock(_component_el_col, {
                        key: p_index,
                        span: 6
                      }, {
                        default: withCtx(() => [createVNode(_component_el_card, {
                          "body-style": {
                            padding: "0px"
                          },
                          class: "mb-2"
                        }, {
                          default: withCtx(() => [createVNode("img", {
                            src: p.image,
                            class: "image"
                          }, null, 8, ["src"]), createVNode("div", {
                            style: {
                              "padding": "10px 0px"
                            },
                            class: "me_show_pic"
                          }, [createVNode(_component_el_tooltip, {
                            class: "box-item",
                            effect: "dark",
                            content: p.title,
                            placement: "bottom"
                          }, {
                            default: withCtx(() => [createVNode("span", null, toDisplayString(p.title), 1)]),
                            _: 2
                          }, 1032, ["content"])])]),
                          _: 2
                        }, 1024)]),
                        _: 2
                      }, 1024);
                    }), 128))]),
                    _: 1
                  })) : (openBlock(), createBlock(_component_el_empty, {
                    key: 1,
                    description: "\u6682\u65E0\u6570\u636E\u54E6~"
                  }))];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [createVNode(_component_el_tab_pane, {
              label: "\u6211\u7684\u751F\u6210",
              name: "first"
            }, {
              default: withCtx(() => [me_draw.value.length > 0 ? (openBlock(), createBlock(_component_el_row, {
                key: 0,
                gutter: 20
              }, {
                default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(me_draw.value, (m, m_index) => {
                  return openBlock(), createBlock(_component_el_col, {
                    key: m_index,
                    span: 6
                  }, {
                    default: withCtx(() => [createVNode(_component_el_card, {
                      "body-style": {
                        padding: "0px"
                      },
                      class: "mb-2"
                    }, {
                      default: withCtx(() => [createVNode("img", {
                        src: m.image,
                        class: "image"
                      }, null, 8, ["src"]), createVNode("div", {
                        style: {
                          "padding": "10px 0px"
                        },
                        class: "me_show_pic"
                      }, [createVNode(_component_el_popover, {
                        placement: "top-start",
                        title: "Prompt:",
                        width: 200,
                        trigger: "hover",
                        content: m.title
                      }, {
                        reference: withCtx(() => [createVNode("span", null, toDisplayString(m.title), 1)]),
                        _: 2
                      }, 1032, ["content"]), createVNode("div", {
                        class: "bottom"
                      }, [m.is_public == 0 ? (openBlock(), createBlock(_component_el_button, {
                        key: 0,
                        type: "danger",
                        text: "",
                        class: "button",
                        onClick: ($event) => send_pub(0, m.id)
                      }, {
                        default: withCtx(() => [createTextVNode("\u79C1\u5BC6 ")]),
                        _: 2
                      }, 1032, ["onClick"])) : (openBlock(), createBlock(_component_el_button, {
                        key: 1,
                        type: "primary",
                        text: "",
                        class: "button",
                        onClick: ($event) => send_pub(1, m.id)
                      }, {
                        default: withCtx(() => [createTextVNode("\u516C\u5F00 ")]),
                        _: 2
                      }, 1032, ["onClick"]))])])]),
                      _: 2
                    }, 1024)]),
                    _: 2
                  }, 1024);
                }), 128))]),
                _: 1
              })) : (openBlock(), createBlock(_component_el_empty, {
                key: 1,
                description: "\u6682\u65E0\u6570\u636E\u54E6~"
              }))]),
              _: 1
            }), createVNode(_component_el_tab_pane, {
              label: "\u516C\u5171\u751F\u6210",
              name: "second"
            }, {
              default: withCtx(() => [public_draw.value.length > 0 ? (openBlock(), createBlock(_component_el_row, {
                key: 0,
                gutter: 20
              }, {
                default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(public_draw.value, (p, p_index) => {
                  return openBlock(), createBlock(_component_el_col, {
                    key: p_index,
                    span: 6
                  }, {
                    default: withCtx(() => [createVNode(_component_el_card, {
                      "body-style": {
                        padding: "0px"
                      },
                      class: "mb-2"
                    }, {
                      default: withCtx(() => [createVNode("img", {
                        src: p.image,
                        class: "image"
                      }, null, 8, ["src"]), createVNode("div", {
                        style: {
                          "padding": "10px 0px"
                        },
                        class: "me_show_pic"
                      }, [createVNode(_component_el_tooltip, {
                        class: "box-item",
                        effect: "dark",
                        content: p.title,
                        placement: "bottom"
                      }, {
                        default: withCtx(() => [createVNode("span", null, toDisplayString(p.title), 1)]),
                        _: 2
                      }, 1032, ["content"])])]),
                      _: 2
                    }, 1024)]),
                    _: 2
                  }, 1024);
                }), 128))]),
                _: 1
              })) : (openBlock(), createBlock(_component_el_empty, {
                key: 1,
                description: "\u6682\u65E0\u6570\u636E\u54E6~"
              }))]),
              _: 1
            })];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/ai_draw.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ai_draw-83854b3a.mjs.map
