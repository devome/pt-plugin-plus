!function(t){console.log("this is torrent.js");class n extends window.NexusPHPCommon{init(){this.initButtons(),this.initFreeSpaceButton(),PTService.pageApp=this}initButtons(){this.initListButtons()}getDownloadURLs(){let n=t("a[href^='/torrents/']").toArray(),i=PTService.site.url;return"/"!=i.substr(-1)&&(i+="/"),0==n.length?this.t("getDownloadURLsFailed"):t.map(n,(n=>{let e=t(n).attr("href")+"download/";return e&&("/"===e.substr(0,1)&&(e=e.substr(1)),e=i+e),e}))}confirmWhenExceedSize(){return this.confirmSize(t(".torrents").find("td:contains('MB'),td:contains('GB'),td:contains('TB')"))}}(new n).init()}(jQuery);