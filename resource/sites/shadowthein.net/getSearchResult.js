!function(t){let e=new class{constructor(){this.haveData=!1,/takelogin\.php/.test(t.responseText)?t.status=ESearchResultParseStatus.needLogin:(t.isLogged=!0,/没有种子|No [Tt]orrents?|Your search did not match anything|用准确的关键字重试/.test(t.responseText)?t.status=ESearchResultParseStatus.noTorrents:this.haveData=!0)}getResult(){if(!this.haveData)return[];let e=[],r=t.site,s=t.page.find(t.resultSelector||"table[id='torrenttable']:last > tbody > tr");"/"==r.url.substr(-1)&&(r.url=r.url.substr(0,r.url.length-1));for(let n=1;n<s.length;n++){const a=s.eq(n);let l=a.find(">td"),i=l.eq(1).find("a[href*='details.php?id=']").first();if(0==i.length)continue;let o=i.text(),u=i.attr("href");u&&"http"!==u.substr(0,4)&&(u=`${r.url}/${u}`);let h="";if(h=l.eq(3).find("a[href*='/download.php']").first().attr("href"),h&&"http"!==h.substr(0,4)&&(h=`${r.url}/${h}`),!h)continue;let g=l.eq(6).text(),c={title:o,link:u,url:h,size:l.eq(7).text()||0,time:g,author:l.eq(11).text()||"",seeders:l.eq(9).text(),leechers:l.eq(10).text(),completed:l.eq(8).text(),comments:l.eq(5).find("a[href*='#startcomments']").text()||0,site:r,entryName:t.entry.name,category:this.getCategory(l.eq(0)),tags:this.getTags(a,t.torrentTagSelectors)};e.push(c)}return 0==e.length&&(t.status=ESearchResultParseStatus.noTorrents),e}getCategory(e){let r={name:"",link:""},s=e.find("a:first"),n=s.find("img:first");return r.link=s.attr("href"),"http"!==r.link.substr(0,4)&&(r.link=t.site.url+r.link),r.name=n.attr("alt"),r}getTags(t,e){let r=[];return e&&e.length>0&&e.some((e=>{if(e.selector&&t.find(e.selector).length)return r.push({name:e.name,color:e.color}),!0})),r}}(t);t.results=e.getResult(),console.log(t.results)}(options);