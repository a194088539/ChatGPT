import { i as defineNuxtRouteMiddleware, n as navigateTo } from "../server.mjs";
import "vue";
import { u as useCookie } from "./cookie-73492d56.js";
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
import "element-plus";
import "vue/server-renderer";
import "defu";
import "cookie-es";
import "ohash";
const islogin = defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token");
  if (!token.value) {
    return navigateTo("/login");
  }
});
export {
  islogin as default
};
//# sourceMappingURL=islogin-aadafef7.js.map
