!function(t){console.log("this is torrent.js");class e extends window.NexusPHPCommon{init(){this.initButtons(),this.initFreeSpaceButton(),PTService.pageApp=this}initButtons(){this.initListButtons()}getDownloadURLs(){let e=t("a[href$='&ssl=1']").toArray();if(0==e.length)return this.t("getDownloadURLsFailed");let i=PTService.site.url;return"/"!=i.substr(-1)&&(i+="/"),t.map(e,(e=>{let n=t(e).attr("href");return this.getFullURL(i+n.substr(1))}))}confirmWhenExceedSize(){return this.confirmSize(PTService.getFieldValue("confirmSize"))}}(new e).init()}(jQuery);