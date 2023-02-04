(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-15da5734"],{"26e5":function(t,e,a){},"4bd4":function(t,e,a){"use strict";a("26e5");var i=a("94ab");e["a"]={name:"v-form",mixins:[Object(i["b"])("form")],inheritAttrs:!1,props:{value:Boolean,lazyValidation:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(){var t=Object.values(this.errorBag).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,a=function(t){return t.$watch("hasError",(function(a){e.$set(e.errorBag,t._uid,a)}),{immediate:!0})},i={_uid:t._uid,valid:void 0,shouldValidate:void 0};return this.lazyValidation?i.shouldValidate=t.$watch("shouldValidate",(function(s){s&&(e.errorBag.hasOwnProperty(t._uid)||(i.valid=a(t)))})):i.valid=a(t),i},validate:function(){var t=this.inputs.filter((function(t){return!t.validate(!0)})).length;return!t},reset:function(){for(var t=this,e=this.inputs.length;e--;)this.inputs[e].reset();this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){for(var t=this,e=this.inputs.length;e--;)this.inputs[e].resetValidation();this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},register:function(t){var e=this.watchInput(t);this.inputs.push(t),this.watchers.push(e)},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var a=this.watchers.find((function(t){return t._uid===e._uid}));a.valid&&a.valid(),a.shouldValidate&&a.shouldValidate(),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object.assign({novalidate:!0},this.$attrs),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}}},6781:function(t,e,a){},"73b8":function(t,e,a){"use strict";a("6781")},"9bc1":function(t,e,a){},a13d:function(t,e,a){"use strict";a("9bc1")},f359:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"site-search-entry"},[a("v-alert",{attrs:{value:!0,type:"info"}},[t._v(t._s(t.$t("settings.siteSearchEntry.index.title"))+" ["+t._s(t.site.name)+"]")]),a("v-card",[a("v-card-title",[a("v-btn",{attrs:{color:"success"},on:{click:t.add}},[a("v-icon",{staticClass:"mr-2"},[t._v("add")]),t._v("\n        "+t._s(t.$t("common.add"))+"\n      ")],1),a("v-btn",{attrs:{color:"error",disabled:0==t.selected.length},on:{click:t.removeSelected}},[a("v-icon",{staticClass:"mr-2"},[t._v("remove")]),t._v("\n        "+t._s(t.$t("common.remove"))+"\n      ")],1),a("v-btn",{attrs:{color:"info",href:"https://github.com/pt-plugins/PT-Plugin-Plus/wiki/search-entry-definition",target:"_blank",rel:"noopener noreferrer nofollow"}},[a("v-icon",{staticClass:"mr-2"},[t._v("help")]),t._v("\n        "+t._s(t.$t("settings.siteSearchEntry.index.help"))+"\n      ")],1),a("v-spacer"),a("v-text-field",{staticClass:"search",attrs:{"append-icon":"search",label:"Search","single-line":"","hide-details":""}})],1),a("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.searchEntry,pagination:t.pagination,"item-key":"name","select-all":""},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"items",fn:function(e){return[a("td",{staticStyle:{width:"20px"}},[e.item.isCustom?a("v-checkbox",{attrs:{primary:"","hide-details":""},model:{value:e.selected,callback:function(a){t.$set(e,"selected",a)},expression:"props.selected"}}):t._e()],1),a("td",[a("a",{on:{click:function(a){return t.edit(e.item)}}},[a("span",{staticClass:"ml-2"},[t._v(t._s(e.item.name))])])]),a("td",{staticClass:"cat"},[t._l(t.getCategory(e.item),(function(e,i){return[a("v-chip",{key:i,staticClass:"mr-2 pl-0",attrs:{label:"",color:"blue-grey","text-color":"white",small:"",disabled:""}},[t._v(t._s(e))])]}))],2),a("td",[a("v-switch",{attrs:{"true-value":"true","false-value":"false","input-value":e.item.enabled?"true":"false","hide-details":""}})],1),a("td",[a("v-icon",{staticClass:"mr-2",attrs:{small:"",title:t.$t("common.copy")},on:{click:function(a){return t.copy(e.item)}}},[t._v("file_copy")]),e.item.isCustom?a("v-icon",{staticClass:"mr-2",attrs:{small:"",title:t.$t("common.edit")},on:{click:function(a){return t.edit(e.item)}}},[t._v("edit")]):t._e(),e.item.isCustom?a("v-icon",{attrs:{small:"",color:"error",title:t.$t("common.remove")},on:{click:function(a){return t.removeConfirm(e.item)}}},[t._v("delete")]):t._e()],1)]}}]),model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}})],1),a("AddItem",{attrs:{site:t.site},on:{save:t.addItem},model:{value:t.showAddDialog,callback:function(e){t.showAddDialog=e},expression:"showAddDialog"}}),a("EditItem",{attrs:{site:t.site,data:t.selectedItem},on:{save:t.updateItem},model:{value:t.showEditDialog,callback:function(e){t.showEditDialog=e},expression:"showEditDialog"}}),a("v-dialog",{attrs:{width:"300"},model:{value:t.dialogRemoveConfirm,callback:function(e){t.dialogRemoveConfirm=e},expression:"dialogRemoveConfirm"}},[a("v-card",[a("v-card-title",{staticClass:"headline red lighten-2"},[t._v(t._s(t.$t("settings.siteSearchEntry.index.removeTitle")))]),a("v-card-text",[t._v(t._s(t.$t("settings.siteSearchEntry.index.removeConfirm")))]),a("v-divider"),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{flat:"",color:"info"},on:{click:function(e){t.dialogRemoveConfirm=!1}}},[a("v-icon",[t._v("cancel")]),a("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("common.cancel")))])],1),a("v-btn",{attrs:{color:"error",flat:""},on:{click:t.remove}},[a("v-icon",[t._v("check_circle_outline")]),a("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("common.ok")))])],1)],1)],1)],1)],1)},s=[],n=(a("6762"),a("2fdb"),a("7f7f"),a("75fc")),r=(a("7514"),a("ac6a"),a("6b54"),a("2b0e")),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-dialog",{attrs:{"max-width":"900"},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[a("v-card",[a("v-card-title",{staticClass:"headline blue-grey darken-2",staticStyle:{color:"white"}},[t._v(t._s(t.$t("settings.siteSearchEntry.add.title")))]),a("v-card-text",[a("Editor",{attrs:{data:t.selected,site:t.site}})],1),a("v-divider"),a("v-card-actions",{staticClass:"pa-3"},[a("v-spacer"),a("v-btn",{attrs:{flat:"",color:"error"},on:{click:t.cancel}},[a("v-icon",[t._v("cancel")]),a("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("common.cancel")))])],1),a("v-btn",{attrs:{flat:"",color:"success",disabled:!t.selected.valid},on:{click:t.save}},[a("v-icon",[t._v("check_circle_outline")]),a("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("common.ok")))])],1)],1)],1)],1)],1)},c=[],l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{attrs:{color:"grey lighten-4"}},[a("v-card-text",[a("v-form",{model:{value:t.data.valid,callback:function(e){t.$set(t.data,"valid",e)},expression:"data.valid"}},[a("v-text-field",{ref:"name",attrs:{label:t.$t("settings.siteSearchEntry.editor.name"),placeholder:t.$t("settings.siteSearchEntry.editor.name"),required:"",rules:t.rules.require,disabled:!t.data.isCustom},model:{value:t.data.name,callback:function(e){t.$set(t.data,"name",e)},expression:"data.name"}}),a("v-text-field",{attrs:{label:t.$t("settings.siteSearchEntry.editor.entry"),placeholder:t.$t("settings.siteSearchEntry.editor.entry"),disabled:!t.data.isCustom},model:{value:t.data.entry,callback:function(e){t.$set(t.data,"entry",e)},expression:"data.entry"}}),t.category&&t.category.length?a("v-autocomplete",{attrs:{items:t.category,label:t.$t("settings.siteSearchEntry.editor.category"),"item-text":"name","item-value":"id",chips:"",clearable:"",multiple:"",disabled:!t.data.isCustom},scopedSlots:t._u([{key:"selection",fn:function(e){return[a("v-chip",{attrs:{small:"",selected:e.selected,close:""},on:{input:function(a){return t.remove(e.item)}}},[t._v(t._s(e.item.name))])]}}],null,!1,560667869),model:{value:t.data.categories,callback:function(e){t.$set(t.data,"categories",e)},expression:"data.categories"}}):t._e(),a("v-text-field",{attrs:{label:t.$t("settings.siteSearchEntry.editor.queryString"),placeholder:t.$t("settings.siteSearchEntry.editor.queryString"),disabled:!t.data.isCustom},model:{value:t.data.queryString,callback:function(e){t.$set(t.data,"queryString",e)},expression:"data.queryString"}}),a("v-text-field",{attrs:{label:t.$t("settings.siteSearchEntry.editor.parseScriptFile"),placeholder:t.$t("settings.siteSearchEntry.editor.parseScriptFile"),disabled:!t.data.isCustom},model:{value:t.data.parseScriptFile,callback:function(e){t.$set(t.data,"parseScriptFile",e)},expression:"data.parseScriptFile"}}),a("v-textarea",{attrs:{label:t.$t("settings.siteSearchEntry.editor.parseScript"),height:"200",disabled:!t.data.isCustom},model:{value:t.data.parseScript,callback:function(e){t.$set(t.data,"parseScript",e)},expression:"data.parseScript"}}),a("v-textarea",{attrs:{label:t.$t("settings.siteSearchEntry.editor.resultSelector"),height:"80",disabled:!t.data.isCustom},model:{value:t.data.resultSelector,callback:function(e){t.$set(t.data,"resultSelector",e)},expression:"data.resultSelector"}})],1)],1)],1)},d=[],u=(a("a481"),a("20d6"),r["default"].extend({data:function(){return{rules:{require:[function(t){return!!t||"!"}]},checked:[],categoryConfig:{}}},props:{data:{type:Object,default:function(){return{valid:!1}}},site:Object},watch:{"data.categories":function(){var t=this,e=[];this.data&&this.data.categories&&this.data.categories.length>0&&this.data.categories.forEach((function(a){var i=t.category.find((function(t){return t.id==a}));i&&e.push(i.key)})),this.categoryConfig.appendToSearchKey?this.data.appendToSearchKeyString=e.join(""):this.data.queryString=e.join("")}},methods:{remove:function(t){var e=this.data.categories.findIndex((function(e){return t.id===e.id}));-1!=e&&this.data.categories.splice(e,1)}},computed:{category:function(){var t=this,e=this.site,a=[];return e.categories&&e.categories.find((function(e){if(e.category&&("*"==e.entry||t.data.entry&&t.data.entry.indexOf(e.entry)>-1)){t.categoryConfig=e;var i=e.result+"";return e.category.forEach((function(t){a.push(Object.assign({key:i.replace(/\$id\$/gi,t.id+"")},t))})),!0}return!1})),a}}})),h=u,v=(a("a13d"),a("2877")),m=a("6544"),f=a.n(m),p=a("c6a6"),g=a("b0af"),y=a("99d9"),b=a("cc20"),_=a("4bd4"),C=a("2677"),$=a("a844"),S=Object(v["a"])(h,l,d,!1,null,null,null),x=S.exports;f()(S,{VAutocomplete:p["a"],VCard:g["a"],VCardText:y["b"],VChip:b["a"],VForm:_["a"],VTextField:C["a"],VTextarea:$["a"]});var w=a("f62e"),E=r["default"].extend({components:{Editor:x},data:function(){return{show:!1,selected:{isCustom:!0},valid:!1}},props:{value:Boolean,site:Object},model:{prop:"value",event:"change"},watch:{show:function(){this.$emit("change",this.show),this.show||(this.selected={isCustom:!0})},value:function(){this.show=this.value}},methods:{save:function(){this.$emit("save",Object.assign({isCustom:!0,resultType:w["n"].HTML},this.selected)),this.show=!1},cancel:function(){this.show=!1}}}),V=E,k=a("8336"),I=a("12b2"),O=a("169a"),j=a("ce7e"),T=a("132d"),D=a("9910"),B=Object(v["a"])(V,o,c,!1,null,null,null),A=B.exports;f()(B,{VBtn:k["a"],VCard:g["a"],VCardActions:y["a"],VCardText:y["b"],VCardTitle:I["a"],VDialog:O["a"],VDivider:j["a"],VIcon:T["a"],VSpacer:D["a"]});var q=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-dialog",{attrs:{"max-width":"900"},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[a("v-card",[a("v-card-title",{staticClass:"headline blue-grey darken-2",staticStyle:{color:"white"}},[t._v(t._s(t.$t("settings.siteSearchEntry.edit.title")))]),a("v-card-text",[a("Editor",{attrs:{data:t.defaultItem,site:t.site}})],1),a("v-divider"),a("v-card-actions",{staticClass:"pa-3"},[a("v-spacer"),a("v-btn",{attrs:{flat:"",color:"error"},on:{click:t.cancel}},[a("v-icon",[t._v("cancel")]),a("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("common.cancel")))])],1),a("v-btn",{attrs:{flat:"",color:"success",disabled:!t.defaultItem.valid&&!t.defaultItem.isCustom},on:{click:t.save}},[a("v-icon",[t._v("check_circle_outline")]),a("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("common.ok")))])],1)],1)],1)],1)},F=[],R=r["default"].extend({components:{Editor:x},data:function(){return{show:!1,defaultItem:{}}},props:{value:Boolean,data:Object,site:Object},model:{prop:"value",event:"change"},watch:{show:function(){this.$emit("change",this.show)},value:function(){this.show=this.value,this.show&&(this.defaultItem=Object.assign({},this.data))}},methods:{save:function(){this.$emit("save",this.defaultItem),this.show=!1},cancel:function(){this.show=!1}}}),P=R,z=Object(v["a"])(P,q,F,!1,null,null,null),J=z.exports;f()(z,{VBtn:k["a"],VCard:g["a"],VCardActions:y["a"],VCardText:y["b"],VCardTitle:I["a"],VDialog:O["a"],VDivider:j["a"],VIcon:T["a"],VSpacer:D["a"]});var K=a("0a02"),H=r["default"].extend({components:{AddItem:A,EditItem:J},data:function(){return{selected:[],pagination:{rowsPerPage:-1},showAddDialog:!1,showEditDialog:!1,site:{},selectedItem:{},dialogRemoveConfirm:!1,searchEntry:[],options:this.$store.state.options}},methods:{add:function(){this.showAddDialog=!0},copy:function(t){var e=Object.assign({},t);e.name+=" Copy",e.isCustom=!0,this.addItem(e)},edit:function(t){t&&(this.selectedItem=t,this.showEditDialog=!0)},removeConfirm:function(t){this.selectedItem=t,this.dialogRemoveConfirm=!0},remove:function(){this.dialogRemoveConfirm=!1,this.$store.dispatch("removeSiteSearchEntry",{host:this.site.host,item:this.selectedItem}),this.selectedItem={},this.reloadEntry(this.site.host)},removeSelected:function(){var t=this;confirm(this.$t("settings.siteSearchEntry.index.removeSelectedConfirm").toString())&&(this.selected.forEach((function(e){t.$store.dispatch("removeSiteSearchEntry",{host:t.site.host,item:e})})),this.selected=[],this.reloadEntry(this.site.host))},updateItem:function(t){console.log(t),this.selectedItem=t,this.$store.dispatch("updateSiteSearchEntry",{host:this.site.host,item:t}),this.reloadEntry(this.site.host)},addItem:function(t){console.log(t),this.$store.dispatch("addSiteSearchEntry",{host:this.site.host,item:t}),this.reloadEntry(this.site.host)},reloadEntry:function(t){var e=this.$store.state.options.sites.find((function(e){return e.host==t}));if(e){this.site=K["a"].clone(e);var a=this.options.system.sites.find((function(e){return e.host==t}));a&&(this.site.categories=K["a"].clone(a.categories));var i=[];if(this.site.searchEntry&&this.site.searchEntry.length>0)i.push.apply(i,Object(n["a"])(this.site.searchEntry));else{var s=this.site.schema;if("string"===typeof s){var r=this.$store.state.options.system.schemas.find((function(t){return t.name==s}));r&&i.push.apply(i,Object(n["a"])(r.searchEntry))}}this.searchEntry=K["a"].clone(i)}},getCategory:function(t){var e=this.site,a=[];return e.categories&&t.categories&&e.categories.forEach((function(e){e.category&&("*"==e.entry||t.entry.indexOf(e.entry))&&e.category.forEach((function(e){t.categories&&t.categories.includes(e.id)&&a.push(e.name)}))})),a}},created:function(){var t=this.$route.params["host"];console.log("create",this.$route.params),t&&this.reloadEntry(t)},computed:{headers:function(){return[{text:this.$t("settings.siteSearchEntry.index.headers.name"),align:"left",value:"name"},{text:this.$t("settings.siteSearchEntry.index.headers.categories"),align:"left",value:"categories"},{text:this.$t("settings.siteSearchEntry.index.headers.enable"),align:"left",value:"enable"},{text:this.$t("settings.siteSearchEntry.index.headers.action"),value:"name",sortable:!1}]}}}),L=H,M=(a("73b8"),a("0798")),G=a("ac7c"),N=a("8fea"),Q=a("b73d"),U=Object(v["a"])(L,i,s,!1,null,"386cc766",null);e["default"]=U.exports;f()(U,{VAlert:M["a"],VBtn:k["a"],VCard:g["a"],VCardActions:y["a"],VCardText:y["b"],VCardTitle:I["a"],VCheckbox:G["a"],VChip:b["a"],VDataTable:N["a"],VDialog:O["a"],VDivider:j["a"],VIcon:T["a"],VSpacer:D["a"],VSwitch:Q["a"],VTextField:C["a"]})}}]);