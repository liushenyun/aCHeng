(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f921b362"],{"427f":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"PROJECT-outer"},[a("div",{staticClass:"search-outer",staticStyle:{"margin-bottom":"10px"}},[a("el-input",{staticClass:"input-with-select",staticStyle:{"margin-right":"20px"},attrs:{placeholder:"请输入内容",size:"small"},model:{value:t.projectInput,callback:function(e){t.projectInput=e},expression:"projectInput"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.searchA},slot:"append"})],1)],1),a("div",{staticClass:"pr-table"},[a("el-table",{attrs:{data:t.tableData4,"span-method":t.objectSpanMethod1,border:""}},[a("el-table-column",{attrs:{"class-name":"one-column",prop:"id",label:"Projects",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticStyle:{"margin-left":"10px"},on:{click:function(a){return t.cellClick(e.$index,t.tableData4[e.$index])}}},[t._v(t._s(e.row.id))])]}}])}),a("el-table-column",{attrs:{prop:"tags",label:"Tags"}}),a("el-table-column",{attrs:{prop:"sampleNumber",label:"Sample Number"}}),a("el-table-column",{attrs:{prop:"publishedYear",label:"published Year"}}),a("el-table-column",{attrs:{prop:"url",label:"Download Meta"},scopedSlots:t._u([{key:"default",fn:function(e){return t.tableData4[e.$index].url?[a("el-link",{attrs:{href:t.tableData4[e.$index].url,target:"_blank",type:"primary"}},[t._v("download")])]:void 0}}],null,!0)})],1)],1),a("el-drawer",{attrs:{title:"我是标题",size:"50%",visible:t.drawer,"with-header":!1},on:{"update:visible":function(e){t.drawer=e}}},[a("div",{staticClass:"drawer-con"},[a("div",{staticClass:"tips"},[a("p",{staticClass:"mmc-link"},[a("span",[t._v("T2D")]),a("el-link",{attrs:{href:"",type:"primary"}},[t._v("文献链接")]),a("el-link",{attrs:{type:"primary",href:""}},[t._v("EMBL数据库连接")])],1),a("p",{staticClass:"metahome-tip"},[a("span",[t._v("这是描述")])])])])])],1)},r=[],i=(a("7f7f"),a("ac6a"),a("510f")),l=a("8678"),o={name:"home",mixins:[i["a"]],data:function(){return{drawer:!1,projectDetail:"",projectInput:"",spanArr:[],tableData4:[]}},components:{},methods:{cellClick:function(t,e){this.drawer=!0,this.projectDetail=e.projects},downloadA:function(t,e){console.log(t,e)},projectsApiFA:function(){var t=this;Object(l["h"])().then(function(e){t.dealProjects(e),console.log(121,t.tableData4)}).catch(function(){})},dealProjects:function(t){this.tableData4=[],this.spanArr=[];var e=t,a=[];e.forEach(function(t){t.samples.forEach(function(e){var n={id:t.name,projects:t.name,tags:e.name,sampleNumber:e.number,publishedYear:t.published_year,url:e.url};a.push(n)})}),this.tableData4=a,this.initTableData(),console.log(79,this.tableData4)},objectSpanMethod1:function(t){t.row,t.column;var e=t.rowIndex,a=t.columnIndex;if(0===a){var n=this.spanArr[e],r=n>0?1:0;return{rowspan:n,colspan:r}}},initTableData:function(){var t=this,e=0;this.tableData4.forEach(function(a,n){a.index=n,0===n?t.spanArr.push(1):a.id===t.tableData4[n-1].id?(t.spanArr[e]+=1,t.spanArr.push(0)):(t.spanArr.push(1),e=n)})},searchA:function(){this.projectInput?this.oneProjectSearchApiFA(this.projectInput):this.projectsApiFA()},oneProjectSearchApiFA:function(t){var e=this;Object(l["f"])({key:t}).then(function(t){console.log(256,t),e.dealProjects(t)}).catch(function(){})},toDetailA:function(t,e){this.$router.push({path:"/detailA/".concat(t,"/").concat(e.id)})}},watch:{},mounted:function(){this.projectsApiFA()}},s=o,c=(a("b586"),a("2877")),p=Object(c["a"])(s,n,r,!1,null,"366665bc",null);e["default"]=p.exports},"7f7f":function(t,e,a){var n=a("86cc").f,r=Function.prototype,i=/^\s*function ([^ (]*)/,l="name";l in r||a("9e1e")&&n(r,l,{configurable:!0,get:function(){try{return(""+this).match(i)[1]}catch(t){return""}}})},b586:function(t,e,a){"use strict";var n=a("fb32"),r=a.n(n);r.a},fb32:function(t,e,a){}}]);
//# sourceMappingURL=chunk-f921b362.e88ee389.js.map