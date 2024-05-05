import{V as o,n as r,f as h,E as c,a as p,F as g,P as v,b as _}from"./index-C9rdr-_b.js";const x=o.extend({data(){return{showPasskey:!1,rules:{require:[i=>!!i||"!"],url:i=>/^(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/.test(i)||this.$t("settings.sites.editor.urlTip")},cdn:"",quickLinkText:"",valid:!1,site:{},timezone:[{value:"-1200",text:"(UTC -12:00) Enitwetok, Kwajalien"},{value:"-1100",text:"(UTC -11:00) Midway Island, Samoa"},{value:"-1000",text:"(UTC -10:00) Hawaii"},{value:"-0900",text:"(UTC -09:00) Alaska"},{value:"-0800",text:"(UTC -08:00) Pacific Time (US & Canada)"},{value:"-0700",text:"(UTC -07:00) Mountain Time (US & Canada)"},{value:"-0600",text:"(UTC -06:00) Central Time (US & Canada), Mexico City"},{value:"-0500",text:"(UTC -05:00) Eastern Time (US & Canada), Bogota, Lima"},{value:"-0400",text:"(UTC -04:00) Atlantic Time (Canada), Caracas, La Paz"},{value:"-0330",text:"(UTC -03:30) Newfoundland"},{value:"-0300",text:"(UTC -03:00) Brazil, Buenos Aires, Falkland Is."},{value:"-0200",text:"(UTC -02:00) Mid-Atlantic, Ascention Is., St Helena"},{value:"-0100",text:"(UTC -01:00) Azores, Cape Verde Islands"},{value:"+0000",text:"(UTC ±00:00) Casablanca, Dublin, London, Lisbon, Monrovia"},{value:"+0100",text:"(UTC +01:00) Brussels, Copenhagen, Madrid, Paris"},{value:"+0200",text:"(UTC +02:00) Sofia, Izrael, South Africa,"},{value:"+0300",text:"(UTC +03:00) Baghdad, Riyadh, Moscow, Nairobi"},{value:"+0330",text:"(UTC +03:30) Tehran"},{value:"+0400",text:"(UTC +04:00) Abu Dhabi, Baku, Muscat, Tbilisi"},{value:"+0430",text:"(UTC +04:30) Kabul"},{value:"+0500",text:"(UTC +05:00) Ekaterinburg, Karachi, Tashkent"},{value:"+0530",text:"(UTC +05:30) Bombay, Calcutta, Madras, New Delhi"},{value:"+0600",text:"(UTC +06:00) Almaty, Colomba, Dhakra"},{value:"+0700",text:"(UTC +07:00) Bangkok, Hanoi, Jakarta"},{value:"+0800",text:"(UTC +08:00) ShangHai, HongKong, Perth, Singapore, Taipei"},{value:"+0900",text:"(UTC +09:00) Osaka, Sapporo, Seoul, Tokyo, Yakutsk"},{value:"+0930",text:"(UTC +09:30) Adelaide, Darwin"},{value:"+1000",text:"(UTC +10:00) Melbourne, Papua New Guinea, Sydney"},{value:"+1100",text:"(UTC +11:00) Magadan, New Caledonia, Solomon Is."},{value:"+1200",text:"(UTC +12:00) Auckland, Fiji, Marshall Island"}]}},props:{custom:Boolean,initData:{type:Object,default:()=>({valid:!1})}},watch:{site:{handler(){this.site.cdn?this.cdn=this.site.cdn.join(`
`):this.cdn="",this.site.userQuickLinks?this.quickLinkText=this.site.userQuickLinks.map(i=>`${i.desc},${i.href},${i.color?i.color:""}`).join(`
`):this.quickLinkText="",this.$emit("change",{data:this.site,valid:this.valid})},deep:!0},cdn(){let i=this.cdn.split(`
`),e=[];i.forEach(t=>{/(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/.test(t)&&e.push(t)}),e.length>0?this.site.activeURL=e[0]:this.site.activeURL=this.site.url,this.site.cdn=e},quickLinkText(){this.site.userQuickLinks=this.quickLinkText.split(/\n/).filter(i=>!!i).map(i=>i.split(/\s*[,，]\s*/)).filter(([i,e,t])=>{let s=!!i&&!!e,a=!0;try{new URL(e)}catch{a=!1}return s&&a}).map(([i,e,t])=>({desc:i,href:e,color:t}))},initData(){this.initData&&(this.site=Object.assign({},this.initData),this.valid=!!(this.site.name&&this.site.host))}},computed:{getSchema(){let i="";return typeof this.site.schema=="string"?i=this.site.schema:this.site.schema&&this.site.schema.name&&(i=this.site.schema.name),i}}});var k=function(){var e=this,t=e._self._c;return e._self._setupProxy,t("v-card",{staticClass:"mb-5",attrs:{color:e.$vuetify.dark?"":"grey lighten-4"}},[t("v-card-text",[t("v-form",{model:{value:e.valid,callback:function(s){e.valid=s},expression:"valid"}},[t("v-text-field",{ref:"name",attrs:{label:e.$t("settings.sites.editor.name"),placeholder:e.$t("settings.sites.editor.name"),required:"",rules:e.rules.require},model:{value:e.site.name,callback:function(s){e.$set(e.site,"name",s)},expression:"site.name"}}),t("v-combobox",{attrs:{"hide-selected":"",hint:e.$t("settings.sites.editor.inputTags"),label:e.$t("settings.sites.editor.tags"),multiple:"","persistent-hint":"","small-chips":""},model:{value:e.site.tags,callback:function(s){e.$set(e.site,"tags",s)},expression:"site.tags"}}),e.site.isCustom?e._e():t("v-text-field",{attrs:{value:e.getSchema,label:e.$t("settings.sites.editor.schema"),disabled:""}}),e.site.isCustom?t("v-autocomplete",{attrs:{items:e.$store.state.options.system.schemas,label:e.$t("settings.sites.editor.schema"),"menu-props":{maxHeight:"auto"},"persistent-hint":"","single-line":"","item-text":"name","item-value":"name"},scopedSlots:e._u([{key:"selection",fn:function({item:s}){return[t("span",{domProps:{textContent:e._s(s.name)}})]}},{key:"item",fn:function(s){return[t("v-list-tile-content",[t("v-list-tile-title",{domProps:{innerHTML:e._s(s.item.name)}})],1),t("v-list-tile-action",[t("v-list-tile-action-text",[e._v(e._s(s.item.ver))])],1)]}}],null,!1,2935589017),model:{value:e.site.schema,callback:function(s){e.$set(e.site,"schema",s)},expression:"site.schema"}}):e._e(),e.site.securityKeys?e._l(e.site.securityKeys,function(s,a,n){return t("v-text-field",{key:n,attrs:{label:a,type:e.showPasskey?"text":"password","append-icon":e.showPasskey?"visibility_off":"visibility"},on:{"click:append":function(l){e.showPasskey=!e.showPasskey}},model:{value:e.site.securityKeys[a],callback:function(l){e.$set(e.site.securityKeys,a,l)},expression:"site.securityKeys[key]"}})}):t("v-text-field",{attrs:{label:e.$t("settings.sites.editor.passkey"),placeholder:e.$t("settings.sites.editor.passkeyTip"),type:e.showPasskey?"text":"password","append-icon":e.showPasskey?"visibility_off":"visibility"},on:{"click:append":function(s){e.showPasskey=!e.showPasskey}},model:{value:e.site.passkey,callback:function(s){e.$set(e.site,"passkey",s)},expression:"site.passkey"}}),t("v-text-field",{attrs:{label:e.$t("settings.sites.editor.url"),placeholder:e.$t("settings.sites.editor.urlTip"),required:"",rules:[e.rules.url],disabled:!e.custom},model:{value:e.site.url,callback:function(s){e.$set(e.site,"url",s)},expression:"site.url"}}),t("v-text-field",{attrs:{label:e.$t("settings.sites.editor.priority"),placeholder:e.$t("settings.sites.editor.priorityTip"),type:"number"},model:{value:e.site.priority,callback:function(s){e.$set(e.site,"priority",s)},expression:"site.priority"}}),t("v-textarea",{attrs:{label:e.$t("settings.sites.editor.cdn"),value:"",hint:e.$t("settings.sites.editor.cdnTip")},model:{value:e.cdn,callback:function(s){e.cdn=s},expression:"cdn"}}),t("v-autocomplete",{attrs:{items:e.timezone,label:e.$t("settings.sites.editor.timezone"),"persistent-hint":"","item-text":"text","item-value":"value"},model:{value:e.site.timezoneOffset,callback:function(s){e.$set(e.site,"timezoneOffset",s)},expression:"site.timezoneOffset"}}),t("v-text-field",{attrs:{label:e.$t("settings.sites.editor.description")},model:{value:e.site.description,callback:function(s){e.$set(e.site,"description",s)},expression:"site.description"}}),t("v-autocomplete",{attrs:{items:this.$store.state.options.clients,label:e.$t("settings.sites.editor.defaultClient"),"menu-props":{maxHeight:"auto"},"persistent-hint":"","item-text":"name","item-value":"id"},scopedSlots:e._u([{key:"selection",fn:function({item:s}){return[t("span",{domProps:{textContent:e._s(s.name)}})]}},{key:"item",fn:function(s){return[t("v-list-tile-content",[t("v-list-tile-title",{domProps:{innerHTML:e._s(s.item.name)}}),t("v-list-tile-sub-title",{domProps:{innerHTML:e._s(s.item.address)}})],1),t("v-list-tile-action",[t("v-list-tile-action-text",[e._v(e._s(s.item.type))])],1)]}}]),model:{value:e.site.defaultClientId,callback:function(s){e.$set(e.site,"defaultClientId",s)},expression:"site.defaultClientId"}}),t("v-text-field",{attrs:{type:"number",label:e.$t("settings.sites.editor.upLoadLimit"),placeholder:e.$t("settings.sites.editor.upLoadLimitTip")},model:{value:e.site.upLoadLimit,callback:function(s){e.$set(e.site,"upLoadLimit",s)},expression:"site.upLoadLimit"}}),t("v-text-field",{attrs:{disabled:!e.site.tokenRequired,rules:e.site.tokenRequired?e.rules.require:[],label:e.$t("settings.sites.editor.authToken"),placeholder:e.$t("settings.sites.editor.authTokenTip")},model:{value:e.site.authToken,callback:function(s){e.$set(e.site,"authToken",s)},expression:"site.authToken"}}),t("v-switch",{attrs:{label:e.$t("settings.sites.editor.allowGetUserInfo"),disabled:e.site.offline},model:{value:e.site.allowGetUserInfo,callback:function(s){e.$set(e.site,"allowGetUserInfo",s)},expression:"site.allowGetUserInfo"}}),t("v-switch",{attrs:{disabled:e.site.offline,label:e.$t("settings.sites.editor.allowSearch")},model:{value:e.site.allowSearch,callback:function(s){e.$set(e.site,"allowSearch",s)},expression:"site.allowSearch"}}),e.site.allowSearch?[t("v-container",{staticClass:"ma-0 pa-0 ml-4",attrs:{fluid:""}},[t("v-layout",{staticClass:"ma-0 pa-0",attrs:{row:"",wrap:""}},e._l(e.site.searchEntry,function(s,a,n){return t("v-flex",{key:n,staticClass:"ma-0 pa-0",attrs:{xs3:""}},[t("v-checkbox",{staticClass:"ma-0 pa-0",attrs:{disabled:!e.site.allowSearch||e.site.offline,label:s.name},model:{value:s.enabled,callback:function(l){e.$set(s,"enabled",l)},expression:"item.enabled"}})],1)}),1)],1)]:e._e(),t("v-switch",{attrs:{label:e.$t("settings.sites.editor.offline")},model:{value:e.site.offline,callback:function(s){e.$set(e.site,"offline",s)},expression:"site.offline"}}),t("v-switch",{attrs:{label:e.$t("settings.sites.editor.disableMessageCount")},model:{value:e.site.disableMessageCount,callback:function(s){e.$set(e.site,"disableMessageCount",s)},expression:"site.disableMessageCount"}}),t("v-switch",{attrs:{label:e.$t("settings.sites.editor.enableQuickLink")},model:{value:e.site.enableQuickLink,callback:function(s){e.$set(e.site,"enableQuickLink",s)},expression:"site.enableQuickLink"}}),t("v-switch",{attrs:{label:e.$t("settings.sites.editor.enableDefaultQuickLink"),disabled:!e.site.enableQuickLink},model:{value:e.site.enableDefaultQuickLink,callback:function(s){e.$set(e.site,"enableDefaultQuickLink",s)},expression:"site.enableDefaultQuickLink"}}),t("v-textarea",{attrs:{disabled:!e.site.enableQuickLink,label:e.$t("settings.sites.editor.quickLinkText"),hint:e.$t("settings.sites.editor.quickLinkTextTip")},model:{value:e.quickLinkText,callback:function(s){e.quickLinkText=s},expression:"quickLinkText"}})],2)],1)],1)},b=[],$=r(x,k,b,!1,null,null,null,null);const m=$.exports,w=o.extend({components:{SiteEditor:m},data(){return{step:1,show:!1,stepCount:2,selectedSite:{},valid:!1,isCustom:!1,newData:{},haveError:!1}},props:{value:Boolean},model:{prop:"value",event:"change"},watch:{show(){this.$emit("change",this.show),this.show||(this.step=1,this.selectedSite={name:""})},value(){this.show=this.value}},methods:{change(i){console.log(i),this.newData=i.data,this.valid=i.valid},save(){this.$emit("save",Object.assign({isCustom:this.isCustom},this.newData)),this.show=!1},next(i){this.selectedSite&&this.selectedSite.name?(this.valid=!0,this.haveError=!1,this.step++):(this.haveError=!0,this.valid=!1),this.isCustom=!1},custom(){this.selectedSite={name:"",isCustom:!0},this.isCustom=!0,this.valid=!1,this.step=2},joinTags(i){return i&&i.join?i.join(", "):""},filterSite(i,e,t){function s(l){return l??""}const a=s(i.host)+s(i.name)+s(i.url),n=s(e);return a.toString().toLowerCase().indexOf(n.toString().toLowerCase())>-1},cancel(){this.show=!1}},computed:{selectedSiteDescription(){if(!this.selectedSite)return"";let i=this.selectedSite,e="";return i.description!==void 0&&(e="; "+i.description),(i.url?i.url:"")+e}},created(){}});var C=function(){var e=this,t=e._self._c;return e._self._setupProxy,t("div",[t("v-snackbar",{attrs:{value:e.haveError,top:"",timeout:3e3,color:"error"}},[e._v(e._s(e.$t("settings.sites.add.validMsg")))]),t("v-dialog",{attrs:{"max-width":"800"},model:{value:e.show,callback:function(s){e.show=s},expression:"show"}},[t("v-card",[t("v-toolbar",{attrs:{dark:"",color:"blue-grey darken-2"}},[t("v-toolbar-title",[e._v(e._s(e.$t("settings.sites.add.title")))]),t("v-spacer"),t("v-btn",{attrs:{icon:"",flat:"",color:"success",href:"https://github.com/pt-plugins/PT-Plugin-Plus/wiki/config-site",target:"_blank",rel:"noopener noreferrer nofollow",title:e.$t("common.help")}},[t("v-icon",[e._v("help")])],1)],1),t("v-card-text",[t("v-stepper",{model:{value:e.step,callback:function(s){e.step=s},expression:"step"}},[t("v-stepper-header",[t("v-stepper-step",{attrs:{complete:e.step>1,step:"1"}},[e._v(e._s(e.$t("settings.sites.add.step1")))]),t("v-divider"),t("v-stepper-step",{attrs:{step:"2"}},[e._v(e._s(e.$t("settings.sites.add.step2")))])],1),t("v-stepper-items",[t("v-stepper-content",{attrs:{step:"1"}},[t("v-autocomplete",{attrs:{items:e.$store.getters.sites,label:e.$t("settings.sites.add.validMsg"),hint:e.selectedSiteDescription,filter:e.filterSite,"persistent-hint":"","return-object":"","single-line":"","item-text":"name","item-value":"name"},scopedSlots:e._u([{key:"selection",fn:function({item:s}){return[t("v-list-tile-avatar",[t("img",{attrs:{src:s.icon}})]),t("span",{domProps:{textContent:e._s(s.name)}})]}},{key:"item",fn:function(s){return[t("v-list-tile-avatar",[t("img",{attrs:{src:s.item.icon}})]),t("v-list-tile-content",[t("v-list-tile-title",{domProps:{innerHTML:e._s(s.item.name)}}),t("v-list-tile-sub-title",{domProps:{innerHTML:e._s(s.item.url)}})],1),t("v-list-tile-action",[t("v-list-tile-action-text",[e._v(e._s(e.joinTags(s.item.tags)))])],1)]}}]),model:{value:e.selectedSite,callback:function(s){e.selectedSite=s},expression:"selectedSite"}})],1),t("v-stepper-content",{attrs:{step:"2"}},[t("SiteEditor",{attrs:{initData:e.selectedSite,custom:e.isCustom},on:{change:e.change}})],1)],1)],1)],1),t("v-divider"),t("v-card-actions",{staticClass:"pa-3"},[t("v-btn",{directives:[{name:"show",rawName:"v-show",value:e.step==1,expression:"step == 1"}],attrs:{flat:"",color:"grey darken-1",href:"https://github.com/pt-plugins/PT-Plugin-Plus/tree/master/resource/sites",target:"_blank",rel:"noopener noreferrer nofollow"}},[t("v-icon",[e._v("help")]),t("span",{staticClass:"ml-1"},[e._v(e._s(e.$t("settings.sites.add.help")))])],1),t("v-btn",{directives:[{name:"show",rawName:"v-show",value:e.step<e.stepCount,expression:"step < stepCount"}],attrs:{flat:""},on:{click:e.custom}},[t("v-icon",[e._v("add_circle_outline")]),t("span",{staticClass:"ml-1"},[e._v(e._s(e.$t("settings.sites.add.custom")))])],1),t("v-spacer"),t("v-btn",{attrs:{flat:"",color:"error"},on:{click:e.cancel}},[t("v-icon",[e._v("cancel")]),t("span",{staticClass:"ml-1"},[e._v(e._s(e.$t("common.cancel")))])],1),t("v-btn",{attrs:{flat:"",color:"grey darken-1",disabled:e.step===1},on:{click:function(s){e.step--}}},[t("v-icon",[e._v("navigate_before")]),t("span",[e._v(e._s(e.$t("settings.sites.add.prev")))])],1),t("v-btn",{directives:[{name:"show",rawName:"v-show",value:e.step<e.stepCount,expression:"step < stepCount"}],attrs:{flat:"",color:"blue"},on:{click:function(s){return e.next(e.step)}}},[t("span",[e._v(e._s(e.$t("settings.sites.add.next")))]),t("v-icon",[e._v("navigate_next")])],1),t("v-btn",{directives:[{name:"show",rawName:"v-show",value:e.step===e.stepCount,expression:"step === stepCount"}],attrs:{flat:"",color:"success",disabled:!e.valid},on:{click:e.save}},[t("v-icon",[e._v("check_circle_outline")])],1)],1)],1)],1)],1)},S=[],y=r(w,C,S,!1,null,null,null,null);const T=y.exports,U=o.extend({components:{SiteEditor:m},data(){return{show:!1,defaultSite:{},valid:!0,newData:{}}},props:{value:Boolean,site:Object},model:{prop:"value",event:"change"},watch:{show(){this.$emit("change",this.show)},value(){this.show=this.value,this.show&&(this.defaultSite=Object.assign({},this.site))}},methods:{change(i){console.log(i),this.newData=i.data,this.valid=i.valid},save(){this.$emit("save",this.newData),this.show=!1},cancel(){this.show=!1}}});var P=function(){var e=this,t=e._self._c;return e._self._setupProxy,t("v-dialog",{attrs:{"max-width":"800"},model:{value:e.show,callback:function(s){e.show=s},expression:"show"}},[t("v-card",[t("v-card-title",{staticClass:"headline blue-grey darken-2",staticStyle:{color:"white"}},[e._v(e._s(e.$t("settings.sites.edit.title")))]),t("v-card-text",[t("SiteEditor",{attrs:{initData:e.defaultSite},on:{change:e.change}})],1),t("v-divider"),t("v-card-actions",{staticClass:"pa-3"},[t("v-spacer"),t("v-btn",{attrs:{flat:"",color:"error"},on:{click:e.cancel}},[t("v-icon",[e._v("cancel")]),t("span",{staticClass:"ml-1"},[e._v(e._s(e.$t("common.cancel")))])],1),t("v-btn",{attrs:{flat:"",color:"success",disabled:!e.valid},on:{click:e.save}},[t("v-icon",[e._v("check_circle_outline")]),t("span",{staticClass:"ml-1"},[e._v(e._s(e.$t("common.ok")))])],1)],1)],1)],1)},L=[],I=r(U,P,L,!1,null,null,null,null);const E=I.exports,D=o.extend({name:"UserInfo",data(){return{dataKey:"PT-Plugin-Plus-User-Datas",show:!1,rawUserData:[],pagination:{descending:!0,sortBy:"date",rowsPerPage:25},headers:[{text:this.$t("home.headers.date"),align:"left",value:"date",width:"130px"},{text:this.$t("home.headers.userName"),align:"left",value:"name"},{text:this.$t("home.headers.levelName"),align:"left",value:"levelName"},{text:this.$t("home.headers.activitiyData"),align:"right",value:"uploaded",width:"160px"},{text:this.$t("home.headers.ratio"),align:"right",value:"ratio"},{text:this.$t("home.headers.seeding"),align:"right",value:"seeding"},{text:this.$t("home.headers.seedingSize"),align:"right",value:"seedingSize"},{text:this.$t("home.headers.bonus"),align:"right",value:"bonus"},{text:this.$t("settings.sites.index.headers.action"),value:"name",sortable:!1,width:"50px"}]}},props:{value:Boolean,site:Object},model:{prop:"value",event:"change"},filters:{formatRatio(i){if(i>1e4||i==-1)return"∞";let e=parseFloat(i);return isNaN(e)?"":e.toFixed(2)}},watch:{show(){this.$emit("change",this.show)},value(){this.value&&chrome.storage.local.get(this.dataKey,i=>{this.rawUserData=i[this.dataKey][this.site.host],this.show=this.value})}},computed:{userData(){return Object.entries(this.rawUserData).map(i=>{const e=i[1],{downloaded:t,uploaded:s}=e;return t==0&&s>0?e.ratio=-1:t>0&&(e.ratio=s/t),e.date=i[0],e})}},methods:{save(){this.show=!1},removeConfirm(i){confirm(this.$t("settings.sites.userinfo.deleteConfirm"))&&(this.$delete(this.rawUserData,i.date),chrome.storage.local.get(this.dataKey,e=>{delete e[this.dataKey][this.site.host][i.date],chrome.storage.local.set(e,()=>{})}))}}});var M=function(){var e=this,t=e._self._c;return e._self._setupProxy,t("v-dialog",{attrs:{"max-width":"1200"},model:{value:e.show,callback:function(s){e.show=s},expression:"show"}},[t("v-card",[t("v-card-title",{staticClass:"headline blue-grey darken-2",staticStyle:{color:"white"}},[e._v(e._s(e.$t("settings.sites.userinfo.title"))+"@"+e._s(this.site.name))]),t("v-card-text",[t("v-data-table",{attrs:{headers:e.headers,items:e.userData,pagination:e.pagination},on:{"update:pagination":function(s){e.pagination=s}},scopedSlots:e._u([{key:"items",fn:function(s){return[t("td",[e._v(e._s(s.item.date))]),t("td",[e._v(e._s(s.item.name))]),t("td",[e._v(e._s(s.item.levelName))]),t("td",{staticClass:"number"},[t("div",[e._v(" "+e._s(e._f("formatSize")(s.item.uploaded))+" "),t("v-icon",{attrs:{small:"",color:"green darken-4"}},[e._v("expand_less")])],1),t("div",[e._v(" "+e._s(e._f("formatSize")(s.item.downloaded))+" "),t("v-icon",{attrs:{small:"",color:"red darken-4"}},[e._v("expand_more")])],1)]),t("td",{staticClass:"number"},[e._v(e._s(e._f("formatRatio")(s.item.ratio)))]),t("td",{staticClass:"number"},[e._v(e._s(s.item.seeding))]),t("td",{staticClass:"number"},[e._v(e._s(e._f("formatSize")(s.item.seedingSize)))]),t("td",{staticClass:"number"},[e._v(e._s(e._f("formatNumber")(s.item.bonus)))]),t("td",[t("v-icon",{staticClass:"ml-2",attrs:{small:"",color:"error",title:e.$t("common.remove"),disabled:s.item.date==="latest"},on:{click:function(a){return e.removeConfirm(s.item)}}},[e._v("delete")])],1)]}}])})],1),t("v-divider"),t("v-card-actions",{staticClass:"pa-3"},[t("v-spacer"),t("v-btn",{attrs:{flat:"",color:"success"},on:{click:e.save}},[t("v-icon",[e._v("check_circle_outline")]),t("span",{staticClass:"ml-1"},[e._v(e._s(e.$t("common.ok")))])],1)],1)],1)],1)},R=[],A=r(D,M,R,!1,null,"66c83107",null,null);const F=A.exports,d=new _,N=o.extend({components:{AddSite:T,EditSite:E,UserInfo:F},data(){return{selected:[],pagination:{rowsPerPage:-1},showAddDialog:!1,showEditDialog:!1,showUserInfo:!1,siteDuplicate:!1,sites:[],selectedSite:{},dialogRemoveConfirm:!1,options:this.$store.state.options,importing:!1,importingCount:0,importedCount:0,fileImport:null,errorMsg:"",haveError:!1,haveSuccess:!1,successMsg:"",faviconReseting:!1,loadingIconSites:[]}},methods:{add(){this.showAddDialog=!0},edit(i){let e=this.$store.state.options.sites.findIndex(t=>i.name===t.name);e!==-1&&(this.selectedSite=this.$store.state.options.sites[e],this.showEditDialog=!0)},editUserInfo(i){let e=this.$store.state.options.sites.findIndex(t=>i.name===t.name);e!==-1&&(this.selectedSite=this.$store.state.options.sites[e],this.showUserInfo=!0)},removeConfirm(i){this.selectedSite=i,this.dialogRemoveConfirm=!0},remove(){this.dialogRemoveConfirm=!1,this.$store.commit("removeSite",this.selectedSite),this.selectedSite={}},removeSelected(){confirm(this.$t("settings.sites.index.removeSelectedConfirm").toString())&&(this.selected.forEach(i=>{this.$store.commit("removeSite",i)}),this.selected=[])},updateSearchStatus(i){i.allowSearch=!i.allowSearch,this.$store.commit("updateSite",i),this.pagination.rowsPerPage=0,this.pagination.rowsPerPage=-1},updateAllowGetUserInfo(i){i.allowGetUserInfo=!i.allowGetUserInfo,this.$store.commit("updateSite",i),this.pagination.rowsPerPage=0,this.pagination.rowsPerPage=-1},updateOfflineStatus(i){i.offline=!i.offline,this.$store.commit("updateSite",i),this.pagination.rowsPerPage=0,this.pagination.rowsPerPage=-1},updateSite(i){this.$store.commit("updateSite",i),this.pagination.rowsPerPage=0,this.pagination.rowsPerPage=-1},addSite(i){if(!i.host){let t=h.parseURL(i.url);i.host=t.host}if(!i.icon){let t=h.parseURL(i.url);i.icon=`${t.protocol}://${i.host}/favicon.ico`}this.$store.state.options.sites.findIndex(t=>t.host===i.host)===-1?(i.activeURL||(i.activeURL=i.url),this.$store.commit("addSite",i)):this.siteDuplicate=!0},importAll(){confirm(this.$t("settings.sites.index.importAllConfirm").toString())&&(this.importing||(this.importing=!0,this.importedCount=0,this.$store.state.options.system.sites.forEach(i=>{(this.$store.state.options.sites?this.$store.state.options.sites.findIndex(t=>t.host===i.host):-1)===-1&&this.checkAndAddSite(i)})))},editPlugins(i){this.$router.push({name:"set-site-plugins",params:{host:i.host}})},writeLog(i){d.sendRequest(c.writeLog,null,{module:p.options,event:i.event,msg:i.msg,data:i.data})},editSearchEntry(i){this.$router.push({name:"set-site-search-entry",params:{host:i.host}})},checkAndAddSite(i){this.importingCount++,d.sendRequest(c.getUserInfo,null,i).then(e=>{console.log(e),e&&e.name&&(this.$store.commit("addSite",Object.assign({valid:!0,activeURL:i.url,allowSearch:!0,allowGetUserInfo:!0},i)),this.importedCount++)}).catch(e=>{console.log("error",e)}).finally(()=>{this.importingCount--,this.importingCount==0&&(this.importing=!1)})},clearMessage(){this.successMsg="",this.errorMsg=""},shareSiteConfig(i){let e=(i.host||i.name)+".json",t=JSON.parse(JSON.stringify(i));if(["id","user","passkey","defaultClientId"].forEach(a=>{t[a]&&delete t[a]}),t.isCustom||["categories","selectors","searchEntryConfig","description","icon","url","schema","tags","formerHosts"].forEach(a=>{t[a]&&delete t[a]}),t.plugins&&t.plugins.length>0){const a=[];t.plugins.forEach(n=>{n.isCustom&&a.push(n)}),t.plugins=a}if(t.searchEntry&&t.searchEntry.length>0){const a=[];t.searchEntry.forEach(n=>{n.isCustom&&a.push(n)}),t.searchEntry=a}const s=new Blob([JSON.stringify(t)],{type:"text/plain"});g.saveAs(s,e)},importConfig(){this.fileImport.click()},importConfigFile(i){this.clearMessage();let e=i.srcElement;if(e.files.length>0&&e.files[0].name.length>0){console.log(e.files);for(let t=0;t<e.files.length;t++){const s=e.files[t],a=new FileReader;a.onload=n=>{try{const l=JSON.parse(n.target.result);this.importSite(l)}catch(l){console.log(l),this.errorMsg=this.$t("common.importFailed").toString()}},a.onerror=()=>{this.errorMsg=this.$t("settings.backup.loadError").toString()},a.readAsText(s)}e.value=""}},importSite(i){const e=JSON.parse(JSON.stringify(this.options));let t=null,s=null;if(e.sites&&e.sites.length>0&&(t=e.sites.find(a=>a.host===i.host)),e.system&&e.system.sites&&e.system.sites.length>0&&(s=e.system.sites.find(a=>a.host===i.host)),t){if(!confirm(this.$t("settings.sites.index.importDuplicateConfirm",{name:t.name||t.host}).toString()))return;if(i.plugins&&i.plugins.length>0){t.plugins||(t.plugins=[]);let a=t.plugins,n=[];a.forEach(l=>{l.isCustom&&n.push(l)}),i.plugins.forEach(l=>{a.findIndex(f=>f.name===l.name)===-1&&(l.id=v.getNewId(),n.push(l))}),t.plugins=n}if(i.searchEntry&&i.searchEntry.length>0){t.searchEntry||(t.searchEntry=[]);let a=t.searchEntry;i.searchEntry.forEach(n=>{a.findIndex(u=>u.name===n.name)===-1&&(n.id=v.getNewId(),a.push(n))})}this.updateSite(t)}else{if(!confirm(this.$t("settings.sites.index.importConfirm",{name:i.name||i.host}).toString()))return;s?this.addSite(Object.assign(s,i)):this.addSite(i)}this.successMsg=this.$t("settings.sites.index.importedText").toString()},resetFavicons(){this.faviconReseting=!0,d.sendRequest(c.resetFavicons).then(i=>{i?this.$store.commit("updateOptions",i):console.error(`重置站点图标缓存失败, options: ${i}`)}).finally(()=>{this.faviconReseting=!1})},resetFavicon(i){if(!i.host)return;const e=i.host;this.loadingIconSites.includes(e)||this.loadingIconSites.push(e),d.sendRequest(c.resetFavicon,null,i.activeURL||i.url).then(t=>{this.$store.commit("readConfig")}).catch(t=>{console.log(t)}).finally(()=>{let t=this.loadingIconSites.indexOf(e);console.log("host: %s, index: %s",e,t),t!=-1&&this.loadingIconSites.splice(t,1)})}},created(){this.options.system||this.writeLog({event:"Sites.init.error",msg:"系统配置信息丢失"}),this.options.system&&!this.options.system.sites&&this.writeLog({event:"Sites.init.error",msg:"系统配置网站信息丢失"})},mounted(){this.fileImport=this.$refs.fileImport,this.fileImport.addEventListener("change",this.importConfigFile)},beforeDestroy(){this.fileImport.removeEventListener("change",this.importConfigFile)},computed:{headers(){return[{text:this.$t("settings.sites.index.headers.name"),align:"center",value:"name",width:"110px"},{text:this.$t("settings.sites.index.headers.tags"),align:"left",value:"tags"},{text:this.$t("settings.sites.index.headers.allowSearch"),align:"left",value:"allowSearch"},{text:this.$t("settings.sites.index.headers.allowGetUserInfo"),align:"left",value:"allowGetUserInfo"},{text:this.$t("settings.sites.index.headers.offline"),align:"left",value:"offline"},{text:this.$t("settings.sites.index.headers.activeURL"),align:"left",value:"activeURL"},{text:this.$t("settings.sites.index.headers.action"),value:"name",sortable:!1}]}},watch:{successMsg(){this.haveSuccess=this.successMsg!=""},errorMsg(){this.haveError=this.errorMsg!=""}}});var O=function(){var e=this,t=e._self._c;return e._self._setupProxy,t("div",{staticClass:"set-sites"},[t("v-alert",{attrs:{value:!0,type:"info"}},[t("div",[e._v(e._s(e.$t("settings.sites.index.title")))])]),t("v-card",[t("v-card-title",[t("v-btn",{attrs:{color:"success"},on:{click:e.add}},[t("v-icon",{staticClass:"mr-2"},[e._v("add")]),e._v(" "+e._s(e.$t("common.add"))+" ")],1),t("v-btn",{attrs:{color:"error",disabled:e.selected.length==0},on:{click:e.removeSelected}},[t("v-icon",{staticClass:"mr-2"},[e._v("remove")]),e._v(" "+e._s(e.$t("common.remove"))+" ")],1),t("v-divider",{staticClass:"mx-3 mt-0",attrs:{inset:"",vertical:""}}),t("input",{ref:"fileImport",staticStyle:{display:"none"},attrs:{type:"file",multiple:"",accept:"application/json"}}),t("v-btn",{attrs:{color:"info"},on:{click:e.importConfig}},[t("v-icon",{staticClass:"mr-2"},[e._v("folder_open")]),e._v(" "+e._s(e.$t("settings.sites.index.importConfig"))+" ")],1),t("v-divider",{staticClass:"mx-3 mt-0",attrs:{inset:"",vertical:""}}),t("v-btn",{attrs:{color:"info",loading:e.importing},on:{click:e.importAll}},[t("v-icon",{staticClass:"mr-2"},[e._v("gps_fixed")]),e._v(" "+e._s(e.$t("settings.sites.index.importAll"))+" ")],1),e.importing?t("span",[e._v(e._s(e.$t("settings.sites.index.importedText"))+" "+e._s(e.importedCount))]):e._e(),t("v-divider",{staticClass:"mx-3 mt-0",attrs:{inset:"",vertical:""}}),t("v-btn",{attrs:{color:"purple",dark:"",loading:e.faviconReseting},on:{click:e.resetFavicons}},[t("v-icon",{staticClass:"mr-2"},[e._v("cached")]),e._v(" "+e._s(e.$t("settings.sites.index.resetFavicons"))+" ")],1),t("v-spacer"),t("v-text-field",{staticClass:"search",attrs:{"append-icon":"search",label:"Search","single-line":"","hide-details":""}})],1),t("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:this.$store.state.options.sites,pagination:e.pagination,"item-key":"host","select-all":""},on:{"update:pagination":function(s){e.pagination=s}},scopedSlots:e._u([{key:"items",fn:function(s){return[t("td",{staticStyle:{width:"20px"}},[t("v-checkbox",{attrs:{primary:"","hide-details":""},model:{value:s.selected,callback:function(a){e.$set(s,"selected",a)},expression:"props.selected"}})],1),t("td",{staticClass:"text-xs-center pb-1"},[t("v-btn",{staticClass:"siteIcon",attrs:{flat:"",icon:"",title:e.$t("settings.sites.index.resetFavicons"),loading:e.loadingIconSites.includes(s.item.host)},on:{click:function(a){return a.stopPropagation(),e.resetFavicon(s.item)}}},[e.loadingIconSites.includes(s.item.host)?e._e():t("v-avatar",{attrs:{size:18}},[t("img",{attrs:{src:s.item.icon}})])],1),t("br"),t("a",{on:{click:function(a){return e.edit(s.item)}}},[t("span",[e._v(e._s(s.item.name))])])],1),t("td",[e._v(e._s(s.item.tags&&s.item.tags.join(", ")))]),t("td",[t("v-switch",{attrs:{"true-value":"true","false-value":"false","input-value":s.item.allowSearch?"true":"false","hide-details":"",disabled:s.item.offline},on:{click:function(a){return a.stopPropagation(),e.updateSearchStatus(s.item)}}})],1),t("td",[t("v-switch",{attrs:{"true-value":"true","false-value":"false","input-value":s.item.allowGetUserInfo?"true":"false","hide-details":"",disabled:s.item.offline},on:{click:function(a){return a.stopPropagation(),e.updateAllowGetUserInfo(s.item)}}})],1),t("td",[t("v-switch",{attrs:{"true-value":"true","false-value":"false","input-value":s.item.offline?"true":"false","hide-details":""},on:{click:function(a){return a.stopPropagation(),e.updateOfflineStatus(s.item)}}})],1),t("td",[t("a",{attrs:{href:s.item.activeURL,target:"_blank",rel:"noopener noreferrer nofollow"}},[e._v(e._s(s.item.activeURL))])]),t("td",[t("v-icon",{attrs:{small:"",title:e.$t("common.edit")},on:{click:function(a){return e.edit(s.item)}}},[e._v("edit")]),t("v-icon",{staticClass:"ml-2",attrs:{small:"",title:e.$t("settings.sites.index.plugins")},on:{click:function(a){return e.editPlugins(s.item)}}},[e._v("assistant")]),s.item.allowGetUserInfo?t("v-icon",{staticClass:"ml-2",attrs:{small:"",title:e.$t("settings.sites.index.showUserInfo")},on:{click:function(a){return e.editUserInfo(s.item)}}},[e._v("view_list")]):e._e(),t("v-icon",{staticClass:"ml-2",attrs:{small:"",title:e.$t("settings.sites.index.searchEntry")},on:{click:function(a){return e.editSearchEntry(s.item)}}},[e._v("search")]),t("v-icon",{staticClass:"ml-2",attrs:{small:"",color:"error",title:e.$t("common.remove")},on:{click:function(a){return e.removeConfirm(s.item)}}},[e._v("delete")]),t("v-icon",{staticClass:"ml-2",attrs:{small:"",color:"info",title:e.$t("common.share")},on:{click:function(a){return e.shareSiteConfig(s.item)}}},[e._v("share")])],1)]}}]),model:{value:e.selected,callback:function(s){e.selected=s},expression:"selected"}})],1),t("AddSite",{on:{save:e.addSite},model:{value:e.showAddDialog,callback:function(s){e.showAddDialog=s},expression:"showAddDialog"}}),t("EditSite",{attrs:{site:e.selectedSite},on:{save:e.updateSite},model:{value:e.showEditDialog,callback:function(s){e.showEditDialog=s},expression:"showEditDialog"}}),t("UserInfo",{attrs:{site:e.selectedSite},model:{value:e.showUserInfo,callback:function(s){e.showUserInfo=s},expression:"showUserInfo"}}),t("v-dialog",{attrs:{width:"300"},model:{value:e.dialogRemoveConfirm,callback:function(s){e.dialogRemoveConfirm=s},expression:"dialogRemoveConfirm"}},[t("v-card",[t("v-card-title",{staticClass:"headline red lighten-2"},[e._v(e._s(e.$t("settings.sites.index.removeTitle")))]),t("v-card-text",[e._v(e._s(e.$t("settings.sites.index.removeConfirm")))]),t("v-divider"),t("v-card-actions",[t("v-spacer"),t("v-btn",{attrs:{flat:"",color:"info"},on:{click:function(s){e.dialogRemoveConfirm=!1}}},[t("v-icon",[e._v("cancel")]),t("span",{staticClass:"ml-1"},[e._v(e._s(e.$t("common.cancel")))])],1),t("v-btn",{attrs:{color:"error",flat:""},on:{click:e.remove}},[t("v-icon",[e._v("check_circle_outline")]),t("span",{staticClass:"ml-1"},[e._v(e._s(e.$t("common.ok")))])],1)],1)],1)],1),t("v-alert",{attrs:{value:!0,color:"grey"}},[t("div",{domProps:{innerHTML:e._s(e.$t("settings.sites.index.subTitle"))}})]),t("v-snackbar",{attrs:{top:"",timeout:3e3,color:"error"},model:{value:e.siteDuplicate,callback:function(s){e.siteDuplicate=s},expression:"siteDuplicate"}},[e._v(e._s(e.$t("settings.sites.index.siteDuplicateText")))]),t("v-snackbar",{attrs:{top:"",timeout:3e3,color:"error"},model:{value:e.haveError,callback:function(s){e.haveError=s},expression:"haveError"}},[e._v(e._s(e.errorMsg))]),t("v-snackbar",{attrs:{bottom:"",timeout:3e3,color:"success"},model:{value:e.haveSuccess,callback:function(s){e.haveSuccess=s},expression:"haveSuccess"}},[e._v(e._s(e.successMsg))])],1)},q=[],z=r(N,O,q,!1,null,"ef65d3be",null,null);const B=z.exports;export{B as default};
