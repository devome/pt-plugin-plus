!function(t,s){let e=t.site,r=e.user&&e.user.tagsAndCategories||[],a=new class{constructor(t,s=[]){this.site=t,this.tags_map={};for(const t of s)this.tags_map[t.id]={color:"#22a2c3",...t}}getResult(s){if(401===s.status)return t.status=ESearchResultParseStatus.needLogin,[];if(t.isLogged=!0,0===s.data.total||0===s.data.torrents.length)return t.status=ESearchResultParseStatus.noTorrents,[];const r=[],a=e.url.endsWith("/")?e.url.slice(0,-1):e.url;try{for(const t of s.data.torrents){const s=a+"/torrent/info/"+t.id;let o=a+"/api/torrent/download/"+t.id;e.passkey&&(o+="/"+e.passkey);const i=(t.tags||[]).map((t=>this.tags_map[t])),n=t.category?this.tags_map[t.category]:void 0;r.push({title:t.title,subTitle:t.subtitle,link:s,url:o,site:this.site,size:t.size,time:t.upload_time,author:t.anonymous?void 0:t.user.username,seeders:t.seeding,leechers:t.leeching,completed:t.complete,comments:void 0,tags:i,category:n,progress:void 0,status:void 0,imdbId:void 0,entryName:"全部"})}}catch(s){t.status=ESearchResultParseStatus.parseError,t.errorMsg=s.stack}return r}}(e,r);t.results=a.getResult(t.page),console.log(t.results)}(options,options.searcher);