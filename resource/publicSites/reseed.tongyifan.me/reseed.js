!function(t){console.log("this is torrent.js");class i extends window.NexusPHPCommon{init(){this.options=PTService.options,this.initButtons(),PTService.pageApp=this}initButtons(){this.initListButtons()}getDownloadURLs(){let i=t("textarea:first").val();if(!i)return this.t("getDownloadURLsFailed");let e=i.split("\n");if(0==e.length)return this.t("getDownloadURLsFailed");let s=[];return e.forEach((t=>{this.checkURL(t)&&s.push(t)})),0==s.length?this.t("getDownloadURLsFailed"):s}checkURL(t){const i=this.options.sites;if(!i)return!1;const e=PTService.filters.parseURL(t);return-1!==i.findIndex((t=>t.host===e.host))}}(new i).init()}(jQuery);