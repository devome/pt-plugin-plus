(function(t){function e(e){for(var r,s,u=e[0],a=e[1],l=e[2],p=0,f=[];p<u.length;p++)s=u[p],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&f.push(i[s][0]),i[s]=0;for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r]);c&&c(e);while(f.length)f.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,u=1;u<n.length;u++){var a=n[u];0!==i[a]&&(r=!1)}r&&(o.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},i={changelog:0},o=[];function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],a=u.push.bind(u);u.push=e,u=u.slice();for(var l=0;l<u.length;l++)e(u[l]);var c=a;o.push([2,"chunk-vendors","chunk-common"]),n()})({2:function(t,e,n){t.exports=n("7831")},"63cc":function(t,e,n){"use strict";n("d417")},7831:function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{attrs:{id:"inspire"}},[n("div",{class:t.$vuetify.breakpoint.smAndDown?"":"mx-5"},[n("div",{staticClass:"header"},[t._v(t._s(t.version)+" 更新日志")]),n("div",{staticClass:"markdown-body",domProps:{innerHTML:t._s(t.marked(t.content))}}),n("div",{staticClass:"footer"},[n("div",{staticClass:"mt-2",domProps:{innerHTML:t._s(t.marked(t.footer))}}),n("div",[t._v("© PT 助手 "+t._s(t.year)+", 版本 "+t._s(t.version))])])])])},o=[],s=(n("a481"),n("4917"),n("7c5c")),u=n("0a02"),a=u["a"].getVersion(),l=a.match(/v(\d+\.\d+\.\d+)\.?(.*)/);l&&l[1]&&(a="v"+l[1]);var c=r["default"].extend({data:function(){return{content:"正在加载…… <br>（如长时间未能加载成功，请前往 https://github.com/pt-plugins/PT-Plugin-Plus/releases/ 查看发布说明。）",footer:"[项目主页](https://github.com/pt-plugins/PT-Plugin-Plus) - [使用说明](https://github.com/pt-plugins/PT-Plugin-Plus/wiki) - [常见问题](https://github.com/pt-plugins/PT-Plugin-Plus/wiki/frequently-asked-questions) - [意见反馈](https://github.com/pt-plugins/PT-Plugin-Plus/issues) - [打开助手](index.html)",version:a,failContent:"更新日志加载失败，请前往 https://github.com/pt-plugins/PT-Plugin-Plus/releases/ 查看发布说明",year:(new Date).getFullYear()}},created:function(){var t=this;fetch("https://api.github.com/repos/pt-plugins/PT-Plugin-Plus/releases/tags/"+this.version).then((function(t){return t.json()})).then((function(e){t.content=t.parse(e.body)})).catch((function(){t.content=t.failContent}))},methods:{marked:s["marked"],parse:function(t){return t.replace(/(#)(\d+)/g,"[#$2](https://github.com/pt-plugins/PT-Plugin-Plus/issues/$2)")}}}),p=c,f=(n("63cc"),n("2877")),d=n("6544"),h=n.n(d),g=n("7496"),v=Object(f["a"])(p,i,o,!1,null,null,null),P=v.exports;h()(v,{VApp:g["a"]});var b=n("7e92");n("e4cb");b["a"].init("en"),new r["default"]({el:"#app",render:function(t){return t(P)}})},d417:function(t,e,n){}});