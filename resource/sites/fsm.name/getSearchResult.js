!function(e){let t=new class{constructor(){this.haveData=!1,"获取种子列表"==e.page.msg?(e.isLogged=!0,this.haveData=!0):e.status=ESearchResultParseStatus.needLogin}getResult(){if(!this.haveData)return[];let t=e.site,s=e.page.data.list;if(0==s.length)return e.status=ESearchResultParseStatus.noTorrents,[];let r=[];try{s.forEach((s=>{let a={title:s.title,subTitle:s.tags,link:`${t.url}/detail/?tid=${s.tid}`,url:`${t.url}/api/Torrents/download?tid=${s.tid}&passkey=${t.passkey}`,size:Number(s.fileRawSize),time:Date(s.createdTs),seeders:s.peers.upload,leechers:s.peers.download,completed:s.finish,site:e.site,tags:this.getTags(s.status.class),entryName:e.entry.name,category:s.type.name,comments:"--"};r.push(a)})),0==r.length&&(e.status=ESearchResultParseStatus.noTorrents)}catch(t){console.log(t),e.status=ESearchResultParseStatus.parseError,e.errorMsg=t.stack}return r}getTags(e){switch(e){case"2xfree":return[{name:"2xFree",color:"green"}];case"free":return[{name:"Free",color:"blue"}];default:return[]}}getCategory(e){switch(e){case"1":return"日本AV";case"2":return"国产视频";case"3":return"写真";case"4":return"黄油";case"5":return"里番";case"6":return"黄色漫画";case"7":return"欧美视频";case"8":return"其他";default:return e}}}(e);e.results=t.getResult()}(options);