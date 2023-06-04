import { e as useNuxtApp } from "../server.mjs";
function useHead(input, options) {
  return useNuxtApp()._useHead(input, options);
}
export {
  useHead as u
};
//# sourceMappingURL=composables-583e67d3.js.map
