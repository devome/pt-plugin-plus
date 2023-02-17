(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6bb8f5a8"],{"07a8":function(t,e,i){"use strict";i("8627")},"080a":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"set-download-clients"},[i("v-alert",{attrs:{value:!0,type:"info"}},[t._v(t._s(t.$t("settings.downloadPaths.index.title")))]),i("v-card",[i("v-card-title",[i("v-autocomplete",{staticStyle:{"max-width":"500px"},attrs:{items:t.items,label:t.$t("settings.downloadPaths.index.selectedClient"),"menu-props":{maxHeight:"auto"},hint:t.selectedClient.address,"return-object":"","persistent-hint":"","item-text":"name","item-value":"id"},scopedSlots:t._u([{key:"selection",fn:function(e){var s=e.item;return[i("span",[t._v(t._s(s.name))])]}},{key:"item",fn:function(e){return[i("v-list-tile-content",[i("v-list-tile-title",{domProps:{innerHTML:t._s(e.item.name)}}),i("v-list-tile-sub-title",{domProps:{innerHTML:t._s(e.item.address)}})],1),i("v-list-tile-action",[i("v-list-tile-action-text",[t._v(t._s(e.item.allowCustomPath?e.item.type:t.$t("settings.downloadPaths.index.notSupport")))])],1)]}}]),model:{value:t.selectedClient,callback:function(e){t.selectedClient=e},expression:"selectedClient"}}),i("v-spacer"),i("v-btn",{attrs:{color:"success",disabled:!t.selectedClient.id||!t.selectedClient.allowCustomPath},on:{click:t.add}},[i("v-icon",{staticClass:"mr-2"},[t._v("add")]),t._v("\n        "+t._s(t.$t("settings.downloadPaths.index.add"))+"\n      ")],1),i("v-btn",{attrs:{color:"error",disabled:0==t.selected.length},on:{click:function(e){return e.stopPropagation(),t.removeSelected.apply(null,arguments)}}},[i("v-icon",{staticClass:"mr-2"},[t._v("remove")]),t._v("\n        "+t._s(t.$t("settings.downloadPaths.index.remove"))+"\n      ")],1)],1),i("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.getClientPaths,pagination:t.pagination,"item-key":"name","select-all":""},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"items",fn:function(e){return[i("td",{staticStyle:{width:"20px"}},[i("v-checkbox",{attrs:{primary:"","hide-details":""},model:{value:e.selected,callback:function(i){t.$set(e,"selected",i)},expression:"props.selected"}})],1),i("td",[i("a",{on:{click:function(i){return t.edit(e.item)}}},[t._v(t._s(e.item.name))])]),i("td",t._l(e.item.paths,(function(e,s){return i("div",{key:s},[t._v(t._s(e))])})),0),i("td",[i("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(i){return t.edit(e.item)}}},[t._v("edit")]),i("v-icon",{attrs:{small:"",color:"error"},on:{click:function(i){return t.removeConfirm(e.item)}}},[t._v("delete")])],1)]}}]),model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}})],1),i("AddItem",{attrs:{client:t.selectedClient},on:{save:t.addItem},model:{value:t.showAddDialog,callback:function(e){t.showAddDialog=e},expression:"showAddDialog"}}),i("EditItem",{attrs:{option:t.selectedItem,client:t.selectedClient},on:{save:t.updateItem},model:{value:t.showEditDialog,callback:function(e){t.showEditDialog=e},expression:"showEditDialog"}}),i("v-dialog",{attrs:{width:"300"},model:{value:t.dialogRemoveConfirm,callback:function(e){t.dialogRemoveConfirm=e},expression:"dialogRemoveConfirm"}},[i("v-card",[i("v-card-title",{staticClass:"headline red lighten-2"},[t._v(t._s(t.$t("settings.downloadPaths.index.removeConfirmTitle")))]),i("v-card-text",[t._v(t._s(t.$t("settings.downloadPaths.index.removeConfirm")))]),i("v-divider"),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{flat:"",color:"info"},on:{click:function(e){t.dialogRemoveConfirm=!1}}},[i("v-icon",[t._v("cancel")]),i("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("settings.downloadPaths.index.cancel")))])],1),i("v-btn",{attrs:{color:"error",flat:""},on:{click:t.remove}},[i("v-icon",[t._v("check_circle_outline")]),i("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("settings.downloadPaths.index.ok")))])],1)],1)],1)],1),i("v-snackbar",{attrs:{top:"",timeout:3e3,color:"error"},model:{value:t.itemDuplicate,callback:function(e){t.itemDuplicate=e},expression:"itemDuplicate"}},[t._v(t._s(t.$t("settings.downloadPaths.index.itemDuplicate")))])],1)},a=[],n=(i("7f7f"),i("7514"),i("ac6a"),i("6b54"),i("2b0e")),o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("v-dialog",{attrs:{"max-width":"800"},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[i("v-card",[i("v-card-title",{staticClass:"headline blue-grey darken-2",staticStyle:{color:"white"}},[t._v(t._s(t.$t("settings.downloadPaths.add.title")))]),i("v-card-text",[i("v-form",{model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[i("v-autocomplete",{attrs:{items:t.getSites(),label:t.$t("settings.downloadPaths.add.selectSite"),"persistent-hint":"","single-line":"","item-text":"name","item-value":"host","return-object":"",rules:t.rules.require},scopedSlots:t._u([{key:"selection",fn:function(e){var s=e.item;return[i("v-list-tile-avatar",[i("img",{attrs:{src:s.icon}})]),i("span",{domProps:{textContent:t._s(s.name)}})]}},{key:"item",fn:function(e){return[i("v-list-tile-avatar",[i("img",{attrs:{src:e.item.icon}})]),i("v-list-tile-content",[i("v-list-tile-title",{domProps:{innerHTML:t._s(e.item.name)}}),i("v-list-tile-sub-title",{domProps:{innerHTML:t._s(e.item.url)}})],1),i("v-list-tile-action",[i("v-list-tile-action-text",[t._v(t._s(t.joinTags(e.item.tags)))])],1)]}}]),model:{value:t.selectedSite,callback:function(e){t.selectedSite=e},expression:"selectedSite"}}),i("v-textarea",{attrs:{label:t.$t("settings.downloadPaths.add.path"),value:"",hint:t.$t("settings.downloadPaths.add.pathTip"),rules:t.rules.require},model:{value:t.paths,callback:function(e){t.paths=e},expression:"paths"}}),t.client.pathDescription?i("v-alert",{attrs:{value:!0,color:"info",icon:"info",outline:""}},[i("div",{domProps:{innerHTML:t._s(t.client.pathDescription)}}),i("KeyDescription")],1):t._e()],1)],1),i("v-divider"),i("v-card-actions",{staticClass:"pa-3"},[i("v-spacer"),i("v-btn",{attrs:{flat:"",color:"error"},on:{click:t.cancel}},[i("v-icon",[t._v("cancel")]),i("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("settings.downloadPaths.add.cancel")))])],1),i("v-btn",{attrs:{flat:"",color:"success",disabled:!t.valid},on:{click:t.save}},[i("v-icon",[t._v("check_circle_outline")]),i("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("settings.downloadPaths.add.ok")))])],1)],1)],1)],1)],1)},l=[],d=(i("28a5"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"keyDescription"},[i("span",[t._v(t._s(t.$t("settings.downloadPaths.keyDescription.allowKeys")))]),i("table",[i("tr",[i("td",[t._v("$site.name$")]),i("td",[t._v("\n        "+t._s(t.$t("settings.downloadPaths.keyDescription.siteName"))+"\n        "),i("br"),t._v("\n        "+t._s(t.$t("settings.downloadPaths.keyDescription.example"))+"/volume1/$site.name$/music -> /volume1/OpenCD/music\n      ")])]),i("tr",[i("td",[t._v("$site.host$")]),i("td",[t._v("\n        "+t._s(t.$t("settings.downloadPaths.keyDescription.siteHost"))+"\n        "),i("br"),t._v("\n        "+t._s(t.$t("settings.downloadPaths.keyDescription.example"))+"/volume1/$site.host$/music -> /volume1/open.cd/music\n      ")])]),i("tr",[i("td",[t._v("$YYYY$")]),i("td",[t._v(t._s(t.$t("settings.downloadPaths.keyDescription.example"))+"/volume1/$YYYY$/music -> /volume1/2019/music")])]),i("tr",[i("td",[t._v("$MM$")]),i("td",[t._v(t._s(t.$t("settings.downloadPaths.keyDescription.example"))+"/volume1/$MM$/music -> /volume1/10/music")])]),i("tr",[i("td",[t._v("$DD$")]),i("td",[t._v(t._s(t.$t("settings.downloadPaths.keyDescription.example"))+"/volume1/$DD$/music -> /volume1/01/music")])]),i("tr",[i("td",[t._v("<...>")]),i("td",[t._v("\n        "+t._s(t.$t("settings.downloadPaths.keyDescription.dynamic",{key:"<...>"}))+"\n        "),i("br"),t._v("\n        "+t._s(t.$t("settings.downloadPaths.keyDescription.dynamicExample"))+"\n      ")])])])])}),c=[],r=n["default"].extend({}),u=r,h=(i("07a8"),i("2877")),v=Object(h["a"])(u,d,c,!1,null,"17df8ee0",null),m=v.exports,p=n["default"].extend({components:{KeyDescription:m},data:function(){return{rules:{require:[function(t){return!!t||"!"}]},show:!1,valid:!1,paths:"",selectedSite:{}}},props:{value:Boolean,client:Object},model:{prop:"value",event:"change"},watch:{show:function(){this.$emit("change",this.show),this.show||(this.paths="",this.selectedSite={})},value:function(){this.show=this.value}},methods:{save:function(){this.$emit("save",{site:this.selectedSite,paths:this.paths.split("\n")}),this.show=!1},cancel:function(){this.show=!1},joinTags:function(t){return t&&t.join?t.join(", "):""},getSites:function(){var t=this,e=this.$store.state.options.clients,i=this.$store.state.options.sites,s=[];if(e&&e.length){var a=e.find((function(e){return e.id===t.client.id}));return a&&a.paths?i.forEach((function(t){a.paths.hasOwnProperty(t.host)||s.push(t)})):s=i,s}return i}},computed:{},created:function(){}}),f=p,_=i("6544"),g=i.n(_),w=i("0798"),C=i("c6a6"),$=i("8336"),b=i("b0af"),x=i("99d9"),V=i("12b2"),k=i("169a"),P=i("ce7e"),D=i("4bd4"),y=i("132d"),I=i("40fe"),T=i("5d23"),S=i("c954"),O=i("9910"),A=i("a844"),j=Object(h["a"])(f,o,l,!1,null,null,null),L=j.exports;g()(j,{VAlert:w["a"],VAutocomplete:C["a"],VBtn:$["a"],VCard:b["a"],VCardActions:x["a"],VCardText:x["b"],VCardTitle:V["a"],VDialog:k["a"],VDivider:P["a"],VForm:D["a"],VIcon:y["a"],VListTileAction:I["a"],VListTileActionText:T["a"],VListTileAvatar:S["a"],VListTileContent:T["b"],VListTileSubTitle:T["c"],VListTileTitle:T["d"],VSpacer:O["a"],VTextarea:A["a"]});var B=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-dialog",{attrs:{"max-width":"800"},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[i("v-card",[i("v-card-title",{staticClass:"headline blue-grey darken-2",staticStyle:{color:"white"}},[t._v(t._s(t.$t("settings.downloadPaths.edit.title")))]),i("v-card-text",[i("v-form",{model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[i("v-text-field",{attrs:{label:t.$t("settings.downloadPaths.edit.site"),disabled:"",value:t.defaultItem.name}}),i("v-textarea",{attrs:{label:t.$t("settings.downloadPaths.add.path"),value:"",hint:t.$t("settings.downloadPaths.add.pathTip"),rules:t.rules.require},model:{value:t.defaultItem.paths,callback:function(e){t.$set(t.defaultItem,"paths",e)},expression:"defaultItem.paths"}}),t.client.pathDescription?i("v-alert",{attrs:{value:!0,color:"info",icon:"info",outline:""}},[i("div",{domProps:{innerHTML:t._s(t.client.pathDescription)}}),i("KeyDescription")],1):t._e()],1)],1),i("v-divider"),i("v-card-actions",{staticClass:"pa-3"},[i("v-spacer"),i("v-btn",{attrs:{flat:"",color:"error"},on:{click:t.cancel}},[i("v-icon",[t._v("cancel")]),i("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("settings.downloadPaths.add.cancel")))])],1),i("v-btn",{attrs:{flat:"",color:"success",disabled:!t.valid},on:{click:t.save}},[i("v-icon",[t._v("check_circle_outline")]),i("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("settings.downloadPaths.add.ok")))])],1)],1)],1)],1)},E=[],M=n["default"].extend({components:{KeyDescription:m},data:function(){return{show:!1,valid:!1,rules:{require:[function(t){return!!t||"!"}]},defaultItem:{name:"",site:{},paths:""}}},props:{value:Boolean,option:Object,client:Object},model:{prop:"value",event:"change"},watch:{show:function(){this.$emit("change",this.show)},value:function(){this.show=this.value,this.show&&(this.defaultItem=Object.assign({},this.option),this.defaultItem.paths=this.option.paths.join("\n"))}},methods:{save:function(){this.$emit("save",{site:this.defaultItem.site,paths:this.defaultItem.paths.split("\n")}),this.show=!1},cancel:function(){this.show=!1}}}),H=M,Y=i("2677"),R=Object(h["a"])(H,B,E,!1,null,null,null),q=R.exports;g()(R,{VAlert:w["a"],VBtn:$["a"],VCard:b["a"],VCardActions:x["a"],VCardText:x["b"],VCardTitle:V["a"],VDialog:k["a"],VDivider:P["a"],VForm:D["a"],VIcon:y["a"],VSpacer:O["a"],VTextField:Y["a"],VTextarea:A["a"]});var K=i("a400"),z=n["default"].extend({components:{AddItem:L,EditItem:q},data:function(){return{showAddDialog:!1,showEditDialog:!1,itemDuplicate:!1,selected:[],selectedItem:{},pagination:{rowsPerPage:-1},items:[],dialogRemoveConfirm:!1,selectedClient:{address:""},lastClientId:""}},created:function(){this.$store.state.options.clients&&this.$store.state.options.clients.length>0&&(this.items=this.$store.state.options.clients,this.initView())},watch:{selectedClient:function(){this.selectedClient&&this.selectedClient.id&&(this.lastClientId=this.selectedClient.id,this.updateViewOptions())}},methods:{getPaths:function(t){return t.join("<br>")},add:function(){this.showAddDialog=!0},addItem:function(t){this.$store.commit("updatePathsOfClient",{clientId:this.selectedClient.id,site:t.site,paths:t.paths}),this.reload()},edit:function(t){this.selectedItem=t,this.showEditDialog=!0},updateItem:function(t){console.log(t),this.$store.commit("updatePathsOfClient",{clientId:this.selectedClient.id,site:t.site,paths:t.paths}),this.reload()},remove:function(){this.dialogRemoveConfirm=!1,this.$store.commit("removePathsOfClient",{clientId:this.selectedClient.id,site:this.selectedItem.site}),this.reload()},removeConfirm:function(t){this.selectedItem=t,this.dialogRemoveConfirm=!0},reload:function(){var t=Object.assign({},this.selectedClient);this.selectedClient=null,this.selectedClient=t},removeSelected:function(){var t=this;confirm(this.$t("settings.downloadPaths.index.removeSelectedConfirm").toString())&&(console.log(this.selected),this.selected.forEach((function(e){t.$store.commit("removePathsOfClient",{clientId:t.selectedClient.id,site:e.site})})),this.selected=[],this.reload())},initView:function(){var t=this,e=this.$store.getters.viewsOptions(K["v"].downloadPaths,{lastClientId:""});if(this.lastClientId=e.lastClientId,this.lastClientId&&this.items.length>0){var i=this.items.find((function(e){return e.id==t.lastClientId}));i&&(this.selectedClient=i)}},updateViewOptions:function(){this.$store.dispatch("updateViewOptions",{key:K["v"].downloadPaths,options:{lastClientId:this.lastClientId}})}},computed:{getClientPaths:function(){var t=this;if(!this.selectedClient)return[];if(!this.selectedClient.paths)return[];var e=[],i=this.selectedClient.paths[K["e"].allSite];i&&e.push({name:this.$t("settings.downloadPaths.index.allSite").toString(),site:null,paths:i});var s=function(i){var s=t.$store.state.options.sites.find((function(t){return t.host==i}));s&&e.push({name:s.name,site:s,paths:t.selectedClient.paths[i]})};for(var a in this.selectedClient.paths)s(a);return e},headers:function(){return[{text:this.$t("settings.downloadPaths.index.headers.name"),align:"left",value:"name"},{text:this.$t("settings.downloadPaths.index.headers.path"),align:"left",sortable:!1},{text:this.$t("settings.downloadPaths.index.headers.action"),value:"name",sortable:!1}]}}}),F=z,J=(i("4346"),i("ac7c")),N=i("8fea"),G=i("2db4"),Q=Object(h["a"])(F,s,a,!1,null,"dcd8f892",null);e["default"]=Q.exports;g()(Q,{VAlert:w["a"],VAutocomplete:C["a"],VBtn:$["a"],VCard:b["a"],VCardActions:x["a"],VCardText:x["b"],VCardTitle:V["a"],VCheckbox:J["a"],VDataTable:N["a"],VDialog:k["a"],VDivider:P["a"],VIcon:y["a"],VListTileAction:I["a"],VListTileActionText:T["a"],VListTileContent:T["b"],VListTileSubTitle:T["c"],VListTileTitle:T["d"],VSnackbar:G["a"],VSpacer:O["a"]})},"15c7":function(t,e,i){},"26e5":function(t,e,i){},4346:function(t,e,i){"use strict";i("15c7")},"4bd4":function(t,e,i){"use strict";i("26e5");var s=i("94ab");e["a"]={name:"v-form",mixins:[Object(s["b"])("form")],inheritAttrs:!1,props:{value:Boolean,lazyValidation:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(){var t=Object.values(this.errorBag).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,i=function(t){return t.$watch("hasError",(function(i){e.$set(e.errorBag,t._uid,i)}),{immediate:!0})},s={_uid:t._uid,valid:void 0,shouldValidate:void 0};return this.lazyValidation?s.shouldValidate=t.$watch("shouldValidate",(function(a){a&&(e.errorBag.hasOwnProperty(t._uid)||(s.valid=i(t)))})):s.valid=i(t),s},validate:function(){var t=this.inputs.filter((function(t){return!t.validate(!0)})).length;return!t},reset:function(){for(var t=this,e=this.inputs.length;e--;)this.inputs[e].reset();this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){for(var t=this,e=this.inputs.length;e--;)this.inputs[e].resetValidation();this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},register:function(t){var e=this.watchInput(t);this.inputs.push(t),this.watchers.push(e)},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var i=this.watchers.find((function(t){return t._uid===e._uid}));i.valid&&i.valid(),i.shouldValidate&&i.shouldValidate(),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object.assign({novalidate:!0},this.$attrs),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}}},8627:function(t,e,i){}}]);