!function(t,e){let r=new class{constructor(){this.haveData=!1,/\/login/.test(t.responseText)?t.status=ESearchResultParseStatus.needLogin:(t.isLogged=!0,this.haveData=!0)}getResult(){if(!this.haveData)return[];let r=t.site,s=t.resultSelector,a=t.page.find(s),l=a.find("> tbody > tr");if(0==l.length)return t.status=ESearchResultParseStatus.torrentTableIsEmpty,[];let n=[],i=a.find("> thead > tr > th"),o=0;0==i.length&&(o=1,i=l.eq(0).find("th,td"));let h={time:-1,size:-1,seeders:-1,leechers:-1,completed:-1,comments:-1,author:i.length-1,category:0};r.url.lastIndexOf("/")!=r.url.length-1&&(r.url+="/");for(let t=0;t<i.length;t++){let e=i.eq(t),r=e.text();e.find("img.comments").length?(h.comments=t,h.author=t==h.author?-1:h.author):e.find("img.time").length?(h.time=t,h.author=t==h.author?-1:h.author):e.find("img.size").length?(h.size=t,h.author=t==h.author?-1:h.author):e.find("img.seeders").length?(h.seeders=t,h.author=t==h.author?-1:h.author):e.find("img.leechers").length?(h.leechers=t,h.author=t==h.author?-1:h.author):e.find("img.snatched").length?(h.completed=t,h.author=t==h.author?-1:h.author):/(cat|类型|類型|分类|分類|Тип)/gi.test(r)&&(h.category=t,h.author=t==h.author?-1:h.author)}try{for(let s=o;s<l.length;s++){const a=l.eq(s);let i=a.find(">td");if(a.find("a[href*='download.php?type=ass']").length>0)continue;let o=a.find("a[href*='/forum.php?mod=viewthread']:first");if(0==o.length)continue;let u=o.attr("href");u&&"http"!==u.substr(0,4)&&(u=`${r.url}${u}`);let g=a.find("img.download").parent();if(g=g.length?"A"!==g.get(0).tagName?`download.php?id=${u.getQueryString("id")}`:g.attr("href"):`download.php?id=${u.getQueryString("id")}`,0==g.length)continue;g&&"http"!==g.substr(0,4)&&(g=`${r.url}${g}`);let d={title:o.text(),subTitle:"",link:u,url:g,size:i.eq(h.size).text().trim()||0,time:-1==h.time?"":this.getTime(i.eq(h.time)),author:-1==h.author?"":i.eq(h.author).text()||"",seeders:-1==h.seeders?"":i.eq(h.seeders).text()||0,leechers:-1==h.leechers?"":i.eq(h.leechers).text()||0,completed:-1==h.completed?"":i.eq(h.completed).text()||0,comments:-1==h.comments?"":i.eq(h.comments).text()||0,site:r,tags:e.getRowTags(r,a),entryName:t.entry.name,category:-1==h.category?null:this.getCategory(i.eq(h.category)),progress:e.getFieldValue(r,a,"progress"),status:e.getFieldValue(r,a,"status")};n.push(d)}0==n.length&&(t.status=ESearchResultParseStatus.noTorrents)}catch(e){console.log(e),t.status=ESearchResultParseStatus.parseError,t.errorMsg=e.stack}return n}getTime(t){let e=t.find("span[title],time[title]").attr("title");return e||(e=$("<span>").html(t.html().replace("<br>"," ")).text()),e||""}getSubTitle(t,e){return""}getCategory(e){let r={name:"",link:""},s=e.find("a:first"),a=s.find("img:first");return s.length&&(r.link=s.attr("href"),"http"!==r.link.substr(0,4)&&(r.link=t.site.url+r.link)),a.length?r.name=a.attr("title")||a.attr("alt"):r.name=s.text(),r}}(t);t.results=r.getResult(),console.log(t.results)}(options,options.searcher);