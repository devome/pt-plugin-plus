!function(t){console.log("this is torrent.js");class e extends window.NexusPHPCommon{init(){this.initButtons(),this.initFreeSpaceButton(),PTService.pageApp=this}initButtons(){this.initListButtons()}getDownloadURLs(){let e=t("a[title='Download']").toArray();return 0==e.length&&(e=t("a[href*='torrents.php?action=download']:not([href*='usetoken'])").toArray()),0==e.length?this.t("getDownloadURLsFailed"):t.map(e,(e=>{let i=t(e).attr("href");return this.getFullURL(i)}))}confirmWhenExceedSize(){return this.confirmSize(t("tr.basic-movie-list__torrent-row > td:contains('iB')"))}downloadFromDroper(t,e){if("string"==typeof t&&(t={url:t,title:""}),console.log(t),!t.url)return PTService.showNotice({msg:this.t("invalidURL")}),void e();let i=t.url.getQueryString("authkey"),r=t.url.getQueryString("torrent_pass");if(!i&&!r)return PTService.showNotice({msg:this.t("dropInvalidURL")}),void e();t.url=this.getFullURL(t.url),this.sendTorrentToDefaultClient(t).then((t=>{e(t)})).catch((t=>{e(t)}))}}(new e).init()}(jQuery);