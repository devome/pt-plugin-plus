!function(t,e){console.log("this is details.js");class i extends e.NexusPHPCommon{init(){this.initButtons(),PTService.pageApp=this}initButtons(){this.showTorrentSize(),this.initDetailButtons()}getDownloadURL(){let e=PTService.site.url;"/"!=e.substr(-1)&&(e+="/");let i=t("a[href*='download.php'][onclick!='return show_confirm();']"),s="";if(i.length>0){if(s=i.attr("href"),PTService.site.passkey){let t=s.getQueryString("id");s=`https://${PTService.site.host}/download.php?id=${t}&passkey=`+PTService.site.passkey}s&&"http"!==s.substr(0,4)&&(s=`${e}${s}`)}return s}showTorrentSize(){let e=t("div[style='width:25%;float:left;']:contains('Last activity')"),i="";e.length>0&&(i=e.text().replace("Size","").replace(/[\r\n]/g,"").replace(/Files(.*)/,""),PTService.addButton({title:"当前种子大小",icon:"attachment",label:i}))}getTitle(){let e=t("div.cblock-header");return e?e.text():""}}(new i).init()}(jQuery,window);