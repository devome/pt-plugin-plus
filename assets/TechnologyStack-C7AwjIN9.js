import{V as i,n as o}from"./index-C2uF3Qql.js";const l={basiccontext:"^3.5.1","caniuse-lite":"^1.0.30001612","crypto-js":"^4.2.0",dayjs:"^1.11.5","dom-to-image":"^2.6.0",dotenv:"^8.2.0",extend:"^3.0.2","file-saver":"^2.0.5",highcharts:"^10.2.1","highcharts-vue":"^1.4.0",i18next:"^21.9.1",jszip:"^3.10.1","parse-torrent":"^11.0.16","ua-parser-js":"^1.0.2","url-parse":"^1.5.10",vue:"~2.7.0","vue-class-component":"^6.3.2","vue-i18n":"^8.11.2","vue-property-decorator":"^7.0.0","vue-router":"~3.5.4",vuetify:"^1.3.0",vuex:"^3.0.1",webdav:"^5.6.0"},c=Object.entries(l).map(r=>{const[e,t]=r;return{name:e,ver:t,url:`https://www.npmjs.com/package/${e}`}}),u=i.extend({data(){return{pagination:{rowsPerPage:-1},items:[...c,{name:"PT-Plugin Rhilip修改版",ver:"0.0.9",url:"https://github.com/Rhilip/PT-Plugin"},{name:"Jackett",ver:"latest",url:"https://github.com/Jackett/Jackett"}]}},created(){const r=JSON.parse(localStorage.getItem("depend-metadata")||"{}");setTimeout(async()=>{for(let e=0;e<this.items.length;e++){let{name:t,url:a}=this.items[e];if(a.match(/npmjs/)){if(r[t])a=r[t];else try{const n=await(await fetch(`https://registry.npmmirror.com/${t}`)).json();n!=null&&n.homepage&&(a=r[t]=n==null?void 0:n.homepage)}catch{}this.items[e].url=a}}localStorage.setItem("depend-metadata",JSON.stringify(r))},1e3)},computed:{headers(){return[{text:this.$t("reference.headers.name"),align:"left",value:"name"},{text:this.$t("reference.headers.ver"),align:"left",value:"ver"},{text:this.$t("reference.headers.url"),align:"left",value:"url"}]}}});var m=function(){var e=this,t=e._self._c;return e._self._setupProxy,t("div",[t("v-alert",{attrs:{value:!0,type:"info"}},[e._v(e._s(e.$t("reference.title")))]),t("v-card",[t("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.items,pagination:e.pagination,"hide-actions":"","item-key":"name"},on:{"update:pagination":function(a){e.pagination=a}},scopedSlots:e._u([{key:"items",fn:function(a){return[t("td",[e._v(e._s(a.item.name))]),t("td",[e._v(e._s(a.item.ver))]),t("td",[t("a",{attrs:{href:a.item.url,rel:"noopener noreferrer nofollow",target:"_blank"}},[e._v(e._s(a.item.url))])])]}}])})],1),t("v-alert",{attrs:{value:!0,color:"grey"}},[e._v(e._s(e.$t("reference.thanks")))])],1)},v=[],h=o(u,m,v,!1,null,null,null,null);const p=h.exports;export{p as default};
