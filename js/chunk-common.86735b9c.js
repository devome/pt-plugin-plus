(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-common"],{"0a02":function(e,t,n){"use strict";n.d(t,"a",(function(){return p}));n("a481"),n("7514");var o=n("75fc"),r=(n("2fdb"),n("6762"),n("6b54"),n("7f7f"),n("d225")),s=n("b0b4"),i=n("8d81"),a=n.n(i),c=n("bdfc"),u=n("5a0c"),l=n.n(u),h=n("2b80"),d=function(){function e(){Object(r["a"])(this,e),this.isExtensionMode=!1,this.browserName="",this.manifest={manifest_version:2,name:"",version:""};try{this.isExtensionMode=!!(chrome.runtime&&chrome.extension&&chrome.runtime.getManifest),this.manifest=chrome.runtime.getManifest()}catch(t){console.log("HelpFunctions: is not extension mode.",t)}this.browserName=(new h["UAParser"]).getBrowser().name||""}return Object(s["a"])(e,[{key:"getToDay",value:function(e){var t=new Date;e&&(t=new Date(e));var n=t.getFullYear(),o=t.getMonth()+1,r=o<10?"0"+o:o,s=t.getDate(),i=s<10?"0"+s:s;return"".concat(n,"-").concat(r,"-").concat(i)}},{key:"updateBadge",value:function(e){if(this.isExtensionMode)try{0==e?(chrome.browserAction.setBadgeText({text:""}),chrome.browserAction.enable()):(chrome.browserAction.setBadgeText({text:e.toString()}),chrome.browserAction.setBadgeBackgroundColor({color:"#aabbcc"}),chrome.browserAction.disable())}catch(t){console.log(t)}}},{key:"getVersion",value:function(){return this.isExtensionMode?"v"+(this.manifest.version_name||this.manifest.version):"localVersion"}},{key:"getRandomString",value:function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:32,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=t?"abcdefhijkmnprstwxyz2345678ABCDEFGHJKMNPQRSTWXYZ":"abcdefghijkmnopqrstuvwxyz0123456789ABCDEFGHIJKMNOPQRSTUVWXYZ",o=n.length,r=[],s=0;s<e;s++)r.push(n.charAt(Math.floor(Math.random()*o)));return r.join("")}},{key:"getNewId",value:function(){return a()((new Date).getTime().toString()+this.getRandomString()).toString()}},{key:"showNotifications",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e3;e=Object.assign({type:"basic",iconUrl:chrome.runtime.getURL("/assets/icon-128.png"),title:"PT 助手 Plus",priority:0,message:""},e);var n=Math.floor(99999*Math.random())+"";chrome.notifications.create(n,e,(function(e){n=e})),setTimeout((function(){chrome.notifications.clear(n,(function(){}))}),t)}},{key:"removeDuplicateQueryString",value:function(e){var t,n=[],o="",r=/([^&=]+)=([^&]*)/g,s="",i=e.indexOf("?");if(-1!==i){s=e.substr(0,i+1),o=e.substr(i+1);while(t=r.exec(o)){var a=t[1]+"="+t[2];n.includes(a)||n.push(a)}return s+n.join("&")}return e}},{key:"removeQueryStringFromValue",value:function(e,t){var n,o=[],r="",s=/([^&=]+)=([^&]*)/g,i="",a=e.indexOf("?");if(-1!==a){i=e.substr(0,a+1),r=e.substr(a+1);while(n=s.exec(r)){var c=n[1]+"="+n[2];n[2]!==t&&o.push(c)}return i+o.join("&")}return e}},{key:"removeQueryStringFields",value:function(e,t){var n,o=[],r="",s=/([^&=]+)=([^&]*)/g,i="",a=e.indexOf("?");if(-1!==a){i=e.substr(0,a+1),r=e.substr(a+1);while(n=s.exec(r)){var c=n[1]+"="+n[2];t.includes(n[1])||o.push(c)}return i+o.join("&")}return e}},{key:"clone",value:function(e){return JSON.parse(JSON.stringify(e))}},{key:"debug",value:function(){for(var e,t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];(e=console).log.apply(e,[(new Date).toLocaleString()].concat(n))}},{key:"showContextMenu",value:function(e,t){try{c["show"](e,t),$(".basicContext").css({left:"-=20px",top:"+=10px"})}catch(n){}}},{key:"getCleaningURL",value:function(e){return this.removeQueryStringFields(e,["hit","cmtpage","page"])}},{key:"checkPermissions",value:function(e){return new Promise((function(t,n){chrome&&chrome.permissions?chrome.permissions.contains({permissions:e},(function(e){!0===e?t(!0):n({success:!1})})):n({success:!1})}))}},{key:"requestPermissions",value:function(e){return new Promise((function(t,n){chrome&&chrome.permissions?chrome.permissions.request({permissions:e},(function(e){!0===e?t(!0):n({success:!1})})):n({success:!1})}))}},{key:"usePermissions",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return new Promise((function(r,s){t.checkPermissions(e).then((function(e){r(e)})).catch((function(){var i=!0;n&&(i=confirm(o)),i?t.requestPermissions(e).then((function(e){r(e)})).catch((function(e){s(e)})):s({success:!1})}))}))}},{key:"getSiteFromHost",value:function(e,t){var n=[];t.sites&&n.push.apply(n,Object(o["a"])(t.sites)),t.system&&t.system.publicSites&&n.push.apply(n,Object(o["a"])(t.system.publicSites));var r=n.find((function(t){var n,o=[t.url].concat(t.cdn,null===(n=t.formerHosts)||void 0===n?void 0:n.map((function(e){return"//".concat(e)})));return t.host==e||o.join("").indexOf("//".concat(e))>-1}));return r?this.clone(r):null}},{key:"getNewBackupFileName",value:function(){return"PT-Plugin-Plus-Backup-"+l()().format("YYYY-MM-DD_HH-mm-ss")+".zip"}},{key:"replaceKeys",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";if(!e||"string"!==typeof e)return e;var o=e;for(var r in t)if(t.hasOwnProperty(r)){var s=t[r],i="$"+r+"$";n&&(i="$".concat(n,".").concat(r,"$")),o=o.replace(i,s)}return o}},{key:"checkOptionalPermission",value:function(e){return!!(this.isExtensionMode&&this.manifest&&this.manifest.optional_permissions)&&this.manifest.optional_permissions.includes(e)}},{key:"transformTime",value:function(e,t){if(!t||!e)return e;var n=e;/^(\d){10}$/.test(n+"")&&(n=1e3*parseInt(n+""));var o=l()(n).format("YYYY-MM-DDTHH:mm:ss");return n=new Date("".concat(o).concat(t)).getTime(),n}}]),e}(),p=new d},"5ff3":function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return u}));n("a481"),n("28a5"),n("ac6a");var o=n("d225"),r=n("b0b4"),s=n("f62e"),i=n("21a6"),a=n.n(i),c=function(){function e(t){var n=this;Object(o["a"])(this,e),this.options=t,this.count=0,this.completedCount=0,this.downloadingCount=0,this.files={},this.queues=[],t.files&&t.files.forEach((function(e){n.push(e)}))}return Object(r["a"])(e,[{key:"push",value:function(e){var t=this;if(!(!e.url||e.url&&this.files[e.url])){var n=new u(e);n.onCompleted=function(){t.downloadingCount--,t.completedCount++,t.onCompleted(n),delete t.files[n.url]},n.onStart=function(){t.downloadingCount++},n.onError=function(e){t.downloadingCount--,t.completedCount++,t.options.onError&&t.options.onError.call(t,n,e),delete t.files[n.url]},n.onProgress=function(e,o,r){t.options.onProgress&&t.options.onProgress.call(t,n,e,o,r)},this.files[n.url]=n,this.queues.push(n),this.count++,this.options.autoStart&&n.start()}}},{key:"start",value:function(){}},{key:"onCompleted",value:function(e){this.options.onCompleted&&this.options.onCompleted.call(this,e)}}]),e}(),u=function(){function e(t){Object(o["a"])(this,e),this.lastTime=0,this.startTime=0,this.status=0,this.statusText="",this.url="",this.requestMethod=s["n"].GET,this.postData=null,this.fileName="",this.loaded=0,this.total=0,this.percent=0,this.speed=0,this.showSpeed="",this.onProgress=function(){},this.onCompleted=function(){},this.onError=function(){},this.onStart=function(){},this.getDataOnly=!1,this.timeout=0,this.xhr=new XMLHttpRequest,this.fileName=t.fileName||"",this.url=t.url,this.getDataOnly=t.getDataOnly||!1,this.timeout=t.timeout||0,this.requestMethod=t.method||s["n"].GET}return Object(r["a"])(e,[{key:"start",value:function(){var e=this;this.lastTime=+new Date,this.startTime=this.lastTime,this.statusText="数据准备中……",this.timeout>0&&(this.xhr.timeout=this.timeout),this.xhr.open(this.requestMethod,this.url,!0),this.xhr.responseType="blob",this.xhr.onreadystatechange=function(){switch(e.xhr.readyState){case 4:switch(e.xhr.status){case 200:case 302:e.content=e.xhr.response,e.downloadCompleted();break;default:0!=e.xhr.status&&e.downloadError("[".concat(e.url,"] 下载失败，返回的状态码为：").concat(e.xhr.status));break}break;case 2:var t=e.xhr.getResponseHeader("Content-Disposition");!t||e.fileName||e.getDataOnly||(e.fileName=e.getFileName(t));break}},this.xhr.onprogress=function(t){e.loaded=t.loaded,e.total=t.total,e.percent=(t.loaded/t.total*100).toFixed(2),e.lastTime=+new Date,e.speed=e.loaded/(e.startTime-e.lastTime),e.updateProgress()},this.xhr.onerror=function(t){e.downloadError(t)},this.xhr.ontimeout=function(){e.downloadError("[".concat(e.url,"] 下载超时"))};var t=null;this.postData&&(t=$.param(this.postData)),this.requestMethod==s["n"].POST&&this.xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),this.xhr.send(t),this.onStart&&this.onStart.call(this)}},{key:"getFileName",value:function(){for(var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=t.split(";"),o={},r="",s=0;s<n.length;s++){var i=n[s],a=i.replace(" ","").split("=");2==a.length&&(o[a[0]]=a[1].trim())}if(e=o["filename*"]){var c=e.lastIndexOf("'");r=e.substr(c+1)}else r=o["filename"];return r=r.replace(/"/g,""),decodeURI(r)}},{key:"downloadCompleted",value:function(){this.loaded>0&&!this.getDataOnly&&a.a.saveAs(this.content,this.fileName),this.onCompleted&&this.onCompleted.call(this)}},{key:"downloadError",value:function(e){this.onError&&this.onError.call(this,e)}},{key:"updateProgress",value:function(){this.onProgress&&this.onProgress.call(this,this.loaded,this.total,this.speed)}}]),e}()},7626:function(e,t,n){"use strict";n.d(t,"b",(function(){return m})),n.d(t,"a",(function(){return v}));n("a481");var o=n("d225"),r=n("b0b4"),s=n("f62e"),i=function(){function e(){Object(o["a"])(this,e),this.isExtensionMode=!1,window.chrome&&chrome.extension&&(this.isExtensionMode=!0)}return Object(r["a"])(e,[{key:"set",value:function(e,t){var n=this,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:s["t"].json;return new Promise((function(r,i){if(n.isExtensionMode){var a={};a[e]=t,chrome.storage.local.set(a,(function(){r()}))}else"string"!==typeof t&&o==s["t"].json&&(t=JSON.stringify(t)),window.localStorage.setItem(e,t),r()}))}},{key:"get",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:s["t"].json;if(this.isExtensionMode)chrome.storage.local.get(e,(function(n){n&&n[e]?t(n[e]):t(null)}));else{var o=window.localStorage.getItem(e);o&&n==s["t"].json&&(o=JSON.parse(o)),t&&t(o)}}}]),e}(),a=n("8d81"),c=n.n(a),u=n("0a02"),l=(n("f559"),n("7514"),n("5df3"),n("ac6a"),n("c67c"),n("5ff3"),""),h=!1,d=!1;try{var p=chrome.runtime;h=!0,l=p.getManifest().options_ui.page.replace("index.html",""),l&&"/"==l.substr(-1)&&(l=l.substr(0,l.length-1)),l||(l="chrome-extension://".concat(chrome.runtime.id)),d&&console.log("is extension mode.")}catch(w){h=!1,d&&console.log("is not extension mode.")}var f=h?(h?l:"")+"/resource":"http://".concat(window.location.hostname,":8001"),g={host:f,schemas:"".concat(f,"/schemas.json"),schemaConfig:"".concat(f,"/schemas/{$schema}/config.json"),sites:"".concat(f,"/sites.json"),siteConfig:"".concat(f,"/sites/{$site}/config.json"),clients:"".concat(f,"/clients.json"),clientConfig:"".concat(f,"/clients/{$client}/config.json"),latestReleases:"https://api.github.com/repos/pt-plugins/PT-Plugin-Plus/releases/latest",systemConfig:"".concat(f,"/systemConfig.json")},m={debugMode:d,scriptQueues:[],isExtensionMode:h,cache:{localStorage:new i,cacheKey:s["g"].cache,contents:{},expires:86400,init:function(e){var t=this;m.debugMode&&console.log("cache.init"),this.localStorage.get(this.cacheKey,(function(n){if(n){var o=n["expires"];o&&new Date>new Date(o)||m.debugMode?t.contents={}:t.contents=n}e&&e()}))},get:function(e){return this.contents?this.contents[c()(e)]:null},set:function(e,t){this.contents[c()(e)]=t,this.contents["update"]=(new Date).getTime(),this.contents["expires"]=(new Date).getTime()+this.expires,this.localStorage.set(this.cacheKey,this.contents)},clear:function(){this.contents={},this.localStorage.set(this.cacheKey,this.contents)},getLastUpdateTime:function(){var e=this;return new Promise((function(t,n){e.localStorage.get(e.cacheKey,(function(e){if(e){var o=e["update"];t(o||0)}else n()}))}))}},addScript:function(e){m.debugMode&&console.log("addScript",e),this.scriptQueues.push(e)},applyScripts:function(){var e=this,t=this.scriptQueues.shift();t&&this.execScript(t).then((function(){e.applyScripts()}))},execScript:function(e){var t=this;return new Promise((function(n,o){switch(e.type){case"code":t.runScript(e.content),n();break;default:var r=e.content||e;"http"!==r.substr(0,4)&&("/"!==r.substr(0,1)&&(r="/".concat(r)),r="".concat(v.host).concat(r));var s=t.cache.get(r);try{s?(t.runScript(s),n()):(console.log("execScript: %s",r),$.ajax({url:r,dataType:"text"}).done((function(e){t.runScript(e),t.cache.set(r,e),n()})).fail((function(e,t,n){e.responseJSON&&e.responseJSON.code&&e.responseJSON.msg?o(e.responseJSON.msg+" ("+e.responseJSON.code+")"):o(t+", "+n)})))}catch(w){o(w)}break}}))},runScript:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window;eval.call(t,e)},applyStyle:function(e){var t=this;return new Promise((function(n,o){var r=$("<style/>").appendTo(document.body);switch(e.type){case"file":var s=e.content;"http"!==s.substr(0,4)&&("/"!==s.substr(0,1)&&(s="/".concat(s)),s="".concat(v.host).concat(s));var i=t.cache.get(s);i?(r.html(i),n()):$.get(s,(function(e){r.html(e),t.cache.set(s,e),n()}),"text");break;default:r.html(e.content),n();break}}))},getScriptContent:function(e){var t="".concat(v.host,"/").concat(e);return t="http"===e.substr(0,4)?e:t.replace("resource//","resource/"),m.debugMode&&console.log("getScriptContent",t),$.ajax({url:t,dataType:"text"})},createErrorMessage:function(e){return{type:s["h"].error,msg:e,success:!1}},showNotifications:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e3;u["a"].showNotifications(e,t)},getInstallType:function(){return new Promise((function(e,t){chrome&&chrome.management?chrome.management.getSelf((function(t){t.updateUrl&&t.updateUrl.indexOf("pt-plugins/PT-Plugin-Plus")>0?e(s["j"].crx):e(t.installType)})):t()}))}};m.cache.init();var v=g},"7e92":function(e,t,n){"use strict";var o=n("d225"),r=n("b0b4"),s=n("2b0e"),i=n("ce5b"),a=n.n(i),c=n("25a2"),u=n("4b41"),l=(n("da64"),function(){function e(){Object(o["a"])(this,e)}return Object(r["a"])(e,[{key:"init",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"zh-Hans";s["default"].use(a.a,{iconfont:"md",lang:{locales:{"zh-Hans":c["a"],en:u["a"]},current:e}})}}]),e}());t["a"]=new l},a1f4:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var o=n("d225"),r=n("b0b4"),s=n("f62e"),i=n("7626"),a=function(){function e(){Object(o["a"])(this,e),this.isExtensionMode=i["b"].isExtensionMode}return Object(r["a"])(e,[{key:"sendRequest",value:function(e,t,n){var o=this;return new Promise((function(r,a){if(o.isExtensionMode)try{chrome.runtime.sendMessage({action:e,data:n},(function(o){if(chrome.runtime.lastError){var s=chrome.runtime.lastError.message||"";if(console.log("Extension.sendRequest.runtime",e,n,chrome.runtime.lastError.message),/Could not establish connection/.test(s))return i["b"].showNotifications({message:"插件状态未知，当前操作可能失败，请刷新页面后再试"}),void a(chrome.runtime.lastError);if(!/The message port closed before a response was received/.test(s))return void a(chrome.runtime.lastError)}t&&t(o.resolve||o.reject),o.reject?a(o.reject):!o.resolve||"error"!==o.resolve.status&&!1!==o.resolve.success?r(o.resolve):a(o.resolve)}))}catch(c){/Invocation of form runtime\.connect|doesn't match definition runtime\.connect|Extension context invalidated/.test(c.message)?a({type:s["h"].error,msg:"插件状态未知，当前操作可能失败，请刷新页面后再试",success:!1}):a(c)}else 0}))}}]),e}()},a400:function(e,t,n){"use strict";var o,r,s,i,a,c,u,l,h,d,p,f,g,m,v,w,b,T,y,S,k,M,C,x,D,P,B,O,F,E,U,j;n.d(t,"r",(function(){return o})),n.d(t,"n",(function(){return s})),n.d(t,"m",(function(){return c})),n.d(t,"a",(function(){return u})),n.d(t,"s",(function(){return l})),n.d(t,"f",(function(){return h})),n.d(t,"g",(function(){return d})),n.d(t,"j",(function(){return p})),n.d(t,"l",(function(){return g})),n.d(t,"x",(function(){return m})),n.d(t,"v",(function(){return v})),n.d(t,"w",(function(){return w})),n.d(t,"e",(function(){return b})),n.d(t,"i",(function(){return T})),n.d(t,"c",(function(){return y})),n.d(t,"u",(function(){return S})),n.d(t,"b",(function(){return k})),n.d(t,"p",(function(){return x})),n.d(t,"d",(function(){return D})),n.d(t,"y",(function(){return P})),n.d(t,"o",(function(){return O})),n.d(t,"h",(function(){return F})),n.d(t,"q",(function(){return E})),n.d(t,"t",(function(){return U})),n.d(t,"k",(function(){return j})),function(e){e["ZiB"]="ZiB",e["EiB"]="EiB",e["PiB"]="PiB",e["TiB"]="TiB",e["GiB"]="GiB",e["MiB"]="MiB",e["KiB"]="KiB"}(o||(o={})),function(e){e["JSON"]="json",e["TEXT"]="urlencode"}(r||(r={})),function(e){e["JSON"]="json",e["XML"]="xml",e["HTML"]="html",e["TEXT"]="text"}(s||(s={})),function(e){e["transmission"]="transmission",e["utorrent"]="utorrent",e["deluge"]="deluge",e["synologyDownloadStation"]="synologyDownloadStation",e["rutorrent"]="rutorrent",e["qbittorrent"]="qbittorrent"}(i||(i={})),function(e){e["normal"]="normal",e["label"]="label",e["spliter"]="spliter",e["popup"]="popup"}(a||(a={})),function(e){e["POST"]="POST",e["GET"]="GET"}(c||(c={})),function(e){e["readConfig"]="readConfig",e["saveConfig"]="saveConfig",e["reloadConfig"]="reloadConfig",e["sendTorrentToDefaultClient"]="sendTorrentToDefaultClient",e["sendTorrentToClient"]="sendTorrentToClient",e["searchTorrent"]="searchTorrent",e["copyTextToClipboard"]="copyTextToClipboard",e["addTorrentFromURL"]="addTorrentFromURL",e["getFreeSpace"]="getFreeSpace",e["downloadFromDroper"]="downloadFromDroper",e["openOptions"]="openOptions",e["updateOptionsTabId"]="updateOptionsTabId",e["getSearchResult"]="getSearchResult",e["getDownloadHistory"]="getDownloadHistory",e["removeDownloadHistory"]="removeDownloadHistory",e["clearDownloadHistory"]="clearDownloadHistory",e["testClientConnectivity"]="testClientConnectivity",e["getSystemLogs"]="getSystemLogs",e["removeSystemLogs"]="removeSystemLogs",e["clearSystemLogs"]="clearSystemLogs",e["readUIOptions"]="readUIOptions",e["saveUIOptions"]="saveUIOptions",e["showMessage"]="showMessage",e["writeLog"]="writeLog",e["serviceStoped"]="serviceStoped",e["addContentPage"]="addContentPage",e["abortSearch"]="abortSearch",e["backupToGoogle"]="backupToGoogle",e["restoreFromGoogle"]="restoreFromGoogle",e["clearFromGoogle"]="clearFromGoogle",e["getTorrentDataFromURL"]="getTorrentDataFromURL",e["getUserInfo"]="getUserInfo",e["abortGetUserInfo"]="abortGetUserInfo",e["refreshUserData"]="refreshUserData",e["getClearedOptions"]="getClearedOptions",e["resetRunTimeOptions"]="resetRunTimeOptions",e["getBase64FromImageUrl"]="getBase64FromImageUrl",e["getUserHistoryData"]="getUserHistoryData",e["getMovieInfos"]="getMovieInfos",e["getMovieRatings"]="getMovieRatings",e["getIMDbIdFromDouban"]="getIMDbIdFromDouban",e["queryMovieInfoFromDouban"]="queryMovieInfoFromDouban",e["addBrowserDownloads"]="addBrowserDownloads",e["checkPermissions"]="checkPermissions",e["requestPermissions"]="requestPermissions",e["changeLanguage"]="changeLanguage",e["getCurrentLanguageResource"]="getCurrentLanguageResource",e["addLanguage"]="addLanguage",e["replaceLanguage"]="replaceLanguage",e["hideMessage"]="hideMessage",e["resetUserDatas"]="resetUserDatas",e["backupToServer"]="backupToServer",e["restoreFromServer"]="restoreFromServer",e["getBackupListFromServer"]="getBackupListFromServer",e["deleteFileFromBackupServer"]="deleteFileFromBackupServer",e["sendTorrentsInBackground"]="sendTorrentsInBackground",e["createBackupFile"]="createBackupFile",e["checkBackupData"]="checkBackupData",e["addTorrentToCollection"]="addTorrentToCollection",e["getTorrentCollections"]="getTorrentCollections",e["deleteTorrentFromCollention"]="deleteTorrentFromCollention",e["clearTorrentCollention"]="clearTorrentCollention",e["getTorrentCollention"]="getTorrentCollention",e["getSiteSelectorConfig"]="getSiteSelectorConfig",e["resetTorrentCollections"]="resetTorrentCollections",e["getTorrentCollectionGroups"]="getTorrentCollectionGroups",e["addTorrentCollectionGroup"]="addTorrentCollectionGroup",e["addTorrentCollectionToGroup"]="addTorrentCollectionToGroup",e["updateTorrentCollectionGroup"]="updateTorrentCollectionGroup",e["removeTorrentCollectionFromGroup"]="removeTorrentCollectionFromGroup",e["removeTorrentCollectionGroup"]="removeTorrentCollectionGroup",e["updateTorrentCollention"]="updateTorrentCollention",e["getAllTorrentCollectionLinks"]="getAllTorrentCollectionLinks",e["restoreCookies"]="restoreCookies",e["resetFavicons"]="resetFavicons",e["resetFavicon"]="resetFavicon",e["getBackupRawData"]="getBackupRawData",e["testBackupServerConnectivity"]="testBackupServerConnectivity",e["createSearchResultSnapshot"]="createSearchResultSnapshot",e["loadSearchResultSnapshot"]="loadSearchResultSnapshot",e["getSearchResultSnapshot"]="getSearchResultSnapshot",e["removeSearchResultSnapshot"]="removeSearchResultSnapshot",e["clearSearchResultSnapshot"]="clearSearchResultSnapshot",e["resetSearchResultSnapshot"]="resetSearchResultSnapshot",e["createKeepUploadTask"]="createKeepUploadTask",e["loadKeepUploadTask"]="loadKeepUploadTask",e["getKeepUploadTask"]="getKeepUploadTask",e["removeKeepUploadTask"]="removeKeepUploadTask",e["clearKeepUploadTask"]="clearKeepUploadTask",e["resetKeepUploadTask"]="resetKeepUploadTask",e["updateKeepUploadTask"]="updateKeepUploadTask",e["resetDownloadHistory"]="resetDownloadHistory",e["pushDebugMsg"]="pushDebugMsg",e["updateDebuggerTabId"]="updateDebuggerTabId",e["getTopSearches"]="getTopSearches"}(u||(u={})),function(e){e["text"]="TEXT",e["json"]="JSON"}(l||(l={})),function(e){e["default"]="PT-Plugin-Plus-Config",e["downloadHistory"]="PT-Plugin-Plus-downloadHistory",e["systemLogs"]="PT-Plugin-Plus-systemLogs",e["uiOptions"]="PT-Plugin-Plus-uiOptions",e["cache"]="PT-Plugin-Plus-Cache-Contents",e["userDatas"]="PT-Plugin-Plus-User-Datas",e["collection"]="PT-Plugin-Plus-Collection",e["searchResultSnapshot"]="PT-Plugin-Plus-SearchResultSnapshot",e["keepUploadTask"]="PT-Plugin-Plus-KeepUploadTask"}(h||(h={})),function(e){e["success"]="success",e["error"]="error",e["info"]="info",e["warning"]="warning",e["unknown"]="unknown"}(d||(d={})),function(e){e["background"]="background",e["content"]="content",e["options"]="options",e["popup"]="popup",e["debugger"]="debugger"}(p||(p={})),function(e){e["init"]="init",e["requestMessage"]="requestMessage"}(f||(f={})),function(e){e["systemLogs"]="systemLogs",e["searchTorrent"]="searchTorrent"}(g||(g={})),function(e){e["home"]="home",e["downloadPaths"]="downloadPaths",e["searchTorrent"]="searchTorrent"}(m||(m={})),function(e){e["latest"]="latest",e["today"]="today",e["all"]="all"}(v||(v={})),function(e){e["needLogin"]="needLogin",e["notSupported"]="notSupported",e["unknown"]="unknown",e["success"]="success"}(w||(w={})),function(e){e["allSite"]="__allSite__",e["all"]="__all__",e["noGroup"]="__noGroup__"}(b||(b={})),function(e){e["development"]="development",e["normal"]="normal",e["crx"]="crx"}(T||(T={})),function(e){e["id"]="id",e["name"]="name"}(y||(y={})),function(e){e[e["downloading"]=1]="downloading",e[e["sending"]=2]="sending",e[e["completed"]=255]="completed",e[e["inactive"]=3]="inactive"}(S||(S={})),function(e){e["OWSS"]="OWSS",e["WebDAV"]="WebDAV"}(k||(k={})),function(e){e["left"]="left",e["right"]="right"}(M||(M={})),function(e){e["faq"]="https://github.com/pt-plugins/PT-Plugin-Plus/wiki/frequently-asked-questions"}(C||(C={})),function(e){e["all"]="all",e["options"]="options",e["userDatas"]="userDatas",e["collection"]="collection",e["cookies"]="cookies",e["searchResultSnapshot"]="searchResultSnapshot",e["keepUploadTask"]="keepUploadTask",e["downloadHistory"]="downloadHistory"}(x||(x={})),function(e){e["Chrome"]="Chrome",e["Firefox"]="Firefox"}(D||(D={})),function(e){e["success"]="success",e["error"]="error",e["loading"]="loading"}(P||(P={})),function(e){e["time"]="time",e["name"]="name",e["size"]="size"}(B||(B={})),function(e){e["desc"]="desc",e["asc"]="asc"}(O||(O={})),function(e){e["AES"]="AES"}(F||(F={})),function(e){e["needSecretKey"]="needSecretKey",e["errorSecretKey"]="errorSecretKey"}(E||(E={})),function(e){e["all"]="__all__",e["unTagged"]="__unTagged__",e["unReadMsg"]="__unReadMsg__",e["statusError"]="__statusError__"}(U||(U={})),function(e){e["openAllSites"]="openAllSites",e["openAllUnReadMsg"]="openAllUnReadMsg",e["openAllStatusErr"]="openAllStatusErr"}(j||(j={}))},c67c:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));n("4917"),n("f576"),n("c5f6"),n("386d"),n("6b54"),n("a481"),n("28a5");var o={formatNumber:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"###,###,###,###.00";if(void 0===e)return"";var n=function(e,t,n){if(""===e||void 0===e)return""===t||void 0===t?"":t;var o="",r="",s="",i=0;n||(e=e.split("").reverse().join(""),t=t.split("").reverse().join(""));for(var a=0,c=0;c<t.length;c++,a++)if(r=e.charAt(a),void 0!==r)switch(o=t.charAt(c),o){case"#":s+=r,i=c;break;case"0":s=r||r===o?s+r:s+0,i=c;break;case".":s+=r===o?r:(a--,o);break;case",":s+=r===o?r:(a--,o);break;default:s+=o,a--}return a!==e.length&&"0"!==t.charAt(t.length-1)&&i!==t.length&&"0"!==t.charAt(i)&&(s=s.substr(0,i+1)+e.substr(a)+s.substr(i+1)),s=(n?s:s.split("").reverse().join("")).replace(/(^,)|(,$)|(,,+)/g,""),","===s.substr(0,1)&&(s=s.substr(1)),"-,"===s.substr(0,2)&&(s="-"+s.substr(2)),s},o=e.toString();if(0===o.length)return"";var r=parseFloat(o);if(isNaN(r))return o;if(!t)return o;var s=t.split("."),i=o.split(".");return s.length>1?n(i[0],s[0])+"."+n(i[1],s[1],1):n(i[0],s[0])},formatSize:function(e){var t,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=parseFloat(e);if(isNaN(r))return"";if(r<0)return"N/A";if(0===r)return n?"":"speed"===o?"0.00 KiB/s":"0.00";var s="KiB",i="###,###,###,###.00 ",a="###,###,###,###.000 ";return r<1e3*Math.pow(2,10)?(t=r/Math.pow(2,10),s="KiB"):r<1e3*Math.pow(2,20)?(t=r/Math.pow(2,20),s="MiB"):r<1e3*Math.pow(2,30)?(t=r/Math.pow(2,30),s="GiB"):r<1e3*Math.pow(2,40)?(t=r/Math.pow(2,40),s="TiB",i=a):r<1e3*Math.pow(2,50)?(t=r/Math.pow(2,50),s="PiB",i=a):r<1e3*Math.pow(2,60)?(t=r/Math.pow(2,60),s="EiB",i=a):(t=r/Math.pow(2,70),s="ZiB",i=a),"speed"===o&&(s+="/s"),this.formatNumber(t,i)+s},formatSizetoPrecision:function(e){var t,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=parseFloat(e);if(isNaN(r))return"";if(r<0)return"N/A";if(0===r)return n?"":"speed"===o?"0.00 KiB/s":"0.00";var s="KiB";return r<1e3*Math.pow(2,10)?(t=r/Math.pow(2,10),s="KiB"):r<1e3*Math.pow(2,20)?(t=r/Math.pow(2,20),s="MiB"):r<1e3*Math.pow(2,30)?(t=r/Math.pow(2,30),s="GiB"):r<1e3*Math.pow(2,40)?(t=r/Math.pow(2,40),s="TiB"):r<1e3*Math.pow(2,50)?(t=r/Math.pow(2,50),s="PiB"):r<1e3*Math.pow(2,60)?(t=r/Math.pow(2,60),s="EiB"):(t=r/Math.pow(2,70),s="ZiB"),"speed"===o&&(s+="/s"),t.toPrecision(4)+" "+s},formatSizeWithNegative:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";e=parseFloat(e);var o=e;e<0&&(o=-o);var r=this.formatSize(o,t,n);return e<0&&(r="- ".concat(r)),r},formatSpeed:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return this.formatSize(e,t,"speed")},parseURL:function(e){var t=document.createElement("a");return t.href=e,{source:e,protocol:t.protocol.replace(":",""),host:t.hostname,port:t.port,query:t.search,params:function(){for(var e,n={},o=t.search.replace(/^\?/,"").split("&"),r=o.length,s=0;s<r;s++)o[s]&&(e=o[s].split("="),n[e[0]]=e[1]);return n}(),hash:t.hash.replace("#",""),path:t.pathname.replace(/^([^/])/,"/$1"),segments:t.pathname.replace(/^\//,"").split("/"),origin:"".concat(t.protocol,"//").concat(t.hostname)+(t.port?":".concat(t.port):"")}},formatIMDbId:function(e){return Number(e)&&(e.length<7&&(e=e.padStart(7,"0")),e="tt"+e),e},timeAgoToNumber:function(e){var t=/^([\d.]+).+?((year|month|week|day|hour|min|minute)s?)( +ago)?(.+)?$/i,n=e.trim().match(t);if(!n)return 0;var o=new Date,r=n[3],s=Math.round(parseFloat(n[1])),i=new Date;switch(r.toLowerCase()){case"year":i=new Date(o.setFullYear(o.getFullYear()-s));break;case"month":i=new Date(o.setMonth(o.getMonth()-s));break;case"day":i=new Date(o.setDate(o.getDate()-s));break;case"week":i=new Date(o.setDate(o.getDate()-7*s));break;case"hour":i=new Date(o.setHours(o.getHours()-s));break;case"min":case"minute":i=new Date(o.setMinutes(o.getMinutes()-s));break}return i.getTime()},formatInteger:function(e){return this.formatNumber(e,"###,###,###,###")}}},f62e:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var o=n("a400");n.d(t,"b",(function(){return o["a"]})),n.d(t,"c",(function(){return o["b"]})),n.d(t,"d",(function(){return o["c"]})),n.d(t,"e",(function(){return o["d"]})),n.d(t,"f",(function(){return o["e"]})),n.d(t,"g",(function(){return o["f"]})),n.d(t,"h",(function(){return o["g"]})),n.d(t,"i",(function(){return o["h"]})),n.d(t,"j",(function(){return o["i"]})),n.d(t,"k",(function(){return o["j"]})),n.d(t,"l",(function(){return o["k"]})),n.d(t,"m",(function(){return o["l"]})),n.d(t,"n",(function(){return o["m"]})),n.d(t,"o",(function(){return o["n"]})),n.d(t,"p",(function(){return o["o"]})),n.d(t,"q",(function(){return o["p"]})),n.d(t,"r",(function(){return o["q"]})),n.d(t,"s",(function(){return o["r"]})),n.d(t,"t",(function(){return o["s"]})),n.d(t,"u",(function(){return o["t"]})),n.d(t,"v",(function(){return o["v"]})),n.d(t,"w",(function(){return o["w"]})),n.d(t,"x",(function(){return o["x"]})),n.d(t,"y",(function(){return o["y"]}));var r=["red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","blue-grey","grey","black"]}}]);