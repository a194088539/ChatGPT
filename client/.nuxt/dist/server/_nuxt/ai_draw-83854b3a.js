import "../server.mjs";
import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { u as useHead } from "./composables-583e67d3.js";
import { u as useCookie } from "./cookie-73492d56.js";
import { u as useCounter, a as ai_draw_openai, g as get_me_draw, s as send_public } from "./counter-d2eb9e2d.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { ElMessage } from "element-plus";
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
import "ufo";
import "defu";
import "cookie-es";
import "ohash";
import "./asyncData-b7b62de5.js";
const _imports_0 = "" + __buildAssetsURL("loading2.429677c0.gif");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ai_draw",
  __ssrInlineRender: true,
  setup(__props) {
    const counter = useCounter();
    useHead({
      title: "AI绘画 - " + counter.setting.title,
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
      name: "256x256(小图)",
      value: "256x256"
    }, {
      name: "512x512(中图)",
      value: "512x512"
    }, {
      name: "1024x1024(大图)",
      value: "1024x1024"
    }];
    const images_list = ref([{
      name: "1张",
      value: 1
    }, {
      name: "2张",
      value: 2
    }, {
      name: "3张",
      value: 3
    }, {
      name: "4张",
      value: 4
    }, {
      name: "5张",
      value: 5
    }, {
      name: "6张",
      value: 6
    }, {
      name: "7张",
      value: 7
    }, {
      name: "8张",
      value: 8
    }, {
      name: "9张",
      value: 9
    }, {
      name: "10张",
      value: 10
    }]);
    const prompt_info = ref("超级逼真的未来世界，真实照片，虚幻引擎");
    const r_images = ref([]);
    const draw_loading = ref(false);
    const is_sc = ref(false);
    const is_finish = ref(false);
    const activeName = ref("first");
    const me_draw = ref([]);
    const public_draw = ref([]);
    const ai_draw = () => {
      if (input2.value == "") {
        ElMessage.error("请填写关键词");
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
        ElMessage.success("生成成功");
        get_me_d();
        draw_loading.value = false;
      }).catch((err) => {
        ElMessage.error("生成失败");
        is_sc.value = false;
        draw_loading.value = false;
      });
    };
    const ai_draw_pay = ref("0");
    const dw_new_desc = ref("每张图生成需要扣费" + ai_draw_pay.value + "会员扣除次数~");
    const get_me_d = () => {
      get_me_draw().then((res) => {
        me_draw.value = res._rawValue.data;
        public_draw.value = res._rawValue.public;
        ai_draw_pay.value = res._rawValue.dw_m;
        dw_new_desc.value = "每张图生成需要扣费" + ai_draw_pay.value + ",会员扣除次数~";
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
      name: "古风"
    }, {
      name: "二次元"
    }, {
      name: "写实照片"
    }, {
      name: "油画"
    }, {
      name: "水彩画"
    }, {
      name: "油墨画"
    }, {
      name: "黑白雕版画"
    }, {
      name: "雕塑"
    }, {
      name: "3D模型"
    }, {
      name: "手绘草图"
    }, {
      name: "炭笔画"
    }, {
      name: "极简线条画"
    }, {
      name: "浮世绘"
    }, {
      name: "电影质感"
    }, {
      name: "机械感"
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
      }, _attrs))}><div class="body-header border-bottom py-xl-3 py-2"><div class="container px-0"><div class="row align-items-center"><div class="col-12"><div class="media"><div class="avatar sm"><a href="/" class="link" title=""><i class="zmdi zmdi-arrow-left zmdi-hc-lg"></i></a></div><div class="media-body overflow-hidden"><div class="d-flex align-items-center mb-1"><h6 class="fw-bold text-truncate mb-0 me-auto">AI绘图</h6></div><div class="text-truncate">绘图有好有坏，根据关键词生成~大约需要30s左右时间</div></div></div></div></div></div></div><div class="main-body mt-2"><div class="rlshRpVg"><div class="ant-form ant-form-horizontal">`);
      _push(ssrRenderComponent(_component_el_alert, {
        title: dw_new_desc.value,
        type: "primary",
        class: "mb-2 mt-2"
      }, null, _parent));
      _push(`<div class="c79YxChY"><div class="QfmmweN6"><div class="ROxH2OCe">换示例</div><div class="EhlHQai2">Prompt示例：<span>${ssrInterpolate(prompt_info.value)}</span></div></div></div><div class="mt-4">`);
      _push(ssrRenderComponent(_component_el_input, {
        modelValue: input2.value,
        "onUpdate:modelValue": ($event) => input2.value = $event,
        onKeydown: ($event) => ai_draw(),
        placeholder: "请用中文输入Prompt，参考形式：画面主体，细节描述，修饰词",
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
                  _push3(`<i class="zmdi zmdi-collection-image-o up_images"${_scopeId2}></i>生成 `);
                } else {
                  return [createVNode("i", {
                    class: "zmdi zmdi-collection-image-o up_images"
                  }), createTextVNode("生成 ")];
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
              }), createTextVNode("生成 ")]),
              _: 1
            }, 8, ["onClick", "loading"])];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="IBB02stq"><div class="IJeKKhVO"><strong>参数设置</strong><div class="BjFvnDFr"><div><div class="tJ3Uxp5n"><span class="d1v8F9_X">图片尺寸：</span><div class="UXmDHLrm"><!--[-->`);
      ssrRenderList(all_size, (s, s_index) => {
        _push(`<span class="${ssrRenderClass(size.value == s.value ? "OMJ2YPhL" : "")}">${ssrInterpolate(s.name)}</span>`);
      });
      _push(`<!--]--></div></div><div class="tJ3Uxp5n"><span class="O8rMyJiP">图片数量：</span><div class="UXmDHLrm"><!--[-->`);
      ssrRenderList(images_list.value, (i, i_index) => {
        _push(`<span class="${ssrRenderClass(image_select.value == i.value ? "OMJ2YPhL" : "")}">${ssrInterpolate(i.name)}</span>`);
      });
      _push(`<!--]--></div></div></div></div></div><div class="LD_v91KZ"><div class="i6ZRhNSs"><strong>修饰词参考</strong><span class="Ml1AlIeV">您可参考或选用下列各类修饰词丰富您的输入文本，尝试生成更加多样的图像，更多修饰词可参考 <span>Prompt指南</span> 或 自由输入 探索大模型作画更多未知能力</span></div><div class="eTPUL0mm"><div class="rANRXgV2"><strong>图像类型</strong><div class="k9FL7lPf"><!--[-->`);
      ssrRenderList(image_type.value, (ty, ty_index) => {
        _push(`<span>${ssrInterpolate(ty.name)} ${ssrInterpolate(ty_index != image_type.value.length - 1 ? "、" : "")}</span>`);
      });
      _push(`<!--]--></div></div></div></div></div></div>`);
      if (is_sc.value || is_finish.value) {
        _push(`<div class="ernie-vilg-image"><div>`);
        if (is_sc.value || is_finish.value) {
          _push(`<div class="ernie-vilg-item-desc" style="${ssrRenderStyle({
            "margin-bottom": "0px"
          })}">正在生成中，预计需要 30s</div>`);
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
              label: "我的生成",
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
                                                _push7(`私密 `);
                                              } else {
                                                return [createTextVNode("私密 ")];
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
                                                _push7(`公开 `);
                                              } else {
                                                return [createTextVNode("公开 ")];
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
                                          default: withCtx(() => [createTextVNode("私密 ")]),
                                          _: 2
                                        }, 1032, ["onClick"])) : (openBlock(), createBlock(_component_el_button, {
                                          key: 1,
                                          type: "primary",
                                          text: "",
                                          class: "button",
                                          onClick: ($event) => send_pub(1, m.id)
                                        }, {
                                          default: withCtx(() => [createTextVNode("公开 ")]),
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
                                      default: withCtx(() => [createTextVNode("私密 ")]),
                                      _: 2
                                    }, 1032, ["onClick"])) : (openBlock(), createBlock(_component_el_button, {
                                      key: 1,
                                      type: "primary",
                                      text: "",
                                      class: "button",
                                      onClick: ($event) => send_pub(1, m.id)
                                    }, {
                                      default: withCtx(() => [createTextVNode("公开 ")]),
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
                                  default: withCtx(() => [createTextVNode("私密 ")]),
                                  _: 2
                                }, 1032, ["onClick"])) : (openBlock(), createBlock(_component_el_button, {
                                  key: 1,
                                  type: "primary",
                                  text: "",
                                  class: "button",
                                  onClick: ($event) => send_pub(1, m.id)
                                }, {
                                  default: withCtx(() => [createTextVNode("公开 ")]),
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
                      description: "暂无数据哦~"
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
                            default: withCtx(() => [createTextVNode("私密 ")]),
                            _: 2
                          }, 1032, ["onClick"])) : (openBlock(), createBlock(_component_el_button, {
                            key: 1,
                            type: "primary",
                            text: "",
                            class: "button",
                            onClick: ($event) => send_pub(1, m.id)
                          }, {
                            default: withCtx(() => [createTextVNode("公开 ")]),
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
                    description: "暂无数据哦~"
                  }))];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_tab_pane, {
              label: "公共生成",
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
                      description: "暂无数据哦~"
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
                    description: "暂无数据哦~"
                  }))];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [createVNode(_component_el_tab_pane, {
              label: "我的生成",
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
                        default: withCtx(() => [createTextVNode("私密 ")]),
                        _: 2
                      }, 1032, ["onClick"])) : (openBlock(), createBlock(_component_el_button, {
                        key: 1,
                        type: "primary",
                        text: "",
                        class: "button",
                        onClick: ($event) => send_pub(1, m.id)
                      }, {
                        default: withCtx(() => [createTextVNode("公开 ")]),
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
                description: "暂无数据哦~"
              }))]),
              _: 1
            }), createVNode(_component_el_tab_pane, {
              label: "公共生成",
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
                description: "暂无数据哦~"
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
export {
  _sfc_main as default
};
//# sourceMappingURL=ai_draw-83854b3a.js.map
