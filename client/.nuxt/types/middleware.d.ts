import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "auth" | "islogin"
declare module "/home/chatgpt/client/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}