(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6796ef00"],{"1c6e":function(t,i,e){},a7a6:function(t,i,e){"use strict";var n=e("1c6e"),a=e.n(n);a.a},d47f:function(t,i,e){"use strict";e.r(i);var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"Concat-outer"},[e("el-tabs",{attrs:{type:"border-card"},model:{value:t.activeName,callback:function(i){t.activeName=i},expression:"activeName"}},[e("el-tab-pane",{attrs:{label:"Report Bugs",name:"first"}},[e("div",{staticClass:"input-row"},[e("p",{staticClass:"input-title"},[t._v("Project Id：")]),e("el-input",{attrs:{placeholder:"Project Id"},model:{value:t.input1Id,callback:function(i){t.input1Id=i},expression:"input1Id"}})],1),e("div",{staticClass:"input-row"},[e("p",{staticClass:"input-title"},[t._v("Email：")]),e("el-input",{attrs:{placeholder:"Email"},model:{value:t.input1Email,callback:function(i){t.input1Email=i},expression:"input1Email"}})],1),e("div",{staticClass:"input-row"},[e("p",{staticClass:"input-title"},[t._v("Error Description：")]),e("el-input",{attrs:{type:"textarea",rows:2,placeholder:"Description"},model:{value:t.input1Des,callback:function(i){t.input1Des=i},expression:"input1Des"}})],1),e("el-row",[e("el-button",{attrs:{type:"primary"},on:{click:t.bugA}},[t._v("submit")])],1)],1),e("el-tab-pane",{attrs:{label:"Report New MetaGenome",name:"second"}},[e("div",{staticClass:"input-row"},[e("p",{staticClass:"input-title"},[t._v("Topic：")]),e("el-input",{attrs:{placeholder:"Topic"},model:{value:t.input2Topic,callback:function(i){t.input2Topic=i},expression:"input2Topic"}})],1),e("div",{staticClass:"input-row"},[e("p",{staticClass:"input-title"},[t._v("Link：")]),e("el-input",{attrs:{placeholder:"Link"},model:{value:t.input2Link,callback:function(i){t.input2Link=i},expression:"input2Link"}})],1),e("div",{staticClass:"input-row"},[e("p",{staticClass:"input-title"},[t._v("Email：")]),e("el-input",{attrs:{placeholder:"Email"},model:{value:t.input2Email,callback:function(i){t.input2Email=i},expression:"input2Email"}})],1),e("div",{staticClass:"input-row"},[e("p",{staticClass:"input-title"},[t._v("Description：")]),e("el-input",{attrs:{type:"textarea",rows:2,placeholder:"Description"},model:{value:t.input2Des,callback:function(i){t.input2Des=i},expression:"input2Des"}})],1),e("el-row",[e("el-button",{attrs:{type:"primary"},on:{click:t.metaA}},[t._v("submit")])],1)],1)],1)],1)},a=[],s=e("510f"),l=e("8678"),c={name:"Concat",mixins:[s["a"]],data:function(){return{activeName:"first",input1Id:"",input1Des:"",input1Email:"",input2Topic:"",input2Des:"",input2Email:"",input2Link:""}},components:{},methods:{bugA:function(){var t=this;Object(l["i"])({project_id:this.input1Id,description:this.input1Des,email:this.input1Email}).then(function(i){t.$message.success("Submit Success"),console.log(96,i)}).catch(function(){})},metaA:function(){var t=this;Object(l["j"])({topic:this.input2Topic,description:this.input2Des,link:this.input2Link,email:this.input2Email}).then(function(i){t.$message.success("Submit Success"),console.log(97,i)}).catch(function(){})}},watch:{},mounted:function(){}},p=c,u=(e("a7a6"),e("2877")),o=Object(u["a"])(p,n,a,!1,null,"2d63810d",null);i["default"]=o.exports}}]);
//# sourceMappingURL=chunk-6796ef00.faa1acef.js.map