!function(){function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function n(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{GGDx:function(e,r,o){"use strict";o.d(r,"a",function(){return u});var i=o("r4zg"),a=o("fXoL"),u=function(){var e=function(){function e(){t(this,e)}return n(e,[{key:"agInit",value:function(t){this.data=t.api.getDisplayedRowAtIndex(t.rowIndex).data}},{key:"parseDate",value:function(){return i.a.fromMysqlDateTime(this.data.lastModification).format("YYYY-MM-DD HH:mm:ss")}}]),e}();return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=a.Fb({type:e,selectors:[["tooltip-component"]],decls:3,vars:1,consts:[[1,"tooltip"]],template:function(t,e){1&t&&(a.Rb(0,"div",0),a.Rb(1,"p"),a.xc(2),a.Qb(),a.Qb()),2&t&&(a.Ab(2),a.zc(" ",e.parseDate()," "))},styles:["[_nghost-%COMP%] {\n                position: absolute;\n                width: 150px;\n                height: 70px;\n                pointer-events: none;\n                transition: opacity 1s;\n            }\n\n            .ag-tooltip-hiding[_nghost-%COMP%] {\n                opacity: 0;\n            }\n\n            .tooltip[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n                margin: 5px;\n                padding: 8px;\n                background: rgba(0, 0, 0, 0.9);\n                color: #eeeeee;\n                white-space: nowrap;\n            }"]}),e}()},PAny:function(e,r,o){"use strict";o.d(r,"a",function(){return f});var i=o("AytR"),a=o("tk/3"),u=o("lJxs"),s=o("r4zg"),c=o("fXoL"),l=o("N+K7"),d=o("As+J"),f=function(){var e=function(){function e(n,r){t(this,e),this.httpService=n,this.skusService=r}return n(e,[{key:"getSKUs",value:function(){var t=this;return this.skusService.getSkus().pipe(Object(u.a)(function(e){var n=e.data.reduce(function(t,e){var n=t[e.skuType]||[];return n.push(e),t[e.skuType]=n,t},{});return Object.keys(n).reduce(function(e,r){return e[r]=t.addEmptyAndCompletedToSkus(n[r]),e},{})}))}},{key:"getHeader",value:function(){var t=this;return this.getSKUs().pipe(Object(u.a)(function(e){var n=e.HIGH_BEAM||t.addEmptyAndCompletedToSkus([]),r=e.LOW_BEAM||t.addEmptyAndCompletedToSkus([]),o=e.FOG_LIGHT||t.addEmptyAndCompletedToSkus([]);return t.buildHeader(n,r,o)}))}},{key:"addEmptyAndCompletedToSkus",value:function(t){return t&&((t=t.map(function(t){return t.name})).unshift(s.a.NOT_EMPTY_CHAR),t.unshift("")),t||[]}},{key:"buildHeader",value:function(t,e,n){return console.log(t),[{field:"year",headerName:"Vehicle Year"},{field:"make",headerName:"Vehicle Make"},{field:"model",headerName:"Vehicle Model"},{field:"highLowBeam",headerName:"High and LOW beam",cellEditor:"selectEditor",cellEditorParams:{elements:t.filter(function(t){return e.includes(t)})}},{field:"highBeam",headerName:"High beam",cellEditor:"selectEditor",cellEditorParams:{elements:t}},{field:"lowBeam",headerName:"Low beam",cellEditor:"selectEditor",cellEditorParams:{elements:e}},{field:"fogLight",headerName:"Fog light",cellEditor:"selectEditor",cellEditorParams:{elements:n}}]}},{key:"getRows",value:function(t){var e=Object.keys(t.request.filterModel).map(function(e){return{name:e,value:t.request.filterModel[e].filter}}),n=JSON.stringify(e),r=(new a.c).set("start",t.request.startRow.toString()).set("end",t.request.endRow.toString()).set("filter",n).set("sortBy",t.request.sortModel[0]?t.request.sortModel[0].colId:"").set("sortDirection",t.request.sortModel[0]?t.request.sortModel[0].sort:"");this.httpService.getWithAuth(i.a.routes.vehicles,{params:r}).subscribe(function(e){if(e.status){t.successCallback(e.data,e.total);var n=[];t.columnApi.getAllColumns().forEach(function(t){n.push(t.colId)}),t.columnApi.autoSizeColumns(n,!1)}else t.failCallback()},function(e){t.failCallback()})}},{key:"addRow",value:function(t){return this.httpService.postWithAuth(i.a.routes.vehicles,t)}},{key:"updateCell",value:function(t){return this.httpService.putWithAuth(i.a.routes.vehicles,t).toPromise()}},{key:"deleteRow",value:function(t){return this.httpService.deleteWithAuth(i.a.routes.vehicles+"/"+t)}},{key:"getYear",value:function(){return this.httpService.get(i.a.routes.year)}},{key:"getMake",value:function(t){return this.httpService.get(i.a.routes.make,{params:(new a.c).set("year",t)}).toPromise()}},{key:"getModel",value:function(t,e){return this.httpService.get(i.a.routes.model,{params:(new a.c).set("year",t).set("make",e)}).toPromise()}}]),e}();return e.\u0275fac=function(t){return new(t||e)(c.Vb(l.a),c.Vb(d.a))},e.\u0275prov=c.Hb({token:e,factory:e.\u0275fac,providedIn:"root"}),e}()},mrSG:function(t,e,n){"use strict";function r(t,e,n,r){return new(n||(n=Promise))(function(o,i){function a(t){try{s(r.next(t))}catch(e){i(e)}}function u(t){try{s(r.throw(t))}catch(e){i(e)}}function s(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n(function(t){t(e)})).then(a,u)}s((r=r.apply(t,e||[])).next())})}n.d(e,"a",function(){return r})},vasV:function(e,r,o){"use strict";o.r(r),o.d(r,"ExportQueueModule",function(){return N});var i=o("tyNb"),a=o("mrSG"),u=o("vkgz"),s=o("cp0P"),c=o("3Pt+"),l=o("GGDx"),d=o("r4zg"),f=o("fXoL"),h=o("ofXK"),p=o("bTqV");function m(t,e){if(1&t){var n=f.Sb();f.Rb(0,"button",2),f.Yb("click",function(){return f.oc(n),f.cc().onClick(2)}),f.xc(1,"Queue"),f.Qb()}}function b(t,e){if(1&t){var n=f.Sb();f.Rb(0,"button",3),f.Yb("click",function(){return f.oc(n),f.cc().onClick(1)}),f.xc(1,"UnQueue"),f.Qb()}}var v,g=((v=function(){function e(){t(this,e)}return n(e,[{key:"agInit",value:function(t){this.params=t,this.value=+this.params.value}},{key:"onClick",value:function(t){this.value=t,this.params.node.setDataValue(this.params.colDef,this.value)}},{key:"refresh",value:function(t){return!0}}]),e}()).\u0275fac=function(t){return new(t||v)},v.\u0275cmp=f.Fb({type:v,selectors:[["ct-order-status-button"]],decls:2,vars:2,consts:[["mat-flat-button","","color","primary",3,"click",4,"ngIf"],["mat-flat-button","","color","warn",3,"click",4,"ngIf"],["mat-flat-button","","color","primary",3,"click"],["mat-flat-button","","color","warn",3,"click"]],template:function(t,e){1&t&&(f.wc(0,m,2,0,"button",0),f.wc(1,b,2,0,"button",1)),2&t&&(f.hc("ngIf",1==e.value),f.Ab(1),f.hc("ngIf",2==e.value))},directives:[h.k,p.a],styles:["button[_ngcontent-%COMP%] {\n            font-size: 12px !important;\n            height: 24px !important;\n            padding: 2px !important;\n            line-height: 12px !important;\n        }"]}),v),k=o("MOE4"),y=o("0IaG"),w=o("u47x"),S=o("A9p3"),R=o("3LUQ"),A=o("Wp6s"),C=o("kmnG"),x=o("qFsG"),M=o("iadO"),E=o("STbY"),O=o("NFeN"),D=o("Qu3c"),Q=o("cWTo");function P(t,e){if(1&t&&(f.Rb(0,"div",15),f.Mb(1,"ag-grid-angular",16),f.Qb()),2&t){var n=f.cc();f.Ab(1),f.hc("gridOptions",n.options)("modules",n.modules)("rowData",n.rowData)}}var _,F,T=((_=function(){function e(n,r,o,i,a){var u=this;t(this,e),this.ordersService=n,this.dialog=r,this._focusMonitor=o,this.confirmService=i,this.alertService=a,this.orderDateForm=new c.f({orderDate:new c.d(d.a.now())}),this.orderStatus=0,this.rowData=[],this.modules=[],this.loadHeaders().subscribe(function(t){u.setupOptions()},function(t){console.log(t),u.onError("Could not load grid info")})}return n(e,[{key:"onGridReady",value:function(t){this.gridApi=t.api,this.gridColumnApi=t.columnApi,this.listenToOrderDateForm(),this.refresh()}},{key:"listenToOrderDateForm",value:function(){var t=this;this.orderDateForm.valueChanges.subscribe(function(e){t.gridApi.onFilterChanged()})}},{key:"loadHeaders",value:function(){var t=this;return this.ordersService.getHeader().pipe(Object(u.a)(function(e){t.columns=e,t.columns[0].hide=!1,t.columns[0].editable=!0,t.columns[0].valueSetter=t.setValue.bind(t),t.columns[0].cellRenderer="QueueButtonRenderer"}))}},{key:"setupOptions",value:function(){this.options={pagination:!1,tooltipShowDelay:0,defaultColDef:{sortable:!0,filter:!1,tooltipComponent:"tooltipRenderer",filterParams:{filterOptions:["contains"],defaultOption:"contains",suppressAndOrCondition:!0},resizable:!0,editable:!1},animateRows:!0,rowSelection:"single",columnDefs:this.columns,onGridReady:this.onGridReady.bind(this),paginationAutoPageSize:!1,doesExternalFilterPass:this.filterRows.bind(this),isExternalFilterPresent:this.isExternalFilterPresent.bind(this),frameworkComponents:{tooltipRenderer:l.a,QueueButtonRenderer:g}}}},{key:"refresh",value:function(){0===this.orderStatus?this.loadBoth():this.loadOne()}},{key:"loadBoth",value:function(){var t=this;Object(s.a)([this.ordersService.getQueueOrders(d.a.orderStatus.ORDER_ACTIVE),this.ordersService.getQueueOrders(d.a.orderStatus.ORDER_QUEUED)]).subscribe(function(e){e[0].status&&e[1].status?(t.gridApi.setRowData(e[0].data.concat(e[1].data)),t.setAutoSize()):t.onError("Couldn't load the data")},function(e){t.onError(e.message)})}},{key:"loadOne",value:function(){var t=this;this.ordersService.getQueueOrders(this.orderStatus).subscribe(function(e){e.status?(t.gridApi.setRowData(e.data),t.setAutoSize()):t.onError("Couldn't load the data")},function(e){t.onError(e.message)})}},{key:"setAutoSize",value:function(){var t,e,n=[];null===(t=this.gridColumnApi.getAllColumns())||void 0===t||t.forEach(function(t){n.push(t.colId)}),null===(e=this.gridColumnApi)||void 0===e||e.autoSizeColumns(n,!1)}},{key:"setValue",value:function(t){return Object(a.a)(this,void 0,void 0,regeneratorRuntime.mark(function e(){var n,r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n={id:t.data.id,name:t.colDef.field,value:t.newValue},console.log(n),t.data[t.colDef.field]=t.newValue,e.next=4,this.ordersService.updateCell(n);case 4:return r=e.sent,e.abrupt("return",((r.status?this.onSuccess.bind(this):this.onError.bind(this))(r.message),r.status));case 6:case"end":return e.stop()}},e,this)}))}},{key:"autoFocusNext",value:function(t,e){!t.errors&&e&&this._focusMonitor.focusVia(e,"program")}},{key:"autoFocusPrev",value:function(t,e){t.value.length<1&&this._focusMonitor.focusVia(e,"program")}},{key:"noRowSelected",value:function(){var t=this.gridApi?this.gridApi.getSelectedNodes():null;return!t||0===t.length}},{key:"onSuccess",value:function(t){this.alertService.alertSuccess(t)}},{key:"onError",value:function(t){this.alertService.alertError(t)}},{key:"queueAll",value:function(){var t=this;this.confirmService.requestConfirmation("Queue all orders","Are you sure you want to add all the visible orders to the export queue.").subscribe(function(e){e&&t.updateAllRows(d.a.orderStatus.ORDER_QUEUED)})}},{key:"unQueueAll",value:function(){var t=this;this.confirmService.requestConfirmation("UnQueue all orders","Are you sure you want to remove all the visible orders from the export queue.").subscribe(function(e){e&&t.updateAllRows(d.a.orderStatus.ORDER_ACTIVE)})}},{key:"updateAllRows",value:function(t){var e,n=this;e=[],this.gridApi.forEachNode(function(t){e.push(t.data.id)}),0!==e.length?this.ordersService.queueAll({value:t,data:e}).subscribe(function(t){t.status?(n.refresh(),n.onSuccess(t.message)):(n.refresh(),n.onError(t.message))},function(t){n.onError(t.message)}):this.onError("Nothing to queue")}},{key:"isExternalFilterPresent",value:function(){return null!=this.orderDateForm.value.orderDate}},{key:"filterRows",value:function(t){return this.filterByDate(t.data.lastModification,this.orderDateForm.value.orderDate)}},{key:"filterByDate",value:function(t,e){return t.includes(d.a.toMysqlDate(e))}},{key:"clearFilters",value:function(){this.orderDateForm.reset({orderDate:null}),this.orderStatus=0,this.gridApi.setFilterModel({}),this.refresh()}}]),e}()).\u0275fac=function(t){return new(t||_)(f.Lb(k.a),f.Lb(y.b),f.Lb(w.h),f.Lb(S.a),f.Lb(R.a))},_.\u0275cmp=f.Fb({type:_,selectors:[["ct-order-list"]],decls:36,vars:6,consts:[[1,"ct-toolbar","mat-elevation-z1"],["mat-flat-button","","color","primary",1,"ct-toolbar-btn",3,"click"],["mat-flat-button","","color","warn",1,"ct-toolbar-btn",3,"click"],[1,"ct-spacer"],[3,"formGroup"],[1,"ct-order-date"],["matInput","","formControlName","orderDate",3,"matDatepicker"],["matSuffix","",3,"for"],["picker",""],["mat-icon-button","",1,"ct-filter",3,"color","matMenuTriggerFor"],["mat-icon-button","","matTooltip","Refresh",3,"click"],["menu","matMenu"],["mat-menu-item","",3,"click"],["mat-icon-button","","matTooltip","Reset Filters","color","accent",3,"click"],["class","ct-table-wrapper",4,"ngIf"],[1,"ct-table-wrapper"],[1,"ag-theme-balham",3,"gridOptions","modules","rowData"]],template:function(t,e){if(1&t&&(f.Rb(0,"mat-card",0),f.Rb(1,"div"),f.Rb(2,"button",1),f.Yb("click",function(){return e.queueAll()}),f.xc(3," Queue All "),f.Qb(),f.Rb(4,"button",2),f.Yb("click",function(){return e.unQueueAll()}),f.xc(5," UnQueue All "),f.Qb(),f.Qb(),f.Mb(6,"span",3),f.Rb(7,"div",4),f.Rb(8,"mat-form-field",5),f.Rb(9,"mat-label"),f.xc(10,"Choose a date"),f.Qb(),f.Mb(11,"input",6),f.Mb(12,"mat-datepicker-toggle",7),f.Mb(13,"mat-datepicker",null,8),f.Qb(),f.Qb(),f.Rb(15,"button",9),f.Rb(16,"mat-icon"),f.xc(17,"filter_alt"),f.Qb(),f.Qb(),f.Rb(18,"button",10),f.Yb("click",function(){return e.refresh()}),f.Rb(19,"mat-icon"),f.xc(20,"refresh"),f.Qb(),f.Qb(),f.Rb(21,"mat-menu",null,11),f.Rb(23,"button",12),f.Yb("click",function(){return e.orderStatus=0,e.refresh()}),f.Rb(24,"span"),f.xc(25,"Both"),f.Qb(),f.Qb(),f.Rb(26,"button",12),f.Yb("click",function(){return e.orderStatus=1,e.refresh()}),f.Rb(27,"span"),f.xc(28,"Pending"),f.Qb(),f.Qb(),f.Rb(29,"button",12),f.Yb("click",function(){return e.orderStatus=2,e.refresh()}),f.Rb(30,"span"),f.xc(31,"Queued"),f.Qb(),f.Qb(),f.Qb(),f.Rb(32,"button",13),f.Yb("click",function(){return e.clearFilters()}),f.Rb(33,"mat-icon"),f.xc(34," cancel "),f.Qb(),f.Qb(),f.Qb(),f.wc(35,P,2,3,"div",14)),2&t){var n=f.mc(14),r=f.mc(22);f.Ab(7),f.hc("formGroup",e.orderDateForm),f.Ab(4),f.hc("matDatepicker",n),f.Ab(1),f.hc("for",n),f.Ab(3),f.hc("color",0!=e.orderStatus?"primary":"")("matMenuTriggerFor",r),f.Ab(20),f.hc("ngIf",e.columns)}},directives:[A.a,p.a,c.m,c.g,C.c,C.f,x.b,c.c,M.d,c.l,c.e,M.f,C.h,M.c,E.d,O.a,D.a,E.a,E.b,h.k,Q.a],styles:[".ct-toolbar[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;width:100%;padding:0!important;margin:0!important}.ct-spacer[_ngcontent-%COMP%]{flex:1 1 auto}.mat-menu-item[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{margin-right:0!important}.ct-table-wrapper[_ngcontent-%COMP%]{width:100%;display:flex;position:relative}.ct-table-wrapper[_ngcontent-%COMP%]   ag-grid-angular[_ngcontent-%COMP%]{display:inline-block;flex:1 1 auto;height:calc(100vh - 118px)}.ct-table-wrapper[_ngcontent-%COMP%]   .ct-next-button[_ngcontent-%COMP%]{align-self:center}.ct-toolbar-btn[_ngcontent-%COMP%]{margin:4px;font-size:12px!important;height:24px!important;padding:2px 4px!important;line-height:12px!important}button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px!important}.ct-order-date[_ngcontent-%COMP%]{height:36px;font-size:12px}"]}),_),q=o("PCNd"),I=o("vvyD"),N=((F=function e(){t(this,e)}).\u0275mod=f.Jb({type:F}),F.\u0275inj=f.Ib({factory:function(t){return new(t||F)},imports:[[h.c,q.a,Q.b.withComponents(),I.a,c.h,c.q,i.e.forChild([{path:"",component:T,pathMatch:"full"}])]]}),F)}}])}();