import{a as f,_ as v,f as l,t as d,k as _,l as g,h,j as r}from"./entry.007e379e.js";import{h as p,u as y}from"./index.b36e8ee2.js";import{_ as w}from"./nuxt-link.03dae9e2.js";import{u as C}from"./cookie.244e42d6.js";import{q as $,e as j,j as N}from"./query.1a5616da.js";import{w as c,s as P,u as T}from"./utils.c9773ab6.js";import"./counter.d00f886b.js";/* empty css                      */const x=async n=>{const{content:t}=f().public;typeof(n==null?void 0:n.params)!="function"&&(n=$(n));const a=n.params(),s=t.experimental.stripQueryParameters?c(`/navigation/${`${p(a)}.${t.integrity}`}/${j(a)}.json`):c(`/navigation/${p(a)}.${t.integrity}.json`);if(P())return(await v(()=>import("./client-db.730a92d6.js"),["./client-db.730a92d6.js","./entry.007e379e.js","./entry.f821db76.css","./cookie.244e42d6.js","./query.1a5616da.js","./index.b36e8ee2.js","./utils.c9773ab6.js","./index.a6ef77ff.js"],import.meta.url).then(o=>o.generateNavigation))(a);const e=await $fetch(s,{method:"GET",responseType:"json",params:t.experimental.stripQueryParameters?void 0:{_params:N(a),previewToken:C("previewToken").value}});if(typeof e=="string"&&e.startsWith("<!DOCTYPE html>"))throw new Error("Not found");return e};const k=l({name:"ContentNavigation",props:{query:{type:Object,required:!1,default:void 0}},async setup(n){const{query:t}=d(n),a=_(()=>{var e;return typeof((e=t.value)==null?void 0:e.params)=="function"?t.value.params():t.value});if(!a.value&&g("dd-navigation").value){const{navigation:e}=T();return{navigation:e}}const{data:s}=await y(`content-navigation-${p(a.value)}`,()=>x(a.value));return{navigation:s}},render(n){const t=h(),{navigation:a}=n,s=o=>r(w,{to:o._path},()=>o.title),e=(o,u)=>r("ul",u?{"data-level":u}:null,o.map(i=>i.children?r("li",null,[s(i),e(i.children,u+1)]):r("li",null,s(i)))),m=o=>e(o,0);return t!=null&&t.default?t.default({navigation:a,...this.$attrs}):m(a)}});export{k as default};