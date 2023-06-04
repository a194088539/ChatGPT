import{_ as F}from"./nuxt-link.03dae9e2.js";import{f as N,E as u,a1 as f,I as R,o as B,C as j,Q as e,R as a,z as r,S as n,s as _,a5 as g,a6 as v,a0 as q}from"./entry.007e379e.js";import{u as z}from"./composables.3ba3c89a.js";import{u as h}from"./cookie.244e42d6.js";import{l as E}from"./api.0295e011.js";import{u as M}from"./counter.d00f886b.js";import"./index.b36e8ee2.js";const T={class:"authentication"},U={class:"container d-flex flex-column"},D={class:"row align-items-center justify-content-center no-gutters min-vh-100"},H={class:"col-12 col-md-7 col-lg-5 col-xl-4 py-md-11"},I={class:"card border-0 shadow-sm"},L={class:"card-body"},Q=e("h3",{class:"text-center"},"登录",-1),S=e("p",{class:"text-center mb-6"},"登录自主用户，开始聊天",-1),$={class:"input-group"},A={class:"input-group"},G={class:"form-group d-flex justify-content-between mb-4"},J={class:"text-center mb-0"},se=N({__name:"login",setup(K){const m=M();z({title:"登录 - "+m.setting.title,meta:[{name:"description",content:m.setting.description},{name:"keywords",content:m.setting.keywords}]}),u(""),u("");const p=u(),o=f({email:"",password:""}),w=f({email:[{required:!0,message:"请输入邮箱",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:["blur","change"]}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:20,message:"密码长度在 6 到 20 个字符",trigger:"blur"}]}),i=u(!1),x=h("token"),b=h("user_info"),k=R(),y=async d=>{d&&await d.validate((s,l)=>{s?(i.value=!0,E({email:o.email,password:o.password}).then(t=>{i.value=!1,t._rawValue.status==200&&(x.value=t._rawValue.token,b.value=t._rawValue.user_info,q.success(t._rawValue.message),k.push("/"))}).catch(t=>{i.value=!1})):console.log("error submit!",l)})};return(d,s)=>{const l=_("el-form-item"),t=F,V=_("el-button"),C=_("el-form");return B(),j("div",T,[e("div",U,[e("div",D,[e("div",H,[e("div",I,[e("div",L,[Q,S,a(C,{ref_key:"ruleFormRef",ref:p,model:o,rules:w,class:"demo-ruleForm","status-icon":""},{default:r(()=>[a(l,{prop:"email"},{default:r(()=>[e("div",$,[g(e("input",{type:"email",class:"form-control form-control-lg","onUpdate:modelValue":s[0]||(s[0]=c=>o.email=c),placeholder:"输入你的邮箱"},null,512),[[v,o.email]])])]),_:1}),a(l,{prop:"password"},{default:r(()=>[e("div",A,[g(e("input",{type:"password",class:"form-control form-control-lg","onUpdate:modelValue":s[1]||(s[1]=c=>o.password=c),placeholder:"输入你的密码"},null,512),[[v,o.password]])])]),_:1}),e("div",G,[a(t,{class:"link",href:"/users/reset"},{default:r(()=>[n("忘记密码")]),_:1})]),a(l,null,{default:r(()=>[a(V,{loading:i.value,size:"large",type:"primary",onClick:s[2]||(s[2]=c=>y(p.value)),class:"login"},{default:r(()=>[n(" 登录 ")]),_:1},8,["loading"])]),_:1})]),_:1},8,["model","rules"]),e("p",J,[n("还没有账户？ "),a(t,{class:"link",to:"/register"},{default:r(()=>[n("注册一个")]),_:1}),n(".")])])])])])])])}}});export{se as default};