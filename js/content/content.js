!function(e){function t(t){for(var o,r,a=t[0],l=t[1],c=t[2],h=0,p=[];h<a.length;h++)r=a[h],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&p.push(i[r][0]),i[r]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(e[o]=l[o]);for(u&&u(t);p.length;)p.shift()();return n.push.apply(n,c||[]),s()}function s(){for(var e,t=0;t<n.length;t++){for(var s=n[t],o=!0,a=1;a<s.length;a++){var l=s[a];0!==i[l]&&(o=!1)}o&&(n.splice(t--,1),e=r(r.s=s[0]))}return e}var o={},i={0:0},n=[];function r(t){if(o[t])return o[t].exports;var s=o[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=e,r.c=o,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(s,o,function(t){return e[t]}.bind(null,o));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="";var a=window.webpackJsonp=window.webpackJsonp||[],l=a.push.bind(a);a.push=t,a=a.slice();for(var c=0;c<a.length;c++)t(a[c]);var u=l;n.push([13,1]),s()}({0:function(e,t,s){"use strict";var o,i,n,r,a,l,c,u,h,p,d,g,m,f,_,b,y,w,S,T,P,v,M,D,B,C,E,k,O,x,I,L;s.d(t,"k",(function(){return o})),s.d(t,"j",(function(){return n})),s.d(t,"f",(function(){return r})),s.d(t,"b",(function(){return a})),s.d(t,"i",(function(){return l})),s.d(t,"a",(function(){return c})),s.d(t,"l",(function(){return u})),s.d(t,"d",(function(){return h})),s.d(t,"e",(function(){return p})),s.d(t,"c",(function(){return y})),s.d(t,"g",(function(){return w})),s.d(t,"h",(function(){return v})),function(e){e.ZiB="ZiB",e.EiB="EiB",e.PiB="PiB",e.TiB="TiB",e.GiB="GiB",e.MiB="MiB",e.KiB="KiB"}(o||(o={})),function(e){e.JSON="json",e.TEXT="urlencode"}(i||(i={})),function(e){e.JSON="json",e.XML="xml",e.HTML="html",e.TEXT="text"}(n||(n={})),function(e){e.transmission="transmission",e.utorrent="utorrent",e.deluge="deluge",e.synologyDownloadStation="synologyDownloadStation",e.rutorrent="rutorrent",e.qbittorrent="qbittorrent"}(r||(r={})),function(e){e.normal="normal",e.label="label",e.spliter="spliter",e.popup="popup"}(a||(a={})),function(e){e.POST="POST",e.GET="GET"}(l||(l={})),function(e){e.readConfig="readConfig",e.saveConfig="saveConfig",e.reloadConfig="reloadConfig",e.sendTorrentToDefaultClient="sendTorrentToDefaultClient",e.sendTorrentToClient="sendTorrentToClient",e.searchTorrent="searchTorrent",e.copyTextToClipboard="copyTextToClipboard",e.addTorrentFromURL="addTorrentFromURL",e.getFreeSpace="getFreeSpace",e.downloadFromDroper="downloadFromDroper",e.openOptions="openOptions",e.updateOptionsTabId="updateOptionsTabId",e.getSearchResult="getSearchResult",e.getDownloadHistory="getDownloadHistory",e.removeDownloadHistory="removeDownloadHistory",e.clearDownloadHistory="clearDownloadHistory",e.testClientConnectivity="testClientConnectivity",e.getSystemLogs="getSystemLogs",e.removeSystemLogs="removeSystemLogs",e.clearSystemLogs="clearSystemLogs",e.readUIOptions="readUIOptions",e.saveUIOptions="saveUIOptions",e.showMessage="showMessage",e.writeLog="writeLog",e.serviceStoped="serviceStoped",e.addContentPage="addContentPage",e.abortSearch="abortSearch",e.backupToGoogle="backupToGoogle",e.restoreFromGoogle="restoreFromGoogle",e.clearFromGoogle="clearFromGoogle",e.getTorrentDataFromURL="getTorrentDataFromURL",e.getUserInfo="getUserInfo",e.abortGetUserInfo="abortGetUserInfo",e.refreshUserData="refreshUserData",e.getClearedOptions="getClearedOptions",e.resetRunTimeOptions="resetRunTimeOptions",e.getBase64FromImageUrl="getBase64FromImageUrl",e.getUserHistoryData="getUserHistoryData",e.getMovieInfos="getMovieInfos",e.getMovieRatings="getMovieRatings",e.getIMDbIdFromDouban="getIMDbIdFromDouban",e.queryMovieInfoFromDouban="queryMovieInfoFromDouban",e.addBrowserDownloads="addBrowserDownloads",e.checkPermissions="checkPermissions",e.requestPermissions="requestPermissions",e.changeLanguage="changeLanguage",e.getCurrentLanguageResource="getCurrentLanguageResource",e.addLanguage="addLanguage",e.replaceLanguage="replaceLanguage",e.hideMessage="hideMessage",e.resetUserDatas="resetUserDatas",e.backupToServer="backupToServer",e.restoreFromServer="restoreFromServer",e.getBackupListFromServer="getBackupListFromServer",e.deleteFileFromBackupServer="deleteFileFromBackupServer",e.sendTorrentsInBackground="sendTorrentsInBackground",e.createBackupFile="createBackupFile",e.checkBackupData="checkBackupData",e.addTorrentToCollection="addTorrentToCollection",e.getTorrentCollections="getTorrentCollections",e.deleteTorrentFromCollention="deleteTorrentFromCollention",e.clearTorrentCollention="clearTorrentCollention",e.getTorrentCollention="getTorrentCollention",e.getSiteSelectorConfig="getSiteSelectorConfig",e.resetTorrentCollections="resetTorrentCollections",e.getTorrentCollectionGroups="getTorrentCollectionGroups",e.addTorrentCollectionGroup="addTorrentCollectionGroup",e.addTorrentCollectionToGroup="addTorrentCollectionToGroup",e.updateTorrentCollectionGroup="updateTorrentCollectionGroup",e.removeTorrentCollectionFromGroup="removeTorrentCollectionFromGroup",e.removeTorrentCollectionGroup="removeTorrentCollectionGroup",e.updateTorrentCollention="updateTorrentCollention",e.getAllTorrentCollectionLinks="getAllTorrentCollectionLinks",e.restoreCookies="restoreCookies",e.resetFavicons="resetFavicons",e.resetFavicon="resetFavicon",e.getBackupRawData="getBackupRawData",e.testBackupServerConnectivity="testBackupServerConnectivity",e.createSearchResultSnapshot="createSearchResultSnapshot",e.loadSearchResultSnapshot="loadSearchResultSnapshot",e.getSearchResultSnapshot="getSearchResultSnapshot",e.removeSearchResultSnapshot="removeSearchResultSnapshot",e.clearSearchResultSnapshot="clearSearchResultSnapshot",e.resetSearchResultSnapshot="resetSearchResultSnapshot",e.createKeepUploadTask="createKeepUploadTask",e.loadKeepUploadTask="loadKeepUploadTask",e.getKeepUploadTask="getKeepUploadTask",e.removeKeepUploadTask="removeKeepUploadTask",e.clearKeepUploadTask="clearKeepUploadTask",e.resetKeepUploadTask="resetKeepUploadTask",e.updateKeepUploadTask="updateKeepUploadTask",e.resetDownloadHistory="resetDownloadHistory",e.pushDebugMsg="pushDebugMsg",e.updateDebuggerTabId="updateDebuggerTabId",e.getTopSearches="getTopSearches"}(c||(c={})),function(e){e.text="TEXT",e.json="JSON"}(u||(u={})),function(e){e.default="PT-Plugin-Plus-Config",e.downloadHistory="PT-Plugin-Plus-downloadHistory",e.systemLogs="PT-Plugin-Plus-systemLogs",e.uiOptions="PT-Plugin-Plus-uiOptions",e.cache="PT-Plugin-Plus-Cache-Contents",e.userDatas="PT-Plugin-Plus-User-Datas",e.collection="PT-Plugin-Plus-Collection",e.searchResultSnapshot="PT-Plugin-Plus-SearchResultSnapshot",e.keepUploadTask="PT-Plugin-Plus-KeepUploadTask"}(h||(h={})),function(e){e.success="success",e.error="error",e.info="info",e.warning="warning",e.unknown="unknown"}(p||(p={})),function(e){e.background="background",e.content="content",e.options="options",e.popup="popup",e.debugger="debugger"}(d||(d={})),function(e){e.init="init",e.requestMessage="requestMessage"}(g||(g={})),function(e){e.systemLogs="systemLogs",e.searchTorrent="searchTorrent"}(m||(m={})),function(e){e.home="home",e.downloadPaths="downloadPaths",e.searchTorrent="searchTorrent"}(f||(f={})),function(e){e.latest="latest",e.today="today",e.all="all"}(_||(_={})),function(e){e.needLogin="needLogin",e.notSupported="notSupported",e.unknown="unknown",e.success="success"}(b||(b={})),function(e){e.allSite="__allSite__",e.all="__all__",e.noGroup="__noGroup__"}(y||(y={})),function(e){e.development="development",e.normal="normal",e.crx="crx"}(w||(w={})),function(e){e.id="id",e.name="name"}(S||(S={})),function(e){e[e.downloading=1]="downloading",e[e.sending=2]="sending",e[e.completed=255]="completed",e[e.inactive=3]="inactive"}(T||(T={})),function(e){e.OWSS="OWSS",e.WebDAV="WebDAV"}(P||(P={})),function(e){e.left="left",e.right="right"}(v||(v={})),function(e){e.faq="https://github.com/pt-plugins/PT-Plugin-Plus/wiki/frequently-asked-questions"}(M||(M={})),function(e){e.all="all",e.options="options",e.userDatas="userDatas",e.collection="collection",e.cookies="cookies",e.searchResultSnapshot="searchResultSnapshot",e.keepUploadTask="keepUploadTask",e.downloadHistory="downloadHistory"}(D||(D={})),function(e){e.Chrome="Chrome",e.Firefox="Firefox"}(B||(B={})),function(e){e.success="success",e.error="error",e.loading="loading"}(C||(C={})),function(e){e.time="time",e.name="name",e.size="size"}(E||(E={})),function(e){e.desc="desc",e.asc="asc"}(k||(k={})),function(e){e.AES="AES"}(O||(O={})),function(e){e.needSecretKey="needSecretKey",e.errorSecretKey="errorSecretKey"}(x||(x={})),function(e){e.all="__all__",e.unTagged="__unTagged__",e.unReadMsg="__unReadMsg__",e.statusError="__statusError__"}(I||(I={})),function(e){e.openAllSites="openAllSites",e.openAllUnReadMsg="openAllUnReadMsg",e.openAllStatusErr="openAllStatusErr"}(L||(L={}))},13:function(e,t,s){"use strict";s.r(t);var o=s(0);var i=s(4),n=s.n(i),r=s(3);const a={formatNumber(e,t="###,###,###,###.00"){if(void 0===e)return"";const s=(e,t,s)=>{if(""===e||void 0===e)return""===t||void 0===t?"":t;let o="",i="",n="",r=0;s||(e=e.split("").reverse().join(""),t=t.split("").reverse().join(""));let a=0;for(let s=0;s<t.length;s++,a++)if(i=e.charAt(a),void 0!==i)switch(o=t.charAt(s),o){case"#":n+=i,r=s;break;case"0":n=i||i===o?n+i:n+0,r=s;break;case".":case",":n+=i===o?i:(a--,o);break;default:n+=o,a--}return a!==e.length&&"0"!==t.charAt(t.length-1)&&r!==t.length&&"0"!==t.charAt(r)&&(n=n.substr(0,r+1)+e.substr(a)+n.substr(r+1)),n=(s?n:n.split("").reverse().join("")).replace(/(^,)|(,$)|(,,+)/g,""),","===n.substr(0,1)&&(n=n.substr(1)),"-,"===n.substr(0,2)&&(n="-"+n.substr(2)),n},o=e.toString();if(0===o.length)return"";let i=parseFloat(o);if(isNaN(i))return o;if(!t)return o;const n=t.split("."),r=o.split(".");return n.length>1?s(r[0],n[0])+"."+s(r[1],n[1],1):s(r[0],n[0])},formatSize(e,t=!1,s=""){let o,i=parseFloat(e);if(isNaN(i))return"";if(i<0)return"N/A";if(0===i)return t?"":"speed"===s?"0.00 KiB/s":"0.00";let n="KiB",r="###,###,###,###.00 ",a="###,###,###,###.000 ";return i<1e3*Math.pow(2,10)?(o=i/Math.pow(2,10),n="KiB"):i<1e3*Math.pow(2,20)?(o=i/Math.pow(2,20),n="MiB"):i<1e3*Math.pow(2,30)?(o=i/Math.pow(2,30),n="GiB"):i<1e3*Math.pow(2,40)?(o=i/Math.pow(2,40),n="TiB",r=a):i<1e3*Math.pow(2,50)?(o=i/Math.pow(2,50),n="PiB",r=a):i<1e3*Math.pow(2,60)?(o=i/Math.pow(2,60),n="EiB",r=a):(o=i/Math.pow(2,70),n="ZiB",r=a),"speed"===s&&(n+="/s"),this.formatNumber(o,r)+n},formatSizetoPrecision(e,t=!1,s=""){let o,i=parseFloat(e);if(isNaN(i))return"";if(i<0)return"N/A";if(0===i)return t?"":"speed"===s?"0.00 KiB/s":"0.00";let n="KiB";return i<1e3*Math.pow(2,10)?(o=i/Math.pow(2,10),n="KiB"):i<1e3*Math.pow(2,20)?(o=i/Math.pow(2,20),n="MiB"):i<1e3*Math.pow(2,30)?(o=i/Math.pow(2,30),n="GiB"):i<1e3*Math.pow(2,40)?(o=i/Math.pow(2,40),n="TiB"):i<1e3*Math.pow(2,50)?(o=i/Math.pow(2,50),n="PiB"):i<1e3*Math.pow(2,60)?(o=i/Math.pow(2,60),n="EiB"):(o=i/Math.pow(2,70),n="ZiB"),"speed"===s&&(n+="/s"),o.toPrecision(4)+" "+n},formatSizeWithNegative(e,t=!1,s=""){let o=e=parseFloat(e);e<0&&(o=-o);let i=this.formatSize(o,t,s);return e<0&&(i="- "+i),i},formatSpeed(e,t=!1){return this.formatSize(e,t,"speed")},parseURL(e){var t=document.createElement("a");return t.href=e,{source:e,protocol:t.protocol.replace(":",""),host:t.hostname,port:t.port,query:t.search,params:function(){for(var e,s={},o=t.search.replace(/^\?/,"").split("&"),i=o.length,n=0;n<i;n++)o[n]&&(s[(e=o[n].split("="))[0]]=e[1]);return s}(),hash:t.hash.replace("#",""),path:t.pathname.replace(/^([^/])/,"/$1"),segments:t.pathname.replace(/^\//,"").split("/"),origin:`${t.protocol}//${t.hostname}`+(t.port?":"+t.port:"")}},formatIMDbId:e=>(Number(e)&&(e.length<7&&(e=e.padStart(7,"0")),e="tt"+e),e),timeAgoToNumber(e){let t=e.trim().match(/^([\d.]+).+?((year|month|week|day|hour|min|minute)s?)( +ago)?(.+)?$/i);if(!t)return 0;let s=new Date,o=t[3],i=Math.round(parseFloat(t[1])),n=new Date;switch(o.toLowerCase()){case"year":n=new Date(s.setFullYear(s.getFullYear()-i));break;case"month":n=new Date(s.setMonth(s.getMonth()-i));break;case"day":n=new Date(s.setDate(s.getDate()-i));break;case"week":n=new Date(s.setDate(s.getDate()-7*i));break;case"hour":n=new Date(s.setHours(s.getHours()-i));break;case"min":case"minute":n=new Date(s.setMinutes(s.getMinutes()-i))}return n.getTime()},formatInteger(e){return this.formatNumber(e,"###,###,###,###")}};s(7);let l="",c=!1;try{let e=chrome.runtime;c=!0,l=e.getManifest().options_ui.page.replace("index.html",""),l&&"/"==l.substr(-1)&&(l=l.substr(0,l.length-1)),l||(l="chrome-extension://"+chrome.runtime.id)}catch(e){c=!1}const u=c?(c?l:"")+"/resource":`http://${window.location.hostname}:8001`;let h={host:u,schemas:u+"/schemas.json",schemaConfig:u+"/schemas/{$schema}/config.json",sites:u+"/sites.json",siteConfig:u+"/sites/{$site}/config.json",clients:u+"/clients.json",clientConfig:u+"/clients/{$client}/config.json",latestReleases:"https://api.github.com/repos/pt-plugins/PT-Plugin-Plus/releases/latest",systemConfig:u+"/systemConfig.json"};const p={debugMode:!1,scriptQueues:[],isExtensionMode:c,cache:{localStorage:new class{constructor(){this.isExtensionMode=!1,window.chrome&&chrome.extension&&(this.isExtensionMode=!0)}set(e,t,s=o.l.json){return new Promise((i,n)=>{if(this.isExtensionMode){let s={};s[e]=t,chrome.storage.local.set(s,()=>{i()})}else"string"!=typeof t&&s==o.l.json&&(t=JSON.stringify(t)),window.localStorage.setItem(e,t),i()})}get(e,t,s=o.l.json){if(this.isExtensionMode)chrome.storage.local.get(e,s=>{s&&s[e]?t(s[e]):t(null)});else{let i=window.localStorage.getItem(e);i&&s==o.l.json&&(i=JSON.parse(i)),t&&t(i)}}},cacheKey:o.d.cache,contents:{},expires:86400,init(e){p.debugMode&&console.log("cache.init"),this.localStorage.get(this.cacheKey,t=>{if(t){let e=t.expires;e&&new Date>new Date(e)||p.debugMode?this.contents={}:this.contents=t}e&&e()})},get(e){return this.contents?this.contents[n()(e)]:null},set(e,t){this.contents[n()(e)]=t,this.contents.update=(new Date).getTime(),this.contents.expires=(new Date).getTime()+this.expires,this.localStorage.set(this.cacheKey,this.contents)},clear(){this.contents={},this.localStorage.set(this.cacheKey,this.contents)},getLastUpdateTime(){return new Promise((e,t)=>{this.localStorage.get(this.cacheKey,s=>{if(s){let t=s.update;e(t||0)}else t()})})}},addScript(e){p.debugMode&&console.log("addScript",e),this.scriptQueues.push(e)},applyScripts(){let e=this.scriptQueues.shift();e&&this.execScript(e).then(()=>{this.applyScripts()})},execScript(e){return new Promise((t,s)=>{switch(e.type){case"code":this.runScript(e.content),t();break;default:{let o=e.content||e;"http"!==o.substr(0,4)&&("/"!==o.substr(0,1)&&(o="/"+o),o=`${d.host}${o}`);let i=this.cache.get(o);try{i?(this.runScript(i),t()):(console.log("execScript: %s",o),$.ajax({url:o,dataType:"text"}).done(e=>{this.runScript(e),this.cache.set(o,e),t()}).fail((e,t,o)=>{e.responseJSON&&e.responseJSON.code&&e.responseJSON.msg?s(e.responseJSON.msg+" ("+e.responseJSON.code+")"):s(t+", "+o)}))}catch(e){s(e)}}}})},runScript(e,t=window){eval.call(t,e)},applyStyle(e){return new Promise((t,s)=>{let o=$("<style/>").appendTo(document.body);switch(e.type){case"file":{let s=e.content;"http"!==s.substr(0,4)&&("/"!==s.substr(0,1)&&(s="/"+s),s=`${d.host}${s}`);let i=this.cache.get(s);i?(o.html(i),t()):$.get(s,e=>{o.html(e),this.cache.set(s,e),t()},"text");break}default:o.html(e.content),t()}})},getScriptContent(e){let t=`${d.host}/${e}`;return t="http"===e.substr(0,4)?e:t.replace("resource//","resource/"),p.debugMode&&console.log("getScriptContent",t),$.ajax({url:t,dataType:"text"})},createErrorMessage:e=>({type:o.e.error,msg:e,success:!1}),showNotifications(e,t=3e3){r.a.showNotifications(e,t)},getInstallType:()=>new Promise((e,t)=>{chrome&&chrome.management?chrome.management.getSelf(t=>{t.updateUrl&&t.updateUrl.indexOf("pt-plugins/PT-Plugin-Plus")>0?e(o.g.crx):e(t.installType)}):t()})};p.cache.init();const d=h;class g{constructor(){this.isExtensionMode=p.isExtensionMode}sendRequest(e,t,s){return new Promise((i,n)=>{if(this.isExtensionMode)try{chrome.runtime.sendMessage({action:e,data:s},o=>{if(chrome.runtime.lastError){let t=chrome.runtime.lastError.message||"";if(console.log("Extension.sendRequest.runtime",e,s,chrome.runtime.lastError.message),/Could not establish connection/.test(t))return p.showNotifications({message:"\u63d2\u4ef6\u72b6\u6001\u672a\u77e5\uff0c\u5f53\u524d\u64cd\u4f5c\u53ef\u80fd\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u540e\u518d\u8bd5"}),void n(chrome.runtime.lastError);if(!/The message port closed before a response was received/.test(t))return void n(chrome.runtime.lastError)}t&&t(o.resolve||o.reject),o.reject?n(o.reject):!o.resolve||"error"!==o.resolve.status&&!1!==o.resolve.success?i(o.resolve):n(o.resolve)})}catch(e){/Invocation of form runtime\.connect|doesn't match definition runtime\.connect|Extension context invalidated/.test(e.message)?n({type:o.e.error,msg:"\u63d2\u4ef6\u72b6\u6001\u672a\u77e5\uff0c\u5f53\u524d\u64cd\u4f5c\u53ef\u80fd\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u540e\u518d\u8bd5",success:!1}):n(e)}else 0})}}class m{constructor(){}replacePathKey(e,t){if(!e)return e;const s=new Date;return this.replaceKeys(e,{"site.name":t.name,"site.host":t.host,YYYY:s.getFullYear(),MM:("0"+(s.getMonth()+1).toString()).substr(-2),DD:("0"+s.getDate().toString()).substr(-2)})}getSavePath(e,t){if(!e)return;let s=e;if(s&&s.indexOf("<...>")>=0){let e=window.prompt(`\u5f53\u524d\u4e3a\u81ea\u5b9a\u4e49\u8def\u5f84\uff1a${s} \n\u8bf7\u8f93\u5165\u8def\u5f84\u4e2d <...> \u90e8\u5206\u7684\u5185\u5bb9: `);if(null===e)return!1;s=s.replace("<...>",e)}return this.replacePathKey(s,t)}replaceKeys(e,t){let s=e;for(const e in t)if(t.hasOwnProperty(e)){const o=t[e];s=s.replace("$"+e+"$",o)}return s}}var f=s(1),_=s(8);Object.assign(window,{PTService:new class{constructor(){this.options={sites:[],clients:[]},this.site={name:""},this.action=o.a,this.filters=a,this.downloadClientType=o.f,this.sizeUnit=o.k,this.buttonType=o.b,this.allSiteKey=o.c.allSite,this.schema={},this.scripts=[],this.styles=[],this.messageItems={},this.buttonBar=null,this.droper=$("<div style='display:none;' class='pt-plugin-droper'/>"),this.buttons=[],this.logo=null,this.backgroundServiceIsStoped=!1,this.locationURL=location.href,this.pathHandler=new m,this.i18n=f.a,this.infoParser=new _.a,this.pageSelector={},this.autoPosition=!0,this.positionStorageKey="",this.extension=new g,this.extension.isExtensionMode&&(this.readConfig(),this.initBrowserEvent())}readConfig(){this.extension.sendRequest(o.a.readConfig,e=>{this.options=e,this.initI18n()})}init(){this.initPages(),setInterval(()=>{this.checkLocationURL()},1e3)}initI18n(){this.extension.sendRequest(o.a.getCurrentLanguageResource,null,"contentPage").then(e=>{let t=this.options.locale||"en";f.a.init({lng:t,interpolation:{prefix:"{",suffix:"}"},resources:{[t]:{translation:e}}}),this.init()})}getSiteFromHost(e){p.debugMode&&console.log("getSiteFromHost",e);let t=[];this.options.sites&&t.push(...this.options.sites),this.options.system&&this.options.system.publicSites&&t.push(...this.options.system.publicSites);let s=t.find(t=>{let s=[t.url].concat(t.cdn);return t.host==e||s.join("").indexOf("//"+e)>-1});return s?JSON.parse(JSON.stringify(s)):null}initPages(){this.initSiteConfig().then(()=>{this.initPlugins()}).catch(()=>{p.debugMode&&console.log("initPages \u5931\u8d25")})}initSiteConfig(){return new Promise((e,t)=>{if(this.options.showToolbarOnContentPage)if(this.site=this.getSiteFromHost(window.location.hostname),this.site&&(this.site.url=window.location.origin+"/"),this.site&&this.site.name){if("string"==typeof this.site.schema)this.schema=this.options.system&&this.options.system.schemas&&this.options.system.schemas.find(e=>e.name==this.site.schema);else{let e=this.options.system&&this.options.system.sites&&this.options.system.sites.find(e=>e.host==this.site.host);e&&e.schema&&"string"!=typeof e.schema&&(this.schema=e.schema,this.schema.siteOnly=!0)}this.initPageSelector().finally(()=>{e()})}else t();else t()})}initPlugins(){this.positionStorageKey=`pt-plugin-${this.site.host}-position`,this.scripts=[],this.styles=[],this.initButtonBar(),this.initDroper(),this.schema&&this.schema.plugins&&this.schema.plugins.forEach(e=>{-1!==e.pages.findIndex(e=>{let t=window.location.href,s=window.location.pathname;return-1!==t.indexOf(e)||new RegExp(e,"").test(s)})&&e.scripts.forEach(e=>{let t=e;"/"!==t.substr(0,1)&&(t=this.schema.siteOnly?`sites/${this.site.host}/${e}`:`schemas/${this.schema.name}/${e}`),this.scripts.push({type:"file",content:t})})});let e=this.options.system&&this.options.system.sites&&this.options.system.sites.find(e=>e.host==this.site.host);if(this.site.plugins){if("publicSite"!==this.site.schema&&e)for(let e=this.site.plugins.length-1;e>=0;e--){this.site.plugins[e].isCustom||this.site.plugins.splice(e,1)}}else this.site.plugins=[];if(e&&e.plugins&&(this.site.plugins=e.plugins.concat(this.site.plugins)),this.site.plugins){let e="publicSite"==this.site.schema?"publicSites":"sites";this.site.path?e+="/"+this.site.path:e+="/"+this.site.host,this.site.plugins.forEach(t=>{-1!==t.pages.findIndex(e=>{let t=window.location.pathname;return-1!==t.indexOf(e)||new RegExp(e,"").test(t)})&&(t.scripts&&t.scripts.forEach(t=>{let s=t;"/"!==s.substr(0,1)&&"http"!==s.substr(0,4)&&(s=`${e}/${t}`),this.scripts.push({type:"file",content:s})}),t.script&&this.scripts.push({type:"code",content:t.script}),t.styles&&t.styles.forEach(t=>{let s=t;"/"!==s.substr(0,1)&&"http"!==s.substr(0,4)&&(s=`${e}/${t}`),this.styles.push({type:"file",content:s})}),t.style&&this.styles.push({type:"code",content:t.style}))})}this.styles&&this.styles.length>0&&this.styles.forEach(e=>{p.applyStyle(e)}),this.scripts&&this.scripts.length>0&&(this.scripts.forEach(e=>{p.addScript(e)}),p.applyScripts()),this.extension.sendRequest(o.a.addContentPage).catch(e=>{console.log(e)})}call(e,t){return new Promise((s,o)=>{if(this.backgroundServiceIsStoped)o({msg:f.a.t("backgroundServiceIsStoped")});else try{this.extension.sendRequest(e,null,t).then(e=>{e?s&&s(e):o&&o()}).catch(e=>{o(e)})}catch(t){this.showNotice(f.a.t("actionExecutionFailed",{action:e})),o(t)}})}initButtonBar(){if($(".pt-plugin-body").length&&$(".pt-plugin-body").remove(),this.buttonBar=$("<div class='pt-plugin-body'/>").appendTo(document.body),window.Drag){let e=$("<div class='pt-plugin-drag-title' title='"+f.a.t("dragTitle")+"'>").appendTo(this.buttonBar);new window.Drag(this.buttonBar.get(0),{handle:e.get(0),onStop:e=>{console.log(e),this.saveButtonBarPosition(e)}}),e.on("dblclick",()=>{this.resetButtonBarPosition()})}this.logo=$("<div class='pt-plugin-logo' title='"+f.a.t("pluginTitle")+"'/>").appendTo(this.buttonBar),this.logo.on("click",()=>{this.call(o.a.openOptions)}),this.initButtonBarPosition(),this.buttonBar.hide()}initButtonBarPosition(){let e=window.localStorage.getItem(this.positionStorageKey);if(e)try{let t=JSON.parse(e);return this.buttonBar.css({top:t.top,left:t.left}),void(this.autoPosition=!1)}catch(e){console.log(e)}this.buttonBar.css({top:window.innerHeight/2,left:"unset"}),this.options.position==o.h.left&&this.buttonBar.css({right:"unset",left:"5px"})}resetButtonBarPosition(){window.localStorage.removeItem(this.positionStorageKey),this.autoPosition=!0,this.initButtonBarPosition(),this.recalculateButtonBarPosition()}saveButtonBarPosition(e){window.localStorage.setItem(this.positionStorageKey,JSON.stringify(e)),this.autoPosition=!1}addButton(e){e=Object.assign({type:o.b.normal},e);let t=$("<hr/>").appendTo(this.buttonBar),s="<a class='pt-plugin-button'/>";e.click&&e.type!=o.b.label||(s="<span class='pt-plugin-button'/>");let i=$(s).attr({title:e.title,key:e.key}).data("line",t),n=$("<div class='pt-plugin-button-inner'/>").appendTo(i),r=$("<div class='pt-plugin-loading'/>").appendTo(i),a=$("<div class='action-success'/>").html('<div class="action-success-ani"></div>').appendTo(i);e.icon&&$("<i class='material-icons md-36'/>").html(e.icon).appendTo(n),$("<div/>").html(e.label).appendTo(n);let l=t=>{e.type==o.b.normal?r.hide():n.hide(),a.show(),t&&t.msg&&(t.type||(t.type="success"),this.showNotice(t)),setTimeout(()=>{a.hide(),n.show()},2e3)},c=t=>{e.type==o.b.normal&&r.hide(),n.show(),this.showNotice({msg:t||f.a.t("callbackFailed",{label:e.label})})};e.click&&i.click(t=>{e.type==o.b.normal&&(n.hide(),r.show()),e.click(l,c,t)}),i.appendTo(this.buttonBar),e.onDrop&&this.addDroper(i,e.onDrop,l,c),this.buttons.push(i),this.recalculateButtonBarPosition()}removeButton(e){let t=this.buttons.findIndex(t=>t.attr("key")==e);if(-1!=t){let e=this.buttons[t],s=e.data("line");s&&s.remove(),e.remove(),this.buttons.splice(t,1)}this.recalculateButtonBarPosition()}recalculateButtonBarPosition(){this.buttons.length>0?this.buttonBar.show():this.buttonBar.hide(),this.autoPosition&&this.buttonBar.css({top:window.innerHeight/2-this.buttonBar.outerHeight(!0)/2})}showNotice(e){p.debugMode&&console.log(e),(e=Object.assign({type:"error",timeout:5,position:"bottomRight",progressBar:!0,width:320,indeterminate:!1},"string"==typeof e?{msg:e}:"object"==typeof e.msg?e.msg:e)).text=e.text||e.msg,e.timeout&&(e.timeout=10*e.timeout),delete e.msg;let t=new window.NoticeJs(e);return!0===e.indeterminate?(this.messageItems[t.id]=t,t.show(),t):$(t.show())}hideMessage(e){this.messageItems[e]&&this.messageItems[e].close()}getSiteDefaultPath(e=""){e||(e=this.site.defaultClientId||this.options.defaultClientId);let t=this.options.clients.find(t=>t.id===e),s="";if(t&&t.paths)for(const e in t.paths)if(this.site.host===e){s=t.paths[e][0];break}return this.pathHandler.replacePathKey(s,this.site)}getClientOptions(e=""){return e||(e=this.site.defaultClientId||this.options.defaultClientId),this.options.clients.find(t=>t.id===e)}initDroper(){this.options.allowDropToSend&&(document.addEventListener("dragstart",e=>{if("A"==e.target.tagName){let t={url:e.target.getAttribute("href"),title:e.target.getAttribute("title")};e.dataTransfer.setData("text/plain",JSON.stringify(t))}}),this.buttonBar.on("dragover",e=>{e.stopPropagation(),e.preventDefault(),this.showDroper()}),this.buttonBar.on("dragleave",e=>{this.buttonBar.removeClass("pt-plugin-body-over")}),this.buttonBar.on("mouseleave",e=>{this.buttonBar.removeClass("pt-plugin-body-over"),this.hideDroper()}),this.droper.appendTo(this.buttonBar),this.droper[0].addEventListener("dragover",e=>{e.stopPropagation(),e.preventDefault(),this.logo.addClass("pt-plugin-onLoading"),this.buttonBar.addClass("pt-plugin-body-over")},!1),this.droper[0].addEventListener("drop",e=>{e.stopPropagation(),e.preventDefault(),this.hideDroper();try{let t=JSON.parse(e.dataTransfer.getData("text/plain"));if(t)if(t.url){let e=t.url.match(/imdb\.com\/title\/(tt\d+)/);if(e&&e.length>1)return this.extension.sendRequest(o.a.openOptions,null,"search-torrent/"+e[1]),void this.logo.removeClass("pt-plugin-onLoading");this.pageApp?this.pageApp.call(o.a.downloadFromDroper,t).then(()=>{this.logo.removeClass("pt-plugin-onLoading")}).catch(()=>{this.logo.removeClass("pt-plugin-onLoading")}):(this.showNotice({type:o.e.info,msg:f.a.t("notSupported"),timeout:3}),this.logo.removeClass("pt-plugin-onLoading"))}else this.logo.removeClass("pt-plugin-onLoading")}catch(e){this.logo.removeClass("pt-plugin-onLoading")}},!1),this.droper.on("dragleave dragend",e=>{e.stopPropagation(),e.preventDefault(),this.hideDroper(),this.logo.removeClass("pt-plugin-onLoading"),this.buttonBar.removeClass("pt-plugin-body-over")}))}addDroper(e,t,s,o){if(!t)return;let i=$("<div style='display:none;' class='pt-plugin-droper'/>");i.appendTo(this.buttonBar),i.on("dragover",e=>{e.stopPropagation(),e.preventDefault(),this.buttonBar.addClass("pt-plugin-body-over")}),i.on("drop",e=>{console.log(e),e.stopPropagation(),e.preventDefault(),this.hideDroper();try{let i=JSON.parse(e.originalEvent.dataTransfer.getData("text/plain"));i&&i.url&&t.call(this,i,e,s,o)}catch(i){let n=e.originalEvent.dataTransfer.getData("text/plain");n&&(n={url:n},t.call(this,n,e,s,o))}}),i.on("dragleave dragend",e=>{e.stopPropagation(),e.preventDefault(),this.hideDroper(),this.buttonBar.removeClass("pt-plugin-body-over")}),i.offset(e.position())}hideDroper(){$(".pt-plugin-droper").hide()}showDroper(){$(".pt-plugin-droper").show()}initBrowserEvent(){chrome.runtime.onMessage.addListener((e,t,s)=>{switch(p.debugMode&&console.log("content.onMessage",e),e.action){case o.a.showMessage:let t=this.showNotice(e.data);s&&s(t);break;case o.a.hideMessage:this.hideMessage(e.data);break;case o.a.serviceStoped:this.backgroundServiceIsStoped=!0}})}checkLocationURL(){location.href!=this.locationURL&&(this.locationURL=location.href,this.initPages())}initPageSelector(){return new Promise((e,t)=>{this.call(o.a.getSiteSelectorConfig,{host:this.site.host,name:location.pathname}).then(t=>{this.pageSelector=t,e()}).catch(()=>{this.call(o.a.getSiteSelectorConfig,{host:this.site.host,name:"common"}).then(t=>{this.pageSelector=t,e()}).catch(()=>{e()})})})}getFieldValue(e="",t=$("body")){let s;return console.log("getFieldValue",e),this.pageSelector&&this.pageSelector.fields?(s=this.pageSelector.fields[e],s?this.infoParser.getFieldData(t,s,this.pageSelector):null):null}},PPF:r.a})},3:function(e,t,s){"use strict";s.d(t,"a",(function(){return c}));var o=s(4),i=s.n(o),n=s(5),r=s(2),a=s.n(r),l=s(6);const c=new class{constructor(){this.isExtensionMode=!1,this.browserName="",this.manifest={manifest_version:2,name:"",version:""};try{this.isExtensionMode=!!(chrome.runtime&&chrome.extension&&chrome.runtime.getManifest),this.manifest=chrome.runtime.getManifest()}catch(e){console.log("HelpFunctions: is not extension mode.",e)}this.browserName=(new l.UAParser).getBrowser().name||""}getToDay(e){let t=new Date;e&&(t=new Date(e));let s=t.getFullYear(),o=t.getMonth()+1,i=o<10?"0"+o:o,n=t.getDate();return`${s}-${i}-${n<10?"0"+n:n}`}updateBadge(e){if(this.isExtensionMode)try{0==e?(chrome.browserAction.setBadgeText({text:""}),chrome.browserAction.enable()):(chrome.browserAction.setBadgeText({text:e.toString()}),chrome.browserAction.setBadgeBackgroundColor({color:"#aabbcc"}),chrome.browserAction.disable())}catch(e){console.log(e)}}getVersion(){return this.isExtensionMode?"v"+(this.manifest.version_name||this.manifest.version):"localVersion"}getRandomString(e=32,t=!1){let s=t?"abcdefhijkmnprstwxyz2345678ABCDEFGHJKMNPQRSTWXYZ":"abcdefghijkmnopqrstuvwxyz0123456789ABCDEFGHIJKMNOPQRSTUVWXYZ",o=s.length,i=[];for(let t=0;t<e;t++)i.push(s.charAt(Math.floor(Math.random()*o)));return i.join("")}getNewId(){return i()((new Date).getTime().toString()+this.getRandomString()).toString()}showNotifications(e,t=3e3){e=Object.assign({type:"basic",iconUrl:chrome.runtime.getURL("/assets/icon-128.png"),title:"PT \u52a9\u624b Plus",priority:0,message:""},e);let s=Math.floor(99999*Math.random())+"";chrome.notifications.create(s,e,(function(e){s=e})),setTimeout(()=>{chrome.notifications.clear(s,()=>{})},t)}removeDuplicateQueryString(e){let t,s=[],o="",i=/([^&=]+)=([^&]*)/g,n="",r=e.indexOf("?");if(-1!==r){for(n=e.substr(0,r+1),o=e.substr(r+1);t=i.exec(o);){const e=t[1]+"="+t[2];s.includes(e)||s.push(e)}return n+s.join("&")}return e}removeQueryStringFromValue(e,t){let s,o=[],i="",n=/([^&=]+)=([^&]*)/g,r="",a=e.indexOf("?");if(-1!==a){for(r=e.substr(0,a+1),i=e.substr(a+1);s=n.exec(i);){const e=s[1]+"="+s[2];s[2]!==t&&o.push(e)}return r+o.join("&")}return e}removeQueryStringFields(e,t){let s,o=[],i="",n=/([^&=]+)=([^&]*)/g,r="",a=e.indexOf("?");if(-1!==a){for(r=e.substr(0,a+1),i=e.substr(a+1);s=n.exec(i);){const e=s[1]+"="+s[2];t.includes(s[1])||o.push(e)}return r+o.join("&")}return e}clone(e){return JSON.parse(JSON.stringify(e))}debug(...e){console.log((new Date).toLocaleString(),...e)}showContextMenu(e,t){try{n.show(e,t),$(".basicContext").css({left:"-=20px",top:"+=10px"})}catch(e){}}getCleaningURL(e){return this.removeQueryStringFields(e,["hit","cmtpage","page"])}checkPermissions(e){return new Promise((t,s)=>{chrome&&chrome.permissions?chrome.permissions.contains({permissions:e},e=>{!0===e?t(!0):s({success:!1})}):s({success:!1})})}requestPermissions(e){return new Promise((t,s)=>{chrome&&chrome.permissions?chrome.permissions.request({permissions:e},e=>{!0===e?t(!0):s({success:!1})}):s({success:!1})})}usePermissions(e,t=!1,s=""){return new Promise((o,i)=>{this.checkPermissions(e).then(e=>{o(e)}).catch(()=>{let n=!0;t&&(n=confirm(s)),n?this.requestPermissions(e).then(e=>{o(e)}).catch(e=>{i(e)}):i({success:!1})})})}getSiteFromHost(e,t){let s=[];t.sites&&s.push(...t.sites),t.system&&t.system.publicSites&&s.push(...t.system.publicSites);let o=s.find(t=>{var s;let o=[t.url].concat(t.cdn,null===(s=t.formerHosts)||void 0===s?void 0:s.map(e=>"//"+e));return t.host==e||o.join("").indexOf("//"+e)>-1});return o?this.clone(o):null}getNewBackupFileName(){return"PT-Plugin-Plus-Backup-"+a()().format("YYYY-MM-DD_HH-mm-ss")+".zip"}replaceKeys(e,t,s=""){if(!e||"string"!=typeof e)return e;let o=e;for(const e in t)if(t.hasOwnProperty(e)){const i=t[e];let n="$"+e+"$";s&&(n=`$${s}.${e}$`),o=o.replace(n,i)}return o}checkOptionalPermission(e){return!!(this.isExtensionMode&&this.manifest&&this.manifest.optional_permissions)&&this.manifest.optional_permissions.includes(e)}transformTime(e,t){if(!t||!e)return e;let s=e;/^(\d){10}$/.test(s+"")&&(s=1e3*parseInt(s+""));let o=a()(s).format("YYYY-MM-DDTHH:mm:ss");return s=new Date(`${o}${t}`).getTime(),s}}},8:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return InfoParser}));var _interface_common__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),dayjs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(2),dayjs__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__),_service_public__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(3),dayjs_plugin_customParseFormat__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(9),dayjs_plugin_customParseFormat__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(dayjs_plugin_customParseFormat__WEBPACK_IMPORTED_MODULE_3__),dayjs_plugin_advancedFormat__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(10),dayjs_plugin_advancedFormat__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(dayjs_plugin_advancedFormat__WEBPACK_IMPORTED_MODULE_4__);dayjs__WEBPACK_IMPORTED_MODULE_1___default.a.extend(dayjs_plugin_customParseFormat__WEBPACK_IMPORTED_MODULE_3___default.a),dayjs__WEBPACK_IMPORTED_MODULE_1___default.a.extend(dayjs_plugin_advancedFormat__WEBPACK_IMPORTED_MODULE_4___default.a);class InfoParser{constructor(e){this.service=e}getResult(e,t){let s={};if(e)for(const o in t.fields)if(t.fields.hasOwnProperty(o)){let i=t.fields[o],n=this.getFieldData(e,i,t);null!=n&&(s[o]=n)}return s}debug(...e){this.service?this.service.debug(...e):_service_public__WEBPACK_IMPORTED_MODULE_2__.a.debug(...e)}getFieldData(content,config,rule){let query,selectorIndex=0,selectors=[];if("string"==typeof config.selector)selectors.push(config.selector);else{if(!config.selector||!config.selector.length)return void 0===config.value?null:config.value;selectors=config.selector}selectors.some(selector=>{try{switch(rule.dataType){case _interface_common__WEBPACK_IMPORTED_MODULE_0__.j.JSON:if(query=""==selector?content:"["==selector.substr(0,1)?eval("content"+selector):eval("content."+selector),null!=query)return!0;break;case _interface_common__WEBPACK_IMPORTED_MODULE_0__.j.TEXT:case _interface_common__WEBPACK_IMPORTED_MODULE_0__.j.HTML:default:if(""==selector?query=content:(query=content.find(selector),0==query.length&&(query=content.filter(selector))),query.length>0)return!0}selectorIndex++}catch(e){return this.debug("InfoParser.getFieldData.Error",selector,e.message,e.stack),!0}});let result=null,dateTime=dayjs__WEBPACK_IMPORTED_MODULE_1___default.a,_self=this;if(null!=query)if(config.attribute||config.filters||config.switchFilters){let filters;config.attribute&&rule.dataType!=_interface_common__WEBPACK_IMPORTED_MODULE_0__.j.JSON&&(query=query.attr(config.attribute)),filters=config.switchFilters?config.switchFilters[selectorIndex]||null:config.filters,filters&&filters.every(filter=>{try{query=eval(filter)}catch(e){return this.debug("InfoParser.filter.Error",filter,e.message,e.stack),query=null,!1}return!0}),result=query}else switch(rule.dataType){case _interface_common__WEBPACK_IMPORTED_MODULE_0__.j.JSON:result=query;break;default:result=query.text().trim()}return result}getTotalSize(e){let t=0;return e.forEach(e=>{let s=e.match(/^(\d*\.?\d+)(.*[^ZEPTGMK])?([ZEPTGMK](B|iB)?)$/i);if(!s)return;let o=parseFloat(s[1]),i=s[3].toLowerCase();switch(!0){case/ki?b/.test(i):t+=o*Math.pow(2,10);break;case/mi?b/.test(i):t+=o*Math.pow(2,20);break;case/gi?b/.test(i):t+=o*Math.pow(2,30);break;case/ti?b?/.test(i):t+=o*Math.pow(2,40);break;case/pi?b?/.test(i):t+=o*Math.pow(2,50);break;case/ei?b?/.test(i):t+=o*Math.pow(2,60);break;case/zi?b?/.test(i):t+=o*Math.pow(2,70)}}),t}formatIMDbId(e){return Number(e)&&(e.length<7&&(e=e.padStart(7,"0")),e="tt"+e),e}}}});