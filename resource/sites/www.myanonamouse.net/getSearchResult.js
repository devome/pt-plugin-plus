!function(t,e){let s=new class{constructor(){this.haveData=!1,!t.entry.loggedRegex||new RegExp(t.entry.loggedRegex,"").test(t.responseText)?(t.isLogged=!0,this.haveData=!0,this.site=t.site):t.status=ESearchResultParseStatus.needLogin}getResult(){if(!this.haveData)return[];let s=t.resultSelector,r=t.entry.dataRowSelector||"> tbody > tr";s=s.replace(r,"");let a=t.page.find(s).find(r);if(0===a.length)return t.status=ESearchResultParseStatus.torrentTableIsEmpty,[];let l=[],i=t.entry.firstDataRowIndex||0;try{for(let s=i;s<a.length;s++){const r=a.eq(s);let i=r.attr("id");if(!i)continue;i=i.match(/tdr-(\d+)/)[1];let n=r.find(".directDownload").attr("href");n||(n="ONLY_FOR_VIP");let o=r.find("> td:eq(4)").text().split("[")[1].replace("]",""),u=r.find("> td:eq(5)").text().split("["),c=u[0],d=u[1].replace("]",""),h=r.find("> td:eq(6) > p"),g=parseInt(h.eq(0).text()),p=parseInt(h.eq(1).text()),R=parseInt(h.eq(2).text()),f={title:r.find(".torTitle").text(),subTitle:r.find(".torRowDesc").text(),link:this.getFullURL(`/t/${i}`),url:this.getFullURL(n),size:o||0,time:c,author:d,seeders:g,leechers:p,completed:R,comments:r.find(" >td:eq(2)").text().match(/(\d+) comments/)[1],site:this.site,tags:e.getRowTags(this.site,r),entryName:t.entry.name};l.push(f)}}catch(e){t.status=ESearchResultParseStatus.parseError,t.errorMsg=e.stack}return 0!==l.length||t.errorMsg||(t.status=ESearchResultParseStatus.noTorrents),l}getFullURL(t){let e=PTServiceFilters.parseURL(this.site.url);return"//"===t.substr(0,2)?t=`${e.protocol}${t}`:"/"===t.substr(0,1)?t=`${e.origin}${t}`:"http"!==t.substr(0,4)&&(t=`${e.origin}/${t}`),t}}(t);t.results=s.getResult(),console.log(t.results)}(options,options.searcher);