!function(e,t){let s=new class{constructor(){this.haveData=!1,this.categories={},/\/doLogin/.test(e.responseText)?e.status=ESearchResultParseStatus.needLogin:(e.isLogged=!0,/Nothing found/.test(e.responseText)?e.status=ESearchResultParseStatus.noTorrents:this.haveData=!0)}getResult(){if(!this.haveData)return[];let s=[],r=e.site,a=e.page.find(e.resultSelector||"table#torrent-list:last > tbody > tr"),l={progress:2,status:2,time:4,size:5,seeders:7,leechers:8,completed:6,name:2,author:9,category:0};0==a.eq(0).find("td[id*=codec]").length&&(l={progress:1,status:1,time:3,size:4,seeders:6,leechers:7,completed:5,name:1,author:8,category:0}),"/"==r.url.substr(-1)&&(r.url=r.url.substr(0,r.url.length-1));for(let i=0;i<a.length;i++){const n=a.eq(i);let o=n.find(">td"),u=o.eq(l.name).find("b > a");if(0==u.length)continue;let g=u.html().split("::"),h=u.attr("href");h&&"http"!==h.substr(0,4)&&(h=`${r.url}${h}`);let c=n.find("a.js-download").attr("href");if(c&&"http"!==c.substr(0,4)&&(c=`${r.url}${c}`),!c)continue;let d="";g.length>0&&(d=$("<span>").html(g[1]).text());let p=o.eq(l.time).text().replace(/([a-zA-Z]+)/g,"$1 ").replace(/^\s+|\s+$/g,"")+".",m={title:$("<span>").html(g[0]).text(),subTitle:d||"",link:h,url:c,size:o.eq(l.size).html()||0,time:p||"",author:o.eq(l.author).text()||"",seeders:o.eq(l.seeders).text().split("/")[0]||0,leechers:o.eq(l.leechers).text().split("/")[1]||0,completed:o.eq(l.completed).text()||0,comments:o.eq(l.comments).text()||0,site:r,entryName:e.entry.name,category:this.getCategory(o.eq(l.category)),tags:t.getRowTags(r,n),progress:t.getFieldValue(r,o.eq(l.progress),"progress"),status:t.getFieldValue(r,o.eq(l.status),"status")};s.push(m)}return 0==s.length&&(e.status=ESearchResultParseStatus.noTorrents),s}getCategory(t){let s={name:"",link:""},r=t.find("a:first");s.link=r.attr("href");let a=s.link.match(/cat=(\d+)/)[1];return"http"!==s.link.substr(0,4)&&(s.link=e.site.url+s.link),s.name=this.getCategoryName(a),s}getCategoryName(t){return $.isEmptyObject(this.categories)&&e.page.find("table.bottom > tbody > tr").eq(1).find("td").each(((e,t)=>{let s=$(t).find("input").attr("id");s=s.replace("c","");let r=$(t).find("a").text();s&&(this.categories[s]=r)})),this.categories?this.categories[t]:""}}(e);e.results=s.getResult(),console.log(e.results)}(options,options.searcher);