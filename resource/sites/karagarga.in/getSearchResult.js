!function(e){let t=new class{constructor(){this.haveData=!1,/takelogin\.php/.test(e.responseText)?e.status=ESearchResultParseStatus.needLogin:(e.isLogged=!0,/没有种子|No [Tt]orrents?|Your search did not match anything|用准确的关键字重试/.test(e.responseText)?e.status=ESearchResultParseStatus.noTorrents:this.haveData=!0)}getResult(){if(!this.haveData)return[];let t=[],s=e.site,r=e.page.find(e.resultSelector||"table[id='browse'] > tbody > tr[style*='padding-top:0px']"),g=/([A-Za-z]{3})\s(\d+)\s'(\d{2})/;"/"==s.url.substr(-1)&&(s.url=s.url.substr(0,s.url.length-1));for(let n=1;n<r.length;n++){const a=r.eq(n);let p=a.find(">td"),l=p.eq(1).find("a[href*='details.php?id=']").first();if(0==l.length)continue;let i=l.text(),o=l.attr("href");o&&"http"!==o.substr(0,4)&&(o=`${s.url}/${o}`);let x="";if(x=p.eq(1).find("a[href*='/down.php/']").first().attr("href"),x&&"http"!==x.substr(0,4)&&(x=`${s.url}/${x}`),!x)continue;let u=p.eq(8).text().match(g)[1];"Jan"==RegExp.$1&&(u="20"+RegExp.$3+"-01-"+RegExp.$2+" 00:00"),"Feb"==RegExp.$1&&(u="20"+RegExp.$3+"-02-"+RegExp.$2+" 00:00"),"Mar"==RegExp.$1&&(u="20"+RegExp.$3+"-03-"+RegExp.$2+" 00:00"),"Apr"==RegExp.$1&&(u="20"+RegExp.$3+"-04-"+RegExp.$2+" 00:00"),"May"==RegExp.$1&&(u="20"+RegExp.$3+"-05-"+RegExp.$2+" 00:00"),"Jun"==RegExp.$1&&(u="20"+RegExp.$3+"-06-"+RegExp.$2+" 00:00"),"Jul"==RegExp.$1&&(u="20"+RegExp.$3+"-07-"+RegExp.$2+" 00:00"),"Aug"==RegExp.$1&&(u="20"+RegExp.$3+"-08-"+RegExp.$2+" 00:00"),"Sep"==RegExp.$1&&(u="20"+RegExp.$3+"-09-"+RegExp.$2+" 00:00"),"Oct"==RegExp.$1&&(u="20"+RegExp.$3+"-10-"+RegExp.$2+" 00:00"),"Nov"==RegExp.$1&&(u="20"+RegExp.$3+"-11-"+RegExp.$2+" 00:00"),"Dec"==RegExp.$1&&(u="20"+RegExp.$3+"-12-"+RegExp.$2+" 00:00");let R={title:i,link:o,url:x,size:p.eq(10).text()||0,time:u,author:p.eq(7).text()||"",seeders:p.eq(12).text(),leechers:p.eq(13).text(),completed:p.eq(11).text().match(/(\d+)/)[0]||0,comments:p.eq(6).find("a[href*='#startcomments']").text()||0,site:s,entryName:e.entry.name,category:this.getCategory(p.eq(0)),tags:this.getTags(a,e.torrentTagSelectors)};t.push(R)}return 0==t.length&&(e.status=ESearchResultParseStatus.noTorrents),t}getCategory(t){let s={name:"",link:""},r=t.find("a:first"),g=r.find("img:first");return s.link=r.attr("href"),"http"!==s.link.substr(0,4)&&(s.link=e.site.url+s.link),s.name=g.attr("title").match(/[^::]+/)[0],s}getTags(e,t){let s=[];return t&&t.length>0&&t.some((t=>{if(t.selector&&e.find(t.selector).length)return s.push({name:t.name,color:t.color}),!0})),s}}(e);e.results=t.getResult(),console.log(e.results)}(options);