(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{AZnH:function(e,t,r){"use strict";r.r(t),r.d(t,"ExportModule",function(){return A});var a=r("tyNb"),o=r("3Pt+"),i=r("Iab2"),n=r("r4zg"),s=r("vkgz"),l=r("GGDx"),d=r("fXoL"),c=r("MOE4"),u=r("0IaG"),p=r("u47x"),h=r("A9p3"),m=r("3LUQ"),f=r("Wp6s"),b=r("kmnG"),g=r("iadO"),v=r("ofXK"),w=r("d3UM"),y=r("FKr1"),D=r("bTqV"),x=r("NFeN"),R=r("cWTo");function C(e,t){1&e&&(d.Rb(0,"mat-error"),d.xc(1," You must select a valid range. "),d.Qb())}function E(e,t){1&e&&(d.Rb(0,"mat-error"),d.xc(1," You must select a type. "),d.Qb())}function S(e,t){if(1&e&&(d.Rb(0,"div",15),d.Mb(1,"ag-grid-angular",16),d.Qb()),2&e){const e=d.cc();d.Ab(1),d.hc("gridOptions",e.options)("modules",e.modules)("rowData",e.rowData)}}let M=(()=>{class e{constructor(e,t,r,a,i){this.ordersService=e,this.dialog=t,this._focusMonitor=r,this.confirmService=a,this.alertService=i,this.orderStatus=2,this.rowData=[],this.modules=[],this.currentFileParams={},this.orderDateRange=new o.f({startDate:new o.d(n.a.now(),o.s.required),endDate:new o.d(n.a.now(),o.s.required),type:new o.d("carifix",o.s.required)}),this.loadHeaders().subscribe(e=>{this.setupOptions()},e=>{console.log(e),this.onError("Could not load grid info")})}exportOrders(){let e;e=[],this.gridApi.forEachNode(t=>{e.push(t.data)}),0!==e.length?(this.currentFileParams.data=e,this.confirmService.requestConfirmation("Export Confirmation","All the visible orders will be achieved automatically, Would you like to proceed ?").subscribe(e=>{e&&this.ordersService.exportOrders(this.currentFileParams).subscribe(e=>{this.saveAsExcelFile(e.body,e.headers.get("x-file-name")||""),this.refresh()})})):this.onError("Nothing to export")}ordersLinkedToFiles(e){return e.some(e=>null!=e.EXPORT_FILE)}getFormattedDates(){const e=this.orderDateRange.value,t=e.startDate,r=e.endDate;return t.startOf("day"),r.endOf("day"),{formattedStart:n.a.formatDate(t),formattedEnd:n.a.formatDate(r)}}saveAsExcelFile(e,t){const r=new Blob([e],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});i.saveAs(r,t)}onGridReady(e){this.gridApi=e.api,this.gridColumnApi=e.columnApi,this.listenToOrderDateForm(),this.refresh()}listenToOrderDateForm(){this.orderDateRange.valid&&this.orderDateRange.valueChanges.subscribe(e=>{this.refresh()})}loadHeaders(){return this.ordersService.getHeader().pipe(Object(s.a)(e=>{this.columns=e}))}setupOptions(){this.options={pagination:!1,tooltipShowDelay:0,defaultColDef:{sortable:!0,filter:!1,tooltipComponent:"tooltipRenderer",filterParams:{filterOptions:["contains"],defaultOption:"contains",suppressAndOrCondition:!0},resizable:!0,editable:!1},animateRows:!0,rowSelection:"single",columnDefs:this.columns,onGridReady:this.onGridReady.bind(this),paginationAutoPageSize:!1,frameworkComponents:{tooltipRenderer:l.a}}}refresh(){if(this.orderDateRange.valid){const e=this.getFormattedDates();this.ordersService.loadOrdersByRange(e.formattedStart,e.formattedEnd,this.orderDateRange.value.type).subscribe(t=>{t.status?(this.rowData=t.data,this.currentFileParams={startDate:e.formattedStart,endDate:e.formattedEnd,type:this.orderDateRange.value.type}):this.onError("Couldn't load the data")},e=>{this.onError(e.message)})}}onSuccess(e){this.alertService.alertSuccess(e)}onError(e){this.alertService.alertError(e)}clearFilters(){this.orderDateRange.reset({orderDate:null}),this.gridApi.setFilterModel({}),this.refresh()}}return e.\u0275fac=function(t){return new(t||e)(d.Lb(c.a),d.Lb(u.b),d.Lb(p.h),d.Lb(h.a),d.Lb(m.a))},e.\u0275cmp=d.Fb({type:e,selectors:[["ct-export"]],decls:25,vars:6,consts:[[1,"ct-toolbar","mat-elevation-z1"],[3,"formGroup"],[1,"ct-order-date"],[3,"rangePicker"],["matStartDate","","formControlName","startDate","placeholder","Start date"],["matEndDate","","formControlName","endDate","placeholder","End date"],["matSuffix","",3,"for"],["datePicker",""],[4,"ngIf"],[1,"ct-order-type"],["formControlName","type"],["value","carifix"],["value","non-carifix"],["mat-icon-button","","type","button","color","primary",3,"click"],["class","ct-table-wrapper",4,"ngIf"],[1,"ct-table-wrapper"],[1,"ag-theme-balham",3,"gridOptions","modules","rowData"]],template:function(e,t){if(1&e&&(d.Rb(0,"mat-card",0),d.Rb(1,"div",1),d.Rb(2,"mat-form-field",2),d.Rb(3,"mat-label"),d.xc(4,"Enter a date range"),d.Qb(),d.Rb(5,"mat-date-range-input",3),d.Mb(6,"input",4),d.Mb(7,"input",5),d.Qb(),d.Mb(8,"mat-datepicker-toggle",6),d.Mb(9,"mat-date-range-picker",null,7),d.wc(11,C,2,0,"mat-error",8),d.Qb(),d.Rb(12,"mat-form-field",9),d.Rb(13,"mat-label"),d.xc(14,"Select orders type"),d.Qb(),d.Rb(15,"mat-select",10),d.Rb(16,"mat-option",11),d.xc(17,"CariFix"),d.Qb(),d.Rb(18,"mat-option",12),d.xc(19,"Non CariFix"),d.Qb(),d.Qb(),d.wc(20,E,2,0,"mat-error",8),d.Qb(),d.Rb(21,"button",13),d.Yb("click",function(){return t.exportOrders()}),d.Rb(22,"mat-icon"),d.xc(23,"get_app"),d.Qb(),d.Qb(),d.Qb(),d.Qb(),d.wc(24,S,2,3,"div",14)),2&e){const e=d.mc(10);d.Ab(1),d.hc("formGroup",t.orderDateRange),d.Ab(4),d.hc("rangePicker",e),d.Ab(3),d.hc("for",e),d.Ab(3),d.hc("ngIf",t.orderDateRange.controls.startDate.hasError("required")||t.orderDateRange.controls.endDate.hasError("required")),d.Ab(9),d.hc("ngIf",t.orderDateRange.controls.type.hasError("required")),d.Ab(4),d.hc("ngIf",t.columns)}},directives:[f.a,o.m,o.g,b.c,b.f,g.a,g.h,o.c,o.l,o.e,g.g,g.f,b.h,g.b,v.k,w.a,y.k,D.a,x.a,b.b,R.a],styles:[".ct-toolbar[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;width:100%;padding:0!important;margin:0!important}.ct-spacer[_ngcontent-%COMP%]{flex:1 1 auto}.ct-table-wrapper[_ngcontent-%COMP%]{width:100%;display:flex;position:relative}.ct-table-wrapper[_ngcontent-%COMP%]   ag-grid-angular[_ngcontent-%COMP%]{display:inline-block;flex:1 1 auto;height:calc(100vh - 148px)}button[_ngcontent-%COMP%]{height:36px!important}button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px!important}.ct-order-date[_ngcontent-%COMP%]{height:36px;font-size:12px}mat-form-field[_ngcontent-%COMP%]{margin:4px}"]}),e})();var O=r("PCNd"),k=r("vvyD");let A=(()=>{class e{}return e.\u0275mod=d.Jb({type:e}),e.\u0275inj=d.Ib({factory:function(t){return new(t||e)},imports:[[v.c,O.a,R.b.withComponents(),k.a,o.h,o.q,a.e.forChild([{path:"",component:M,pathMatch:"full"}])]]}),e})()},GGDx:function(e,t,r){"use strict";r.d(t,"a",function(){return i});var a=r("r4zg"),o=r("fXoL");let i=(()=>{class e{agInit(e){this.data=e.api.getDisplayedRowAtIndex(e.rowIndex).data}parseDate(){return a.a.fromMysqlDateTime(this.data.lastModification).format("YYYY-MM-DD HH:mm:ss")}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=o.Fb({type:e,selectors:[["tooltip-component"]],decls:3,vars:1,consts:[[1,"tooltip"]],template:function(e,t){1&e&&(o.Rb(0,"div",0),o.Rb(1,"p"),o.xc(2),o.Qb(),o.Qb()),2&e&&(o.Ab(2),o.zc(" ",t.parseDate()," "))},styles:["[_nghost-%COMP%] {\n                position: absolute;\n                width: 150px;\n                height: 70px;\n                pointer-events: none;\n                transition: opacity 1s;\n            }\n\n            .ag-tooltip-hiding[_nghost-%COMP%] {\n                opacity: 0;\n            }\n\n            .tooltip[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n                margin: 5px;\n                padding: 8px;\n                background: rgba(0, 0, 0, 0.9);\n                color: #eeeeee;\n                white-space: nowrap;\n            }"]}),e})()},PAny:function(e,t,r){"use strict";r.d(t,"a",function(){return c});var a=r("AytR"),o=r("tk/3"),i=r("lJxs"),n=r("r4zg"),s=r("fXoL"),l=r("N+K7"),d=r("As+J");let c=(()=>{class e{constructor(e,t){this.httpService=e,this.skusService=t}getSKUs(){return this.skusService.getSkus().pipe(Object(i.a)(e=>{const t=e.data.reduce((e,t)=>{const r=e[t.skuType]||[];return r.push(t),e[t.skuType]=r,e},{});return Object.keys(t).reduce((e,r)=>(e[r]=this.addEmptyAndCompletedToSkus(t[r]),e),{})}))}getHeader(){return this.getSKUs().pipe(Object(i.a)(e=>{const t=e.HIGH_BEAM||this.addEmptyAndCompletedToSkus([]),r=e.LOW_BEAM||this.addEmptyAndCompletedToSkus([]),a=e.FOG_LIGHT||this.addEmptyAndCompletedToSkus([]);return this.buildHeader(t,r,a)}))}addEmptyAndCompletedToSkus(e){return e&&((e=e.map(e=>e.name)).unshift(n.a.NOT_EMPTY_CHAR),e.unshift("")),e||[]}buildHeader(e,t,r){return console.log(e),[{field:"year",headerName:"Vehicle Year"},{field:"make",headerName:"Vehicle Make"},{field:"model",headerName:"Vehicle Model"},{field:"highLowBeam",headerName:"High and LOW beam",cellEditor:"selectEditor",cellEditorParams:{elements:e.filter(e=>t.includes(e))}},{field:"highBeam",headerName:"High beam",cellEditor:"selectEditor",cellEditorParams:{elements:e}},{field:"lowBeam",headerName:"Low beam",cellEditor:"selectEditor",cellEditorParams:{elements:t}},{field:"fogLight",headerName:"Fog light",cellEditor:"selectEditor",cellEditorParams:{elements:r}}]}getRows(e){const t=Object.keys(e.request.filterModel).map(t=>({name:t,value:e.request.filterModel[t].filter})),r=JSON.stringify(t),i=(new o.c).set("start",e.request.startRow.toString()).set("end",e.request.endRow.toString()).set("filter",r).set("sortBy",e.request.sortModel[0]?e.request.sortModel[0].colId:"").set("sortDirection",e.request.sortModel[0]?e.request.sortModel[0].sort:"");this.httpService.getWithAuth(a.a.routes.vehicles,{params:i}).subscribe(t=>{if(t.status){e.successCallback(t.data,t.total);const r=[];e.columnApi.getAllColumns().forEach(e=>{r.push(e.colId)}),e.columnApi.autoSizeColumns(r,!1)}else e.failCallback()},t=>{e.failCallback()})}addRow(e){return this.httpService.postWithAuth(a.a.routes.vehicles,e)}updateCell(e){return this.httpService.putWithAuth(a.a.routes.vehicles,e).toPromise()}deleteRow(e){return this.httpService.deleteWithAuth(a.a.routes.vehicles+"/"+e)}getYear(){return this.httpService.get(a.a.routes.year)}getMake(e){return this.httpService.get(a.a.routes.make,{params:(new o.c).set("year",e)}).toPromise()}getModel(e,t){return this.httpService.get(a.a.routes.model,{params:(new o.c).set("year",e).set("make",t)}).toPromise()}}return e.\u0275fac=function(t){return new(t||e)(s.Vb(l.a),s.Vb(d.a))},e.\u0275prov=s.Hb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);