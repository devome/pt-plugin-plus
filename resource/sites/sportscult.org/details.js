!function(t,e){if(/\?page\=torrent-details/.test(e.location.search)){class i extends e.NexusPHPCommon{init(){this.initButtons(),PTService.pageApp=this}initButtons(){this.showTorrentSize(),this.initDetailButtons()}getDownloadURL(){let e=t("a[href*='download.php']:first"),i="";return e.length>0&&(i=e.attr("href"),"http"!=i.substr(0,4)&&(i=PTService.site.url+i)),i}showTorrentSize(){let t=PTService.filters.formatSize(PTService.getFieldValue("size"));PTService.addButton({title:"当前种子大小",icon:"attachment",label:t})}getTitle(){return t("a[href*='download.php']:first").text().trim()}}(new i).init()}else if(/\?page\=torrents|seedwanted/.test(e.location.search)){console.log("this is torrents.js");class i extends e.NexusPHPCommon{init(){this.initButtons(),this.initFreeSpaceButton(),PTService.pageApp=this}initButtons(){this.initListButtons()}getDownloadURLs(){let e=t("#bodyarea > table > tbody > tr > td:nth-child(2) > div > .block-content > div > div > div table:nth-child(4) > tbody > tr:nth-child(2) > td > table").find("a[href*='download.php']").toArray(),i=PTService.site.url;return"/"!=i.substr(-1)&&(i+="/"),0==e.length?this.t("getDownloadURLsFailed"):t.map(e,(e=>{let n=t(e).attr("href");return n&&"http"!=n.substr(0,4)&&(n=i+n),n}))}confirmWhenExceedSize(){return this.confirmSize(t("#bodyarea > table > tbody > tr > td:nth-child(2) > div > .block-content > div > div > div table:nth-child(4) > tbody > tr:nth-child(2) > td > table").find("td:contains('MB'),td:contains('GB'),td:contains('TB'),td:contains('MiB'),td:contains('GiB'),td:contains('TiB')"))}downloadFromDroper(t,e){if("string"==typeof t&&(t={url:t,title:""}),console.log(t),!t.url)return PTService.showNotice({msg:this.t("invalidURL")}),void e();"/"===t.url.substr(0,1)?t.url=`${location.origin}${t.url}`:"http"!==t.url.substr(0,4)&&(t.url=`${location.origin}/${t.url}`),this.sendTorrentToDefaultClient(result).then((t=>{e(t)})).catch((t=>{e(t)}))}}(new i).init()}}(jQuery,window);