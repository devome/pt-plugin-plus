!function(e,t){let l=new class{constructor(){this.haveData=!1,/takelogin\.php|<form action="\?returnto=/.test(e.responseText)?e.status=ESearchResultParseStatus.needLogin:(e.isLogged=!0,/没有种子|No [Tt]orrents?|Your search did not match anything|用准确的关键字重试/.test(e.responseText)?e.status=ESearchResultParseStatus.noTorrents:(this.haveData=!0,this.site=e.site))}getResult(){if(!this.haveData)return[];let l=e.site,s=e.page.find(".group_content"),a=[];for(let r=0;r<s.length;r++){let i=s.eq(r),u=i.find(".torrent_wrap"),n=t.getFieldValue(l,i,"title"),o=l.url+l.page+t.getFieldValue(l,i,"category_link_parameters"),g=t.getFieldValue(l,i,"category_name");for(let s=0;s<u.length;s++){let r=u.eq(s),i={title:n,subTitle:t.getFieldValue(l,r,"subTitle"),link:l.url+t.getFieldValue(l,r,"link_path"),url:l.url+t.getFieldValue(l,r,"url_path"),size:t.getFieldValue(l,r,"size"),time:t.getFieldValue(l,r,"time"),author:t.getFieldValue(l,r,"author"),seeders:t.getFieldValue(l,r,"seeders"),leechers:t.getFieldValue(l,r,"leechers"),completed:t.getFieldValue(l,r,"completed"),site:l,tags:t.getRowTags(l,r),entryName:e.entry.name,category:{link:o,name:g},progress:t.getFieldValue(l,r,"progress"),status:t.getFieldValue(l,r,"status")},d=r.find("label");for(let e=0;e<d.length;e++){let t={name:d.eq(e).find("b").text(),title:d.eq(e).find("b").text(),color:d.eq(e).get(0).style["background-color"]};i.tags.push(t)}a.push(i)}}return a}}(e);e.results=l.getResult()}(options,options.searcher);