(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1de57bb4"],{"3fa1":function(e,t,a){},7170:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"set-support-schema"},[a("v-alert",{attrs:{value:!0,type:"info"}},[e._v("已支持的网站架构")]),a("v-card",[a("v-card-title",[a("v-btn",{attrs:{color:"success"},on:{click:e.update}},[a("v-icon",{staticClass:"mr-2"},[e._v("autorenew")]),e._v("更新\n      ")],1),a("v-spacer"),a("v-text-field",{staticClass:"search",attrs:{"append-icon":"search",label:"Search","single-line":"","hide-details":""}})],1),a("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.items,"item-key":"name"},scopedSlots:e._u([{key:"items",fn:function(t){return[a("td",[e._v(e._s(t.item.name))]),a("td",[e._v(e._s(t.item.ver))]),a("td",[e._v(e._s(e.showPlugins(t.item.plugins)))])]}}])})],1)],1)},n=[],i=(a("7f7f"),a("ac6a"),a("2b0e")),c=i["default"].extend({data:function(){return{headers:[{text:"名称",align:"left",value:"name"},{text:"版本",align:"left",value:"ver"},{text:"插件",align:"left",value:"plugins"}],items:[]}},created:function(){this.items=this.$store.state.options.system.schemas},methods:{showPlugins:function(e){var t=[];return e.forEach((function(e){t.push(e.name)})),t.join(", ")},update:function(){}},computed:{}}),l=c,r=(a("efc5"),a("2877")),u=a("6544"),o=a.n(u),d=a("0798"),f=a("8336"),v=a("b0af"),p=a("12b2"),m=a("8fea"),h=a("132d"),b=a("9910"),_=a("2677"),w=Object(r["a"])(l,s,n,!1,null,"1672ba2e",null);t["default"]=w.exports;o()(w,{VAlert:d["a"],VBtn:f["a"],VCard:v["a"],VCardTitle:p["a"],VDataTable:m["a"],VIcon:h["a"],VSpacer:b["a"],VTextField:_["a"]})},efc5:function(e,t,a){"use strict";a("3fa1")}}]);