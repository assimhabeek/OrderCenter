(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{MOE4:function(e,t,r){"use strict";r.d(t,"a",function(){return c});var n=r("AytR"),i=r("tk/3"),s=r("lJxs"),a=r("r4zg"),o=r("fXoL"),l=r("N+K7"),d=r("As+J");let c=(()=>{class e{constructor(e,t){this.httpService=e,this.skusService=t}getSKUs(){return this.skusService.getSkus().pipe(Object(s.a)(e=>{const t=e.data.reduce((e,t)=>{const r=e[t.skuType]||[];return r.push(t),e[t.skuType]=r,e},{});return Object.keys(t).reduce((e,r)=>(e[r]=this.addEmptyAndCompletedToSkus(t[r]),e),{})}))}getHeader(){return this.getSKUs().pipe(Object(s.a)(e=>{const t=e.HIGH_BEAM||this.addEmptyAndCompletedToSkus([]),r=e.LOW_BEAM||this.addEmptyAndCompletedToSkus([]),n=e.FOG_LIGHT||this.addEmptyAndCompletedToSkus([]),i=e.HB_CAN_BUS||this.addEmptyAndCompletedToSkus([]),s=e.LB_CAN_BUS||this.addEmptyAndCompletedToSkus([]);return this.buildHeader(t,r,n,i,s)}))}addEmptyAndCompletedToSkus(e){return e&&((e=e.map(e=>e.name)).unshift(a.a.NOT_EMPTY_CHAR),e.unshift("")),e||[]}buildHeader(e,t,r,n,i){return[{field:"orderStatus",pinned:"left",hide:!0,filter:"agNumberColumnFilter",headerName:" "},{field:"orderNo",pinned:"left",headerName:"Order No"},{field:"orderDate",headerName:"Order date",cellStyle:{"background-color":"rgba(60,60,60,0.3)"},editable:!1},{field:"quantity",headerName:"Quantity",type:"numericColumn"},{field:"productName",headerName:"Product name"},{field:"bulbType",headerName:"Bulb type",width:100},{field:"bulbTypeFogLight",headerName:"bulb Type Fog Light",width:100},{field:"highBeam",headerName:"High beam",width:100,cellEditor:"selectEditor",cellEditorParams:{elements:e}},{field:"lowBeam",headerName:"Low beam",cellEditor:"selectEditor",width:100,cellEditorParams:{elements:t}},{field:"fogLight",headerName:"Fog light",cellEditor:"selectEditor",width:100,cellEditorParams:{elements:r}},{field:"hbCanBus",headerName:"Hb can bus",width:100,cellEditor:"selectEditor",cellEditorParams:{elements:n}},{field:"lbCanBus",headerName:"Lb can bus",width:100,cellEditor:"selectEditor",cellEditorParams:{elements:i}},{field:"vehicle",headerName:"Customer year/make/model input",editable:!1},{field:"detectedVehicle",headerName:"Detected year/make/model",editable:!1},{field:"orderNotes",headerName:"Order notes"},{field:"orderNotes",headerName:"Order notes"},{field:"additionalDetails",headerName:"Additional details"},{field:"shippingName",headerName:"Shipping name"},{field:"shippingAddress1",headerName:"Shipping address1"},{field:"address2",headerName:"Address2"},{field:"shippingCity",headerName:"Shipping city"},{field:"shippingZip",headerName:"Shipping zip"},{field:"shippingProvince",headerName:"Shipping province"},{field:"shippingCountryCode",headerName:"Shipping country code"},{field:"shippingCountry",headerName:"Shipping country"},{field:"shippingPhone",headerName:"Shipping phone"},{field:"shippingCompany",headerName:"Shipping company"},{field:"lastModification",headerName:"Last modification",tooltipField:"lastModification",valueSetter:e=>(e.data.lastModification=e.newValue,!0),cellRenderer:e=>a.a.fromMysqlDateTime(e.value).fromNow(),cellStyle:{"background-color":"rgba(60,60,60,0.3)"},editable:!1,filter:!1},{field:"modifiedBy",cellStyle:{"background-color":"rgba(60,60,60,0.3)"},headerName:"Modified by",editable:!1},{field:"completed",hide:!0}]}getQueueOrders(e){const t=JSON.stringify([{name:"completed",value:"completed"},{name:"orderStatus",value:e}]);return this.httpService.getWithAuth(n.a.routes.orders,{params:(new i.c).set("filter",t)})}getRows(e){const t=Object.keys(e.request.filterModel).map(t=>({name:t,value:e.request.filterModel[t].filter})),r=JSON.stringify(t),s=(new i.c).set("start",e.request.startRow.toString()).set("end",e.request.endRow.toString()).set("filter",r).set("sortBy",e.request.sortModel[0]?e.request.sortModel[0].colId:"").set("sortDirection",e.request.sortModel[0]?e.request.sortModel[0].sort:"");this.httpService.getWithAuth(n.a.routes.orders,{params:s}).subscribe(t=>{var r;if(!0===t.status){e.success({rowData:t.data,rowCount:t.total});const n=null===(r=e.columnApi.getAllColumns())||void 0===r?void 0:r.filter(e=>!e.colDef.width).map(e=>e.colId);e.columnApi.autoSizeColumns(n,!0)}else e.fail()},()=>{e.fail()})}addRow(e){return this.httpService.postWithAuth(n.a.routes.orders,e)}addAll(e){return this.httpService.postWithAuth(n.a.routes.ordersAll,e)}updateCell(e){return this.httpService.putWithAuth(n.a.routes.orders,e).toPromise()}queueAll(e){return this.httpService.putWithAuth(n.a.routes.ordersQueueAll,e)}deleteRow(e){return this.httpService.deleteWithAuth(n.a.routes.orders+"/"+e)}loadOrdersByRange(e,t,r){const s=(new i.c).set("start",e).set("end",t).set("type",r);return this.httpService.getWithAuth(n.a.routes.ordersQueuedRange,{params:s})}exportOrders(e){return this.httpService.postWithAuth(n.a.routes.exportOrders,e,{responseType:"blob",observe:"response"})}}return e.\u0275fac=function(t){return new(t||e)(o.Ub(l.a),o.Ub(d.a))},e.\u0275prov=o.Hb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},PAny:function(e,t,r){"use strict";r.d(t,"a",function(){return c});var n=r("AytR"),i=r("tk/3"),s=r("lJxs"),a=r("r4zg"),o=r("fXoL"),l=r("N+K7"),d=r("As+J");let c=(()=>{class e{constructor(e,t){this.httpService=e,this.skusService=t}getSKUs(){return this.skusService.getSkus().pipe(Object(s.a)(e=>{const t=e.data.reduce((e,t)=>{const r=e[t.skuType]||[];return r.push(t),e[t.skuType]=r,e},{});return Object.keys(t).reduce((e,r)=>(e[r]=this.addEmptyAndCompletedToSkus(t[r]),e),{})}))}getHeader(){return this.getSKUs().pipe(Object(s.a)(e=>{const t=e.HIGH_BEAM||this.addEmptyAndCompletedToSkus([]),r=e.LOW_BEAM||this.addEmptyAndCompletedToSkus([]),n=e.FOG_LIGHT||this.addEmptyAndCompletedToSkus([]);return this.buildHeader(t,r,n)}))}addEmptyAndCompletedToSkus(e){return e&&((e=e.map(e=>e.name)).unshift(a.a.NOT_EMPTY_CHAR),e.unshift("")),e||[]}buildHeader(e,t,r){return console.log(e),[{field:"year",headerName:"Vehicle Year"},{field:"make",headerName:"Vehicle Make"},{field:"model",headerName:"Vehicle Model"},{field:"highLowBeam",headerName:"High and LOW beam",cellEditor:"selectEditor",cellEditorParams:{elements:e.filter(e=>t.includes(e))}},{field:"highBeam",headerName:"High beam",cellEditor:"selectEditor",cellEditorParams:{elements:e}},{field:"lowBeam",headerName:"Low beam",cellEditor:"selectEditor",cellEditorParams:{elements:t}},{field:"fogLight",headerName:"Fog light",cellEditor:"selectEditor",cellEditorParams:{elements:r}}]}getRows(e){const t=Object.keys(e.request.filterModel).map(t=>({name:t,value:e.request.filterModel[t].filter})),r=JSON.stringify(t),s=(new i.c).set("start",e.request.startRow.toString()).set("end",e.request.endRow.toString()).set("filter",r).set("sortBy",e.request.sortModel[0]?e.request.sortModel[0].colId:"").set("sortDirection",e.request.sortModel[0]?e.request.sortModel[0].sort:"");this.httpService.getWithAuth(n.a.routes.vehicles,{params:s}).subscribe(t=>{var r;if(t.status){e.success({rowData:t.data,rowCount:t.total});const n=[];null===(r=e.columnApi.getAllColumns())||void 0===r||r.forEach(e=>{n.push(e.colId)}),e.columnApi.autoSizeColumns(n,!1)}else e.fail()},()=>{e.fail()})}addRow(e){return this.httpService.postWithAuth(n.a.routes.vehicles,e)}updateCell(e){return this.httpService.putWithAuth(n.a.routes.vehicles,e).toPromise()}deleteRow(e){return this.httpService.deleteWithAuth(n.a.routes.vehicles+"/"+e)}getYear(){return this.httpService.get(n.a.routes.year)}getMake(e){return this.httpService.get(n.a.routes.make,{params:(new i.c).set("year",e)}).toPromise()}getModel(e,t){return this.httpService.get(n.a.routes.model,{params:(new i.c).set("year",e).set("make",t)}).toPromise()}}return e.\u0275fac=function(t){return new(t||e)(o.Ub(l.a),o.Ub(d.a))},e.\u0275prov=o.Hb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},Raaw:function(e,t,r){"use strict";r.d(t,"a",function(){return p});var n=r("mrSG"),i=r("fXoL"),s=r("d3UM"),a=r("PAny"),o=r("Wp6s"),l=r("kmnG"),d=r("3Pt+"),c=r("ofXK"),u=r("FKr1");const h=["group"];function m(e,t){if(1&e&&(i.Qb(0,"mat-option",4),i.wc(1),i.Pb()),2&e){const e=t.$implicit;i.gc("value",e),i.Ab(1),i.yc(" ",e," ")}}let p=(()=>{class e{constructor(e){this.vehicleService=e,this.elements=[]}static preventDefaultAndPropagation(e){e.preventDefault(),e.stopPropagation()}agInit(e){return Object(n.a)(this,void 0,void 0,function*(){this.params=e,this.currentElement=this.params.value,yield this.getElement(e.requested),this.selectedIndex=this.elements.findIndex(e=>e===this.params.value)})}getElement(e){return Object(n.a)(this,void 0,void 0,function*(){const t=this.params.node.data.vehicleYear;if("make"===e)this.elements=yield this.vehicleService.getMake(t);else{const e=this.params.node.data.vehicleMake;this.elements=yield this.vehicleService.getModel(t,e)}})}ngAfterViewInit(){window.setTimeout(()=>{this.group.element.nativeElement.focus()}),this.selectCurrentElementBasedOnSelectedIndex()}getValue(){return this.currentElement}isPopup(){return!0}onKeyDown(t){const r=t.key;38!==r&&40!==r||(e.preventDefaultAndPropagation(t),38===r?this.selectedIndex=0===this.selectedIndex?this.elements.length-1:this.selectedIndex-1:40===r&&(this.selectedIndex=this.selectedIndex===this.elements.length-1?0:this.selectedIndex+1),this.selectCurrentElementBasedOnSelectedIndex())}selectCurrentElementBasedOnSelectedIndex(){this.currentElement=this.elements[this.selectedIndex]}}return e.\u0275fac=function(t){return new(t||e)(i.Lb(a.a))},e.\u0275cmp=i.Fb({type:e,selectors:[["ct-mat-select"]],viewQuery:function(e,t){if(1&e&&(i.zc(h,!0,i.Q),i.zc(s.a,!0)),2&e){let e;i.kc(e=i.Yb())&&(t.group=e.first),i.kc(e=i.Yb())&&(t.select=e.first)}},decls:6,vars:2,consts:[["tabindex","0",1,"container",3,"keydown"],["group",""],["panelClass","ag-custom-component-popup",3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],[3,"value"]],template:function(e,t){1&e&&(i.Qb(0,"mat-card"),i.Qb(1,"div",0,1),i.Xb("keydown",function(e){return t.onKeyDown(e)}),i.Qb(3,"mat-form-field"),i.Qb(4,"mat-select",2),i.Xb("ngModelChange",function(e){return t.currentElement=e}),i.vc(5,m,2,2,"mat-option",3),i.Pb(),i.Pb(),i.Pb(),i.Pb()),2&e&&(i.Ab(4),i.gc("ngModel",t.currentElement),i.Ab(1),i.gc("ngForOf",t.elements))},directives:[o.a,l.c,s.a,d.l,d.o,c.j,u.k],styles:["mat-form-field[_ngcontent-%COMP%] {\n            width: 100px;\n        }\n\n        .container[_ngcontent-%COMP%]:focus {\n            outline: none;\n        }"]}),e})()},sU9S:function(e,t,r){"use strict";r.d(t,"a",function(){return u});var n=r("fXoL"),i=r("d3UM"),s=r("kmnG"),a=r("3Pt+"),o=r("ofXK"),l=r("FKr1");const d=["group"];function c(e,t){if(1&e&&(n.Qb(0,"mat-option",4),n.wc(1),n.Pb()),2&e){const e=t.$implicit;n.gc("value",e),n.Ab(1),n.yc(" ",e," ")}}let u=(()=>{class e{agInit(e){this.params=e,this.currentElement=this.params.value,this.elements=this.params.elements,this.selectedIndex=Math.max(this.elements.findIndex(e=>e===this.params.value),0)}ngAfterViewInit(){window.setTimeout(()=>{this.group.element.nativeElement.focus()}),this.selectCurrentElementBasedOnSelectedIndex(),this.select.open(),this.select.focus({preventScroll:!1})}getValue(){return this.currentElement}isPopup(){return!0}onKeyDown(e){const t=e.which||e.keyCode;38!==t&&40!==t||(this.preventDefaultAndPropagation(e),this.select._handleKeydown(e),this.selectedIndex=Math.max(this.select._keyManager.activeItemIndex,0),this.selectCurrentElementBasedOnSelectedIndex())}preventDefaultAndPropagation(e){e.preventDefault(),e.stopPropagation()}selectCurrentElementBasedOnSelectedIndex(){this.currentElement=this.elements[this.selectedIndex]}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=n.Fb({type:e,selectors:[["ct-mat-select"]],viewQuery:function(e,t){if(1&e&&(n.zc(d,!0,n.Q),n.zc(i.a,!0)),2&e){let e;n.kc(e=n.Yb())&&(t.group=e.first),n.kc(e=n.Yb())&&(t.select=e.first)}},decls:5,vars:2,consts:[["tabindex","0",1,"container",3,"keydown"],["group",""],["panelClass","ag-custom-component-popup",3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],[3,"value"]],template:function(e,t){1&e&&(n.Qb(0,"div",0,1),n.Xb("keydown",function(e){return t.onKeyDown(e)}),n.Qb(2,"mat-form-field"),n.Qb(3,"mat-select",2),n.Xb("ngModelChange",function(e){return t.currentElement=e}),n.vc(4,c,2,2,"mat-option",3),n.Pb(),n.Pb(),n.Pb()),2&e&&(n.Ab(3),n.gc("ngModel",t.currentElement),n.Ab(1),n.gc("ngForOf",t.elements))},directives:[s.c,i.a,a.l,a.o,o.j,l.k],styles:["mat-form-field[_ngcontent-%COMP%] {\n            width: 100px;\n            margin: 0 !important;\n            padding: 0 !important;\n        }\n\n\n        .container[_ngcontent-%COMP%] {\n            margin: 0 !important;\n            padding: 0 !important;\n        }\n\n        .container[_ngcontent-%COMP%]:focus {\n            outline: none;\n        }"]}),e})()},tXqc:function(e,t,r){"use strict";r.d(t,"a",function(){return a});var n=r("fXoL"),i=r("bSwM"),s=r("3Pt+");let a=(()=>{class e{constructor(){this.checked=!1}agInit(e){this.params=e,this.checked=this.params.value}onChange(e){this.checked=e,this.params.node.setDataValue(this.params.colDef,this.checked),this.params.eGridCell&&this.params.eGridCell.focus()}refresh(){return!1}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=n.Fb({type:e,selectors:[["ct-checkbox-cell"]],decls:1,vars:1,consts:[[3,"ngModel","ngModelChange"]],template:function(e,t){1&e&&(n.Qb(0,"mat-checkbox",0),n.Xb("ngModelChange",function(e){return t.onChange(e)}),n.Pb()),2&e&&n.gc("ngModel",t.checked)},directives:[i.a,s.l,s.o],styles:[".mat-checkbox-layout {\n                \n                width: 100%;\n                display: inline-block !important;\n                text-align: center;\n                margin-top: -4px;\n                margin-left: 2px;\n                \n                \n                line-height: 36px;\n\n            }\n\n             \n            .mat-checkbox-layout .mat-ripple-element {\n                opacity: 0.2;\n            }"]}),e})()}}]);