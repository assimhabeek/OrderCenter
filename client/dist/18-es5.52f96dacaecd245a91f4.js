!function(){function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function r(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{DPKD:function(e,n,i){"use strict";i.r(n),i.d(n,"ArchivedOrdersModule",function(){return E});var o=i("tyNb"),a=i("mrSG"),c=i("vkgz"),s=i("3Pt+"),l=i("GGDx"),u=i("cdsW"),d=i("r4zg"),p=i("fXoL"),b=i("ofXK"),f=i("bTqV");function h(t,e){if(1&t){var r=p.Rb();p.Qb(0,"button",1),p.Xb("click",function(){return p.nc(r),p.bc().onClick(1)}),p.wc(1,"UnArchive "),p.Pb()}}var m,g=((m=function(){function e(){t(this,e)}return r(e,[{key:"agInit",value:function(t){this.params=t,this.isFileSet=null!=this.params.data.exportFile,this.value=+this.params.value}},{key:"onClick",value:function(t){this.value=t,this.params.node.setDataValue(this.params.colDef,this.value)}},{key:"refresh",value:function(){return!0}}]),e}()).\u0275fac=function(t){return new(t||m)},m.\u0275cmp=p.Fb({type:m,selectors:[["ct-archive-button"]],decls:1,vars:1,consts:[["mat-flat-button","","color","accent",3,"click",4,"ngIf"],["mat-flat-button","","color","accent",3,"click"]],template:function(t,e){1&t&&p.vc(0,h,2,0,"button",0),2&t&&p.gc("ngIf",!e.isFileSet)},directives:[b.k,f.a],styles:["button[_ngcontent-%COMP%] {\n          font-size: 12px !important;\n          height: 24px !important;\n          padding: 2px !important;\n          line-height: 12px !important;\n        }"]}),m),v=i("MOE4"),w=i("0IaG"),k=i("A9p3"),P=i("3LUQ"),S=i("Wp6s"),y=i("kmnG"),D=i("qFsG"),C=i("iadO"),M=i("STbY"),O=i("NFeN"),F=i("Qu3c"),A=i("gwh1");function Q(t,e){if(1&t&&(p.Qb(0,"div",13),p.Mb(1,"ag-grid-angular",14),p.Pb()),2&t){var r=p.bc();p.Ab(1),p.gc("gridOptions",r.options)("modules",r.modules)("rowData",r.rowData)}}var R,x,_=((R=function(){function e(r,n,i,o){var a=this;t(this,e),this.ordersService=r,this.dialog=n,this.confirmService=i,this.alertService=o,this.orderDateForm=new s.f({orderDate:new s.d(d.a.now())}),this.orderStatus=0,this.rowData=[],this.modules=[],this.modules=[u.a],this.loadHeaders().subscribe(function(){a.setupOptions()},function(t){console.log(t),a.onError("Could not load grid info")})}return r(e,[{key:"onGridReady",value:function(t){var e;this.gridApi=t.api,this.gridColumnApi=t.columnApi,this.addFilter({orderDate:{filter:d.a.toMysqlDate(this.orderDateForm.value.orderDate)}}),this.addFilter({orderStatus:{filter:d.a.orderStatus.ORDER_ARCHIVED}}),null===(e=this.gridApi)||void 0===e||e.setServerSideDatasource(this.ordersService),this.listenToOrderDateForm()}},{key:"addFilter",value:function(t){if(this.gridApi){var e=this.gridApi.getFilterModel()?this.gridApi.getFilterModel():{};this.gridApi.setFilterModel(Object.assign(e,t))}}},{key:"listenToOrderDateForm",value:function(){var t=this;this.orderDateForm.valueChanges.subscribe(function(e){t.addFilter({orderDate:{filter:d.a.toMysqlDate(e.orderDate)}})})}},{key:"loadHeaders",value:function(){var t=this;return this.ordersService.getHeader().pipe(Object(c.a)(function(e){t.columns=e,t.columns[0].hide=!1,t.columns[0].editable=!0,t.columns[0].valueSetter=t.setValue.bind(t),t.columns[0].cellRenderer="archiveButtonRenderer"}))}},{key:"setupOptions",value:function(){this.options={pagination:!1,tooltipShowDelay:0,defaultColDef:{sortable:!0,filter:!0,tooltipComponent:"tooltipRenderer",filterParams:{filterOptions:["contains"],defaultOption:"contains",suppressAndOrCondition:!0},resizable:!0,editable:!1},animateRows:!0,rowModelType:"serverSide",serverSideStoreType:"partial",rowSelection:"single",cacheBlockSize:100,columnDefs:this.columns,onGridReady:this.onGridReady.bind(this),paginationAutoPageSize:!0,frameworkComponents:{tooltipRenderer:l.a,archiveButtonRenderer:g}}}},{key:"refresh",value:function(){this.gridApi.refreshServerSideStore({purge:!0})}},{key:"setValue",value:function(t){return Object(a.a)(this,void 0,void 0,regeneratorRuntime.mark(function e(){var r,n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r={id:t.data.id,name:t.colDef.field,value:t.newValue},console.log(r),t.data[t.colDef.field]=t.newValue,e.next=4,this.ordersService.updateCell(r);case 4:return n=e.sent,e.abrupt("return",((n.status?this.onSuccess.bind(this):this.onError.bind(this))(n.message),this.refresh(),n.status));case 6:case"end":return e.stop()}},e,this)}))}},{key:"noRowSelected",value:function(){var t=this.gridApi?this.gridApi.getSelectedNodes():null;return!t||0===t.length}},{key:"onSuccess",value:function(t){this.alertService.alertSuccess(t)}},{key:"onError",value:function(t){this.alertService.alertError(t)}},{key:"clearFilters",value:function(){var t;this.orderDateForm.reset({orderDate:null}),null===(t=this.gridApi)||void 0===t||t.setFilterModel({orderStatus:{filter:d.a.orderStatus.ORDER_ARCHIVED}}),this.refresh()}}]),e}()).\u0275fac=function(t){return new(t||R)(p.Lb(v.a),p.Lb(w.b),p.Lb(k.a),p.Lb(P.a))},R.\u0275cmp=p.Fb({type:R,selectors:[["ct-archived-orders"]],decls:31,vars:6,consts:[[1,"ct-toolbar","mat-elevation-z1"],[1,"ct-spacer"],[3,"formGroup"],[1,"ct-order-date"],["formControlName","orderDate","matInput","",3,"matDatepicker"],["matSuffix","",3,"for"],["picker",""],["mat-icon-button","",1,"ct-filter",3,"color","matMenuTriggerFor"],["mat-icon-button","","matTooltip","Refresh",3,"click"],["menu","matMenu"],["mat-menu-item","",3,"click"],["color","accent","mat-icon-button","","matTooltip","Reset Filters",3,"click"],["class","ct-table-wrapper",4,"ngIf"],[1,"ct-table-wrapper"],[1,"ag-theme-balham",3,"gridOptions","modules","rowData"]],template:function(t,e){if(1&t&&(p.Qb(0,"mat-card",0),p.Mb(1,"span",1),p.Qb(2,"div",2),p.Qb(3,"mat-form-field",3),p.Qb(4,"mat-label"),p.wc(5,"Choose a date"),p.Pb(),p.Mb(6,"input",4),p.Mb(7,"mat-datepicker-toggle",5),p.Mb(8,"mat-datepicker",null,6),p.Pb(),p.Pb(),p.Qb(10,"button",7),p.Qb(11,"mat-icon"),p.wc(12,"filter_alt"),p.Pb(),p.Pb(),p.Qb(13,"button",8),p.Xb("click",function(){return e.refresh()}),p.Qb(14,"mat-icon"),p.wc(15,"refresh"),p.Pb(),p.Pb(),p.Qb(16,"mat-menu",null,9),p.Qb(18,"button",10),p.Xb("click",function(){return e.orderStatus=0,e.refresh()}),p.Qb(19,"span"),p.wc(20,"Both"),p.Pb(),p.Pb(),p.Qb(21,"button",10),p.Xb("click",function(){return e.orderStatus=1,e.refresh()}),p.Qb(22,"span"),p.wc(23,"Pending"),p.Pb(),p.Pb(),p.Qb(24,"button",10),p.Xb("click",function(){return e.orderStatus=2,e.refresh()}),p.Qb(25,"span"),p.wc(26,"Queued"),p.Pb(),p.Pb(),p.Pb(),p.Qb(27,"button",11),p.Xb("click",function(){return e.clearFilters()}),p.Qb(28,"mat-icon"),p.wc(29,"cancel"),p.Pb(),p.Pb(),p.Pb(),p.vc(30,Q,2,3,"div",12)),2&t){var r=p.lc(9),n=p.lc(17);p.Ab(2),p.gc("formGroup",e.orderDateForm),p.Ab(4),p.gc("matDatepicker",r),p.Ab(1),p.gc("for",r),p.Ab(3),p.gc("color",0!=e.orderStatus?"primary":"")("matMenuTriggerFor",n),p.Ab(20),p.gc("ngIf",e.columns)}},directives:[S.a,s.m,s.g,y.c,y.f,s.c,D.b,C.d,s.l,s.e,C.f,y.h,C.c,f.a,M.d,O.a,F.a,M.a,M.b,b.k,A.a],styles:[".ct-toolbar[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;width:100%;padding:0!important;margin:0!important}.ct-spacer[_ngcontent-%COMP%]{flex:1 1 auto}.mat-menu-item[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{margin-right:0!important}.ct-table-wrapper[_ngcontent-%COMP%]{width:100%;display:flex;position:relative}.ct-table-wrapper[_ngcontent-%COMP%]   ag-grid-angular[_ngcontent-%COMP%]{display:inline-block;flex:1 1 auto;height:calc(100vh - 118px)}.ct-table-wrapper[_ngcontent-%COMP%]   .ct-next-button[_ngcontent-%COMP%]{align-self:center}button[_ngcontent-%COMP%]{height:36px!important}button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px!important}.ct-order-date[_ngcontent-%COMP%]{height:36px;font-size:12px}"]}),R),G=i("PCNd"),T=i("vvyD"),E=((x=function e(){t(this,e)}).\u0275mod=p.Jb({type:x}),x.\u0275inj=p.Ib({factory:function(t){return new(t||x)},imports:[[b.c,G.a,A.b.withComponents(),T.a,s.h,s.q,o.f.forChild([{path:"",component:_,pathMatch:"full"}])]]}),x)}}])}();