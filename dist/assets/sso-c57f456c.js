import{u as f,r as a,a as n,j as d}from"./index-753100cb.js";import{m as o,E as g}from"./authInitialize-c0e2c341.js";import E from"./loader-771d5442.js";function T(){const r=f(),[e,u]=a.useState(null),[A,i]=n("userGroups"),[S,m]=n("userName"),[C,l]=n("userEmail"),[h,p]=n("accountDetails");return a.useEffect(()=>{var c,s,t;e&&(i((c=e==null?void 0:e.idTokenClaims)==null?void 0:c.groups),m((s=e==null?void 0:e.idTokenClaims)==null?void 0:s.name),l((t=e==null?void 0:e.idTokenClaims)==null?void 0:t.preferred_username),p(e),r("/menuChooser"))},[e]),a.useEffect(()=>{const c=o.getAllAccounts();c.length>0&&o.setActiveAccount(c[0]),o.addEventCallback(s=>{if(s.eventType===g.LOGIN_SUCCESS&&s.payload.account){const t=s.payload.account;o.setActiveAccount(t)}},s=>{console.log("error",s)}),o.handleRedirectPromise().then(s=>{const t=o.getActiveAccount();u(t),t||o.loginRedirect()}).catch(s=>{console.log(s)})},[]),d.jsx(E,{})}export{T as default};