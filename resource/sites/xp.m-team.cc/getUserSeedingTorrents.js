!function(t,e){function s(t,e){const s=new URL(e,new URL(t,"resolve://"));if("resolve:"===s.protocol){const{pathname:t,search:e,hash:a}=s;return t+e+a}return s.toString()}let a=t.site.activeURL;console.log("[mt] getUserSeedingTorrents",t,e);let n=s(a,t.rule.page);new class{constructor(t,e){this.options=t,this.dataURL=e,this.body=null,this.rawData="",this.pageInfo={count:0,current:0},this.result={seeding:0,seedingSize:0},this.load()}done(){this.result.messageCount=this.getUnReadMessageCount(),console.log("[mt] getUserSeedingTorrents done",this.result),this.options.resolve(this.result)}parse(){this.getPageInfo();let t=this.rawData.data.data,e={seeding:0,seedingSize:0};t&&t.forEach((t=>{e.seeding++,e.seedingSize+=Number(t.torrent.size)})),this.result.seeding+=e.seeding,this.result.seedingSize+=e.seedingSize,this.pageInfo.current++,this.pageInfo.current<this.pageInfo.count?this.load():this.done()}getPageInfo(){this.pageInfo.count>0||(this.pageInfo.count=Number(this.rawData.data.totalPages))}load(){let t=this.dataURL,e=this.options.rule.requestData;e.pageNumber=this.pageInfo.current+1,$.ajax({url:t,method:"POST",dataType:"JSON",data:JSON.stringify(e),contentType:"application/json",headers:this.options.rule.headers}).done((t=>{this.rawData=t,this.rawData.data.data.length>0?this.parse():this.done()})).fail((()=>{this.done()}))}getUnReadMessageCount(){return this.getMailBoxCnt()+this.getSystemNoticeCnt()}getMailBoxCnt(){return this.getNotifyCnt(s(a,"/api/msg/statistic"))}getSystemNoticeCnt(){return this.getNotifyCnt(s(a,"/api/msg/notify/statistic"))}getNotifyCnt(t){const e=$.ajax(t,{method:"POST",data:{},headers:this.options.rule.headers,async:!1});return parseInt(e.responseJSON.data.unMake)||0}}(t,n)}(_options,_self);