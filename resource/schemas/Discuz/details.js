!function(t,e){console.log("this is details.js");class i extends e.NexusPHPCommon{init(){this.initButtons(),PTService.pageApp=this}initButtons(){this.getDownloadURL()&&this.initDetailButtons()}getDownloadURL(){let e=t("a[href*='passkey'][href*='download.php']"),i="";return e.length>0?i=e.attr("href"):(e=t("a[href*='passkey']"),e.length>0&&(i=e.attr("href"))),i||(i=t("a[href*='download'][href*='?id']:first").attr("href")||t("a[href*='download.php?']:first").attr("href")),i?("//"===i.substr(0,2)?i=`${location.protocol}${i}`:"/"===i.substr(0,1)?i=`${location.origin}${i}`:"http"!==i.substr(0,4)&&(i=`${location.origin}/${i}`),-1===i.indexOf("https=1")&&(i+="&https=1"),i):""}getTitle(){let e=t("title").text(),i=/\"(.*?)\"/.exec(e);return i&&i.length>1&&i[1]||e}}(new i).init()}(jQuery,window);