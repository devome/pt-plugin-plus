(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-common"],{"0a02":function(e,t,o){"use strict";o.d(t,"a",(function(){return h}));o("a481"),o("7514"),o("2fdb"),o("6762"),o("6b54"),o("7f7f");var n=o("9ab4"),r=o("8d81"),s=o.n(r),i=o("bdfc"),a=o("5a0c"),c=o.n(a),u=o("2b80"),l=function(){function e(){this.isExtensionMode=!1,this.browserName="",this.manifest={manifest_version:2,name:"",version:""};try{this.isExtensionMode=!!(chrome.runtime&&chrome.extension&&chrome.runtime.getManifest),this.manifest=chrome.runtime.getManifest()}catch(e){console.log("HelpFunctions: is not extension mode.",e)}this.browserName=(new u["UAParser"]).getBrowser().name||""}return e.prototype.getToDay=function(e){var t=new Date;e&&(t=new Date(e));var o=t.getFullYear(),n=t.getMonth()+1,r=n<10?"0"+n:n,s=t.getDate(),i=s<10?"0"+s:s;return o+"-"+r+"-"+i},e.prototype.updateBadge=function(e){if(this.isExtensionMode)try{0==e?(chrome.browserAction.setBadgeText({text:""}),chrome.browserAction.enable()):(chrome.browserAction.setBadgeText({text:e.toString()}),chrome.browserAction.setBadgeBackgroundColor({color:"#aabbcc"}),chrome.browserAction.disable())}catch(t){console.log(t)}},e.prototype.getVersion=function(){return this.isExtensionMode?"v"+(this.manifest.version_name||this.manifest.version):"localVersion"},e.prototype.getRandomString=function(e,t){void 0===e&&(e=32),void 0===t&&(t=!1);for(var o=t?"abcdefhijkmnprstwxyz2345678ABCDEFGHJKMNPQRSTWXYZ":"abcdefghijkmnopqrstuvwxyz0123456789ABCDEFGHIJKMNOPQRSTUVWXYZ",n=o.length,r=[],s=0;s<e;s++)r.push(o.charAt(Math.floor(Math.random()*n)));return r.join("")},e.prototype.getNewId=function(){return s()((new Date).getTime().toString()+this.getRandomString()).toString()},e.prototype.showNotifications=function(e,t){void 0===t&&(t=3e3),e=Object.assign({type:"basic",iconUrl:chrome.extension.getURL("/assets/icon-128.png"),title:"PT 助手 Plus",priority:0,message:""},e);var o=Math.floor(99999*Math.random())+"";chrome.notifications.create(o,e,(function(e){o=e})),setTimeout((function(){chrome.notifications.clear(o,(function(){}))}),t)},e.prototype.removeDuplicateQueryString=function(e){var t,o=[],n="",r=/([^&=]+)=([^&]*)/g,s="",i=e.indexOf("?");if(-1!==i){s=e.substr(0,i+1),n=e.substr(i+1);while(t=r.exec(n)){var a=t[1]+"="+t[2];o.includes(a)||o.push(a)}return s+o.join("&")}return e},e.prototype.removeQueryStringFromValue=function(e,t){var o,n=[],r="",s=/([^&=]+)=([^&]*)/g,i="",a=e.indexOf("?");if(-1!==a){i=e.substr(0,a+1),r=e.substr(a+1);while(o=s.exec(r)){var c=o[1]+"="+o[2];o[2]!==t&&n.push(c)}return i+n.join("&")}return e},e.prototype.removeQueryStringFields=function(e,t){var o,n=[],r="",s=/([^&=]+)=([^&]*)/g,i="",a=e.indexOf("?");if(-1!==a){i=e.substr(0,a+1),r=e.substr(a+1);while(o=s.exec(r)){var c=o[1]+"="+o[2];t.includes(o[1])||n.push(c)}return i+n.join("&")}return e},e.prototype.clone=function(e){return JSON.parse(JSON.stringify(e))},e.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];console.log.apply(console,Object(n["d"])([(new Date).toLocaleString()],e))},e.prototype.showContextMenu=function(e,t){try{i["show"](e,t),$(".basicContext").css({left:"-=20px",top:"+=10px"})}catch(o){}},e.prototype.getCleaningURL=function(e){return this.removeQueryStringFields(e,["hit","cmtpage","page"])},e.prototype.checkPermissions=function(e){return new Promise((function(t,o){chrome&&chrome.permissions?chrome.permissions.contains({permissions:e},(function(e){!0===e?t(!0):o({success:!1})})):o({success:!1})}))},e.prototype.requestPermissions=function(e){return new Promise((function(t,o){chrome&&chrome.permissions?chrome.permissions.request({permissions:e},(function(e){!0===e?t(!0):o({success:!1})})):o({success:!1})}))},e.prototype.usePermissions=function(e,t,o){var n=this;return void 0===t&&(t=!1),void 0===o&&(o=""),new Promise((function(r,s){n.checkPermissions(e).then((function(e){r(e)})).catch((function(){var i=!0;t&&(i=confirm(o)),i?n.requestPermissions(e).then((function(e){r(e)})).catch((function(e){s(e)})):s({success:!1})}))}))},e.prototype.getSiteFromHost=function(e,t){var o=[];t.sites&&o.push.apply(o,t.sites),t.system&&t.system.publicSites&&o.push.apply(o,t.system.publicSites);var n=o.find((function(t){var o,n=[t.url].concat(t.cdn,null===(o=t.formerHosts)||void 0===o?void 0:o.map((function(e){return"//"+e})));return t.host==e||n.join("").indexOf("//"+e)>-1}));return n?this.clone(n):null},e.prototype.getNewBackupFileName=function(){return"PT-Plugin-Plus-Backup-"+c()().format("YYYY-MM-DD_HH-mm-ss")+".zip"},e.prototype.replaceKeys=function(e,t,o){if(void 0===o&&(o=""),!e)return e;var n=e;for(var r in t)if(t.hasOwnProperty(r)){var s=t[r],i="$"+r+"$";o&&(i="$"+o+"."+r+"$"),n=n.replace(i,s)}return n},e.prototype.checkOptionalPermission=function(e){return!!(this.isExtensionMode&&this.manifest&&this.manifest.optional_permissions)&&this.manifest.optional_permissions.includes(e)},e.prototype.transformTime=function(e,t){if(!t||!e)return e;var o=e;/^(\d){10}$/.test(o+"")&&(o=1e3*parseInt(o+""));var n=c()(o).format("YYYY-MM-DDTHH:mm:ss");return o=new Date(""+n+t).getTime(),o},e}(),h=new l},"5ff3":function(e,t,o){"use strict";o.d(t,"a",(function(){return i})),o.d(t,"b",(function(){return a}));o("a481"),o("28a5"),o("ac6a");var n=o("f62e"),r=o("21a6"),s=o.n(r),i=function(){function e(e){var t=this;this.options=e,this.count=0,this.completedCount=0,this.downloadingCount=0,this.files={},this.queues=[],e.files&&e.files.forEach((function(e){t.push(e)}))}return e.prototype.push=function(e){var t=this;if(!(!e.url||e.url&&this.files[e.url])){var o=new a(e);o.onCompleted=function(){t.downloadingCount--,t.completedCount++,t.onCompleted(o),delete t.files[o.url]},o.onStart=function(){t.downloadingCount++},o.onError=function(e){t.downloadingCount--,t.completedCount++,t.options.onError&&t.options.onError.call(t,o,e),delete t.files[o.url]},o.onProgress=function(e,n,r){t.options.onProgress&&t.options.onProgress.call(t,o,e,n,r)},this.files[o.url]=o,this.queues.push(o),this.count++,this.options.autoStart&&o.start()}},e.prototype.start=function(){},e.prototype.onCompleted=function(e){this.options.onCompleted&&this.options.onCompleted.call(this,e)},e}(),a=function(){function e(e){this.lastTime=0,this.startTime=0,this.status=0,this.statusText="",this.url="",this.requestMethod=n["m"].GET,this.postData=null,this.fileName="",this.loaded=0,this.total=0,this.percent=0,this.speed=0,this.showSpeed="",this.onProgress=function(){},this.onCompleted=function(){},this.onError=function(){},this.onStart=function(){},this.getDataOnly=!1,this.timeout=0,this.xhr=new XMLHttpRequest,this.fileName=e.fileName||"",this.url=e.url,this.getDataOnly=e.getDataOnly||!1,this.timeout=e.timeout||0,this.requestMethod=e.method||n["m"].GET}return e.prototype.start=function(){var e=this;this.lastTime=+new Date,this.startTime=this.lastTime,this.statusText="数据准备中……",this.timeout>0&&(this.xhr.timeout=this.timeout),this.xhr.open(this.requestMethod,this.url,!0),this.xhr.responseType="blob",this.xhr.onreadystatechange=function(){switch(e.xhr.readyState){case 4:switch(e.xhr.status){case 200:case 302:e.content=e.xhr.response,e.downloadCompleted();break;default:0!=e.xhr.status&&e.downloadError("["+e.url+"] 下载失败，返回的状态码为："+e.xhr.status);break}break;case 2:var t=e.xhr.getResponseHeader("Content-Disposition");!t||e.fileName||e.getDataOnly||(e.fileName=e.getFileName(t));break}},this.xhr.onprogress=function(t){e.loaded=t.loaded,e.total=t.total,e.percent=(t.loaded/t.total*100).toFixed(2),e.lastTime=+new Date,e.speed=e.loaded/(e.startTime-e.lastTime),e.updateProgress()},this.xhr.onerror=function(t){e.downloadError(t)},this.xhr.ontimeout=function(){e.downloadError("["+e.url+"] 下载超时")};var t=null;this.postData&&(t=$.param(this.postData)),this.requestMethod==n["m"].POST&&this.xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),this.xhr.send(t),this.onStart&&this.onStart.call(this)},e.prototype.getFileName=function(e){void 0===e&&(e="");for(var t,o=e.split(";"),n={},r="",s=0;s<o.length;s++){var i=o[s],a=i.replace(" ","").split("=");2==a.length&&(n[a[0]]=a[1].trim())}if(t=n["filename*"]){s=t.lastIndexOf("'");r=t.substr(s+1)}else r=n["filename"];return r=r.replace(/"/g,""),decodeURI(r)},e.prototype.downloadCompleted=function(){this.loaded>0&&!this.getDataOnly&&s.a.saveAs(this.content,this.fileName),this.onCompleted&&this.onCompleted.call(this)},e.prototype.downloadError=function(e){this.onError&&this.onError.call(this,e)},e.prototype.updateProgress=function(){this.onProgress&&this.onProgress.call(this,this.loaded,this.total,this.speed)},e}()},7626:function(e,t,o){"use strict";o.d(t,"b",(function(){return y})),o.d(t,"a",(function(){return b}));o("a481");var n=o("f62e"),r=function(){function e(){this.isExtensionMode=!1,window.chrome&&chrome.extension&&(this.isExtensionMode=!0)}return e.prototype.set=function(e,t,o){var r=this;return void 0===o&&(o=n["s"].json),new Promise((function(s,i){if(r.isExtensionMode){var a={};a[e]=t,chrome.storage.local.set(a,(function(){s()}))}else"string"!==typeof t&&o==n["s"].json&&(t=JSON.stringify(t)),window.localStorage.setItem(e,t),s()}))},e.prototype.get=function(e,t,o){if(void 0===o&&(o=n["s"].json),this.isExtensionMode)chrome.storage.local.get(e,(function(o){o&&o[e]?t(o[e]):t(null)}));else{var r=window.localStorage.getItem(e);r&&o==n["s"].json&&(r=JSON.parse(r)),t&&t(r)}},e}(),s=r,i=o("8d81"),a=o.n(i),c=o("0a02"),u=(o("7514"),o("5df3"),o("ac6a"),o("c67c")),l=o("5ff3"),h="Favicon-Cache",p="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",d=(function(){function e(e){this.service=e,this.cache={},this.loadCache()}e.prototype.loadCache=function(){var e=window.localStorage.getItem(h);e&&(this.cache=JSON.parse(e)||{})},e.prototype.saveCache=function(){window.localStorage.setItem(h,JSON.stringify(this.cache))},e.prototype.clear=function(){this.cache={},this.saveCache()},e.prototype.reset=function(){var e=JSON.parse(JSON.stringify(this.cache));this.cache={};var t=[];for(var o in e)if(e.hasOwnProperty(o)){var n=e[o];t.push(n.origin)}return this.gets(t)},e.prototype.gets=function(e){var t=this;return new Promise((function(o,n){var r=[];e.forEach((function(e){r.push(t.get(e))})),Promise.all(r).then((function(e){o(e)})).catch((function(e){n(e)}))}))},e.prototype.get=function(e,t){var o=this;return void 0===t&&(t=!1),new Promise((function(n,r){var s=u["a"].parseURL(e),i=o.cache[s.host];if(i&&!t)return n(i);o.cacheFavicon(s.origin,s.host).then((function(e){n(e)})).catch((function(e){r(e)}))}))},e.prototype.cacheFavicon=function(e,t){var o=this;return new Promise((function(n,r){o.download(e+"/favicon.ico").then((function(s){s&&/image/gi.test(s.type)?o.transformBlob(s,"base64").then((function(t){n(o.set(e,t))})).catch((function(e){r(e)})):o.cacheFromIndex(e,t).then((function(e){n(e)})).catch((function(e){r(e)}))})).catch((function(){o.cacheFromIndex(e,t).then((function(e){n(e)})).catch((function(e){r(e)}))}))}))},e.prototype.set=function(e,t){var o=u["a"].parseURL(e),n={origin:o.origin,host:o.host,data:t};return this.cache[o.host]=n,this.saveCache(),n},e.prototype.cacheFromIndex=function(e,t){var o=this;return new Promise((function(t,n){o.download(e).then((function(r){r&&/text/gi.test(r.type)?o.transformBlob(r,"text").then((function(r){try{var s=(new DOMParser).parseFromString(r,"text/html"),i=$(s).find("head"),a=i.find("link[rel*=icon]:first");if(a&&a.length>0){var c=u["a"].parseURL(e),l=a.attr("href")+"";"//"===l.substr(0,2)?l=c.protocol+":"+l:"http"!==l.substr(0,4)&&(l=c.origin+"/"+l),o.download(l).then((function(r){r&&/image/gi.test(r.type)?o.transformBlob(r,"base64").then((function(n){t(o.set(e,n))})).catch((function(e){o.debug(e),n(e)})):t(o.set(e,p))})).catch((function(){t(o.set(e,p))}))}else t(o.set(e,p))}catch(h){console.log(h),o.debug(h),t(o.set(e,p))}})).catch((function(e){o.debug(e),n(e)})):n()})).catch((function(){t(o.set(e,p))}))}))},e.prototype.transformBlob=function(e,t){return new Promise((function(o,n){var r=new FileReader;switch(r.addEventListener("loadend",(function(){r.result?o(r.result):n()})),t){case"text":r.readAsText(e);break;case"base64":r.readAsDataURL(e);break}}))},e.prototype.download=function(e){var t=this;return new Promise((function(o,n){var r=new l["b"]({url:e,getDataOnly:!0,timeout:5e3});r.onCompleted=function(){r.content?o(r.content):n()},r.onError=function(e){console.log("Favicon.download.error",e),t.debug(e),n(e)},r.start()}))},e.prototype.debug=function(){for(var e,t=[],o=0;o<arguments.length;o++)t[o]=arguments[o];this.service&&(e=this.service).debug.apply(e,t)}}(),""),f=!1,g=!1;try{var m=chrome.runtime;f=!0,d=m.getManifest().options_ui.page.replace("index.html",""),d&&"/"==d.substr(-1)&&(d=d.substr(0,d.length-1)),d||(d="chrome-extension://"+chrome.runtime.id),g&&console.log("is extension mode.")}catch(T){f=!1,g&&console.log("is not extension mode.")}var v=f?(f?d:"")+"/resource":"http://"+window.location.hostname+":8001",w={host:v,schemas:v+"/schemas.json",schemaConfig:v+"/schemas/{$schema}/config.json",sites:v+"/sites.json",siteConfig:v+"/sites/{$site}/config.json",clients:v+"/clients.json",clientConfig:v+"/clients/{$client}/config.json",latestReleases:"https://api.github.com/repos/ronggang/PT-Plugin-Plus/releases/latest",systemConfig:v+"/systemConfig.json"},y={debugMode:g,scriptQueues:[],isExtensionMode:f,cache:{localStorage:new s,cacheKey:n["g"].cache,contents:{},expires:86400,init:function(e){var t=this;y.debugMode&&console.log("cache.init"),this.localStorage.get(this.cacheKey,(function(o){if(o){var n=o["expires"];n&&new Date>new Date(n)||y.debugMode?t.contents={}:t.contents=o}e&&e()}))},get:function(e){return this.contents?this.contents[a()(e)]:null},set:function(e,t){this.contents[a()(e)]=t,this.contents["update"]=(new Date).getTime(),this.contents["expires"]=(new Date).getTime()+this.expires,this.localStorage.set(this.cacheKey,this.contents)},clear:function(){this.contents={},this.localStorage.set(this.cacheKey,this.contents)},getLastUpdateTime:function(){var e=this;return new Promise((function(t,o){e.localStorage.get(e.cacheKey,(function(e){if(e){var n=e["update"];t(n||0)}else o()}))}))}},addScript:function(e){y.debugMode&&console.log("addScript",e),this.scriptQueues.push(e)},applyScripts:function(){var e=this,t=this.scriptQueues.shift();t&&this.execScript(t).then((function(){e.applyScripts()}))},execScript:function(e){var t=this;return new Promise((function(o,n){switch(e.type){case"code":t.runScript(e.content),o();break;default:var r=e.content||e;"http"!==r.substr(0,4)&&("/"!==r.substr(0,1)&&(r="/"+r),r=""+b.host+r);var s=t.cache.get(r);try{s?(t.runScript(s),o()):(console.log("execScript: %s",r),$.ajax({url:r,dataType:"text"}).done((function(e){t.runScript(e),t.cache.set(r,e),o()})).fail((function(e,t,o){e.responseJSON&&e.responseJSON.code&&e.responseJSON.msg?n(e.responseJSON.msg+" ("+e.responseJSON.code+")"):n(t+", "+o)})))}catch(T){n(T)}break}}))},runScript:function(e,t){void 0===t&&(t=window),eval.call(t,e)},applyStyle:function(e){var t=this;return new Promise((function(o,n){var r=$("<style/>").appendTo(document.body);switch(e.type){case"file":var s=e.content;"http"!==s.substr(0,4)&&("/"!==s.substr(0,1)&&(s="/"+s),s=""+b.host+s);var i=t.cache.get(s);i?(r.html(i),o()):$.get(s,(function(e){r.html(e),t.cache.set(s,e),o()}),"text");break;default:r.html(e.content),o();break}}))},getScriptContent:function(e){var t=b.host+"/"+e;return t="http"===e.substr(0,4)?e:t.replace("resource//","resource/"),y.debugMode&&console.log("getScriptContent",t),$.ajax({url:t,dataType:"text"})},createErrorMessage:function(e){return{type:n["h"].error,msg:e,success:!1}},showNotifications:function(e,t){void 0===t&&(t=3e3),c["a"].showNotifications(e,t)},getInstallType:function(){return new Promise((function(e,t){chrome&&chrome.management?chrome.management.getSelf((function(t){t.updateUrl&&t.updateUrl.indexOf("ronggang/PT-Plugin-Plus")>0?e(n["j"].crx):e(t.installType)})):t()}))}};y.cache.init();var b=w},"7e92":function(e,t,o){"use strict";var n=o("2b0e"),r=o("ce5b"),s=o.n(r),i=o("25a2"),a=o("4b41"),c=(o("da64"),function(){function e(){}return e.prototype.init=function(e){void 0===e&&(e="zh-Hans"),n["default"].use(s.a,{iconfont:"md",lang:{locales:{"zh-Hans":i["a"],en:a["a"]},current:e}})},e}());t["a"]=new c},a1f4:function(e,t,o){"use strict";var n=o("f62e"),r=o("7626"),s=function(){function e(){this.isExtensionMode=r["b"].isExtensionMode}return e.prototype.sendRequest=function(e,t,o){var s=this;return new Promise((function(i,a){if(s.isExtensionMode)try{chrome.runtime.sendMessage({action:e,data:o},(function(n){if(chrome.runtime.lastError){var s=chrome.runtime.lastError.message||"";if(console.log("Extension.sendRequest.runtime",e,o,chrome.runtime.lastError.message),/Could not establish connection/.test(s))return r["b"].showNotifications({message:"插件状态未知，当前操作可能失败，请刷新页面后再试"}),void a(chrome.runtime.lastError);if(!/The message port closed before a response was received/.test(s))return void a(chrome.runtime.lastError)}t&&t(n.resolve||n.reject),n.reject?a(n.reject):!n.resolve||"error"!==n.resolve.status&&!1!==n.resolve.success?i(n.resolve):a(n.resolve)}))}catch(c){/Invocation of form runtime\.connect|doesn't match definition runtime\.connect|Extension context invalidated/.test(c.message)?a({type:n["h"].error,msg:"插件状态未知，当前操作可能失败，请刷新页面后再试",success:!1}):a(c)}else 0}))},e}();t["a"]=s},a400:function(e,t,o){"use strict";var n,r,s,i,a,c,u,l,h,p,d,f,g,m,v,w,y,b,T,S,C,k,x,P,D,M,F,B,O;o.d(t,"q",(function(){return n})),o.d(t,"m",(function(){return r})),o.d(t,"l",(function(){return a})),o.d(t,"a",(function(){return c})),o.d(t,"r",(function(){return u})),o.d(t,"f",(function(){return l})),o.d(t,"g",(function(){return h})),o.d(t,"j",(function(){return p})),o.d(t,"k",(function(){return f})),o.d(t,"v",(function(){return g})),o.d(t,"t",(function(){return m})),o.d(t,"u",(function(){return v})),o.d(t,"e",(function(){return w})),o.d(t,"i",(function(){return y})),o.d(t,"c",(function(){return b})),o.d(t,"s",(function(){return T})),o.d(t,"b",(function(){return S})),o.d(t,"o",(function(){return x})),o.d(t,"d",(function(){return P})),o.d(t,"w",(function(){return D})),o.d(t,"n",(function(){return F})),o.d(t,"h",(function(){return B})),o.d(t,"p",(function(){return O})),function(e){e["ZiB"]="ZiB",e["EiB"]="EiB",e["PiB"]="PiB",e["TiB"]="TiB",e["GiB"]="GiB",e["MiB"]="MiB",e["KiB"]="KiB"}(n||(n={})),function(e){e["JSON"]="json",e["XML"]="xml",e["HTML"]="html",e["TEXT"]="text"}(r||(r={})),function(e){e["transmission"]="transmission",e["utorrent"]="utorrent",e["deluge"]="deluge",e["synologyDownloadStation"]="synologyDownloadStation",e["rutorrent"]="rutorrent",e["qbittorrent"]="qbittorrent"}(s||(s={})),function(e){e["normal"]="normal",e["label"]="label",e["spliter"]="spliter",e["popup"]="popup"}(i||(i={})),function(e){e["POST"]="POST",e["GET"]="GET"}(a||(a={})),function(e){e["readConfig"]="readConfig",e["saveConfig"]="saveConfig",e["reloadConfig"]="reloadConfig",e["sendTorrentToDefaultClient"]="sendTorrentToDefaultClient",e["sendTorrentToClient"]="sendTorrentToClient",e["searchTorrent"]="searchTorrent",e["copyTextToClipboard"]="copyTextToClipboard",e["addTorrentFromURL"]="addTorrentFromURL",e["getFreeSpace"]="getFreeSpace",e["downloadFromDroper"]="downloadFromDroper",e["openOptions"]="openOptions",e["updateOptionsTabId"]="updateOptionsTabId",e["getSearchResult"]="getSearchResult",e["getDownloadHistory"]="getDownloadHistory",e["removeDownloadHistory"]="removeDownloadHistory",e["clearDownloadHistory"]="clearDownloadHistory",e["testClientConnectivity"]="testClientConnectivity",e["getSystemLogs"]="getSystemLogs",e["removeSystemLogs"]="removeSystemLogs",e["clearSystemLogs"]="clearSystemLogs",e["readUIOptions"]="readUIOptions",e["saveUIOptions"]="saveUIOptions",e["showMessage"]="showMessage",e["writeLog"]="writeLog",e["serviceStoped"]="serviceStoped",e["addContentPage"]="addContentPage",e["abortSearch"]="abortSearch",e["backupToGoogle"]="backupToGoogle",e["restoreFromGoogle"]="restoreFromGoogle",e["clearFromGoogle"]="clearFromGoogle",e["getTorrentDataFromURL"]="getTorrentDataFromURL",e["getUserInfo"]="getUserInfo",e["abortGetUserInfo"]="abortGetUserInfo",e["refreshUserData"]="refreshUserData",e["getClearedOptions"]="getClearedOptions",e["resetRunTimeOptions"]="resetRunTimeOptions",e["getBase64FromImageUrl"]="getBase64FromImageUrl",e["getUserHistoryData"]="getUserHistoryData",e["getMovieInfos"]="getMovieInfos",e["getMovieRatings"]="getMovieRatings",e["getIMDbIdFromDouban"]="getIMDbIdFromDouban",e["queryMovieInfoFromDouban"]="queryMovieInfoFromDouban",e["addBrowserDownloads"]="addBrowserDownloads",e["checkPermissions"]="checkPermissions",e["requestPermissions"]="requestPermissions",e["changeLanguage"]="changeLanguage",e["getCurrentLanguageResource"]="getCurrentLanguageResource",e["addLanguage"]="addLanguage",e["replaceLanguage"]="replaceLanguage",e["hideMessage"]="hideMessage",e["resetUserDatas"]="resetUserDatas",e["backupToServer"]="backupToServer",e["restoreFromServer"]="restoreFromServer",e["getBackupListFromServer"]="getBackupListFromServer",e["deleteFileFromBackupServer"]="deleteFileFromBackupServer",e["sendTorrentsInBackground"]="sendTorrentsInBackground",e["createBackupFile"]="createBackupFile",e["checkBackupData"]="checkBackupData",e["addTorrentToCollection"]="addTorrentToCollection",e["getTorrentCollections"]="getTorrentCollections",e["deleteTorrentFromCollention"]="deleteTorrentFromCollention",e["clearTorrentCollention"]="clearTorrentCollention",e["getTorrentCollention"]="getTorrentCollention",e["getSiteSelectorConfig"]="getSiteSelectorConfig",e["resetTorrentCollections"]="resetTorrentCollections",e["getTorrentCollectionGroups"]="getTorrentCollectionGroups",e["addTorrentCollectionGroup"]="addTorrentCollectionGroup",e["addTorrentCollectionToGroup"]="addTorrentCollectionToGroup",e["updateTorrentCollectionGroup"]="updateTorrentCollectionGroup",e["removeTorrentCollectionFromGroup"]="removeTorrentCollectionFromGroup",e["removeTorrentCollectionGroup"]="removeTorrentCollectionGroup",e["updateTorrentCollention"]="updateTorrentCollention",e["getAllTorrentCollectionLinks"]="getAllTorrentCollectionLinks",e["restoreCookies"]="restoreCookies",e["resetFavicons"]="resetFavicons",e["resetFavicon"]="resetFavicon",e["getBackupRawData"]="getBackupRawData",e["testBackupServerConnectivity"]="testBackupServerConnectivity",e["createSearchResultSnapshot"]="createSearchResultSnapshot",e["loadSearchResultSnapshot"]="loadSearchResultSnapshot",e["getSearchResultSnapshot"]="getSearchResultSnapshot",e["removeSearchResultSnapshot"]="removeSearchResultSnapshot",e["clearSearchResultSnapshot"]="clearSearchResultSnapshot",e["resetSearchResultSnapshot"]="resetSearchResultSnapshot",e["createKeepUploadTask"]="createKeepUploadTask",e["loadKeepUploadTask"]="loadKeepUploadTask",e["getKeepUploadTask"]="getKeepUploadTask",e["removeKeepUploadTask"]="removeKeepUploadTask",e["clearKeepUploadTask"]="clearKeepUploadTask",e["resetKeepUploadTask"]="resetKeepUploadTask",e["updateKeepUploadTask"]="updateKeepUploadTask",e["resetDownloadHistory"]="resetDownloadHistory",e["pushDebugMsg"]="pushDebugMsg",e["updateDebuggerTabId"]="updateDebuggerTabId",e["getTopSearches"]="getTopSearches"}(c||(c={})),function(e){e["text"]="TEXT",e["json"]="JSON"}(u||(u={})),function(e){e["default"]="PT-Plugin-Plus-Config",e["downloadHistory"]="PT-Plugin-Plus-downloadHistory",e["systemLogs"]="PT-Plugin-Plus-systemLogs",e["uiOptions"]="PT-Plugin-Plus-uiOptions",e["cache"]="PT-Plugin-Plus-Cache-Contents",e["userDatas"]="PT-Plugin-Plus-User-Datas",e["collection"]="PT-Plugin-Plus-Collection",e["searchResultSnapshot"]="PT-Plugin-Plus-SearchResultSnapshot",e["keepUploadTask"]="PT-Plugin-Plus-KeepUploadTask"}(l||(l={})),function(e){e["success"]="success",e["error"]="error",e["info"]="info",e["warning"]="warning",e["unknown"]="unknown"}(h||(h={})),function(e){e["background"]="background",e["content"]="content",e["options"]="options",e["popup"]="popup",e["debugger"]="debugger"}(p||(p={})),function(e){e["init"]="init",e["requestMessage"]="requestMessage"}(d||(d={})),function(e){e["systemLogs"]="systemLogs",e["searchTorrent"]="searchTorrent"}(f||(f={})),function(e){e["home"]="home",e["downloadPaths"]="downloadPaths",e["searchTorrent"]="searchTorrent"}(g||(g={})),function(e){e["latest"]="latest",e["today"]="today",e["all"]="all"}(m||(m={})),function(e){e["needLogin"]="needLogin",e["notSupported"]="notSupported",e["unknown"]="unknown",e["success"]="success"}(v||(v={})),function(e){e["allSite"]="__allSite__",e["all"]="__all__",e["noGroup"]="__noGroup__"}(w||(w={})),function(e){e["development"]="development",e["normal"]="normal",e["crx"]="crx"}(y||(y={})),function(e){e["id"]="id",e["name"]="name"}(b||(b={})),function(e){e[e["downloading"]=1]="downloading",e[e["sending"]=2]="sending",e[e["completed"]=255]="completed",e[e["inactive"]=3]="inactive"}(T||(T={})),function(e){e["OWSS"]="OWSS",e["WebDAV"]="WebDAV"}(S||(S={})),function(e){e["left"]="left",e["right"]="right"}(C||(C={})),function(e){e["faq"]="https://github.com/ronggang/PT-Plugin-Plus/wiki/frequently-asked-questions"}(k||(k={})),function(e){e["all"]="all",e["options"]="options",e["userDatas"]="userDatas",e["collection"]="collection",e["cookies"]="cookies",e["searchResultSnapshot"]="searchResultSnapshot",e["keepUploadTask"]="keepUploadTask",e["downloadHistory"]="downloadHistory"}(x||(x={})),function(e){e["Chrome"]="Chrome",e["Firefox"]="Firefox"}(P||(P={})),function(e){e["success"]="success",e["error"]="error",e["loading"]="loading"}(D||(D={})),function(e){e["time"]="time",e["name"]="name",e["size"]="size"}(M||(M={})),function(e){e["desc"]="desc",e["asc"]="asc"}(F||(F={})),function(e){e["AES"]="AES"}(B||(B={})),function(e){e["needSecretKey"]="needSecretKey",e["errorSecretKey"]="errorSecretKey"}(O||(O={}))},c67c:function(e,t,o){"use strict";o.d(t,"a",(function(){return n}));o("4917"),o("386d"),o("6b54"),o("a481"),o("28a5");var n={formatNumber:function(e,t){if(void 0===t&&(t="###,###,###,###.00"),void 0===e)return"";var o=function(e,t,o){if(""===e||void 0===e)return""===t||void 0===t?"":t;var n="",r="",s="",i=0;o||(e=e.split("").reverse().join(""),t=t.split("").reverse().join(""));for(var a=0,c=0;c<t.length;c++,a++)if(r=e.charAt(a),void 0!==r)switch(n=t.charAt(c),n){case"#":s+=r,i=c;break;case"0":s=r||r===n?s+r:s+0,i=c;break;case".":s+=r===n?r:(a--,n);break;case",":s+=r===n?r:(a--,n);break;default:s+=n,a--}return a!==e.length&&"0"!==t.charAt(t.length-1)&&i!==t.length&&"0"!==t.charAt(i)&&(s=s.substr(0,i+1)+e.substr(a)+s.substr(i+1)),s=(o?s:s.split("").reverse().join("")).replace(/(^,)|(,$)|(,,+)/g,""),","===s.substr(0,1)&&(s=s.substr(1)),"-,"===s.substr(0,2)&&(s="-"+s.substr(2)),s},n=e.toString();if(0===n.length)return"";var r=parseFloat(n);if(isNaN(r))return n;if(!t)return n;var s=t.split("."),i=n.split(".");return s.length>1?o(i[0],s[0])+"."+o(i[1],s[1],1):o(i[0],s[0])},formatSize:function(e,t,o){void 0===t&&(t=!1),void 0===o&&(o="");var n,r=parseFloat(e);if(isNaN(r))return"";if(r<0)return"N/A";if(0===r)return t?"":"speed"===o?"0.00 KiB/s":"0.00";var s="KiB",i="###,###,###,###.00 ",a="###,###,###,###.000 ";return r<1e3*Math.pow(2,10)?(n=r/Math.pow(2,10),s="KiB"):r<1e3*Math.pow(2,20)?(n=r/Math.pow(2,20),s="MiB"):r<1e3*Math.pow(2,30)?(n=r/Math.pow(2,30),s="GiB"):r<1e3*Math.pow(2,40)?(n=r/Math.pow(2,40),s="TiB",i=a):r<1e3*Math.pow(2,50)?(n=r/Math.pow(2,50),s="PiB",i=a):r<1e3*Math.pow(2,60)?(n=r/Math.pow(2,60),s="EiB",i=a):(n=r/Math.pow(2,70),s="ZiB",i=a),"speed"===o&&(s+="/s"),this.formatNumber(n,i)+s},formatSizeWithNegative:function(e,t,o){void 0===t&&(t=!1),void 0===o&&(o=""),e=parseFloat(e);var n=e;e<0&&(n=-n);var r=this.formatSize(n,t,o);return e<0&&(r="- "+r),r},formatSpeed:function(e,t){return void 0===t&&(t=!1),this.formatSize(e,t,"speed")},parseURL:function(e){var t=document.createElement("a");return t.href=e,{source:e,protocol:t.protocol.replace(":",""),host:t.hostname,port:t.port,query:t.search,params:function(){for(var e,o={},n=t.search.replace(/^\?/,"").split("&"),r=n.length,s=0;s<r;s++)n[s]&&(e=n[s].split("="),o[e[0]]=e[1]);return o}(),hash:t.hash.replace("#",""),path:t.pathname.replace(/^([^/])/,"/$1"),segments:t.pathname.replace(/^\//,"").split("/"),origin:t.protocol+"//"+t.hostname+(t.port?":"+t.port:"")}},timeAgoToNumber:function(e){var t=/^([\d.]+).+?((year|month|week|day|hour|min|minute)s?)( +ago)?(.+)?$/i,o=e.trim().match(t);if(!o)return 0;var n=new Date,r=o[3],s=Math.round(parseFloat(o[1])),i=new Date;switch(r.toLowerCase()){case"year":i=new Date(n.setFullYear(n.getFullYear()-s));break;case"month":i=new Date(n.setMonth(n.getMonth()-s));break;case"day":i=new Date(n.setDate(n.getDate()-s));break;case"week":i=new Date(n.setDate(n.getDate()-7*s));break;case"hour":i=new Date(n.setHours(n.getHours()-s));break;case"min":case"minute":i=new Date(n.setMinutes(n.getMinutes()-s));break}return i.getTime()}}},f62e:function(e,t,o){"use strict";o.d(t,"a",(function(){return r}));var n=o("a400");o.d(t,"b",(function(){return n["a"]})),o.d(t,"c",(function(){return n["b"]})),o.d(t,"d",(function(){return n["c"]})),o.d(t,"e",(function(){return n["d"]})),o.d(t,"f",(function(){return n["e"]})),o.d(t,"g",(function(){return n["f"]})),o.d(t,"h",(function(){return n["g"]})),o.d(t,"i",(function(){return n["h"]})),o.d(t,"j",(function(){return n["i"]})),o.d(t,"k",(function(){return n["j"]})),o.d(t,"l",(function(){return n["k"]})),o.d(t,"m",(function(){return n["l"]})),o.d(t,"n",(function(){return n["m"]})),o.d(t,"o",(function(){return n["n"]})),o.d(t,"p",(function(){return n["o"]})),o.d(t,"q",(function(){return n["p"]})),o.d(t,"r",(function(){return n["q"]})),o.d(t,"s",(function(){return n["r"]})),o.d(t,"t",(function(){return n["t"]})),o.d(t,"u",(function(){return n["u"]})),o.d(t,"v",(function(){return n["v"]})),o.d(t,"w",(function(){return n["w"]}));var r=["red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","blue-grey","grey","black"]}}]);