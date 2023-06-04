import memoryDriver from "unstorage/drivers/memory";
import { prefixStorage, createStorage } from "unstorage";
import { u as useRuntimeConfig, e as useNuxtApp } from "../server.mjs";
import "vue";
import { withBase } from "ufo";
import { u as useCookie } from "./cookie-73492d56.js";
import { g as get, a as assertArray, b as ensureArray, s as sortList, c as apply, w as withoutKeys, d as withKeys, f as createQuery } from "./query-6e89bffd.js";
import "destr";
import { pascalCase } from "scule";
import "slugify";
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
import "element-plus";
import "vue/server-renderer";
import "defu";
import "cookie-es";
import "ohash";
import "./utils-79c48fb6.js";
function createMatch(opts = {}) {
  const operators = createOperators(match, opts.operators);
  function match(item, conditions) {
    if (typeof conditions !== "object" || conditions instanceof RegExp) {
      return operators.$eq(item, conditions);
    }
    return Object.keys(conditions || {}).every((key) => {
      const condition = conditions[key];
      if (key.startsWith("$") && operators[key]) {
        const fn = operators[key];
        return typeof fn === "function" ? fn(item, condition) : false;
      }
      return match(get(item, key), condition);
    });
  }
  return match;
}
function createOperators(match, operators = {}) {
  return {
    $match: (item, condition) => match(item, condition),
    /**
     * Match if item equals condition
     **/
    $eq: (item, condition) => condition instanceof RegExp ? condition.test(item) : item === condition,
    /**
     * Match if item not equals condition
     **/
    $ne: (item, condition) => condition instanceof RegExp ? !condition.test(item) : item !== condition,
    /**
     * Match is condition is false
     **/
    $not: (item, condition) => !match(item, condition),
    /**
     * Match only if all of nested conditions are true
     **/
    $and: (item, condition) => {
      assertArray(condition, "$and requires an array as condition");
      return condition.every((cond) => match(item, cond));
    },
    /**
     * Match if any of nested conditions is true
     **/
    $or: (item, condition) => {
      assertArray(condition, "$or requires an array as condition");
      return condition.some((cond) => match(item, cond));
    },
    /**
     * Match if item is in condition array
     **/
    $in: (item, condition) => ensureArray(condition).some(
      (cond) => Array.isArray(item) ? match(item, { $contains: cond }) : match(item, cond)
    ),
    /**
     * Match if item contains every condition or math every rule in condition array
     **/
    $contains: (item, condition) => {
      item = Array.isArray(item) ? item : String(item);
      return ensureArray(condition).every((i) => item.includes(i));
    },
    /**
     * Ignore case contains
     **/
    $icontains: (item, condition) => {
      if (typeof condition !== "string") {
        throw new TypeError("$icontains requires a string, use $contains instead");
      }
      item = String(item).toLocaleLowerCase();
      return ensureArray(condition).every((i) => item.includes(i.toLocaleLowerCase()));
    },
    /**
     * Match if item contains at least one rule from condition array
     */
    $containsAny: (item, condition) => {
      assertArray(condition, "$containsAny requires an array as condition");
      item = Array.isArray(item) ? item : String(item);
      return condition.some((i) => item.includes(i));
    },
    /**
     * Check key existence
     */
    $exists: (item, condition) => condition ? typeof item !== "undefined" : typeof item === "undefined",
    /**
     * Match if type of item equals condition
     */
    $type: (item, condition) => typeof item === String(condition),
    /**
     * Provides regular expression capabilities for pattern matching strings.
     */
    $regex: (item, condition) => {
      if (!(condition instanceof RegExp)) {
        const matched = String(condition).match(/\/(.*)\/([dgimsuy]*)$/);
        condition = matched ? new RegExp(matched[1], matched[2] || "") : new RegExp(condition);
      }
      return condition.test(String(item || ""));
    },
    /**
     * Check if item is less than condition
     */
    $lt: (item, condition) => {
      return item < condition;
    },
    /**
     * Check if item is less than or equal to condition
     */
    $lte: (item, condition) => {
      return item <= condition;
    },
    /**
     * Check if item is greater than condition
     */
    $gt: (item, condition) => {
      return item > condition;
    },
    /**
     * Check if item is greater than or equal to condition
     */
    $gte: (item, condition) => {
      return item >= condition;
    },
    ...operators || {}
  };
}
function createPipelineFetcher(getContentsList) {
  const match = createMatch();
  const surround = (data, { query, before, after }) => {
    const matchQuery = typeof query === "string" ? { _path: query } : query;
    const index = data.findIndex((item) => match(item, matchQuery));
    before = before ?? 1;
    after = after ?? 1;
    const slice = new Array(before + after).fill(null, 0);
    return index === -1 ? slice : slice.map((_, i) => data[index - before + i + Number(i >= before)] || null);
  };
  const pipelines = [
    // Conditions
    (data, params) => data.filter((item) => ensureArray(params.where).every((matchQuery) => match(item, matchQuery))),
    // Sort data
    (data, params) => ensureArray(params.sort).forEach((options) => sortList(data, options)),
    // Surround logic
    (data, params) => params.surround ? surround(data, params.surround) : data,
    // Skip first items
    (data, params) => params.skip ? data.slice(params.skip) : data,
    // Pick first items
    (data, params) => params.limit ? data.slice(0, params.limit) : data,
    // Remove unwanted fields
    (data, params) => apply(withoutKeys(params.without))(data),
    // Select only wanted fields
    (data, params) => apply(withKeys(params.only))(data)
  ];
  return async (query) => {
    const data = await getContentsList();
    const params = query.params();
    const filteredData = pipelines.reduce(($data, pipe) => pipe($data, params) || $data, data);
    if (params.first) {
      return filteredData[0];
    }
    return filteredData;
  };
}
const generateTitle = (path) => path.split(/[\s-]/g).map(pascalCase).join(" ");
function createNav(contents, configs) {
  const { navigation } = useRuntimeConfig().content;
  const pickNavigationFields = (content) => ({
    ...pick(["title", ...navigation.fields])(content),
    ...isObject(content == null ? void 0 : content.navigation) ? content.navigation : {}
  });
  const nav = contents.sort((a, b) => a._path.localeCompare(b._path)).reduce((nav2, content) => {
    const parts = content._path.substring(1).split("/");
    const idParts = content._id.split(":").slice(1);
    const isIndex = !!idParts[idParts.length - 1].match(/([1-9][0-9]*\.)?index.md/g);
    const getNavItem = (content2) => ({
      title: content2.title,
      _path: content2._path,
      _file: content2._file,
      children: [],
      ...pickNavigationFields(content2),
      ...content2._draft ? { _draft: true } : {}
    });
    const navItem = getNavItem(content);
    if (isIndex) {
      const dirConfig = configs[navItem._path];
      if (typeof (dirConfig == null ? void 0 : dirConfig.navigation) !== "undefined" && !(dirConfig == null ? void 0 : dirConfig.navigation)) {
        return nav2;
      }
      if (content._path !== "/") {
        const indexItem = getNavItem(content);
        navItem.children.push(indexItem);
      }
      Object.assign(
        navItem,
        pickNavigationFields(dirConfig)
      );
    }
    if (parts.length === 1) {
      nav2.push(navItem);
      return nav2;
    }
    const siblings = parts.slice(0, -1).reduce((nodes, part, i) => {
      const currentPathPart = "/" + parts.slice(0, i + 1).join("/");
      const conf = configs[currentPathPart];
      if (typeof (conf == null ? void 0 : conf.navigation) !== "undefined" && !conf.navigation) {
        return [];
      }
      let parent = nodes.find((n) => n._path === currentPathPart);
      if (!parent) {
        parent = {
          title: generateTitle(part),
          _path: currentPathPart,
          _file: content._file,
          children: [],
          ...pickNavigationFields(conf)
        };
        nodes.push(parent);
      }
      return parent.children;
    }, nav2);
    siblings.push(navItem);
    return nav2;
  }, []);
  return sortAndClear(nav);
}
const collator = new Intl.Collator(void 0, { numeric: true, sensitivity: "base" });
function sortAndClear(nav) {
  var _a;
  const sorted = nav.sort((a, b) => collator.compare(a._file, b._file));
  for (const item of sorted) {
    if ((_a = item.children) == null ? void 0 : _a.length) {
      sortAndClear(item.children);
    } else {
      delete item.children;
    }
    delete item._file;
  }
  return nav;
}
function pick(keys) {
  return (obj) => {
    obj = obj || {};
    if (keys && keys.length) {
      return keys.filter((key) => typeof obj[key] !== "undefined").reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {});
    }
    return obj;
  };
}
function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
const withContentBase = (url) => withBase(url, useRuntimeConfig().public.content.api.baseURL);
const contentStorage = prefixStorage(createStorage({ driver: memoryDriver() }), "@content");
const getPreview = () => {
  return useCookie("previewToken").value;
};
function createDB(storage) {
  async function getItems() {
    const keys = new Set(await storage.getKeys("cache:"));
    const previewToken = getPreview();
    if (previewToken) {
      const previewMeta = await storage.getItem(`${previewToken}$`).then((data) => data || {});
      if (Array.isArray(previewMeta.ignoreSources)) {
        const sources = previewMeta.ignoreSources.map((s) => `cache:${s.trim()}:`);
        for (const key of keys) {
          if (sources.some((s) => key.startsWith(s))) {
            keys.delete(key);
          }
        }
      }
      const previewKeys = await storage.getKeys(`${previewToken}:`);
      const previewContents = await Promise.all(previewKeys.map((key) => storage.getItem(key)));
      for (const pItem of previewContents) {
        keys.delete(`cache:${pItem._id}`);
        if (!pItem.__deleted) {
          keys.add(`${previewToken}:${pItem._id}`);
        }
      }
    }
    const items = await Promise.all(Array.from(keys).map((key) => storage.getItem(key)));
    return items;
  }
  return {
    storage,
    fetch: createPipelineFetcher(getItems),
    query: (query) => createQuery(createPipelineFetcher(getItems), query)
  };
}
let contentDatabase = null;
let contentDatabaseInitPromise = null;
async function useContentDatabase() {
  if (contentDatabaseInitPromise) {
    await contentDatabaseInitPromise;
  } else if (!contentDatabase) {
    contentDatabaseInitPromise = initContentDatabase();
    contentDatabase = await contentDatabaseInitPromise;
  }
  return contentDatabase;
}
async function initContentDatabase() {
  const nuxtApp = useNuxtApp();
  const { content } = useRuntimeConfig().public;
  const _contentDatabase = createDB(contentStorage);
  const integrity = await _contentDatabase.storage.getItem("integrity");
  if (content.integrity !== +(integrity || 0)) {
    const { contents, navigation } = await $fetch(withContentBase(content.integrity ? `cache.${content.integrity}.json` : "cache.json"));
    await Promise.all(
      contents.map((content2) => _contentDatabase.storage.setItem(`cache:${content2._id}`, content2))
    );
    await _contentDatabase.storage.setItem("navigation", navigation);
    await _contentDatabase.storage.setItem("integrity", content.integrity);
  }
  await nuxtApp.callHook("content:storage", _contentDatabase.storage);
  return _contentDatabase;
}
async function generateNavigation(query) {
  const db = await useContentDatabase();
  if (!getPreview() && Object.keys(query || {}).length === 0) {
    return db.storage.getItem("navigation");
  }
  const contents = await db.query(query).where({
    /**
     * Partial contents are not included in the navigation
     * A partial content is a content that has `_` prefix in its path
     */
    _partial: false,
    /**
    * Exclude any pages which have opted out of navigation via frontmatter.
    */
    navigation: {
      $ne: false
    }
  }).find();
  const dirConfigs = await db.query().where({ _path: /\/_dir$/i, _partial: true }).find();
  const configs = dirConfigs.reduce((configs2, conf) => {
    var _a;
    if (((_a = conf.title) == null ? void 0 : _a.toLowerCase()) === "dir") {
      conf.title = void 0;
    }
    const key = conf._path.split("/").slice(0, -1).join("/") || "/";
    configs2[key] = {
      ...conf,
      // Extract meta from body. (non MD files)
      ...conf.body
    };
    return configs2;
  }, {});
  return createNav(contents, configs);
}
export {
  contentStorage,
  createDB,
  generateNavigation,
  getPreview,
  useContentDatabase
};
//# sourceMappingURL=client-db-0aaeef00.js.map
