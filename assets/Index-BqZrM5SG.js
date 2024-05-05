import{V as d,n as h,E as l,b as p,P as m,h as c,z as v}from"./index-C9rdr-_b.js";import{B as f,F as _}from"./downloader-tiA6DBPa.js";import{D as g}from"./DownloadTo-DVBt1JPv.js";const C=d.extend({props:{dark:Boolean,title:String,mini:Boolean,small:Boolean},data(){return{colors:f,show:!1}},methods:{changeColor(s){this.$emit("change",s)}},watch:{show(){this.show?this.$emit("show"):this.$emit("hide")}}});var $=function(){var t=this,e=t._self._c;return t._self._setupProxy,e("v-menu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function({on:o}){return[e("v-btn",t._g({class:["ma-0",t.mini?"btn-mini":""],attrs:{icon:"",small:t.small,dark:t.dark,title:t.title}},o),[e("v-icon",{attrs:{small:t.small}},[t._v("color_lens")])],1)]}}]),model:{value:t.show,callback:function(o){t.show=o},expression:"show"}},t._l(t.colors,function(o,i){return e("div",{key:i},[o!="black"?[t._l([4,3,2,1],function(n,a){return e("v-btn",{key:`${i}.darken-${a}`,staticClass:"white--text pa-0 ma-0",staticStyle:{"border-radius":"0","min-width":"30px"},attrs:{color:`${o} darken-${n}`,small:""},on:{click:function(u){return u.stopPropagation(),t.changeColor(`${o} darken-${n}`)}}})}),e("v-btn",{staticClass:"white--text pa-0 ma-0",staticStyle:{"border-radius":"0","min-width":"30px"},attrs:{color:o,small:""},on:{click:function(n){return n.stopPropagation(),t.changeColor(o)}}}),t._l([1,2,3,4,5],function(n,a){return e("v-btn",{key:`${i}.${a}`,staticClass:"white--text pa-0 ma-0",staticStyle:{"border-radius":"0","min-width":"30px"},attrs:{color:`${o} lighten-${n}`,small:""},on:{click:function(u){return u.stopPropagation(),t.changeColor(`${o} lighten-${n}`)}}})})]:t._e()],2)}),0)},b=[],x=h(C,$,b,!1,null,null,null,null);const w=x.exports,y=new p,k=d.extend({components:{ColorSelector:w,DownloadTo:g},props:{width:{type:[String,Number],default:"205px"},height:{type:[String,Number],default:"90px"},name:String,description:String,count:{type:Number,default:0},color:{type:String,default:"grey"},group:{type:Object},active:Boolean,readOnly:Boolean,isDefault:Boolean,items:{type:Array,default:()=>[]}},data(){return{dark:!0,colorBoxIsOpen:!1}},watch:{color(){this.color.indexOf("lighten")>0?this.dark=!1:this.dark=!0}},methods:{remove(){this.$emit("remove",this.group)},changeColor(s){this.$emit("changeColor",s,this.group)},click(){this.$emit("click",this.group)},rename(){let s=window.prompt(this.$t("collection.changeGroupName").toString(),this.name);s&&s!==this.name&&this.$emit("rename",s,this.group)},setDefault(){this.$emit("setDefault",this.group)},cancelDefault(){this.$emit("cancelDefault",this.group)},onDownloadSuccess(s){console.log("onDownloadSuccess"),this.$emit("downloadSuccess",s)},onDownloadError(s){this.$emit("downloadError",s)},copyLinksToClipboard(){let s=[];this.items.forEach(t=>{s.push(t.url)}),y.sendRequest(l.copyTextToClipboard,null,s.join(`
`)).then(t=>{let e=this.$t("searchTorrent.copySelectedToClipboardSuccess",{count:s.length}).toString();this.$emit("downloadSuccess",e)}).catch(()=>{let t=this.$t("searchTorrent.copyLinkToClipboardError").toString();this.$emit("downloadError",t)})}},computed:{styles(){let s={width:this.width,height:this.height};return typeof this.width=="number"?s.width=this.width.toString()+"px":s.width=this.width,typeof this.height=="number"?s.height=this.height.toString()+"px":s.height=this.height,s},size(){let s=0;return this.items&&this.items.length>0&&this.items.forEach(t=>{t.size&&t.size>0&&(s+=t.size)}),s}}});var S=function(){var t=this,e=t._self._c;return t._self._setupProxy,e("v-hover",{scopedSlots:t._u([{key:"default",fn:function({hover:o}){return e("v-card",{class:`elevation-${o||t.active?5:1} mr-2`,style:t.styles,attrs:{color:t.color,dark:t.dark},on:{click:t.click}},[e("v-card-title",{staticClass:"ma-0 pa-2"},[e("div",[e("span",{staticClass:"subheading"},[t._v(t._s(t.name))]),e("span",{staticClass:"ml-2 caption"},[t._v("("+t._s(t.count)+")")])]),e("div",[t._v(t._s(t.description))])]),e("v-card-actions",{staticClass:"toolbar"},[t.count>0?e("span",{staticClass:"ma-1 caption"},[t._v(t._s(t._f("formatSize")(t.size)))]):t._e(),e("v-spacer"),o&&t.count>0?[e("DownloadTo",{staticClass:"mx-0 btn-mini",attrs:{downloadOptions:t.items,flat:"",icon:""},on:{error:t.onDownloadError,success:t.onDownloadSuccess}}),e("v-btn",{staticClass:"mx-0 btn-mini",attrs:{icon:"",flat:"",title:t.$t("searchTorrent.copyToClipboardTip")},on:{click:function(i){return i.stopPropagation(),t.copyLinksToClipboard.apply(null,arguments)}}},[e("v-icon",[t._v("file_copy")])],1)]:t._e(),t.readOnly?t._e():[o||t.colorBoxIsOpen?[e("v-btn",{staticClass:"ma-0 btn-mini",attrs:{icon:"",title:t.$t("common.edit")},on:{click:function(i){return i.stopPropagation(),t.rename.apply(null,arguments)}}},[e("v-icon",[t._v("edit")])],1),e("v-btn",{staticClass:"ma-0 btn-mini",attrs:{icon:"",title:t.$t("common.remove")},on:{click:function(i){return i.stopPropagation(),t.remove.apply(null,arguments)}}},[e("v-icon",[t._v("delete")])],1),e("ColorSelector",{staticClass:"ma-0",attrs:{dark:t.dark,mini:"",title:t.$t("common.color")},on:{change:t.changeColor,show:function(i){t.colorBoxIsOpen=!0},hide:function(i){t.colorBoxIsOpen=!1}}}),t.isDefault?t._e():e("v-btn",{staticClass:"ma-0 btn-mini",attrs:{icon:"",title:t.$t("common.setDefault")},on:{click:function(i){return i.stopPropagation(),t.setDefault.apply(null,arguments)}}},[e("v-icon",[t._v("favorite_border")])],1)]:t._e(),t.isDefault?e("v-btn",{staticClass:"ma-0 btn-mini",attrs:{icon:"",title:t.$t("common.cancelDefault")},on:{click:function(i){return i.stopPropagation(),t.cancelDefault.apply(null,arguments)}}},[e("v-icon",[t._v("favorite")])],1):t._e()]],2)],1)}}])})},I=[],G=h(k,S,I,!1,null,"7c7461cc",null,null);const T=G.exports,E=d.extend({props:{flat:Boolean,icon:Boolean,small:Boolean,iconText:{type:String,default:"add"},item:{type:Object,default:()=>({})},groups:Array,color:{type:String,default:"success"},label:{type:String,default:""}},data(){return{options:this.$store.state.options,contentMenus:[],loading:!1,haveSuccess:!1,haveError:!1}},methods:{showContentMenus(s){let t=[],e=m.clone(this.item.groups||[]);e.push(c.all),e.push(c.noGroup),this.groups.forEach(o=>{o.id&&o.name&&!e.includes(o.id)&&t.push({title:o.name,fn:()=>{this.$emit("add",this.item,o)}})}),t.length!=0&&m.showContextMenu(t,s)},clearStatus(){this.haveSuccess=!1,this.haveError=!1}}});var D=function(){var t=this,e=t._self._c;return t._self._setupProxy,e("v-btn",{attrs:{flat:t.flat,icon:t.icon,small:t.small,loading:t.loading,color:t.color},on:{click:function(o){return o.stopPropagation(),t.showContentMenus.apply(null,arguments)}}},[t.haveSuccess?e("v-icon",{attrs:{color:"success",small:""}},[t._v("done")]):t.haveError?e("v-icon",{attrs:{color:"red",small:""}},[t._v("close")]):e("v-icon",{attrs:{small:"",title:t.$t("collection.addToGroup")}},[t._v(t._s(t.iconText))]),t._v(" "+t._s(t.label)+" ")],1)},M=[],P=h(E,D,M,!1,null,null,null,null);const R=P.exports,r=new p,O=d.extend({components:{DownloadTo:g,GroupCard:T,AddToGroup:R},data(){return{selected:[],selectedItem:{},pagination:{rowsPerPage:10,sortBy:"time",descending:!0},items:[],allItems:[],groups:[],options:this.$store.state.options,errorMsg:"",haveError:!1,haveSuccess:!1,successMsg:"",siteCache:{},activeGroupId:c.all,defaultGroupId:"",filterKey:"",loading:!1}},activated(){this.getTorrentCollections()},methods:{clearMessage(){this.successMsg="",this.errorMsg=""},clear(){confirm(this.$t("common.clearConfirm").toString())&&r.sendRequest(l.clearTorrentCollention).then(s=>{this.allItems=[],this.items=[],this.groups=[]})},remove(s){r.sendRequest(l.deleteTorrentFromCollention,null,s).then(t=>{this.getTorrentCollections()})},removeConfirm(s){confirm(this.$t("common.removeConfirm").toString())&&this.remove(s)},getTorrentCollections(){if(this.loading)return;const s=[];return s.push(r.sendRequest(l.getTorrentCollectionGroups)),s.push(r.sendRequest(l.getTorrentCollections)),this.loading=!0,Promise.all(s).then(t=>{console.log("getTorrentCollections",t),this.items=[],this.groups=[];let e={id:c.noGroup,name:this.$t("collection.noGroup").toString(),count:0,readOnly:!0,width:120};t[1].forEach(i=>{let n=this.siteCache[i.host];n||(n=m.getSiteFromHost(i.host,this.options),this.siteCache[i.host]=n),i.site=n,(!i.groups||i.groups.length==0)&&e.count++,this.items.push(i)}),this.allItems=m.clone(this.items);let o={name:this.$t("common.all").toString(),id:c.all,count:this.allItems.length,color:"grey darken-2",readOnly:!0,width:120};this.groups.push(o),e.count!==o.count&&e.count>0&&this.groups.push(e),this.groups.push(...t[0]),this.activeGroupId!==c.all&&this.filterCollections(),this.loading=!1})},removeSelected(){this.selected&&this.selected.length>0&&confirm(this.$t("common.actionConfirm").toString())&&this.remove(this.selected)},onError(s){this.errorMsg=s},onSuccess(s){this.successMsg=s},addGroup(){let s=window.prompt(this.$t("collection.inputGroupName").toString());s&&r.sendRequest(l.addTorrentCollectionGroup,null,{name:s,color:f[Math.floor(Math.random()*f.length)]}).then(()=>{this.getTorrentCollections()})},getGroupList(s){let t=[];return s.groups&&s.groups.forEach(e=>{this.groups.forEach(o=>{o.id===e&&t.push(o)})}),t.length==0&&t.push({name:this.$t("collection.noGroup").toString()}),t},removeGroup(s){s.count&&s.count>0&&!confirm(this.$t("collection.removeGroupConfirm",{count:s.count}).toString())||(r.sendRequest(l.removeTorrentCollectionGroup,null,s).then(()=>{this.getTorrentCollections()}),this.cancelDefaultGroup(s))},changeGroupColor(s,t){t.color=s,console.log(s,t),r.sendRequest(l.updateTorrentCollectionGroup,null,t).then(()=>{this.getTorrentCollections()})},addToGroup(s,t){console.log(s,t),r.sendRequest(l.addTorrentCollectionToGroup,null,{item:s,groupId:t.id}).then(()=>{this.getTorrentCollections()})},changeGroupName(s,t){t.name=s,r.sendRequest(l.updateTorrentCollectionGroup,null,t).then(()=>{this.getTorrentCollections()})},removeFromGroup(s,t){r.sendRequest(l.removeTorrentCollectionFromGroup,null,{item:s,groupId:t.id}).then(()=>{this.getTorrentCollections()})},setGroupActive(s){if(this.activeGroupId=s.id,this.activeGroupId===c.all){this.getTorrentCollections();return}this.filterCollections()},filterCollections(){let s=this.activeGroupId;this.items=this.getItemsFromGroup(s)},getItemsFromGroup(s){if(s===c.all)return this.allItems;let t=[];for(let e=0;e<this.allItems.length;e++){const o=this.allItems[e];(o.groups&&o.groups.includes(s)||s===c.noGroup&&(!o.groups||o.groups.length===0))&&t.push(o)}return t},setDefaultGroup(s){this.defaultGroupId=s.id,this.$store.dispatch("saveConfig",{defaultCollectionGroupId:s.id})},cancelDefaultGroup(s){this.defaultGroupId===s.id&&(this.defaultGroupId="",this.$store.dispatch("saveConfig",{defaultCollectionGroupId:""}))},setMovieId(s){let t=prompt(this.$t("collection.setMovieId").toString());if(!t)return;let e="",o="";if(/^(tt\d+)$/.test(t)?o=t:/^(\d+)$/.test(t)&&(e=t),o||e){let i=m.clone(s);delete i.site,i.movieInfo={imdbId:o,doubanId:e},r.sendRequest(l.updateTorrentCollention,null,i).then(()=>{this.getTorrentCollections()})}},searchResultFilter(s,t){if(t=t.toString().toLowerCase(),t.trim()==="")return s;let e=t.split(" ");return s.filter(o=>{let i=[];i.push(o.title),o.subTitle&&i.push(o.title),o.movieInfo&&(o.movieInfo.title&&i.push(o.movieInfo.title),o.movieInfo.alt_title&&i.push(o.movieInfo.alt_title));let n=i.join("").toLowerCase(),a=!0;return e.forEach(u=>{u.trim()!=""&&(a=a&&n.indexOf(u)>-1)}),a})},saveTorrentFile(s){let t=v.GET;s.site&&(t=s.site.downloadMethod||v.GET);let e=s.url+"",o=new _({url:e,timeout:this.options.connectClientTimeout,fileName:`[${s.site.name}][${s.title}].torrent`});o.requestMethod=t,o.onError=i=>{},o.start()}},created(){this.getTorrentCollections(),this.defaultGroupId=this.options.defaultCollectionGroupId},watch:{successMsg(){this.haveSuccess=this.successMsg!=""},errorMsg(){this.haveError=this.errorMsg!=""}},computed:{headers(){return[{text:"№",align:"left",sortable:!1,value:"title",width:30},{text:this.$t("collection.headers.title"),align:"left",value:"title"},{text:this.$t("collection.headers.site"),align:"left",value:"site.host",width:150},{text:this.$t("collection.headers.size"),align:"right",value:"size",width:100},{text:this.$t("collection.headers.time"),align:"right",value:"time",width:130},{text:this.$t("collection.headers.action"),value:"title",align:"center",sortable:!1,width:150}]}}});var F=function(){var t=this,e=t._self._c;return t._self._setupProxy,e("div",{staticClass:"collection"},[e("v-alert",{attrs:{value:!0,type:"info"}},[t._v(t._s(t.$t("collection.title")))]),e("v-card",[t.groups.length>1?e("div",{staticClass:"ma-2 pt-2",staticStyle:{height:"120px","overflow-x":"auto",display:"-webkit-box"}},t._l(t.groups,function(o,i){return e("GroupCard",{key:i,attrs:{color:o.color,name:o.name,description:o.description,count:o.count,group:o,active:o.id===t.activeGroupId,readOnly:o.readOnly,width:o.width,isDefault:o.id===t.defaultGroupId,items:t.getItemsFromGroup(o.id)},on:{changeColor:t.changeGroupColor,remove:t.removeGroup,rename:t.changeGroupName,click:t.setGroupActive,setDefault:t.setDefaultGroup,cancelDefault:t.cancelDefaultGroup,downloadSuccess:t.onSuccess,downloadError:t.onError}})}),1):t._e(),e("v-divider"),e("v-card-title",[e("v-btn",{attrs:{color:"error",disabled:t.selected.length==0},on:{click:t.removeSelected}},[e("v-icon",{staticClass:"mr-2"},[t._v("remove")]),t._v(" "+t._s(t.$t("common.remove"))+" ")],1),e("v-btn",{attrs:{color:"error",disabled:t.items.length==0},on:{click:t.clear}},[e("v-icon",{staticClass:"mr-2"},[t._v("clear")]),t._v(" "+t._s(t.$t("common.clear"))+" ")],1),e("v-divider",{staticClass:"mx-3 mt-0",attrs:{vertical:""}}),e("v-btn",{attrs:{color:"success"},on:{click:t.addGroup}},[e("v-icon",{staticClass:"mr-2"},[t._v("add")]),t._v(" "+t._s(t.$t("collection.addGroup"))+" ")],1),e("v-btn",{attrs:{color:"info",href:"https://github.com/pt-plugins/PT-Plugin-Plus/wiki/my-collection",target:"_blank",rel:"noopener noreferrer nofollow"}},[e("v-icon",{staticClass:"mr-2"},[t._v("help")]),t._v(" "+t._s(t.$t("settings.searchSolution.index.help"))+" ")],1),e("v-spacer"),e("v-text-field",{staticClass:"search",attrs:{"append-icon":"search",label:"Search","single-line":"","hide-details":"",clearable:""},model:{value:t.filterKey,callback:function(o){t.filterKey=o},expression:"filterKey"}})],1),e("v-data-table",{staticClass:"dataList",attrs:{search:t.filterKey,"custom-filter":t.searchResultFilter,headers:t.headers,items:t.items,pagination:t.pagination,"item-key":"link","select-all":""},on:{"update:pagination":function(o){t.pagination=o}},scopedSlots:t._u([{key:"items",fn:function(o){return[e("td",{staticStyle:{width:"50px"}},[e("v-checkbox",{attrs:{primary:"","hide-details":""},model:{value:o.selected,callback:function(i){t.$set(o,"selected",i)},expression:"props.selected"}})],1),e("td",[t._v(t._s(o.index+1))]),e("td",[e("v-img",{staticClass:"mx-0 my-2",attrs:{src:o.item.movieInfo&&o.item.movieInfo.image?o.item.movieInfo.image:"./assets/movie.png",contain:"","max-height":o.item.movieInfo&&o.item.movieInfo.image?100:80,position:"left center"}},[e("v-layout",{staticStyle:{"margin-left":"90px"},attrs:{row:"",wrap:""}},[o.item.movieInfo&&o.item.movieInfo.title?[e("v-flex",{attrs:{xs12:""}},[e("a",{attrs:{href:o.item.movieInfo.link,target:"_blank",rel:"noopener noreferrer nofollow"}},[e("img",{staticClass:"mr-2 mt-0",attrs:{src:"https://img3.doubanio.com/favicon.ico",width:"16"}})]),e("span",{staticClass:"title"},[t._v(t._s(o.item.movieInfo.title))]),e("span",{staticClass:"caption ml-2"},[t._v("("+t._s(o.item.movieInfo.year)+")")])]),e("v-flex",{staticClass:"mb-1",attrs:{xs12:""}},[e("span",{staticClass:"sub-title"},[t._v(t._s(o.item.movieInfo.alt_title))])])]:t._e(),[e("v-flex",{attrs:{xs12:""}},[e("a",{attrs:{href:o.item.link,target:"_blank",title:o.item.title,rel:"noopener noreferrer nofollow"}},[e("span",[t._v(t._s(o.item.title))])])]),e("v-flex",{attrs:{xs12:""}},[e("span",{staticClass:"sub-title"},[t._v(t._s(o.item.subTitle))])])]],2)],1),[e("div",{staticStyle:{"margin-left":"90px"}},[t._l(t.getGroupList(o.item),function(i,n){return e("v-hover",{key:n,scopedSlots:t._u([{key:"default",fn:function({hover:a}){return e("v-chip",{attrs:{close:a&&i.id!=null,label:"",color:i.color||"grey",dark:!(i.color&&i.color.indexOf("lighten")>0),small:""},on:{input:function(u){return t.removeFromGroup(o.item,i)}}},[t._v(t._s(i.name))])}}],null,!0)})}),t.groups&&t.groups.length>1?e("AddToGroup",{attrs:{icon:"",small:"",flat:"",item:o.item,groups:t.groups},on:{add:t.addToGroup}}):t._e()],2)]],2),e("td",[o.item.site?e("v-layout",{attrs:{row:"",wrap:""}},[e("a",{staticClass:"nodecoration",attrs:{href:o.item.site.activeURL,target:"_blank",rel:"noopener noreferrer nofollow"}},[e("v-avatar",{attrs:{size:15}},[e("img",{attrs:{src:o.item.site.icon}})]),e("span",{staticClass:"caption ml-1 site-name"},[t._v(t._s(o.item.site.name))])],1)]):t._e()],1),e("td",{staticClass:"text-xs-right"},[t._v(t._s(t._f("formatSize")(o.item.size)))]),e("td",{staticClass:"text-xs-right"},[t._v(t._s(t._f("formatDate")(o.item.time)))]),e("td",{staticClass:"text-xs-center"},[o.item.movieInfo?[o.item.movieInfo.imdbId?e("v-btn",{staticClass:"mx-0",attrs:{flat:"",icon:"",small:"",title:t.$t("common.search"),to:`/search-torrent/${o.item.movieInfo.imdbId}`}},[e("v-icon",{attrs:{small:""}},[t._v("search")])],1):o.item.movieInfo.doubanId?e("v-btn",{staticClass:"mx-0",attrs:{flat:"",icon:"",small:"",title:t.$t("common.search"),to:`/search-torrent/douban${o.item.movieInfo.doubanId}|${o.item.movieInfo.title}|${o.item.movieInfo.alt_title}`}},[e("v-icon",{attrs:{small:""}},[t._v("search")])],1):e("v-btn",{staticClass:"mx-0",attrs:{flat:"",icon:"",small:"",title:t.$t("collection.setMovieId")},on:{click:function(i){return t.setMovieId(o.item)}}},[e("v-icon",{attrs:{small:""}},[t._v("edit")])],1)]:t._e(),e("DownloadTo",{staticClass:"mx-0",attrs:{downloadOptions:o.item,flat:"",icon:"",small:""},on:{error:t.onError,success:t.onSuccess}}),o.item.site.downloadMethod=="POST"?e("v-btn",{staticClass:"mx-0",attrs:{flat:"",icon:"",small:""},on:{click:function(i){return i.stopPropagation(),t.saveTorrentFile(o.item)}}},[e("v-icon",{attrs:{small:"",title:t.$t("searchTorrent.saveTip")}},[t._v("save")])],1):e("v-btn",{staticClass:"mx-0",attrs:{flat:"",icon:"",small:"",href:o.item.url,target:"_blank",rel:"noopener noreferrer nofollow",title:t.$t("searchTorrent.saveTip")}},[e("v-icon",{attrs:{small:""}},[t._v("save")])],1),e("v-btn",{staticClass:"mx-0",attrs:{flat:"",icon:"",small:"",color:"error",title:t.$t("common.remove")},on:{click:function(i){return t.removeConfirm(o.item)}}},[e("v-icon",{attrs:{small:""}},[t._v("delete")])],1)],2)]}}]),model:{value:t.selected,callback:function(o){t.selected=o},expression:"selected"}})],1),e("v-snackbar",{attrs:{top:"",timeout:3e3,color:"error","multi-line":""},model:{value:t.haveError,callback:function(o){t.haveError=o},expression:"haveError"}},[e("span",{domProps:{innerHTML:t._s(t.errorMsg)}})]),e("v-snackbar",{attrs:{bottom:"",timeout:3e3,color:"success","multi-line":""},model:{value:t.haveSuccess,callback:function(o){t.haveSuccess=o},expression:"haveSuccess"}},[e("span",{domProps:{innerHTML:t._s(t.successMsg)}})])],1)},q=[],B=h(O,F,q,!1,null,null,null,null);const N=B.exports;export{N as default};
