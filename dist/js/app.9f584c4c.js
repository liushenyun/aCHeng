(function(e){function t(t){for(var u,r,c=t[0],i=t[1],s=t[2],l=0,f=[];l<c.length;l++)r=c[l],a[r]&&f.push(a[r][0]),a[r]=0;for(u in i)Object.prototype.hasOwnProperty.call(i,u)&&(e[u]=i[u]);d&&d(t);while(f.length)f.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],u=!0,r=1;r<n.length;r++){var c=n[r];0!==a[c]&&(u=!1)}u&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var u={},r={app:0},a={app:0},o=[];function c(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-eb6c2b8a":"d75638a5","chunk-279c1b72":"7b4b82ad","chunk-2bcad6ec":"c1c49ba7","chunk-318de67f":"93033dfb","chunk-483bb22f":"5ff5effa","chunk-636b9a2c":"294c4473","chunk-86690c56":"d4cc9c0d","chunk-b40409ac":"7983a28a"}[e]+".js"}function i(t){if(u[t])return u[t].exports;var n=u[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-279c1b72":1,"chunk-2bcad6ec":1,"chunk-318de67f":1,"chunk-483bb22f":1,"chunk-636b9a2c":1,"chunk-86690c56":1,"chunk-b40409ac":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise(function(t,n){for(var u="css/"+({}[e]||e)+"."+{"chunk-eb6c2b8a":"31d6cfe0","chunk-279c1b72":"5f3649d8","chunk-2bcad6ec":"3b6688c0","chunk-318de67f":"0bdda60a","chunk-483bb22f":"acbf066a","chunk-636b9a2c":"b1dfcb07","chunk-86690c56":"00996be3","chunk-b40409ac":"7ab02aa6"}[e]+".css",a=i.p+u,o=document.getElementsByTagName("link"),c=0;c<o.length;c++){var s=o[c],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===u||l===a))return t()}var f=document.getElementsByTagName("style");for(c=0;c<f.length;c++){s=f[c],l=s.getAttribute("data-href");if(l===u||l===a)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var u=t&&t.target&&t.target.src||a,o=new Error("Loading CSS chunk "+e+" failed.\n("+u+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=u,delete r[e],d.parentNode.removeChild(d),n(o)},d.href=a;var b=document.getElementsByTagName("head")[0];b.appendChild(d)}).then(function(){r[e]=0}));var u=a[e];if(0!==u)if(u)t.push(u[2]);else{var o=new Promise(function(t,n){u=a[e]=[t,n]});t.push(u[2]=o);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=c(e),s=function(t){l.onerror=l.onload=null,clearTimeout(f);var n=a[e];if(0!==n){if(n){var u=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src,o=new Error("Loading chunk "+e+" failed.\n("+u+": "+r+")");o.type=u,o.request=r,n[1](o)}a[e]=void 0}};var f=setTimeout(function(){s({type:"timeout",target:l})},12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=u,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var u in e)i.d(n,u,function(t){return e[t]}.bind(null,u));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var f=0;f<s.length;f++)t(s[f]);var d=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},4360:function(e,t,n){"use strict";var u=n("2b0e"),r=n("2f62"),a={isLoading:!1,isSubscribe:!0},o={showLoading:function(e,t){e.isLoading=t},showScan:function(e,t){e.isSubscribe=t}},c={showLoading:function(e,t){var n=e.commit;n("showLoading",t)},showScan:function(e,t){var n=e.commit;n("showScan",t)}},i={isLoading:function(){return a.isLoading},isSubscribe:function(){return a.isSubscribe}};u["default"].use(r["a"]);t["a"]=new r["a"].Store({state:a,mutations:o,actions:c,getters:i})},"465b":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var u=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("pub-loading"),n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("router-view")],1)],1)},a=[],o=function(){var e=this,t=e.$createElement,u=e._self._c||t;return u("transition",{attrs:{name:"fade"}},[e.isLoading?u("div",{attrs:{id:"loading"}},[u("div",{staticClass:"box"},[u("img",{attrs:{src:n("57b6")}})])]):e._e()])},c=[],i=(n("8e6e"),n("ac6a"),n("456d"),n("bd86")),s=n("2f62");function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);t&&(u=u.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,u)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(n,!0).forEach(function(t){Object(i["a"])(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var d={name:"loading",computed:f({},Object(s["b"])(["isLoading"]))},b=d,p=(n("cb13"),n("2877")),h=Object(p["a"])(b,o,c,!1,null,null,null),m=h.exports,g=(n("28a5"),n("386d"),n("f65e"),{name:"app",components:{PubLoading:m},methods:{},mounted:function(){}}),v=g,k=(n("5c0b"),Object(p["a"])(v,r,a,!1,null,null,null)),y=k.exports,O=n("8c4f"),w=function(){return Promise.all([n.e("chunk-eb6c2b8a"),n.e("chunk-279c1b72")]).then(n.bind(null,"16c0"))},P=function(){return Promise.all([n.e("chunk-eb6c2b8a"),n.e("chunk-318de67f")]).then(n.bind(null,"0611"))},S=function(){return Promise.all([n.e("chunk-eb6c2b8a"),n.e("chunk-636b9a2c")]).then(n.bind(null,"427f"))},C=function(){return Promise.all([n.e("chunk-eb6c2b8a"),n.e("chunk-b40409ac")]).then(n.bind(null,"5732"))},j=function(){return Promise.all([n.e("chunk-eb6c2b8a"),n.e("chunk-483bb22f")]).then(n.bind(null,"c900"))},x=function(){return Promise.all([n.e("chunk-eb6c2b8a"),n.e("chunk-86690c56")]).then(n.bind(null,"d47f"))},T=function(){return Promise.all([n.e("chunk-eb6c2b8a"),n.e("chunk-2bcad6ec")]).then(n.bind(null,"ed9a"))};u["default"].use(O["a"]);var L=new O["a"]({routes:[{path:"/",name:"home",component:w,children:[{path:"index",component:T},{path:"metagenome",component:P},{path:"project",component:S},{path:"metaData",component:C},{path:"globalSearch",component:j},{path:"contact",component:x}],redirect:"/index"}]}),E=L;L.afterEach(function(e,t){});var I=n("4360"),_=(n("0fae"),n("5c96"));u["default"].use(_["CascaderPanel"]),u["default"].use(_["Tooltip"]),u["default"].use(_["Collapse"]),u["default"].use(_["CollapseItem"]),u["default"].use(_["Divider"]),u["default"].use(_["Select"]),u["default"].use(_["Option"]),u["default"].use(_["Drawer"]),u["default"].use(_["Menu"]),u["default"].use(_["Submenu"]),u["default"].use(_["MenuItem"]),u["default"].use(_["MenuItemGroup"]),u["default"].use(_["Card"]),u["default"].use(_["Input"]),u["default"].use(_["Icon"]),u["default"].use(_["Table"]),u["default"].use(_["TableColumn"]),u["default"].use(_["Row"]),u["default"].use(_["Col"]),u["default"].use(_["Button"]),u["default"].use(_["Container"]),u["default"].use(_["Header"]),u["default"].use(_["Aside"]),u["default"].use(_["Tree"]),u["default"].use(_["Main"]),u["default"].use(_["Link"]),u["default"].use(_["Tabs"]),u["default"].use(_["Checkbox"]),u["default"].use(_["CheckboxButton"]),u["default"].use(_["CheckboxGroup"]),u["default"].use(_["TabPane"]),u["default"].use(_["Badge"]),u["default"].use(_["Footer"]),Object.assign(u["default"].prototype,{$confirm:_["MessageBox"].confirm,$alert:_["MessageBox"].alert,$message:_["Message"],$bus:new u["default"]}),u["default"].config.productionTip=!1,new u["default"]({router:E,store:I["a"],render:function(e){return e(y)}}).$mount("#app")},"57b6":function(e,t,n){e.exports=n.p+"img/circles.f80747cc.svg"},"5c0b":function(e,t,n){"use strict";var u=n("e332"),r=n.n(u);r.a},cb13:function(e,t,n){"use strict";var u=n("465b"),r=n.n(u);r.a},e332:function(e,t,n){},f65e:function(e,t,n){"use strict";n.d(t,"c",function(){return a}),n.d(t,"b",function(){return r}),n.d(t,"a",function(){return o});n("ac6a");var u=n("2b0e"),r=function(){var e=localStorage.getItem("CHIP-CART");return e&&JSON.parse(e)||{}},a=function(e){var t=r();t[e["SampleID"]]=e,localStorage.setItem("CHIP-CART",JSON.stringify(t)),u["default"].prototype.$bus.$emit("computedCount",r())},o=function(e){console.log(16,e);var t=r();e.forEach(function(e){delete t[e["SampleID"]]}),localStorage.setItem("CHIP-CART",JSON.stringify(t)),u["default"].prototype.$bus.$emit("computedCount",r()),u["default"].prototype.$bus.$emit("updatePageCatData",r())}}});
//# sourceMappingURL=app.9f584c4c.js.map