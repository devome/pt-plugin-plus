(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bdc44e8c"],{"14b5":function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));n("a481"),n("6b54"),n("7f7f");var o=n("d225"),a=n("b0b4"),i=function(){function t(){Object(o["a"])(this,t)}return Object(a["a"])(t,[{key:"replacePathKey",value:function(t,e){if(!t)return t;var n=new Date;return this.replaceKeys(t,{"site.name":e.name,"site.host":e.host,YYYY:n.getFullYear(),MM:("0"+(n.getMonth()+1).toString()).substr(-2),DD:("0"+n.getDate().toString()).substr(-2)})}},{key:"getSavePath",value:function(t,e){if(t){var n=t,o="<...>";if(n&&n.indexOf(o)>=0){var a=window.prompt("当前为自定义路径：".concat(n," \n请输入路径中 ").concat(o," 部分的内容: "));if(null===a)return!1;n=n.replace(o,a)}return this.replacePathKey(n,e)}}},{key:"replaceKeys",value:function(t,e){var n=t;for(var o in e)if(e.hasOwnProperty(o)){var a=e[o];n=n.replace("$"+o+"$",a)}return n}}]),t}()},3046:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-btn",{class:[t.mini?"btn-mini":""],attrs:{flat:t.flat,icon:t.icon,small:t.small,loading:t.loading,title:t.title||t.$t("searchTorrent.sendToClientTip"),color:t.color},on:{click:function(e){return e.stopPropagation(),t.showSiteContentMenus.apply(null,arguments)}}},[t.haveSuccess?n("v-icon",{attrs:{color:"success",small:""}},[t._v("done")]):t.haveError?n("v-icon",{attrs:{color:"red",small:""}},[t._v("close")]):n("v-icon",{attrs:{small:""}},[t._v(t._s(t.iconText))]),t.label?n("span",{staticClass:"ml-2"},[t._v(t._s(t.label))]):t._e()],1)},a=[],i=(n("6b54"),n("b54a"),n("7f7f"),n("7514"),n("ac6a"),n("c5f6"),n("2b0e")),s=n("f62e"),r=n("14b5"),c=n("a1f4"),l=n("0a02"),u=new c["a"],h=i["default"].extend({props:{flat:Boolean,icon:Boolean,small:Boolean,mini:Boolean,color:String,iconText:{type:String,default:"cloud_download"},downloadOptions:{type:[Object,Array],default:function(){return{host:String,url:String}}},getOptionsOnly:Boolean,label:String,title:String,payload:[Object,Array,String,Number]},data:function(){return{options:this.$store.state.options,contentMenus:[],pathHandler:new r["a"],loading:!1,site:{},haveSuccess:!1,haveError:!1,allContentMenus:[]}},methods:{getSiteContentMenus:function(t){var e=[],n=[];if(this.contentMenus&&this.contentMenus.length>0)return this.contentMenus;function o(n,o){n.forEach((function(n){e.push({client:o,path:n,host:t})}))}return this.options.clients.forEach((function(a){if(n.push({client:a,path:"",host:t}),a.paths){for(var i in a.paths){var r=a.paths[i];t===i&&o(r,a)}var c=a.paths[s["f"].allSite];c&&(e.length>0&&e.push({}),o(c,a))}})),e.length>0&&n.splice(0,0,{}),e=e.concat(n),this.contentMenus=e,e},getSiteFromHost:function(t){return this.options.sites.find((function(e){var n=e.cdn||[];return e.url&&n.push(e.url),e.host==t||n.join("").indexOf(t)>-1}))},showSiteContentMenus:function(t){var e=this;if(Array.isArray(this.downloadOptions))this.showAllContentMenus(t);else{var n=this.downloadOptions,o=n.host;if(!o&&n.site&&(o=n.site.host),o){this.site=n.site||this.getSiteFromHost(o);var a=this.getSiteContentMenus(o),i=[];a.forEach((function(t){if(t.client&&t.client.name){var o=e.$vuetify.breakpoint.xs?t.client.name:e.$t("searchTorrent.downloadTo",{path:"".concat(t.client.name," -> ").concat(t.client.address)});t.path&&(o+=" ->".concat(e.pathHandler.replacePathKey(t.path,e.site))),i.push({title:o,fn:function(){if(n.url){console.log(n,t);var o={url:n.url,title:n.title,savePath:t.path,autoStart:t.client.autoStart,link:n.link,clientId:t.client.id};if(e.getOptionsOnly)return o.savePath=e.pathHandler.getSavePath(o.savePath,e.site),void e.$emit("itemClick",{payload:e.payload,downloadOptions:Object.assign({clientName:t.client.name},o)});e.sendToClient(o)}}})}else i.push({})})),l["a"].showContextMenu(i,t)}}},showAllContentMenus:function(t){var e=[],n=[],o=this;function a(t){var e=o.$t("searchTorrent.downloadTo",{path:"".concat(t.client.name," -> ").concat(t.client.address)}).toString();t.path&&(e+=" -> ".concat(t.path)),n.push({title:e,fn:function(){o.sendTorrentsInBackground(t)}})}0==this.allContentMenus.length?(this.options.clients.forEach((function(t){e.push({client:t,path:""})})),e.forEach((function(t){if(t.client&&t.client.name){if(a(t),t.client.paths){var e=t.client.paths[s["f"].allSite];e&&e.forEach((function(e){if(-1==e.indexOf("$site.name$")&&-1==e.indexOf("$site.host$")&&-1==e.indexOf("<...>")){var n=l["a"].clone(t);n.path=e,a(n)}}))}}else n.push({})})),this.allContentMenus=n):n=this.allContentMenus,l["a"].showContextMenu(n,t)},sendTorrentsInBackground:function(t){var e=this,n=[];this.downloadOptions.forEach((function(e){n.push({title:e.title,url:e.url,clientId:t.client.id,savePath:t.path,autoStart:t.client.autoStart,link:e.link})})),this.loading=!0,u.sendRequest(s["b"].sendTorrentsInBackground,null,n).then((function(t){console.log("命令执行完成",t),e.haveSuccess=!0,e.$emit("success",t)})).catch((function(t){console.log(t),e.haveError=!0,e.$emit("error",t.msg||t)})).finally((function(){e.loading=!1,setTimeout((function(){e.clearStatus()}),5e3)}))},sendToClient:function(t){var e=this;this.clearStatus();var n=this.pathHandler.getSavePath(t.savePath,this.site);!1!==n&&(this.loading=!0,t.savePath=n,u.sendRequest(s["b"].sendTorrentToClient,null,t).then((function(t){console.log("命令执行完成",t),"success"==t.type?(e.haveSuccess=!0,e.$emit("success",t.msg)):(e.haveError=!0,e.$emit("error",t.msg))})).catch((function(t){console.log(t),e.haveError=!0,e.$emit("error",t.msg||t)})).finally((function(){e.loading=!1,setTimeout((function(){e.clearStatus()}),5e3)})))},clearStatus:function(){this.haveSuccess=!1,this.haveError=!1}}}),d=h,f=n("2877"),v=n("6544"),p=n.n(v),m=n("8336"),g=n("132d"),b=Object(f["a"])(d,o,a,!1,null,null,null);e["a"]=b.exports;p()(b,{VBtn:m["a"],VIcon:g["a"]})},"386b":function(t,e,n){var o=n("5ca1"),a=n("79e5"),i=n("be13"),s=/"/g,r=function(t,e,n,o){var a=String(i(t)),r="<"+e;return""!==n&&(r+=" "+n+'="'+String(o).replace(s,"&quot;")+'"'),r+">"+a+"</"+e+">"};t.exports=function(t,e){var n={};n[t]=e(r),o(o.P+o.F*a((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3})),"String",n)}},"5dbc":function(t,e,n){var o=n("d3f4"),a=n("8b97").set;t.exports=function(t,e,n){var i,s=e.constructor;return s!==n&&"function"==typeof s&&(i=s.prototype)!==n.prototype&&o(i)&&a&&a(t,i),t}},"7d05":function(t,e,n){},"8b97":function(t,e,n){var o=n("d3f4"),a=n("cb7c"),i=function(t,e){if(a(t),!o(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,o){try{o=n("9b43")(Function.call,n("11e9").f(Object.prototype,"__proto__").set,2),o(t,[]),e=!(t instanceof Array)}catch(a){e=!0}return function(t,n){return i(t,n),e?t.__proto__=n:o(t,n),t}}({},!1):void 0),check:i}},"8cd1":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"history"},[n("v-alert",{attrs:{value:!0,type:"info"}},[t._v(t._s(t.$t("history.title")))]),n("v-card",[n("v-card-title",[n("v-btn",{attrs:{color:"error",disabled:0==t.selected.length},on:{click:t.removeSelected}},[n("v-icon",{staticClass:"mr-2"},[t._v("remove")]),t._v("\n        "+t._s(t.$t("history.remove"))+"\n      ")],1),n("v-btn",{attrs:{color:"error",disabled:0==t.items.length},on:{click:t.clear}},[n("v-icon",{staticClass:"mr-2"},[t._v("clear")]),t._v("\n        "+t._s(t.$t("history.clear"))+"\n      ")],1),n("v-spacer"),n("v-text-field",{staticClass:"search",attrs:{"append-icon":"search",label:"Search","single-line":"","hide-details":""},model:{value:t.filterKey,callback:function(e){t.filterKey=e},expression:"filterKey"}})],1),n("v-data-table",{staticClass:"elevation-1",attrs:{search:t.filterKey,headers:t.headers,items:t.items,pagination:t.pagination,"item-key":"data.url","select-all":""},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"items",fn:function(e){return[n("td",{staticStyle:{width:"20px"}},[n("v-checkbox",{attrs:{primary:"","hide-details":""},model:{value:e.selected,callback:function(n){t.$set(e,"selected",n)},expression:"props.selected"}})],1),n("td",{staticStyle:{"text-align":"center"}},[e.item.site?n("div",[n("v-avatar",{attrs:{size:"18"}},[n("img",{attrs:{src:e.item.site.icon}})]),n("br"),n("span",{staticClass:"captionText"},[t._v(t._s(e.item.site.name))])],1):t._e()]),n("td",[e.item.data.link?n("a",{attrs:{href:e.item.data.link,target:"_blank",title:e.item.data.title,rel:"noopener noreferrer nofollow"}},[t._v(t._s(e.item.data.title||e.item.data.link))]):n("span",{attrs:{title:e.item.data.url}},[t._v(t._s(e.item.data.title||e.item.data.url))]),n("br"),n("span",{staticClass:"sub-title"},[t._v("[\n            "+t._s(t.getClientName(e.item.data.clientId||e.item.clientId))+"\n            ] ->\n            "+t._s(e.item.data.savePath||t.$t("history.defaultPath")))])]),n("td",[!1===e.item.success?n("v-icon",{attrs:{color:"error",title:t.$t("history.fail")}},[t._v("close")]):n("v-icon",{attrs:{color:"success",title:t.$t("history.success")}},[t._v("done")])],1),n("td",[t._v(t._s(t._f("formatDate")(e.item.time)))]),n("td",[n("v-btn",{attrs:{icon:"",flat:"",small:"",title:t.$t("history.download")},on:{click:function(n){return t.download(e.item)}}},[n("v-icon",{attrs:{small:""}},[t._v("save_alt")])],1),n("DownloadTo",{staticClass:"mx-0",attrs:{downloadOptions:{host:e.item.host,url:e.item.data.url},flat:"",icon:"",small:""},on:{error:t.onError,success:t.onSuccess}}),n("v-btn",{attrs:{icon:"",flat:"",small:"",color:"error",title:t.$t("common.remove")},on:{click:function(n){return t.removeConfirm(e.item)}}},[n("v-icon",{attrs:{small:""}},[t._v("delete")])],1)],1)]}}]),model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}})],1),n("v-dialog",{attrs:{width:"300"},model:{value:t.dialogRemoveConfirm,callback:function(e){t.dialogRemoveConfirm=e},expression:"dialogRemoveConfirm"}},[n("v-card",[n("v-card-title",{staticClass:"headline red lighten-2"},[t._v(t._s(t.$t("history.removeConfirmTitle")))]),n("v-card-text",[t._v(t._s(t.$t("history.removeConfirm")))]),n("v-divider"),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{flat:"",color:"info"},on:{click:function(e){t.dialogRemoveConfirm=!1}}},[n("v-icon",[t._v("cancel")]),n("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("history.cancel")))])],1),n("v-btn",{attrs:{color:"error",flat:""},on:{click:function(e){return t.remove(null)}}},[n("v-icon",[t._v("check_circle_outline")]),n("span",{staticClass:"ml-1"},[t._v(t._s(t.$t("history.ok")))])],1)],1)],1)],1),n("v-snackbar",{attrs:{top:"",timeout:3e3,color:"error"},model:{value:t.haveError,callback:function(e){t.haveError=e},expression:"haveError"}},[t._v(t._s(t.errorMsg))]),n("v-snackbar",{attrs:{bottom:"",timeout:3e3,color:"success"},model:{value:t.haveSuccess,callback:function(e){t.haveSuccess=e},expression:"haveSuccess"}},[t._v(t._s(t.successMsg))])],1)},a=[],i=(n("7f7f"),n("7514"),n("ac6a"),n("6b54"),n("2b0e")),s=n("f62e"),r=n("a1f4"),c=n("3046"),l=new r["a"],u=i["default"].extend({components:{DownloadTo:c["a"]},data:function(){return{selected:[],selectedItem:{},pagination:{rowsPerPage:10,sortBy:"time",descending:!0},items:[],dialogRemoveConfirm:!1,options:this.$store.state.options,errorMsg:"",haveError:!1,haveSuccess:!1,successMsg:"",siteCache:{},filterKey:""}},methods:{clear:function(){var t=this;confirm(this.$t("history.clearConfirm").toString())&&l.sendRequest(s["b"].clearDownloadHistory).then((function(e){t.getDownloadHistory()}))},removeSelected:function(){this.selected&&this.selected.length>0&&confirm(this.$t("common.removeSelectedConfirm",{count:this.selected.length}).toString())&&this.remove(this.selected)},remove:function(t){var e=this;t||(t=[this.selectedItem]),l.sendRequest(s["b"].removeDownloadHistory,null,t).then((function(t){e.getDownloadHistory()})),this.dialogRemoveConfirm=!1},removeConfirm:function(t){this.selectedItem=t,this.dialogRemoveConfirm=!0},getDownloadHistory:function(){var t=this;l.sendRequest(s["b"].getDownloadHistory).then((function(e){console.log("downloadHistory",e),t.items=[],e.forEach((function(e){var n=t.siteCache[e.host];n||(n=t.options.sites.find((function(t){return t.host===e.host})),t.siteCache[e.host]=n),e.site=n,t.items.push(e)}))}))},getClientName:function(t){var e=this.options.clients.find((function(e){return e.id===t}));return e?e.name:""},download:function(t){var e=this;console.log(t),this.haveSuccess=!0,this.successMsg=this.$t("history.seedingTorrent").toString();var n=Object.assign({},t.data);n.clientId||(n.clientId=t.clientId),l.sendRequest(s["b"].sendTorrentToClient,null,n).then((function(t){console.log("命令执行完成",t),t.success?(e.haveSuccess=!0,e.successMsg=t.msg):(e.haveError=!0,e.errorMsg=t.msg)}))},onError:function(t){this.errorMsg=t},onSuccess:function(t){this.successMsg=t}},created:function(){this.getDownloadHistory()},computed:{headers:function(){return[{text:this.$t("history.headers.site"),align:"center",value:"data.host",width:"140px"},{text:this.$t("history.headers.title"),align:"left",value:"data.title"},{text:this.$t("history.headers.status"),align:"left",value:"data.success"},{text:this.$t("history.headers.time"),align:"left",value:"time"},{text:this.$t("history.headers.action"),value:"name",sortable:!1}]}}}),h=u,d=(n("a699"),n("2877")),f=n("6544"),v=n.n(f),p=n("0798"),m=n("8212"),g=n("8336"),b=n("b0af"),y=n("99d9"),_=n("12b2"),S=n("ac7c"),C=n("8fea"),w=n("169a"),k=n("ce7e"),x=n("132d"),$=n("2db4"),E=n("9910"),T=n("2677"),I=Object(d["a"])(h,o,a,!1,null,"01029d43",null);e["default"]=I.exports;v()(I,{VAlert:p["a"],VAvatar:m["a"],VBtn:g["a"],VCard:b["a"],VCardActions:y["a"],VCardText:y["b"],VCardTitle:_["a"],VCheckbox:S["a"],VDataTable:C["a"],VDialog:w["a"],VDivider:k["a"],VIcon:x["a"],VSnackbar:$["a"],VSpacer:E["a"],VTextField:T["a"]})},a699:function(t,e,n){"use strict";n("7d05")},aa77:function(t,e,n){var o=n("5ca1"),a=n("be13"),i=n("79e5"),s=n("fdef"),r="["+s+"]",c="​",l=RegExp("^"+r+r+"*"),u=RegExp(r+r+"*$"),h=function(t,e,n){var a={},r=i((function(){return!!s[t]()||c[t]()!=c})),l=a[t]=r?e(d):s[t];n&&(a[n]=l),o(o.P+o.F*r,"String",a)},d=h.trim=function(t,e){return t=String(a(t)),1&e&&(t=t.replace(l,"")),2&e&&(t=t.replace(u,"")),t};t.exports=h},b54a:function(t,e,n){"use strict";n("386b")("link",(function(t){return function(e){return t(this,"a","href",e)}}))},c5f6:function(t,e,n){"use strict";var o=n("7726"),a=n("69a8"),i=n("2d95"),s=n("5dbc"),r=n("6a99"),c=n("79e5"),l=n("9093").f,u=n("11e9").f,h=n("86cc").f,d=n("aa77").trim,f="Number",v=o[f],p=v,m=v.prototype,g=i(n("2aeb")(m))==f,b="trim"in String.prototype,y=function(t){var e=r(t,!1);if("string"==typeof e&&e.length>2){e=b?e.trim():d(e,3);var n,o,a,i=e.charCodeAt(0);if(43===i||45===i){if(n=e.charCodeAt(2),88===n||120===n)return NaN}else if(48===i){switch(e.charCodeAt(1)){case 66:case 98:o=2,a=49;break;case 79:case 111:o=8,a=55;break;default:return+e}for(var s,c=e.slice(2),l=0,u=c.length;l<u;l++)if(s=c.charCodeAt(l),s<48||s>a)return NaN;return parseInt(c,o)}}return+e};if(!v(" 0o1")||!v("0b1")||v("+0x1")){v=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof v&&(g?c((function(){m.valueOf.call(n)})):i(n)!=f)?s(new p(y(e)),n,v):y(e)};for(var _,S=n("9e1e")?l(p):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),C=0;S.length>C;C++)a(p,_=S[C])&&!a(v,_)&&h(v,_,u(p,_));v.prototype=m,m.constructor=v,n("2aba")(o,f,v)}},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);