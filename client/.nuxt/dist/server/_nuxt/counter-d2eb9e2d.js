import { g as useRequestFetch, u as useRuntimeConfig, h as defineStore } from "../server.mjs";
import { unref, computed, reactive, ref } from "vue";
import { hash } from "ohash";
import { u as useAsyncData } from "./asyncData-b7b62de5.js";
import { u as useCookie } from "./cookie-73492d56.js";
import { ElMessage } from "element-plus";
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _key = opts.key || hash([autoKey, unref(opts.baseURL), typeof request === "string" ? request : "", unref(opts.params || opts.query)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  const _request = computed(() => {
    let r = request;
    if (typeof r === "function") {
      r = r();
    }
    return unref(r);
  });
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    watch,
    immediate,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    immediate,
    watch: [
      _fetchOptions,
      _request,
      ...watch || []
    ]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller);
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const isLocalFetch = typeof _request.value === "string" && _request.value.startsWith("/");
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch && isLocalFetch) {
      _$fetch = useRequestFetch();
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
const fetch = (url, options) => {
  const token = useCookie("token");
  const headers = {
    // headers信息
    "Authorization": `Bearer ${token.value}`
  };
  const {
    public: {
      baseUrl
    }
  } = useRuntimeConfig();
  const reqUrl = baseUrl + url;
  return new Promise(async (resolve, reject) => {
    useFetch(reqUrl, {
      ...options,
      headers
    }, "$nIfBrkE4uq").then(({
      data,
      error
    }) => {
      if (!data._rawValue) {
        if (error._value.status == 500) {
          ElMessage.error("服务器错误");
        } else {
          ElMessage.error(error._value.data.message);
        }
        reject(error);
      } else {
        resolve(ref(data));
      }
    }).catch((err) => {
      reject(err);
    });
  });
};
const Http = new class Http2 {
  get(url, params) {
    return fetch(url, {
      method: "get",
      params
    });
  }
  post(url, params) {
    return fetch(url, {
      method: "post",
      params
    });
  }
  put(url, body) {
    return fetch(url, {
      method: "put",
      body
    });
  }
  delete(url, body) {
    return fetch(url, {
      method: "delete",
      body
    });
  }
}();
const logins = (params) => {
  return Http.post("api/web_login", params);
};
const register = (params) => {
  return Http.post("api/register", params);
};
const get_message = (params) => {
  return Http.post("api/get_message", params);
};
const c_message = (params) => {
  return Http.post("api/check_message", params);
};
const update_user = (params) => {
  return Http.post("api/update_user", params);
};
const get_user = () => {
  return Http.post("api/get_user");
};
const change_password = (params) => {
  return Http.post("api/change_password", params);
};
const send_email = (params) => {
  return Http.post("api/send_email", params);
};
const reset_password = (params) => {
  return Http.post("api/reset_password", params);
};
const alipay = (params) => {
  return Http.post("api/alipay", params);
};
const wechat = (params) => {
  return Http.post("api/wechat", params);
};
const get_vip_show = () => {
  return Http.post("api/get_vip_level");
};
const ai_draw_openai = (params) => {
  return Http.post("api/ai_draw_openai", params);
};
const get_me_draw = () => {
  return Http.post("api/get_me_draw");
};
const send_public = (params) => {
  return Http.post("api/send_public", params);
};
const kami_send = (params) => {
  return Http.post("api/kami_check", params);
};
const get_nav_config = () => {
  return Http.post("api/get_setting");
};
const useCounter = defineStore("counter", {
  state: () => ({
    setting: {}
  }),
  actions: {
    increment() {
      this.setting;
    }
  },
  persist: false
});
export {
  ai_draw_openai as a,
  get_message as b,
  c_message as c,
  send_email as d,
  reset_password as e,
  get_user as f,
  get_me_draw as g,
  get_vip_show as h,
  update_user as i,
  change_password as j,
  alipay as k,
  logins as l,
  kami_send as m,
  get_nav_config as n,
  register as r,
  send_public as s,
  useCounter as u,
  wechat as w
};
//# sourceMappingURL=counter-d2eb9e2d.js.map
