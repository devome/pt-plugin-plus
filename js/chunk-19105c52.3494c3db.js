(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-19105c52"],{"14b5":function(t,e,i){"use strict";i.d(e,"a",(function(){return a}));i("a481"),i("6b54"),i("7f7f");var n=i("d225"),s=i("b0b4"),a=function(){function t(){Object(n["a"])(this,t)}return Object(s["a"])(t,[{key:"replacePathKey",value:function(t,e){if(!t)return t;var i=new Date;return this.replaceKeys(t,{"site.name":e.name,"site.host":e.host,YYYY:i.getFullYear(),MM:("0"+(i.getMonth()+1).toString()).substr(-2),DD:("0"+i.getDate().toString()).substr(-2)})}},{key:"getSavePath",value:function(t,e){if(t){var i=t,n="<...>";if(i&&i.indexOf(n)>=0){var s=window.prompt("当前为自定义路径：".concat(i," \n请输入路径中 ").concat(n," 部分的内容: "));if(null===s)return!1;i=i.replace(n,s)}return this.replacePathKey(i,e)}}},{key:"replaceKeys",value:function(t,e){var i=t;for(var n in e)if(e.hasOwnProperty(n)){var s=e[n];i=i.replace("$"+n+"$",s)}return i}}]),t}()},3046:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-btn",{class:[t.mini?"btn-mini":""],attrs:{flat:t.flat,icon:t.icon,small:t.small,loading:t.loading,title:t.title||t.$t("searchTorrent.sendToClientTip"),color:t.color},on:{click:function(e){return e.stopPropagation(),t.showSiteContentMenus.apply(null,arguments)}}},[t.haveSuccess?i("v-icon",{attrs:{color:"success",small:""}},[t._v("done")]):t.haveError?i("v-icon",{attrs:{color:"red",small:""}},[t._v("close")]):i("v-icon",{attrs:{small:""}},[t._v(t._s(t.iconText))]),t.label?i("span",{staticClass:"ml-2"},[t._v(t._s(t.label))]):t._e()],1)},s=[],a=(i("6b54"),i("f559"),i("b54a"),i("7f7f"),i("7514"),i("ac6a"),i("c5f6"),i("2b0e")),o=i("f62e"),r=i("14b5"),l=i("a1f4"),c=i("0a02"),u=new l["a"],d=a["default"].extend({props:{flat:Boolean,icon:Boolean,small:Boolean,mini:Boolean,color:String,iconText:{type:String,default:"cloud_download"},downloadOptions:{type:[Object,Array],default:function(){return{host:String,url:String}}},getOptionsOnly:Boolean,label:String,title:String,payload:[Object,Array,String,Number]},data:function(){return{options:this.$store.state.options,contentMenus:[],pathHandler:new r["a"],loading:!1,site:{},haveSuccess:!1,haveError:!1,allContentMenus:[]}},methods:{getSiteContentMenus:function(t){var e=[],i=[];if(this.contentMenus&&this.contentMenus.length>0)return this.contentMenus;function n(i,n){i.forEach((function(i){e.push({client:n,path:i,host:t})}))}return this.options.clients.forEach((function(s){if(i.push({client:s,path:"",host:t}),s.paths){for(var a in s.paths){var r=s.paths[a];t===a&&n(r,s)}var l=s.paths[o["f"].allSite];l&&(e.length>0&&e.push({}),n(l,s))}})),e.length>0&&i.splice(0,0,{}),e=e.concat(i),this.contentMenus=e,e},getSiteFromHost:function(t){return this.options.sites.find((function(e){var i=e.cdn||[];return e.url&&i.push(e.url),e.host==t||i.join("").indexOf(t)>-1}))},showSiteContentMenus:function(t){var e=this;if(Array.isArray(this.downloadOptions))this.showAllContentMenus(t);else{var i=this.downloadOptions,n=i.host;if(!n&&i.site&&(n=i.site.host),n){this.site=i.site||this.getSiteFromHost(n);var s=this.getSiteContentMenus(n),a=[];s.forEach((function(t){if(t.client&&t.client.name){var n=e.$vuetify.breakpoint.xs?t.client.name:e.$t("searchTorrent.downloadTo",{path:"".concat(t.client.name," -> ").concat(t.client.address)});t.path&&(n+=" ->".concat(e.pathHandler.replacePathKey(t.path,e.site))),a.push({title:n,fn:function(){if(i.url){console.log(i,t);var n=e.processURLWithPrefix("m-teamdetail",i.site,i.url),s={url:n,title:i.title,savePath:t.path,autoStart:t.client.autoStart,tagIMDb:t.client.tagIMDb,link:i.link,clientId:t.client.id,imdbId:i.imdbId};if(e.getOptionsOnly)return s.savePath=e.pathHandler.getSavePath(s.savePath,e.site),void e.$emit("itemClick",{payload:e.payload,downloadOptions:Object.assign({clientName:t.client.name},s)});e.sendToClient(s)}}})}else a.push({})})),c["a"].showContextMenu(a,t)}}},processURLWithPrefix:function(t,e,i){if(i&&i.startsWith(t)){var n=i.substring(t.length);return this.resolveDownloadURLById(n,e)}return i},resolveDownloadURLById:function(t,e){var i=$.ajax(e.url+"api/torrent/genDlToken",{method:"POST",data:{id:t},cache:!0,headers:{"x-api-key":e.authToken},success:function(e){if("0"===e.code)console.log("种子 ".concat(t," 下载链接获取成功"),e);else{var i="种子 ".concat(t," 下载链接获取失败, code != 0");console.log(i,e)}},error:function(e){var i="种子 ".concat(t," 下载链接获取失败");console.log(i,e)},async:!1});return i.responseJSON.data||""},showAllContentMenus:function(t){var e=[],i=[],n=this;function s(t){var e=n.$t("searchTorrent.downloadTo",{path:"".concat(t.client.name," -> ").concat(t.client.address)}).toString();t.path&&(e+=" -> ".concat(t.path)),i.push({title:e,fn:function(){n.sendTorrentsInBackground(t)}})}0==this.allContentMenus.length?(this.options.clients.forEach((function(t){e.push({client:t,path:""})})),e.forEach((function(t){if(t.client&&t.client.name){if(s(t),t.client.paths){var e=t.client.paths[o["f"].allSite];e&&e.forEach((function(e){if(-1==e.indexOf("$site.name$")&&-1==e.indexOf("$site.host$")&&-1==e.indexOf("<...>")){var i=c["a"].clone(t);i.path=e,s(i)}}))}}else i.push({})})),this.allContentMenus=i):i=this.allContentMenus,c["a"].showContextMenu(i,t)},sendTorrentsInBackground:function(t){var e=this,i=[];this.downloadOptions.forEach((function(e){i.push({title:e.title,url:e.url,clientId:t.client.id,savePath:t.path,autoStart:t.client.autoStart,tagIMDb:t.client.tagIMDb,link:e.link,imdbId:e.imdbId})})),this.loading=!0,u.sendRequest(o["b"].sendTorrentsInBackground,null,i).then((function(t){console.log("命令执行完成",t),e.haveSuccess=!0,e.$emit("success",t)})).catch((function(t){console.log(t),e.haveError=!0,e.$emit("error",t.msg||t)})).finally((function(){e.loading=!1,setTimeout((function(){e.clearStatus()}),5e3)}))},sendToClient:function(t){var e=this;this.clearStatus();var i=this.pathHandler.getSavePath(t.savePath,this.site);!1!==i&&(this.loading=!0,t.savePath=i,u.sendRequest(o["b"].sendTorrentToClient,null,t).then((function(t){console.log("命令执行完成",t),"success"==t.type?(e.haveSuccess=!0,e.$emit("success",t.msg)):(e.haveError=!0,e.$emit("error",t.msg))})).catch((function(t){console.log(t),e.haveError=!0,e.$emit("error",t.msg||t)})).finally((function(){e.loading=!1,setTimeout((function(){e.clearStatus()}),5e3)})))},clearStatus:function(){this.haveSuccess=!1,this.haveError=!1}}}),h=d,f=i("2877"),v=i("6544"),m=i.n(v),p=i("8336"),g=i("132d"),b=Object(f["a"])(h,n,s,!1,null,null,null);e["a"]=b.exports;m()(b,{VBtn:p["a"],VIcon:g["a"]})},"386b":function(t,e,i){var n=i("5ca1"),s=i("79e5"),a=i("be13"),o=/"/g,r=function(t,e,i,n){var s=String(a(t)),r="<"+e;return""!==i&&(r+=" "+i+'="'+String(n).replace(o,"&quot;")+'"'),r+">"+s+"</"+e+">"};t.exports=function(t,e){var i={};i[t]=e(r),n(n.P+n.F*s((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3})),"String",i)}},"43a6":function(t,e,i){"use strict";i("94a7"),i("60d0");var n=i("c37a"),s=i("5e28"),a=i("94ab");e["a"]=n["a"].extend({name:"v-radio-group",mixins:[s["a"],Object(a["b"])("radio")],model:{prop:"value",event:"change"},provide:function(){return{radio:this}},props:{column:{type:Boolean,default:!0},height:{type:[Number,String],default:"auto"},mandatory:{type:Boolean,default:!0},name:String,row:Boolean,value:{default:null}},data:function(){return{internalTabIndex:-1,radios:[]}},computed:{classes:function(){return{"v-input--selection-controls v-input--radio-group":!0,"v-input--radio-group--column":this.column&&!this.row,"v-input--radio-group--row":this.row}}},watch:{hasError:"setErrorState",internalValue:"setActiveRadio"},mounted:function(){this.setErrorState(this.hasError),this.setActiveRadio()},methods:{genDefaultSlot:function(){return this.$createElement("div",{staticClass:"v-input--radio-group__input",attrs:{role:"radiogroup"}},n["a"].options.methods.genDefaultSlot.call(this))},onRadioChange:function(t){this.disabled||(this.hasInput=!0,this.internalValue=t,this.setActiveRadio(),this.$nextTick(this.validate))},onRadioBlur:function(t){t.relatedTarget&&t.relatedTarget.classList.contains("v-radio")||(this.hasInput=!0,this.$emit("blur",t))},register:function(t){t.isActive=this.valueComparator(this.internalValue,t.value),t.$on("change",this.onRadioChange),t.$on("blur",this.onRadioBlur),this.radios.push(t)},setErrorState:function(t){for(var e=this.radios.length;--e>=0;)this.radios[e].parentError=t},setActiveRadio:function(){for(var t=this.radios.length;--t>=0;){var e=this.radios[t];e.isActive=this.valueComparator(this.internalValue,e.value)}},unregister:function(t){t.$off("change",this.onRadioChange),t.$off("blur",this.onRadioBlur);var e=this.radios.findIndex((function(e){return e===t}));e>-1&&this.radios.splice(e,1)}}})},"4b33":function(t,e,i){"use strict";i("e025")},"60d0":function(t,e,i){},"67b6":function(t,e,i){"use strict";i("a14d");var n=i("9d26"),s=i("ba87"),a=i("b64a"),o=i("ad54"),r=i("6a18"),l=i("5368"),c=i("94ab"),u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t};function d(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}e["a"]={name:"v-radio",mixins:[a["a"],o["a"],Object(c["a"])("radio","v-radio","v-radio-group"),r["a"]],inheritAttrs:!1,props:{color:{type:String,default:"accent"},disabled:Boolean,label:String,onIcon:{type:String,default:"$vuetify.icons.radioOn"},offIcon:{type:String,default:"$vuetify.icons.radioOff"},readonly:Boolean,value:null},data:function(){return{isActive:!1,isFocused:!1,parentError:!1}},computed:{computedData:function(){return this.setTextColor(!this.parentError&&this.isActive&&this.color,{staticClass:"v-radio",class:u({"v-radio--is-disabled":this.isDisabled,"v-radio--is-focused":this.isFocused},this.themeClasses)})},computedColor:function(){return this.isActive?this.color:this.radio.validationState||!1},computedIcon:function(){return this.isActive?this.onIcon:this.offIcon},hasState:function(){return this.isActive||!!this.radio.validationState},isDisabled:function(){return this.disabled||!!this.radio.disabled},isReadonly:function(){return this.readonly||!!this.radio.readonly}},mounted:function(){this.radio.register(this)},beforeDestroy:function(){this.radio.unregister(this)},methods:{genInput:function(){for(var t,e=arguments.length,i=Array(e),n=0;n<e;n++)i[n]=arguments[n];return(t=l["a"].options.methods.genInput).call.apply(t,[this].concat(d(i)))},genLabel:function(){return this.$createElement(s["a"],{on:{click:this.onChange},attrs:{for:this.id},props:{color:this.radio.validationState||"",dark:this.dark,focused:this.hasState,light:this.light}},this.$slots.label||this.label)},genRadio:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("radio",u({name:this.radio.name||!!this.radio._uid&&"v-radio-"+this.radio._uid,value:this.value},this.$attrs)),this.genRipple(this.setTextColor(this.computedColor)),this.$createElement(n["a"],this.setTextColor(this.computedColor,{props:{dark:this.dark,light:this.light}}),this.computedIcon)])},onFocus:function(t){this.isFocused=!0,this.$emit("focus",t)},onBlur:function(t){this.isFocused=!1,this.$emit("blur",t)},onChange:function(){this.isDisabled||this.isReadonly||this.isDisabled||this.isActive&&this.radio.mandatory||this.$emit("change",this.value)},onKeydown:function(){}},render:function(t){return t("div",this.computedData,[this.genRadio(),this.genLabel()])}}},"8cd1":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"history"},[i("v-alert",{attrs:{value:!0,type:"info"}},[t._v(t._s(t.$t("history.title")))]),i("v-card",[i("v-card-title",[i("v-btn",{attrs:{color:"error",disabled:0==t.selected.length},on:{click:t.removeSelected}},[i("v-icon",{staticClass:"mr-2"},[t._v("remove")]),t._v("\n        "+t._s(t.$t("history.remove"))+"\n      ")],1),i("v-btn",{attrs:{color:"error",disabled:0==t.items.length},on:{click:t.clear}},[i("v-icon",{staticClass:"mr-2"},[t._v("clear")]),t._v("\n        "+t._s(t.$t("history.clear"))+"\n      ")],1),i("v-divider",{staticClass:"mx-3 mt-0",attrs:{vertical:""}}),i("v-btn",{attrs:{color:"success",disabled:0==t.selected.length},on:{click:t.downloadSelected}},[i("v-icon",{staticClass:"mr-2"},[t._v("save_alt")]),t._v("\n        "+t._s(t.$t("history.download"))+"\n      ")],1),i("v-divider",{staticClass:"mx-3 mt-0",attrs:{vertical:""}}),i("v-autocomplete",{staticStyle:{"max-width":"500px"},attrs:{items:t.clientItems,label:t.$t("history.filterServer"),"menu-props":{maxHeight:"auto"},hint:t.selectedClient.address,"return-object":"","persistent-hint":"","item-text":"name","item-value":"id"},scopedSlots:t._u([{key:"selection",fn:function(e){var n=e.item;return[i("span",[t._v(t._s(n.name))])]}},{key:"item",fn:function(e){return[i("v-list-tile-content",[i("v-list-tile-title",{domProps:{innerHTML:t._s(e.item.name)}}),i("v-list-tile-sub-title",{domProps:{innerHTML:t._s(e.item.address)}})],1),i("v-list-tile-action-text",[t._v(t._s(e.item.type))])]}}]),model:{value:t.selectedClient,callback:function(e){t.selectedClient=e},expression:"selectedClient"}}),i("v-radio-group",{staticClass:"ml-5",attrs:{row:""},model:{value:t.filterStatus,callback:function(e){t.filterStatus=e},expression:"filterStatus"}},[i("v-radio",{attrs:{label:t.$t("history.success"),color:"success",value:"success"}}),i("v-radio",{attrs:{label:t.$t("history.fail"),color:"fail",value:"fail"}}),i("v-radio",{attrs:{label:t.$t("history.all"),color:"info",value:"all"}})],1),i("v-spacer"),i("v-text-field",{staticClass:"search",attrs:{"append-icon":"search",label:"Search","single-line":"","hide-details":""},model:{value:t.filterKey,callback:function(e){t.filterKey=e},expression:"filterKey"}})],1),i("v-data-table",{staticClass:"elevation-1",attrs:{search:t.filterKey,headers:t.headers,items:t.filteredItems,pagination:t.pagination,"item-key":"data.url","select-all":""},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"items",fn:function(e){return[i("td",{staticStyle:{width:"20px"}},[i("v-checkbox",{attrs:{primary:"","hide-details":""},model:{value:e.selected,callback:function(i){t.$set(e,"selected",i)},expression:"props.selected"}})],1),i("td",[t._v(t._s(e.index+1))]),i("td",{staticStyle:{"text-align":"center"}},[e.item.site?i("div",[i("v-avatar",{attrs:{size:"18"}},[i("img",{attrs:{src:e.item.site.icon}})]),i("br"),i("span",{staticClass:"captionText"},[t._v(t._s(e.item.site.name))])],1):t._e()]),i("td",[e.item.data.link?i("a",{attrs:{href:e.item.data.link,target:"_blank",title:e.item.data.title,rel:"noopener noreferrer nofollow"}},[t._v(t._s(e.item.data.title||e.item.data.link))]):i("span",{attrs:{title:e.item.data.url}},[t._v(t._s(e.item.data.title||e.item.data.url))]),i("br"),i("span",{staticClass:"sub-title"},[t._v("[\n            "+t._s(t.getClientName(e.item.data.clientId||e.item.clientId))+"\n            ] ->\n            "+t._s(e.item.data.savePath||t.$t("history.defaultPath")))])]),i("td",[!1===e.item.success?i("v-icon",{attrs:{color:"error",title:t.$t("history.fail")}},[t._v("close")]):i("v-icon",{attrs:{color:"success",title:t.$t("history.success")}},[t._v("done")])],1),i("td",[t._v(t._s(t._f("formatDate")(e.item.time)))]),i("td",[i("v-btn",{attrs:{icon:"",flat:"",small:"",title:t.$t("history.download")},on:{click:function(i){return t.download(e.item)}}},[i("v-icon",{attrs:{small:""}},[t._v("save_alt")])],1),i("DownloadTo",{staticClass:"mx-0",attrs:{downloadOptions:{host:e.item.host,url:e.item.data.url},flat:"",icon:"",small:""},on:{error:t.onError,success:t.onSuccess}}),i("v-btn",{attrs:{icon:"",flat:"",small:"",color:"error",title:t.$t("common.remove")},on:{click:function(i){return t.removeConfirm(e.item)}}},[i("v-icon",{attrs:{small:""}},[t._v("delete")])],1)],1)]}}]),model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}})],1),i("v-dialog",{attrs:{width:"300"},model:{value:t.dialogRemoveConfirm,callback:function(e){t.dialogRemoveConfirm=e},expression:"dialogRemoveConfirm"}},[i("v-card",[i("v-card-title",{staticClass:"headline red lighten-2"},[t._v(t._s(t.$t("history.removeConfirmTitle")))]),i("v-card-text",[t._v(t._s(t.$t("history.removeConfirm")))]),i("v-divider"),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{flat:"",color:"info"},on:{click:function(e){t.dialogRemoveConfirm=!1}}},[i("v-icon",[t._v("cancel")]),i("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("history.cancel")))])],1),i("v-btn",{attrs:{color:"error",flat:""},on:{click:function(e){return t.remove(null)}}},[i("v-icon",[t._v("check_circle_outline")]),i("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("history.ok")))])],1)],1)],1)],1),i("v-snackbar",{attrs:{top:"",timeout:3e3,color:"error"},model:{value:t.haveError,callback:function(e){t.haveError=e},expression:"haveError"}},[t._v(t._s(t.errorMsg))]),i("v-snackbar",{attrs:{bottom:"",timeout:3e3,color:"success"},model:{value:t.haveSuccess,callback:function(e){t.haveSuccess=e},expression:"haveSuccess"}},[t._v(t._s(t.successMsg))])],1)},s=[],a=(i("7f7f"),i("7514"),i("ac6a"),i("6b54"),i("2b0e")),o=i("f62e"),r=i("a1f4"),l=i("3046"),c=new r["a"],u=a["default"].extend({components:{DownloadTo:l["a"]},data:function(){return{selected:[],selectedItem:{},pagination:{rowsPerPage:10,sortBy:"time",descending:!0},items:[],dialogRemoveConfirm:!1,options:this.$store.state.options,errorMsg:"",haveError:!1,haveSuccess:!1,successMsg:"",siteCache:{},filterKey:"",filteredItems:[],filterStatus:"all",selectedClient:{address:""},clientItems:[]}},watch:{selectedClient:function(){this.resetItems()},filterStatus:function(){this.resetItems()}},methods:{clear:function(){var t=this;confirm(this.$t("history.clearConfirm").toString())&&c.sendRequest(o["b"].clearDownloadHistory).then((function(e){t.getDownloadHistory()}))},resetItems:function(){var t=this,e="";this.selectedClient&&this.selectedClient.id&&(e=this.selectedClient.id),""==e&&"all"==this.filterStatus?this.getDownloadHistory():(this.filteredItems=[],this.items.forEach((function(i){var n=i.clientId||i.data.clientId;if(("fail"==t.filterStatus&&!1===i.success||"success"==t.filterStatus&&!1!==i.success||"all"==t.filterStatus)&&(n==e||""==e)){var s=t.siteCache[i.host];s||(s=t.options.sites.find((function(t){return t.host===i.host})),t.siteCache[i.host]=s),i.site=s,t.filteredItems.push(i)}})))},removeSelected:function(){this.selected&&this.selected.length>0&&confirm(this.$t("common.removeSelectedConfirm",{count:this.selected.length}).toString())&&this.remove(this.selected)},remove:function(t){var e=this;t||(t=[this.selectedItem]),c.sendRequest(o["b"].removeDownloadHistory,null,t).then((function(t){e.getDownloadHistory()})),this.dialogRemoveConfirm=!1},removeConfirm:function(t){this.selectedItem=t,this.dialogRemoveConfirm=!0},getDownloadHistory:function(){var t=this;c.sendRequest(o["b"].getDownloadHistory).then((function(e){console.log("downloadHistory",e),t.items=[],t.filteredItems=[],e.forEach((function(e){var i=t.siteCache[e.host];i||(i=t.options.sites.find((function(t){return t.host===e.host})),t.siteCache[e.host]=i),e.site=i,t.filteredItems.push(e),t.items.push(e)}))}))},getClientName:function(t){var e=this.options.clients.find((function(e){return e.id===t}));return e?e.name:""},download:function(t){var e=this,i=null,n=0;Array.isArray(t)?(i=t.pop(),n=t.length):i=t,console.log(i),this.haveSuccess=!0,this.successMsg=this.$t("history.seedingTorrent").toString();var s=Object.assign({},i.data);s.clientId||(s.clientId=i.clientId),c.sendRequest(o["b"].sendTorrentToClient,null,s).then((function(i){console.log("命令执行完成",i),i.success?(e.haveSuccess=!0,e.successMsg=i.msg):(e.haveError=!0,e.errorMsg=i.msg),n>0&&setTimeout((function(){e.download(t)}),500)})).catch((function(i){i.success?(e.haveSuccess=!0,e.successMsg=i.msg):(e.haveError=!0,e.errorMsg=i.msg),n>0&&setTimeout((function(){e.download(t)}),500)}))},downloadSelected:function(){this.selected&&this.selected.length>0&&confirm(this.$t("history.downloadSelectedConfirm",{count:this.selected.length}).toString())&&this.download(this.selected)},onError:function(t){this.errorMsg=t},onSuccess:function(t){this.successMsg=t}},created:function(){this.$store.state.options.clients&&this.$store.state.options.clients.length>0&&(this.clientItems=this.$store.state.options.clients),this.getDownloadHistory()},computed:{headers:function(){return[{text:"№",align:"left",sortable:!1,value:"title",width:30},{text:this.$t("history.headers.site"),align:"center",value:"data.host",width:"140px"},{text:this.$t("history.headers.title"),align:"left",value:"data.title"},{text:this.$t("history.headers.status"),align:"left",value:"data.success"},{text:this.$t("history.headers.time"),align:"left",value:"time"},{text:this.$t("history.headers.action"),value:"name",sortable:!1}]}}}),d=u,h=(i("4b33"),i("2877")),f=i("6544"),v=i.n(f),m=i("0798"),p=i("c6a6"),g=i("8212"),b=i("8336"),y=i("b0af"),S=i("99d9"),C=i("12b2"),_=i("ac7c"),w=i("8fea"),$=i("169a"),x=i("ce7e"),k=i("132d"),I=i("5d23"),T=i("67b6"),E=i("43a6"),M=i("2db4"),D=i("9910"),R=i("2677"),O=Object(h["a"])(d,n,s,!1,null,"49606afc",null);e["default"]=O.exports;v()(O,{VAlert:m["a"],VAutocomplete:p["a"],VAvatar:g["a"],VBtn:b["a"],VCard:y["a"],VCardActions:S["a"],VCardText:S["b"],VCardTitle:C["a"],VCheckbox:_["a"],VDataTable:w["a"],VDialog:$["a"],VDivider:x["a"],VIcon:k["a"],VListTileActionText:I["a"],VListTileContent:I["b"],VListTileSubTitle:I["c"],VListTileTitle:I["d"],VRadio:T["a"],VRadioGroup:E["a"],VSnackbar:M["a"],VSpacer:D["a"],VTextField:R["a"]})},a14d:function(t,e,i){},b54a:function(t,e,i){"use strict";i("386b")("link",(function(t){return function(e){return t(this,"a","href",e)}}))},e025:function(t,e,i){}}]);