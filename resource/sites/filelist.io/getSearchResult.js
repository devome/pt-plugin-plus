!function(t,e){let s=new class{constructor(){this.haveData=!1,/takelogin\.php/.test(t.responseText)?t.status=ESearchResultParseStatus.needLogin:(t.isLogged=!0,/没有种子|No [Tt]orrents?|Your search did not match anything|用准确的关键字重试/.test(t.responseText)?t.status=ESearchResultParseStatus.noTorrents:this.haveData=!0)}getResult(){if(!this.haveData)return[];let s=[],r=t.site,a=t.page.find(t.resultSelector||"div.visitedlinks:last > div[class=torrentrow]"),l=/(\d{2}:\d{2}:\d{2}[^\d]+?\d{2}\/\d{2}\/\d{4})/,n=/(\d{2}:\d{2}:\d{2})[^\d]+?(\d{2}\/\d{2}\/\d{4})/,i=/(\d{2})\/(\d{2})\/(\d{4})/;"/"==r.url.substr(-1)&&(r.url=r.url.substr(0,r.url.length-1));for(let o=0;o<a.length;o++){const u=a.eq(o);let d=u.find(">div"),h=d.eq(1).find("a").attr("title"),c=d.eq(1).find("a").first();if(0==c.length)continue;let g=c.attr("href");g&&"http"!==g.substr(0,4)&&(g=`${r.url}/${g}`);let p=g.getQueryString("id"),f="";if(r.passkey&&p?f=`https://${r.host}/download.php?id=${p}&passkey=${r.passkey}`:(f=d.eq(3).find("a").first().attr("href"),f&&"http"!==f.substr(0,4)&&(f=`${r.url}/${f}`)),!f)continue;let m="",q={title:$("<span>").html(h).text(),subTitle:m||"",link:g,url:f,size:d.eq(6).text()||0,time:d.eq(5).html().replace("<br>"," ").match(l)[1].replace(n,"$2 $1").replace(i,"$3-$2-$1"),author:d.eq(10).text()||"",seeders:d.eq(8).text().split("/")[0]||0,leechers:d.eq(9).text().split("/")[1]||0,completed:d.eq(7).text()||0,comments:d.eq(4).text()||0,site:r,entryName:t.entry.name,category:this.getCategory(d.eq(0)),tags:e.getRowTags(r,u)};s.push(q)}return 0==s.length&&(t.status=ESearchResultParseStatus.noTorrents),s}getCategory(e){let s={name:"",link:""},r=e.find("a:first"),a=r.find("img:first");return s.link=r.attr("href"),"http"!==s.link.substr(0,4)&&(s.link=t.site.url+s.link),s.name=a.attr("alt"),s}}(t);t.results=s.getResult(),console.log(t.results)}(options,options.searcher);