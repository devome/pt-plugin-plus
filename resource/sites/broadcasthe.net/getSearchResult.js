!function(e){let t=new class{constructor(){this.haveData=!1,this.categories={},/auth_form/.test(e.responseText)?e.status=ESearchResultParseStatus.needLogin:(e.isLogged=!0,/没有种子|No [Tt]orrents?|Your search did not match anything|用准确的关键字重试/.test(e.responseText)?e.status=ESearchResultParseStatus.noTorrents:this.haveData=!0)}getResult(){let t=e.site,r=[],s=e.page.find(e.resultSelector||"table.torrent_table:last > tbody > tr");if(0==s.length)return e.status=ESearchResultParseStatus.noTorrents,r;let n=s.eq(0).find("th,td"),l={time:-1,size:-1,seeders:-1,leechers:-1,completed:-1,comments:-1,author:-1};t.url.lastIndexOf("/")!=t.url.length-1&&(t.url+="/");for(let e=0;e<n.length;e++){const t=n.eq(e);t.find("a[href*='order_by=size']").length?l.size=e:t.find("a[href*='order_by=seeders']").length?l.seeders=e:t.find("a[href*='order_by=leechers']").length?l.leechers=e:t.find("a[href*='order_by=snatched']").length&&(l.completed=e)}try{for(let n=1;n<s.length;n++){const o=s.eq(n);let a=o.find(">td"),i=o.find("a[href*='torrentid=']").first().attr("href");i=i.match(/torrentid=(\d+)/)[1];let h=o.find("[style='float:none;']").first().attr("title"),d=o.find("[title='View Torrent']").first().attr("href");d&&"http"!==d.substr(0,4)&&(d=`${t.url}${d}`);let c=o.find("[title='Download']").first().attr("href");"http"!==c.substr(0,4)&&(c=`${t.url}${c}`);let u=o.find("a[href*='filter_cat']").children().first().attr("title"),f=o.find("div:contains('Added:')").text().match(/Added:(.+)ago/),m=f&&f.length>=2?f[1].trim():"",g={id:i,title:h,link:d,url:c,size:-1==l.size?"":a.eq(l.size).text()||0,time:this.getTime(m),author:-1==l.author?"":a.eq(l.author).text()||"",seeders:-1==l.seeders?"":a.eq(l.seeders).text()||0,leechers:-1==l.leechers?"":a.eq(l.leechers).text()||0,completed:-1==l.completed?"":a.eq(l.completed).text()||0,comments:-1==l.comments?"":a.eq(l.comments).text()||0,site:t,entryName:e.entry.name,category:u};r.push(g)}0==r.length&&(e.status=ESearchResultParseStatus.noTorrents)}catch(t){console.error(t),e.status=ESearchResultParseStatus.parseError,e.errorMsg=t.stack}return r}getTime(e){let t=e.match(/((\d+).+?(minute|hour|day|week|month|year)s?.*?(\,|and))?.*?(\d+).+?(minute|hour|day|week|month|year)s?/),r=0;t&&(r=null==t[1]?this.getMilliseconds(t[5],t[6]):this.getMilliseconds(t[2],t[3])+this.getMilliseconds(t[5],t[6])),console.log(t);let s=Date.now()-r;return new Date(s).toISOString()}getMilliseconds(e,t){let r=0;return r=60*e*1e3,"minute"==t||(r*=60,"hour"==t||(r*=24,"day"==t||(r*=7,"week"==t||(r=30*r/7,"month"==t||(r*=12))))),r}}(e);e.results=t.getResult(),console.log(e.results)}(options);