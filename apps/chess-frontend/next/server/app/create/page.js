(()=>{var e={};e.id=323,e.ids=[323],e.modules={763:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>n.a,__next_app__:()=>p,pages:()=>c,routeModule:()=>u,tree:()=>d});var s=r(698),i=r(6397),o=r(3765),n=r.n(o),a=r(8282),l={};for(let e in a)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>a[e]);r.d(t,l);let d={children:["",{children:["create",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,1163)),"/home/mohit/Desktop/chess/apps/chess-frontend/src/app/create/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,4999))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,7423)),"/home/mohit/Desktop/chess/apps/chess-frontend/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9163,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,6374,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,4831,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,4999))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]}.children,c=["/home/mohit/Desktop/chess/apps/chess-frontend/src/app/create/page.tsx"],p={require:r,loadChunk:()=>Promise.resolve()},u=new s.AppPageRouteModule({definition:{kind:i.RouteKind.APP_PAGE,page:"/create/page",pathname:"/create",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},1163:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var s=r(1962);r(1251);var i=r(3452);let o=()=>(0,s.jsx)(i.default,{})},1445:(e,t,r)=>{Promise.resolve().then(r.bind(r,2006))},1590:(e,t,r)=>{Promise.resolve().then(r.bind(r,4038))},1630:e=>{"use strict";e.exports=require("http")},1820:e=>{"use strict";e.exports=require("os")},2006:(e,t,r)=>{"use strict";r.d(t,{default:()=>l});var s=r(9040),i=r(6449),o=r(3218),n=r(6448),a=r(9454);function l(){let[e,t]=(0,i.useState)(null),[r,l]=(0,i.useState)("white"),[d,c]=(0,i.useState)(!1),[p,u]=(0,i.useState)(null),h=(0,a.useRouter)(),m=async()=>{c(!0),u(null);try{let e=await o.A.post(`${n.C}/game/create`,{color:r},{withCredentials:!0});t(e.data.id)}catch(e){o.A.isAxiosError(e)?u(e.response?.data?.error||"Failed to create game"):u("An unexpected error occurred")}finally{c(!1)}};return(0,s.jsxs)("div",{className:"flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white",children:[(0,s.jsx)("h1",{className:"text-3xl font-bold mb-6",children:"Chess Game"}),(0,s.jsxs)("div",{className:"mb-4",children:[(0,s.jsx)("label",{className:"mr-2 text-lg",children:"Choose Color:"}),(0,s.jsxs)("select",{value:r,onChange:e=>l(e.target.value),className:"p-2 bg-gray-800 border border-gray-600 rounded",children:[(0,s.jsx)("option",{value:"white",children:"White"}),(0,s.jsx)("option",{value:"black",children:"Black"})]})]}),(0,s.jsx)("button",{onClick:m,disabled:d,className:"px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-700",children:d?"Creating...":"Create Game"}),e&&(0,s.jsxs)("div",{className:"mt-6 p-4 bg-green-700 rounded-lg text-lg",children:["Game ID: ",(0,s.jsx)("span",{className:"font-bold",children:e})]}),p&&(0,s.jsx)("div",{className:"mt-4 text-red-400",children:p}),(0,s.jsx)("button",{onClick:()=>h.push("/"),disabled:d,className:"px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-700",children:"join"})]})}},2360:()=>{},2412:e=>{"use strict";e.exports=require("assert")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},3452:(e,t,r)=>{"use strict";r.d(t,{default:()=>s});let s=(0,r(3482).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/home/mohit/Desktop/chess/apps/chess-frontend/src/components/CreateGame.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/mohit/Desktop/chess/apps/chess-frontend/src/components/CreateGame.tsx","default")},3873:e=>{"use strict";e.exports=require("path")},3997:e=>{"use strict";e.exports=require("tty")},4075:e=>{"use strict";e.exports=require("zlib")},4735:e=>{"use strict";e.exports=require("events")},4999:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var s=r(5683);let i=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,s.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},5511:e=>{"use strict";e.exports=require("crypto")},5591:e=>{"use strict";e.exports=require("https")},5623:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,7719,23)),Promise.resolve().then(r.t.bind(r,7851,23)),Promise.resolve().then(r.t.bind(r,4463,23)),Promise.resolve().then(r.t.bind(r,9854,23)),Promise.resolve().then(r.t.bind(r,6314,23)),Promise.resolve().then(r.t.bind(r,4990,23)),Promise.resolve().then(r.t.bind(r,2700,23)),Promise.resolve().then(r.t.bind(r,7550,23))},6448:(e,t,r)=>{"use strict";r.d(t,{C:()=>n,Z:()=>a,cn:()=>o});var s=r(4247),i=r(7804);function o(...e){return(0,i.QP)((0,s.$)(e))}let n="http://51.20.79.155:8000/api",a="ws://51.20.79.155:5000"},7375:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,8045,23)),Promise.resolve().then(r.t.bind(r,8429,23)),Promise.resolve().then(r.t.bind(r,3765,23)),Promise.resolve().then(r.t.bind(r,3700,23)),Promise.resolve().then(r.t.bind(r,268,23)),Promise.resolve().then(r.t.bind(r,9312,23)),Promise.resolve().then(r.t.bind(r,8398,23)),Promise.resolve().then(r.t.bind(r,984,23))},7423:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c,metadata:()=>d});var s=r(1962),i=r(1391),o=r.n(i),n=r(2851),a=r.n(n);r(2360);var l=r(2225);let d={title:"Create Next App",description:"Generated by create next app"};function c({children:e}){return(0,s.jsx)("html",{lang:"en",children:(0,s.jsxs)("body",{className:`${o().variable} ${a().variable} antialiased`,children:[(0,s.jsx)(l.Toaster,{position:"top-right",toastOptions:{className:"bg-gray-800 text-white",duration:3e3,style:{backgroundColor:"#333",color:"#fff"}}}),e]})})}},7877:(e,t,r)=>{Promise.resolve().then(r.bind(r,3452))},7910:e=>{"use strict";e.exports=require("stream")},8354:e=>{"use strict";e.exports=require("util")},8542:(e,t,r)=>{Promise.resolve().then(r.bind(r,2225))},9021:e=>{"use strict";e.exports=require("fs")},9121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},9551:e=>{"use strict";e.exports=require("url")}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[983,344,148,557],()=>r(763));module.exports=s})();