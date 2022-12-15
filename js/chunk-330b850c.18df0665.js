(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-330b850c"],{"043d":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"set-download-clients"},[s("v-alert",{attrs:{value:!0,type:"info"}},[t._v(t._s(t.$t("settings.downloadClients.index.title")))]),s("v-card",[s("v-card-title",[s("v-btn",{attrs:{color:"success"},on:{click:t.add}},[s("v-icon",{staticClass:"mr-2"},[t._v("add")]),t._v("\n        "+t._s(t.$t("settings.downloadClients.index.add"))+"\n      ")],1),s("v-btn",{attrs:{color:"error",disabled:0==t.selected.length},on:{click:t.removeSelected}},[s("v-icon",{staticClass:"mr-2"},[t._v("remove")]),t._v("\n        "+t._s(t.$t("settings.downloadClients.index.remove"))+"\n      ")],1),s("v-spacer"),s("v-text-field",{staticClass:"search",attrs:{"append-icon":"search",label:"Search","single-line":"","hide-details":""}})],1),s("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:this.$store.state.options.clients,pagination:t.pagination,"item-key":"id","select-all":""},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"items",fn:function(e){return[s("td",{staticStyle:{width:"20px"}},[s("v-checkbox",{attrs:{primary:"","hide-details":""},model:{value:e.selected,callback:function(s){t.$set(e,"selected",s)},expression:"props.selected"}})],1),s("td",[s("a",{on:{click:function(s){return t.edit(e.item)}}},[t._v(t._s(e.item.name))])]),s("td",[t._v(t._s(e.item.type))]),s("td",[s("a",{attrs:{href:e.item.address,target:"_blank",rel:"noopener noreferrer nofollow"}},[t._v(t._s(e.item.address))])]),s("td",[s("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(s){return t.edit(e.item)}}},[t._v("edit")]),s("v-icon",{attrs:{small:"",color:"error"},on:{click:function(s){return t.removeConfirm(e.item)}}},[t._v("delete")])],1)]}}]),model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}})],1),s("AddItem",{on:{save:t.addItem},model:{value:t.showAddDialog,callback:function(e){t.showAddDialog=e},expression:"showAddDialog"}}),s("EditItem",{attrs:{option:t.selectedItem},on:{save:t.updateItem},model:{value:t.showEditDialog,callback:function(e){t.showEditDialog=e},expression:"showEditDialog"}}),s("v-dialog",{attrs:{width:"300"},model:{value:t.dialogRemoveConfirm,callback:function(e){t.dialogRemoveConfirm=e},expression:"dialogRemoveConfirm"}},[s("v-card",[s("v-card-title",{staticClass:"headline red lighten-2"},[t._v(t._s(t.$t("settings.downloadClients.index.removeConfirmTitle")))]),s("v-card-text",[t._v(t._s(t.$t("settings.downloadClients.index.removeConfirm")))]),s("v-divider"),s("v-card-actions",[s("v-spacer"),s("v-btn",{attrs:{flat:"",color:"info"},on:{click:function(e){t.dialogRemoveConfirm=!1}}},[s("v-icon",[t._v("cancel")]),s("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("settings.downloadClients.index.cancel")))])],1),s("v-btn",{attrs:{color:"error",flat:""},on:{click:t.remove}},[s("v-icon",[t._v("check_circle_outline")]),s("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("settings.downloadClients.index.ok")))])],1)],1)],1)],1),s("v-alert",{attrs:{value:!0,color:"grey"}},[s("div",{domProps:{innerHTML:t._s(t.$t("settings.downloadClients.index.subTitle"))}})]),s("v-snackbar",{attrs:{top:"",timeout:3e3,color:"error"},model:{value:t.itemDuplicate,callback:function(e){t.itemDuplicate=e},expression:"itemDuplicate"}},[t._v(t._s(t.$t("settings.downloadClients.index.itemDuplicate")))])],1)},n=[],o=(s("ac6a"),s("6b54"),s("7f7f"),s("20d6"),s("2b0e")),a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("v-snackbar",{attrs:{top:"",timeout:3e3,color:"error"},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[t._v(t._s(t.$t("settings.downloadClients.add.validMsg")))]),s("v-dialog",{attrs:{"max-width":"800"},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[s("v-card",[s("v-toolbar",{attrs:{dark:"",color:"blue-grey darken-2"}},[s("v-toolbar-title",[t._v(t._s(t.$t("settings.downloadClients.add.title")))]),s("v-spacer"),s("v-btn",{attrs:{icon:"",flat:"",color:"success",href:"https://github.com/pt-plugins/PT-Plugin-Plus/wiki/config-download-client",target:"_blank",rel:"noopener noreferrer nofollow",title:t.$t("common.help")}},[s("v-icon",[t._v("help")])],1)],1),s("v-card-text",[s("v-stepper",{model:{value:t.step,callback:function(e){t.step=e},expression:"step"}},[s("v-stepper-header",[s("v-stepper-step",{attrs:{complete:t.step>1,step:"1"}},[t._v(t._s(t.$t("settings.downloadClients.add.titleStep1")))]),s("v-divider"),s("v-stepper-step",{attrs:{step:"2"}},[t._v(t._s(t.$t("settings.downloadClients.add.titleStep2")))])],1),s("v-stepper-items",[s("v-stepper-content",{attrs:{step:"1"}},[s("v-autocomplete",{attrs:{items:t.items,label:t.$t("settings.downloadClients.add.validMsg"),"menu-props":{maxHeight:"auto"},hint:t.selectedItem.description,"persistent-hint":"","return-object":"","single-line":"","item-text":"name","item-value":"name"},scopedSlots:t._u([{key:"selection",fn:function(e){var i=e.item;return[s("v-list-tile-avatar",[s("img",{attrs:{src:i.icon}})]),s("span",{domProps:{textContent:t._s(i.name)}})]}},{key:"item",fn:function(e){return[s("v-list-tile-avatar",[s("img",{attrs:{src:e.item.icon}})]),s("v-list-tile-content",[s("v-list-tile-title",{domProps:{innerHTML:t._s(e.item.name)}})],1),s("v-list-tile-action",[s("v-list-tile-action-text",[t._v(t._s(e.item.ver))])],1)]}}]),model:{value:t.selectedItem,callback:function(e){t.selectedItem=e},expression:"selectedItem"}})],1),s("v-stepper-content",{attrs:{step:"2"}},[s("Editor",{attrs:{option:t.selectedData}})],1)],1)],1)],1),s("v-divider"),s("v-card-actions",{staticClass:"pa-3"},[s("v-btn",{directives:[{name:"show",rawName:"v-show",value:1==t.step,expression:"step == 1"}],attrs:{flat:"",color:"grey darken-1",href:"https://github.com/pt-plugins/PT-Plugin-Plus/tree/master/resource/clients",target:"_blank",rel:"noopener noreferrer nofollow"}},[s("v-icon",[t._v("help")]),s("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("settings.downloadClients.add.helpMsg")))])],1),s("v-spacer"),s("v-btn",{attrs:{flat:"",color:"error"},on:{click:t.cancel}},[s("v-icon",[t._v("cancel")]),s("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("settings.downloadClients.add.cancel")))])],1),s("v-btn",{attrs:{flat:"",color:"grey darken-1",disabled:1===t.step},on:{click:function(e){t.step--}}},[s("v-icon",[t._v("navigate_before")]),s("span",[t._v(t._s(t.$t("settings.downloadClients.add.prevStep")))])],1),s("v-btn",{directives:[{name:"show",rawName:"v-show",value:t.step<t.stepCount,expression:"step < stepCount"}],attrs:{flat:"",color:"blue"},on:{click:function(e){return t.next(t.step)}}},[s("span",[t._v(t._s(t.$t("settings.downloadClients.add.nextStep")))]),s("v-icon",[t._v("navigate_next")])],1),s("v-btn",{directives:[{name:"show",rawName:"v-show",value:t.step===t.stepCount,expression:"step === stepCount"}],attrs:{flat:"",color:"success",disabled:!t.selectedData.valid},on:{click:t.save}},[s("v-icon",[t._v("check_circle_outline")])],1)],1)],1)],1)],1)},r=[],l=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("v-card",{staticClass:"mb-5",attrs:{color:"grey lighten-4"}},[s("v-card-text",[s("v-form",{model:{value:t.option.valid,callback:function(e){t.$set(t.option,"valid",e)},expression:"option.valid"}},[s("v-text-field",{attrs:{label:t.$t("settings.downloadClients.editor.name"),placeholder:t.$t("settings.downloadClients.editor.name"),required:"",rules:t.rules.require},model:{value:t.option.name,callback:function(e){t.$set(t.option,"name",e)},expression:"option.name"}}),s("v-text-field",{attrs:{label:t.$t("settings.downloadClients.editor.address"),placeholder:t.$t("settings.downloadClients.editor.addressTip"),required:"",rules:[t.rules.url]},model:{value:t.option.address,callback:function(e){t.$set(t.option,"address",e)},expression:"option.address"}}),t.option.passwordOnly?t._e():s("v-text-field",{attrs:{label:t.$t("settings.downloadClients.editor.loginName"),placeholder:t.$t("settings.downloadClients.editor.loginName")},model:{value:t.option.loginName,callback:function(e){t.$set(t.option,"loginName",e)},expression:"option.loginName"}}),s("v-text-field",{attrs:{label:t.$t("settings.downloadClients.editor.loginPwd"),placeholder:t.$t("settings.downloadClients.editor.loginPwd"),type:t.showPassword?"text":"password","append-icon":t.showPassword?"visibility_off":"visibility"},on:{"click:append":function(e){t.showPassword=!t.showPassword}},model:{value:t.option.loginPwd,callback:function(e){t.$set(t.option,"loginPwd",e)},expression:"option.loginPwd"}}),["transmission","qbittorrent"].includes(t.option.type)?s("v-switch",{attrs:{label:t.$t("settings.downloadClients.editor.autoStart")},model:{value:t.option.autoStart,callback:function(e){t.$set(t.option,"autoStart",e)},expression:"option.autoStart"}}):t._e(),s("v-text-field",{attrs:{value:t.option.type,label:t.$t("settings.downloadClients.editor.type"),disabled:""}}),s("v-text-field",{attrs:{label:t.$t("settings.downloadClients.editor.id"),disabled:"",value:t.option.id,placeholder:t.$t("settings.downloadClients.editor.autoCreate")}})],1),s("v-btn",{attrs:{flat:"",block:"",color:t.testButtonColor,loading:t.testing,disabled:t.testing||!t.option.valid},on:{click:t.testClientConnectivity}},[s("v-icon",{staticClass:"mr-2"},[t._v(t._s(t.testButtonIcon))]),t._v("\n        "+t._s(t.successMsg||t.errorMsg||t.$t("settings.downloadClients.editor.test"))+"\n      ")],1),t.option.description?s("v-alert",{attrs:{value:!0,color:"info"}},[t._v(t._s(t.option.description))]):t._e(),t.option.warning?s("v-alert",{attrs:{value:!0,color:"warning"}},[t._v(t._s(t.option.warning))]):t._e()],1)],1),s("v-snackbar",{attrs:{absolute:"",top:"",timeout:3e3,color:"error"},model:{value:t.haveError,callback:function(e){t.haveError=e},expression:"haveError"}},[t._v(t._s(t.errorMsg))]),s("v-snackbar",{attrs:{absolute:"",bottom:"",timeout:3e3,color:"success"},model:{value:t.haveSuccess,callback:function(e){t.haveSuccess=e},expression:"haveSuccess"}},[t._v(t._s(t.successMsg))])],1)},c=[],d=s("a1f4"),u=s("f62e"),p=new d["a"],h=o["default"].extend({data:function(){var t=this;return{showPassword:!1,rules:{require:[function(t){return!!t||"!"}],url:function(e){return/^(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;\[\]]+[-A-Za-z0-9+&@#/%=~_|]$/.test(e)||t.$t("settings.downloadClients.editor.addressTip")}},testing:!1,haveError:!1,haveSuccess:!1,successMsg:"",errorMsg:"",testButtonIcon:"compass_calibration",testButtonColor:"info",testButtonStatus:{success:"success",error:"error"},buttonColor:{default:"info",success:"success",error:"error"},buttonIcon:{default:"compass_calibration",success:"done",error:"close"}}},props:{option:Object},watch:{successMsg:function(){this.haveSuccess=""!=this.successMsg},errorMsg:function(){this.haveError=""!=this.errorMsg}},methods:{testClientConnectivity:function(){var t=this;this.successMsg="",this.errorMsg="";var e=Object.assign({},this.option);e.address?(this.testing=!0,p.sendRequest(u["b"].testClientConnectivity,null,e).then((function(e){console.log(e),e.success?(t.successMsg=t.$t("settings.downloadClients.editor.testSuccess").toString(),t.setTestButtonStatus(t.testButtonStatus.success)):e&&e.data?e.data.msg?t.errorMsg=e.data.msg:0===e.data.code?t.errorMsg=t.$t("settings.downloadClients.editor.testConnectionError").toString():t.errorMsg=t.$t("settings.downloadClients.editor.testOtherError",{code:e.data.code}).toString():t.errorMsg=t.$t("settings.downloadClients.editor.testUnknownError").toString(),t.errorMsg&&t.setTestButtonStatus(t.testButtonStatus.error),t.testing=!1})).catch((function(e){console.log(e),e&&e.data&&e.data.msg?t.errorMsg=e.data.msg:t.errorMsg=t.$t("settings.downloadClients.editor.testError").toString(),t.setTestButtonStatus(t.testButtonStatus.error),t.testing=!1}))):this.errorMsg=this.$t("settings.downloadClients.editor.testAddressError").toString()},setTestButtonStatus:function(t){var e=this;this.testButtonIcon=this.buttonIcon[t],this.testButtonColor=this.buttonColor[t],window.setTimeout((function(){e.testButtonIcon=e.buttonIcon.default,e.testButtonColor=e.buttonColor.default,e.successMsg="",e.errorMsg=""}),3e3)}}}),v=h,m=s("2877"),f=s("6544"),g=s.n(f),b=s("0798"),w=s("8336"),_=s("b0af"),C=s("99d9"),$=s("4bd4"),x=s("132d"),V=s("2db4"),k=s("b73d"),S=s("2677"),y=Object(m["a"])(v,l,c,!1,null,null,null),I=y.exports;g()(y,{VAlert:b["a"],VBtn:w["a"],VCard:_["a"],VCardText:C["b"],VForm:$["a"],VIcon:x["a"],VSnackbar:V["a"],VSwitch:k["a"],VTextField:S["a"]});var T=o["default"].extend({components:{Editor:I},data:function(){return{step:1,show:!1,stepCount:2,selectedData:{},selectedItem:{},valid:!1,items:this.$store.state.options.system.clients,options:this.$store.state.options}},props:{value:Boolean},model:{prop:"value",event:"change"},watch:{show:function(){this.$emit("change",this.show),this.show||(this.step=1,this.selectedItem={name:""})},value:function(){this.show=this.value}},methods:{save:function(){this.$emit("save",this.selectedData),this.show=!1},next:function(t){this.selectedItem&&this.selectedItem.name?(this.selectedData=Object.assign({},this.selectedItem),this.valid=!1,this.step++):this.valid=!0},cancel:function(){this.show=!1}},created:function(){}}),B=T,E=s("c6a6"),A=s("169a"),D=s("ce7e"),M=s("40fe"),O=s("5d23"),j=s("c954"),P=s("9910"),N=s("7e85"),R=s("e516"),L=s("9c54"),q=s("56a4"),z=s("71d9"),H=s("2a7f"),F=Object(m["a"])(B,a,r,!1,null,null,null),J=F.exports;g()(F,{VAutocomplete:E["a"],VBtn:w["a"],VCard:_["a"],VCardActions:C["a"],VCardText:C["b"],VDialog:A["a"],VDivider:D["a"],VIcon:x["a"],VListTileAction:M["a"],VListTileActionText:O["a"],VListTileAvatar:j["a"],VListTileContent:O["b"],VListTileTitle:O["d"],VSnackbar:V["a"],VSpacer:P["a"],VStepper:N["a"],VStepperContent:R["a"],VStepperHeader:L["a"],VStepperItems:L["b"],VStepperStep:q["a"],VToolbar:z["a"],VToolbarTitle:H["b"]});var Z=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-dialog",{attrs:{"max-width":"800"},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[s("v-card",[s("v-card-title",{staticClass:"headline blue-grey darken-2",staticStyle:{color:"white"}},[t._v(t._s(t.$t("settings.downloadClients.edit.title")))]),s("v-card-text",[s("Editor",{attrs:{option:t.defaultItem}})],1),s("v-divider"),s("v-card-actions",{staticClass:"pa-3"},[s("v-spacer"),s("v-btn",{attrs:{flat:"",color:"error"},on:{click:t.cancel}},[s("v-icon",[t._v("cancel")]),s("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("settings.downloadClients.edit.cancel")))])],1),s("v-btn",{attrs:{flat:"",color:"success",disabled:!t.defaultItem.valid},on:{click:t.save}},[s("v-icon",[t._v("check_circle_outline")]),s("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("settings.downloadClients.edit.ok")))])],1)],1)],1)],1)},U=[],G=o["default"].extend({components:{Editor:I},data:function(){return{show:!1,defaultItem:{name:""}}},props:{value:Boolean,option:Object},model:{prop:"value",event:"change"},watch:{show:function(){this.$emit("change",this.show)},value:function(){this.show=this.value,this.show&&(this.defaultItem=Object.assign({},this.option))}},methods:{save:function(){this.$emit("save",this.defaultItem),this.show=!1},cancel:function(){this.show=!1}}}),K=G,Q=s("12b2"),W=Object(m["a"])(K,Z,U,!1,null,null,null),X=W.exports;g()(W,{VBtn:w["a"],VCard:_["a"],VCardActions:C["a"],VCardText:C["b"],VCardTitle:Q["a"],VDialog:A["a"],VDivider:D["a"],VIcon:x["a"],VSpacer:P["a"]});var Y=o["default"].extend({components:{AddItem:J,EditItem:X},data:function(){return{showAddDialog:!1,showEditDialog:!1,itemDuplicate:!1,selected:[],selectedItem:{},pagination:{rowsPerPage:-1},items:[],dialogRemoveConfirm:!1}},created:function(){this.items=this.$store.state.options.system.clients},methods:{add:function(){this.showAddDialog=!0},addItem:function(t){var e=this.$store.state.options.clients.findIndex((function(e){return e.name===t.name}));-1===e?this.$store.commit("addClient",t):this.itemDuplicate=!0},edit:function(t){var e=this.$store.state.options.clients.findIndex((function(e){return t.id===e.id}));-1!==e&&(this.selectedItem=this.$store.state.options.clients[e],this.showEditDialog=!0)},updateItem:function(t){this.$store.commit("updateClient",t)},remove:function(){this.dialogRemoveConfirm=!1,this.$store.commit("removeClient",this.selectedItem),this.selectedItem={}},removeConfirm:function(t){this.selectedItem=t,this.dialogRemoveConfirm=!0},clear:function(){confirm(this.$t("settings.downloadClients.index.clearConfirm").toString())&&this.$store.commit("clearClients")},removeSelected:function(){var t=this;confirm(this.$t("settings.downloadClients.index.removeSelectedConfirm").toString())&&(console.log(this.selected),this.selected.forEach((function(e){t.$store.commit("removeClient",e)})),this.selected=[])}},computed:{headers:function(){return[{text:this.$t("settings.downloadClients.index.headers.name"),align:"left",value:"name"},{text:this.$t("settings.downloadClients.index.headers.type"),align:"left",value:"type"},{text:this.$t("settings.downloadClients.index.headers.address"),align:"left",value:"address"},{text:this.$t("settings.downloadClients.index.headers.action"),value:"name",sortable:!1}]}}}),tt=Y,et=(s("c2af"),s("ac7c")),st=s("8fea"),it=Object(m["a"])(tt,i,n,!1,null,"0ab8809a",null);e["default"]=it.exports;g()(it,{VAlert:b["a"],VBtn:w["a"],VCard:_["a"],VCardActions:C["a"],VCardText:C["b"],VCardTitle:Q["a"],VCheckbox:et["a"],VDataTable:st["a"],VDialog:A["a"],VDivider:D["a"],VIcon:x["a"],VSnackbar:V["a"],VSpacer:P["a"],VTextField:S["a"]})},"26e5":function(t,e,s){},"2d99":function(t,e,s){},"4bd4":function(t,e,s){"use strict";s("26e5");var i=s("94ab");e["a"]={name:"v-form",mixins:[Object(i["b"])("form")],inheritAttrs:!1,props:{value:Boolean,lazyValidation:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(){var t=Object.values(this.errorBag).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,s=function(t){return t.$watch("hasError",(function(s){e.$set(e.errorBag,t._uid,s)}),{immediate:!0})},i={_uid:t._uid,valid:void 0,shouldValidate:void 0};return this.lazyValidation?i.shouldValidate=t.$watch("shouldValidate",(function(n){n&&(e.errorBag.hasOwnProperty(t._uid)||(i.valid=s(t)))})):i.valid=s(t),i},validate:function(){var t=this.inputs.filter((function(t){return!t.validate(!0)})).length;return!t},reset:function(){for(var t=this,e=this.inputs.length;e--;)this.inputs[e].reset();this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){for(var t=this,e=this.inputs.length;e--;)this.inputs[e].resetValidation();this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},register:function(t){var e=this.watchInput(t);this.inputs.push(t),this.watchers.push(e)},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var s=this.watchers.find((function(t){return t._uid===e._uid}));s.valid&&s.valid(),s.shouldValidate&&s.shouldValidate(),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object.assign({novalidate:!0},this.$attrs),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}}},"56a4":function(t,e,s){"use strict";var i=s("9d26"),n=s("b64a"),o=s("94ab"),a=s("3ccf"),r=s("58df");e["a"]=Object(r["a"])(n["a"],Object(o["a"])("stepper","v-stepper-step","v-stepper")).extend({name:"v-stepper-step",directives:{Ripple:a["a"]},inject:["stepClick"],props:{color:{type:String,default:"primary"},complete:Boolean,completeIcon:{type:String,default:"$vuetify.icons.complete"},editIcon:{type:String,default:"$vuetify.icons.edit"},errorIcon:{type:String,default:"$vuetify.icons.error"},editable:Boolean,rules:{type:Array,default:function(){return[]}},step:[Number,String]},data:function(){return{isActive:!1,isInactive:!0}},computed:{classes:function(){return{"v-stepper__step":!0,"v-stepper__step--active":this.isActive,"v-stepper__step--editable":this.editable,"v-stepper__step--inactive":this.isInactive,"v-stepper__step--error":this.hasError,"v-stepper__step--complete":this.complete,"error--text":this.hasError}},hasError:function(){return this.rules.some((function(t){return!0!==t()}))}},mounted:function(){this.stepper&&this.stepper.register(this)},beforeDestroy:function(){this.stepper&&this.stepper.unregister(this)},methods:{click:function(t){t.stopPropagation(),this.$emit("click",t),this.editable&&this.stepClick(this.step)},toggle:function(t){this.isActive=t.toString()===this.step.toString(),this.isInactive=Number(t)<Number(this.step)}},render:function(t){var e={class:this.classes,directives:[{name:"ripple",value:this.editable}],on:{click:this.click}},s=void 0;s=this.hasError?[t(i["a"],{},this.errorIcon)]:this.complete?this.editable?[t(i["a"],{},this.editIcon)]:[t(i["a"],{},this.completeIcon)]:String(this.step);var n=!(this.hasError||!this.complete&&!this.isActive)&&this.color,o=t("span",this.setBackgroundColor(n,{staticClass:"v-stepper__step__step"}),s),a=t("div",{staticClass:"v-stepper__label"},this.$slots.default);return t("div",e,[o,a])}})},"7e85":function(t,e,s){"use strict";s("bff6");var i=s("94ab"),n=s("6a18"),o=s("58df"),a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var i in s)Object.prototype.hasOwnProperty.call(s,i)&&(t[i]=s[i])}return t};e["a"]=Object(o["a"])(Object(i["b"])("stepper"),n["a"]).extend({name:"v-stepper",provide:function(){return{stepClick:this.stepClick,isVertical:this.vertical}},props:{nonLinear:Boolean,altLabels:Boolean,vertical:Boolean,value:[Number,String]},data:function(){return{inputValue:null,isBooted:!1,steps:[],content:[],isReverse:!1}},computed:{classes:function(){return a({"v-stepper":!0,"v-stepper--is-booted":this.isBooted,"v-stepper--vertical":this.vertical,"v-stepper--alt-labels":this.altLabels,"v-stepper--non-linear":this.nonLinear},this.themeClasses)}},watch:{inputValue:function(t,e){this.isReverse=Number(t)<Number(e);for(var s=this.steps.length;--s>=0;)this.steps[s].toggle(this.inputValue);for(var i=this.content.length;--i>=0;)this.content[i].toggle(this.inputValue,this.isReverse);this.$emit("input",this.inputValue),e&&(this.isBooted=!0)},value:function(){var t=this;this.$nextTick((function(){return t.inputValue=t.value}))}},mounted:function(){this.inputValue=this.value||this.steps[0].step||1},methods:{register:function(t){"v-stepper-step"===t.$options.name?this.steps.push(t):"v-stepper-content"===t.$options.name&&(t.isVertical=this.vertical,this.content.push(t))},unregister:function(t){"v-stepper-step"===t.$options.name?this.steps=this.steps.filter((function(e){return e!==t})):"v-stepper-content"===t.$options.name&&(t.isVertical=this.vertical,this.content=this.content.filter((function(e){return e!==t})))},stepClick:function(t){var e=this;this.$nextTick((function(){return e.inputValue=t}))}},render:function(t){return t("div",{class:this.classes},this.$slots.default)}})},"9c54":function(t,e,s){"use strict";s.d(e,"a",(function(){return r})),s.d(e,"b",(function(){return l}));var i=s("80d2"),n=s("7e85"),o=s("56a4"),a=s("e516"),r=Object(i["g"])("v-stepper__header"),l=Object(i["g"])("v-stepper__items");n["a"],a["a"],o["a"]},bff6:function(t,e,s){},c2af:function(t,e,s){"use strict";s("2d99")},e516:function(t,e,s){"use strict";var i=s("0789"),n=s("94ab"),o=s("80d2"),a=s("58df");e["a"]=Object(a["a"])(Object(n["a"])("stepper","v-stepper-content","v-stepper")).extend({name:"v-stepper-content",inject:{isVerticalProvided:{from:"isVertical"}},props:{step:{type:[Number,String],required:!0}},data:function(){return{height:0,isActive:null,isReverse:!1,isVertical:this.isVerticalProvided}},computed:{classes:function(){return{"v-stepper__content":!0}},computedTransition:function(){return this.isReverse?i["f"]:i["g"]},styles:function(){return this.isVertical?{height:Object(o["d"])(this.height)}:{}},wrapperClasses:function(){return{"v-stepper__wrapper":!0}}},watch:{isActive:function(t,e){t&&null==e?this.height="auto":this.isVertical&&(this.isActive?this.enter():this.leave())}},mounted:function(){this.$refs.wrapper.addEventListener("transitionend",this.onTransition,!1),this.stepper&&this.stepper.register(this)},beforeDestroy:function(){this.$refs.wrapper.removeEventListener("transitionend",this.onTransition,!1),this.stepper&&this.stepper.unregister(this)},methods:{onTransition:function(t){this.isActive&&"height"===t.propertyName&&(this.height="auto")},enter:function(){var t=this,e=0;requestAnimationFrame((function(){e=t.$refs.wrapper.scrollHeight})),this.height=0,setTimeout((function(){return t.isActive&&(t.height=e||"auto")}),450)},leave:function(){var t=this;this.height=this.$refs.wrapper.clientHeight,setTimeout((function(){return t.height=0}),10)},toggle:function(t,e){this.isActive=t.toString()===this.step.toString(),this.isReverse=e}},render:function(t){var e={class:this.classes},s={class:this.wrapperClasses,style:this.styles,ref:"wrapper"};this.isVertical||(e.directives=[{name:"show",value:this.isActive}]);var i=t("div",s,[this.$slots.default]),n=t("div",e,[i]);return t(this.computedTransition,{on:this.$listeners},[n])}})}}]);