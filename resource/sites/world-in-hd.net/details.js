!function(t,i){console.log("this is details.js");class e extends i.NexusPHPCommon{init(){this.initButtons(),PTService.pageApp=this}initButtons(){this.initDetailButtons()}getDownloadURL(){let i=t("div.download a[href*='/torrents/download/']"),e="";return i.length>0&&(e=i.attr("href")),e?`${location.origin}${e}`:""}getTitle(){return t("header.panel-heading h2").text().trim()}}(new e).init()}(jQuery,window);