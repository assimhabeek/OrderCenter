(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{"iq+e":function(e,t,n){"use strict";n.r(t),n.d(t,"FileSelectModule",function(){return F});var i=n("tyNb"),r=n("fXoL"),o=n("AytR"),l=n("LRne"),a=n("N+K7");let c=(()=>{class e{constructor(e){this.httpService=e}upload(e){if(!e&&e.name)return Object(l.a)(null);const t=new FormData;return t.append("file",e,e.name),this.httpService.postWithAuth(o.a.routes.upload,t)}}return e.\u0275fac=function(t){return new(t||e)(r.Ub(a.a))},e.\u0275prov=r.Hb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var s=n("3LUQ");let p=(()=>{class e{constructor(){this.fileOver=!1,this.fileDropped=new r.n}onDragOver(e){e.preventDefault(),e.stopPropagation(),this.fileOver=!0}onDragLeave(e){e.preventDefault(),e.stopPropagation(),this.fileOver=!1}ondrop(e){e.preventDefault(),e.stopPropagation(),this.fileOver=!1,this.fileDropped.emit(e.dataTransfer)}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275dir=r.Gb({type:e,selectors:[["","ctDnd",""]],hostVars:2,hostBindings:function(e,t){1&e&&r.Xb("dragover",function(e){return t.onDragOver(e)})("dragleave",function(e){return t.onDragLeave(e)})("drop",function(e){return t.ondrop(e)}),2&e&&r.Db("fileOver",t.fileOver)},outputs:{fileDropped:"fileDropped"}}),e})();var u=n("bv9b"),d=n("bTqV"),b=n("NFeN"),h=n("ofXK"),f=n("kmnG");function g(e,t){if(1&e&&(r.Qb(0,"div",12),r.Qb(1,"mat-label"),r.wc(2),r.Pb(),r.Pb()),2&e){const e=r.bc();r.Ab(2),r.yc(" ",e.uploadedFileName," ")}}let v=(()=>{class e{constructor(e,t){this.fileUploaderService=e,this.alertService=t,this.uploadedFileName=null,this.progressBarValue=0,this.currentFile=null}importFile(e){e.files.length>0&&null!=e.files[0]&&this.isValidFileType(e.files[0])?(this.uploadedFileName=e.files[0].name,this.currentFile=e.files[0]):this.onError("Invalid File")}uploadFile(){this.fileUploaderService.upload(this.currentFile).subscribe(this.handleResponse.bind(this),e=>{console.log(e),this.onError("Could not upload the file")})}onChoseFile(e){e.click(),this.currentFile=null,this.progressBarValue=0,this.uploadedFileName=null}handleResponse(e){e.status?(this.progressBarValue=100,this.onSuccess(e.message)):this.onError(e.message)}getFileExtension(e){return e.split(".").pop()}isValidFileType(e){return["xlsx","xls","csv"].includes(this.getFileExtension(e.name))}onSuccess(e){this.alertService.alertSuccess(e)}onError(e){this.alertService.alertError(e)}}return e.\u0275fac=function(t){return new(t||e)(r.Lb(c),r.Lb(s.a))},e.\u0275cmp=r.Fb({type:e,selectors:[["ct-file-select"]],decls:16,vars:2,consts:[[1,"ct-container"],[1,"ct-row"],[1,"ct-upload-zone"],["ctDnd","",1,"ct-drop-zone",3,"fileDropped"],[1,"ct-progress-bar"],["mode","determinate",3,"value"],["type","file",1,"ct-hide",3,"change"],["fileInput",""],[1,"ct-button-container"],["color","primary","mat-raised-button","",3,"click"],["color","accent","mat-raised-button","",3,"click"],["class","ct-file-name",4,"ngIf"],[1,"ct-file-name"]],template:function(e,t){if(1&e){const e=r.Rb();r.Qb(0,"div",0),r.Qb(1,"div",1),r.Qb(2,"div",2),r.Qb(3,"div",3),r.Xb("fileDropped",function(e){return t.importFile(e)}),r.wc(4," Drag and Drop "),r.Pb(),r.Qb(5,"div",4),r.Mb(6,"mat-progress-bar",5),r.Pb(),r.Qb(7,"input",6,7),r.Xb("change",function(e){return t.importFile(e.target)}),r.Pb(),r.Qb(9,"div",8),r.Qb(10,"button",9),r.Xb("click",function(){r.nc(e);const n=r.lc(8);return t.onChoseFile(n)}),r.wc(11,"Choose Files"),r.Pb(),r.Qb(12,"button",10),r.Xb("click",function(){return t.uploadFile()}),r.Qb(13,"mat-icon"),r.wc(14,"upload"),r.Pb(),r.Pb(),r.Pb(),r.vc(15,g,3,1,"div",11),r.Pb(),r.Pb(),r.Pb()}2&e&&(r.Ab(6),r.gc("value",t.progressBarValue),r.Ab(9),r.gc("ngIf",t.uploadedFileName))},directives:[p,u.a,d.a,b.a,h.k,f.f],styles:[".ct-container[_ngcontent-%COMP%]{padding-top:64px;width:100%;text-align:center}.ct-button-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin:auto 8px!important}.ct-container[_ngcontent-%COMP%]   .ct-row[_ngcontent-%COMP%]{width:80%;max-width:600px;display:block;margin:auto}.ct-upload-zone[_ngcontent-%COMP%]{display:inline-block;text-align:center;width:100%;max-width:600px}.ct-drop-zone[_ngcontent-%COMP%]{user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;line-height:150px;font-size:16px;font-weight:lighter;opacity:.9;height:150px;width:100%;border-radius:10px;border:3px dashed;margin:8px}.ct-hide[_ngcontent-%COMP%]{visibility:hidden;height:0;width:0;opacity:0}.ct-file-name[_ngcontent-%COMP%], .ct-progress-bar[_ngcontent-%COMP%]{margin:16px}"]}),e})();var m=n("PCNd"),w=n("vvyD"),P=n("3Pt+");let F=(()=>{class e{}return e.\u0275mod=r.Jb({type:e}),e.\u0275inj=r.Ib({factory:function(t){return new(t||e)},imports:[[h.c,m.a,w.a,P.h,P.q,i.f.forChild([{path:"",component:v,pathMatch:"full"}])]]}),e})()}}]);