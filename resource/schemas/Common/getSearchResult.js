!function(e,t){let s=new class{constructor(){this.haveData=!1,!e.entry.loggedRegex||new RegExp(e.entry.loggedRegex,"").test(e.responseText)?(e.isLogged=!0,this.haveData=!0,this.site=e.site):e.status=ESearchResultParseStatus.needLogin}getResult(){if(console.log("Common schemas search js"),!this.haveData)return[];let s=e.resultSelector,l=e.entry.dataRowSelector||"> tbody > tr";s=s.replace(l,"");let i=e.entry.dataCellSelector||">td",r=e.page.find(s).find(l);if(0==r.length)return e.status=ESearchResultParseStatus.torrentTableIsEmpty,[];let a=[],u=e.entry.firstDataRowIndex||0,n=e.entry.fieldIndex||{time:-1,size:-1,seeders:-1,leechers:-1,completed:-1,comments:-1,author:-1,category:-1};try{for(let s=u;s<r.length;s++){const l=r.eq(s);let u=l.find(i),o=this.getTitle(l,u,n);if(!o)continue;let g=this.getFieldValue(l,u,n,"link"),h=this.getFieldValue(l,u,n,"url");if(!h||!g)continue;let c={title:o,subTitle:this.getFieldValue(l,u,n,"subTitle"),link:this.getFullURL(g),url:this.getFullURL(h),size:this.getFieldValue(l,u,n,"size")||0,time:this.getFieldValue(l,u,n,"time"),author:this.getFieldValue(l,u,n,"author")||"",seeders:this.getFieldValue(l,u,n,"seeders")||0,leechers:this.getFieldValue(l,u,n,"leechers")||0,completed:this.getFieldValue(l,u,n,"completed")||0,comments:this.getFieldValue(l,u,n,"comments")||0,site:this.site,tags:t.getRowTags(this.site,l),entryName:e.entry.name,category:this.getFieldValue(l,u,n,"category"),progress:this.getFieldValue(l,u,n,"progress"),status:this.getFieldValue(l,u,n,"status")};a.push(c)}}catch(t){e.status=ESearchResultParseStatus.parseError,e.errorMsg=t.stack}return 0!=a.length||e.errorMsg||(e.status=ESearchResultParseStatus.noTorrents),a}getFieldValue(e,s,l,i,r){let a=e,u=null;s&&l&&void 0!==l[i]&&-1!==l[i]&&(u=s.eq(l[i]),a=u||e);let n=t.getFieldValue(this.site,a,i);if(!n&&u&&0!==n){if(r)return u;n=u.text()}return n}getFullURL(e){let t=PTServiceFilters.parseURL(this.site.url);return"//"===e.substr(0,2)?e=`${t.protocol}${e}`:"/"===e.substr(0,1)?e=`${t.origin}${e}`:"http"!==e.substr(0,4)&&(e=`${t.origin}/${e}`),e}getTitle(e,s,l){let i=this.getFieldValue(e,s,l,"title",!0);if(!i)return"";if("string"==typeof i)return i;let r=i.find("span.__cf_email__");return r.length>0&&r.each(((e,s)=>{$(s).replaceWith(t.cfDecodeEmail($(s).data("cfemail")))})),i.text()}}(e);e.results=s.getResult(),console.log(e.results)}(options,options.searcher);