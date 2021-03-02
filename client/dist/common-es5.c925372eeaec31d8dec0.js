!function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function n(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{MOE4:function(t,r,i){"use strict";i.d(r,"a",function(){return h});var a=i("AytR"),o=i("tk/3"),s=i("lJxs"),u=i("r4zg"),l=i("fXoL"),c=i("N+K7"),d=i("As+J"),h=function(){var t=function(){function t(n,r){e(this,t),this.httpService=n,this.skusService=r}return n(t,[{key:"getSKUs",value:function(){var e=this;return this.skusService.getSkus().pipe(Object(s.a)(function(t){var n=t.data.reduce(function(e,t){var n=e[t.skuType]||[];return n.push(t),e[t.skuType]=n,e},{});return Object.keys(n).reduce(function(t,r){return t[r]=e.addEmptyAndCompletedToSkus(n[r]),t},{})}))}},{key:"getHeader",value:function(){var e=this;return this.getSKUs().pipe(Object(s.a)(function(t){var n=t.HIGH_BEAM||e.addEmptyAndCompletedToSkus([]),r=t.LOW_BEAM||e.addEmptyAndCompletedToSkus([]),i=t.FOG_LIGHT||e.addEmptyAndCompletedToSkus([]),a=t.HB_CAN_BUS||e.addEmptyAndCompletedToSkus([]),o=t.LB_CAN_BUS||e.addEmptyAndCompletedToSkus([]);return e.buildHeader(n,r,i,a,o)}))}},{key:"addEmptyAndCompletedToSkus",value:function(e){return e&&((e=e.map(function(e){return e.name})).unshift(u.a.NOT_EMPTY_CHAR),e.unshift("")),e||[]}},{key:"buildHeader",value:function(e,t,n,r,i){return[{field:"orderStatus",pinned:"left",hide:!0,filter:"agNumberColumnFilter",headerName:" "},{field:"orderNo",pinned:"left",headerName:"Order No"},{field:"orderDate",headerName:"Order date",cellStyle:{"background-color":"rgba(60,60,60,0.3)"},editable:!1},{field:"quantity",headerName:"Quantity",type:"numericColumn"},{field:"productName",headerName:"Product name"},{field:"bulbType",headerName:"Bulb type",width:100},{field:"bulbTypeFogLight",headerName:"bulb Type Fog Light",width:100},{field:"highBeam",headerName:"High beam",width:100,cellEditor:"selectEditor",cellEditorParams:{elements:e}},{field:"lowBeam",headerName:"Low beam",cellEditor:"selectEditor",width:100,cellEditorParams:{elements:t}},{field:"fogLight",headerName:"Fog light",cellEditor:"selectEditor",width:100,cellEditorParams:{elements:n}},{field:"hbCanBus",headerName:"Hb can bus",width:100,cellEditor:"selectEditor",cellEditorParams:{elements:r}},{field:"lbCanBus",headerName:"Lb can bus",width:100,cellEditor:"selectEditor",cellEditorParams:{elements:i}},{field:"orderNotes",headerName:"Order notes"},{field:"additionalDetails",headerName:"Additional details"},{field:"shippingName",headerName:"Shipping name"},{field:"shippingAddress1",headerName:"Shipping address1"},{field:"address2",headerName:"Address2"},{field:"shippingCity",headerName:"Shipping city"},{field:"shippingZip",headerName:"Shipping zip"},{field:"shippingProvince",headerName:"Shipping province"},{field:"shippingCountryCode",headerName:"Shipping country code"},{field:"shippingCountry",headerName:"Shipping country"},{field:"shippingPhone",headerName:"Shipping phone"},{field:"shippingCompany",headerName:"Shipping company"},{field:"lastModification",headerName:"Last modification",tooltipField:"lastModification",valueSetter:function(e){return e.data.lastModification=e.newValue,!0},cellRenderer:function(e){return u.a.fromMysqlDateTime(e.value).fromNow()},cellStyle:{"background-color":"rgba(60,60,60,0.3)"},editable:!1,filter:!1},{field:"modifiedBy",cellStyle:{"background-color":"rgba(60,60,60,0.3)"},headerName:"Modified by",editable:!1},{field:"completed",hide:!0}]}},{key:"getQueueOrders",value:function(e){var t=JSON.stringify([{name:"completed",value:"completed"},{name:"orderStatus",value:e}]);return this.httpService.getWithAuth(a.a.routes.orders,{params:(new o.c).set("filter",t)})}},{key:"getRows",value:function(e){var t=Object.keys(e.request.filterModel).map(function(t){return{name:t,value:e.request.filterModel[t].filter}}),n=JSON.stringify(t),r=(new o.c).set("start",e.request.startRow.toString()).set("end",e.request.endRow.toString()).set("filter",n).set("sortBy",e.request.sortModel[0]?e.request.sortModel[0].colId:"").set("sortDirection",e.request.sortModel[0]?e.request.sortModel[0].sort:"");this.httpService.getWithAuth(a.a.routes.orders,{params:r}).subscribe(function(t){var n;if(!0===t.status){e.success({rowData:t.data,rowCount:t.total});var r=null===(n=e.columnApi.getAllColumns())||void 0===n?void 0:n.filter(function(e){return!e.colDef.width}).map(function(e){return e.colId});e.columnApi.autoSizeColumns(r,!0)}else e.fail()},function(){e.fail()})}},{key:"addRow",value:function(e){return this.httpService.postWithAuth(a.a.routes.orders,e)}},{key:"addAll",value:function(e){return this.httpService.postWithAuth(a.a.routes.ordersAll,e)}},{key:"updateCell",value:function(e){return this.httpService.putWithAuth(a.a.routes.orders,e).toPromise()}},{key:"queueAll",value:function(e){return this.httpService.putWithAuth(a.a.routes.ordersQueueAll,e)}},{key:"deleteRow",value:function(e){return this.httpService.deleteWithAuth(a.a.routes.orders+"/"+e)}},{key:"loadOrdersByRange",value:function(e,t,n){var r=(new o.c).set("start",e).set("end",t).set("type",n);return this.httpService.getWithAuth(a.a.routes.ordersQueuedRange,{params:r})}},{key:"exportOrders",value:function(e){return this.httpService.postWithAuth(a.a.routes.exportOrders,e,{responseType:"blob",observe:"response"})}}]),t}();return t.\u0275fac=function(e){return new(e||t)(l.Ub(c.a),l.Ub(d.a))},t.\u0275prov=l.Hb({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()},PAny:function(t,r,i){"use strict";i.d(r,"a",function(){return h});var a=i("AytR"),o=i("tk/3"),s=i("lJxs"),u=i("r4zg"),l=i("fXoL"),c=i("N+K7"),d=i("As+J"),h=function(){var t=function(){function t(n,r){e(this,t),this.httpService=n,this.skusService=r}return n(t,[{key:"getSKUs",value:function(){var e=this;return this.skusService.getSkus().pipe(Object(s.a)(function(t){var n=t.data.reduce(function(e,t){var n=e[t.skuType]||[];return n.push(t),e[t.skuType]=n,e},{});return Object.keys(n).reduce(function(t,r){return t[r]=e.addEmptyAndCompletedToSkus(n[r]),t},{})}))}},{key:"getHeader",value:function(){var e=this;return this.getSKUs().pipe(Object(s.a)(function(t){var n=t.HIGH_BEAM||e.addEmptyAndCompletedToSkus([]),r=t.LOW_BEAM||e.addEmptyAndCompletedToSkus([]),i=t.FOG_LIGHT||e.addEmptyAndCompletedToSkus([]);return e.buildHeader(n,r,i)}))}},{key:"addEmptyAndCompletedToSkus",value:function(e){return e&&((e=e.map(function(e){return e.name})).unshift(u.a.NOT_EMPTY_CHAR),e.unshift("")),e||[]}},{key:"buildHeader",value:function(e,t,n){return console.log(e),[{field:"year",headerName:"Vehicle Year"},{field:"make",headerName:"Vehicle Make"},{field:"model",headerName:"Vehicle Model"},{field:"highLowBeam",headerName:"High and LOW beam",cellEditor:"selectEditor",cellEditorParams:{elements:e.filter(function(e){return t.includes(e)})}},{field:"highBeam",headerName:"High beam",cellEditor:"selectEditor",cellEditorParams:{elements:e}},{field:"lowBeam",headerName:"Low beam",cellEditor:"selectEditor",cellEditorParams:{elements:t}},{field:"fogLight",headerName:"Fog light",cellEditor:"selectEditor",cellEditorParams:{elements:n}}]}},{key:"getRows",value:function(e){var t=Object.keys(e.request.filterModel).map(function(t){return{name:t,value:e.request.filterModel[t].filter}}),n=JSON.stringify(t),r=(new o.c).set("start",e.request.startRow.toString()).set("end",e.request.endRow.toString()).set("filter",n).set("sortBy",e.request.sortModel[0]?e.request.sortModel[0].colId:"").set("sortDirection",e.request.sortModel[0]?e.request.sortModel[0].sort:"");this.httpService.getWithAuth(a.a.routes.vehicles,{params:r}).subscribe(function(t){var n;if(t.status){e.success({rowData:t.data,rowCount:t.total});var r=[];null===(n=e.columnApi.getAllColumns())||void 0===n||n.forEach(function(e){r.push(e.colId)}),e.columnApi.autoSizeColumns(r,!1)}else e.fail()},function(){e.fail()})}},{key:"addRow",value:function(e){return this.httpService.postWithAuth(a.a.routes.vehicles,e)}},{key:"updateCell",value:function(e){return this.httpService.putWithAuth(a.a.routes.vehicles,e).toPromise()}},{key:"deleteRow",value:function(e){return this.httpService.deleteWithAuth(a.a.routes.vehicles+"/"+e)}},{key:"getYear",value:function(){return this.httpService.get(a.a.routes.year)}},{key:"getMake",value:function(e){return this.httpService.get(a.a.routes.make,{params:(new o.c).set("year",e)}).toPromise()}},{key:"getModel",value:function(e,t){return this.httpService.get(a.a.routes.model,{params:(new o.c).set("year",e).set("make",t)}).toPromise()}}]),t}();return t.\u0275fac=function(e){return new(e||t)(l.Ub(c.a),l.Ub(d.a))},t.\u0275prov=l.Hb({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()},Raaw:function(t,r,i){"use strict";i.d(r,"a",function(){return v});var a=i("mrSG"),o=i("fXoL"),s=i("d3UM"),u=i("PAny"),l=i("Wp6s"),c=i("kmnG"),d=i("3Pt+"),h=i("ofXK"),f=i("FKr1"),m=["group"];function p(e,t){if(1&e&&(o.Qb(0,"mat-option",4),o.wc(1),o.Pb()),2&e){var n=t.$implicit;o.gc("value",n),o.Ab(1),o.yc(" ",n," ")}}var v=function(){var t=function(){function t(n){e(this,t),this.vehicleService=n,this.elements=[]}return n(t,[{key:"agInit",value:function(e){return Object(a.a)(this,void 0,void 0,regeneratorRuntime.mark(function t(){var n=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.params=e,this.currentElement=this.params.value,t.next=4,this.getElement(e.requested);case 4:this.selectedIndex=this.elements.findIndex(function(e){return e===n.params.value});case 5:case"end":return t.stop()}},t,this)}))}},{key:"getElement",value:function(e){return Object(a.a)(this,void 0,void 0,regeneratorRuntime.mark(function t(){var n,r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(n=this.params.node.data.vehicleYear,"make"!==e){t.next=7;break}return t.next=4,this.vehicleService.getMake(n);case 4:this.elements=t.sent,t.next=11;break;case 7:return r=this.params.node.data.vehicleMake,t.next=10,this.vehicleService.getModel(n,r);case 10:this.elements=t.sent;case 11:case"end":return t.stop()}},t,this)}))}},{key:"ngAfterViewInit",value:function(){var e=this;window.setTimeout(function(){e.group.element.nativeElement.focus()}),this.selectCurrentElementBasedOnSelectedIndex()}},{key:"getValue",value:function(){return this.currentElement}},{key:"isPopup",value:function(){return!0}},{key:"onKeyDown",value:function(e){var n=e.key;38!==n&&40!==n||(t.preventDefaultAndPropagation(e),38===n?this.selectedIndex=0===this.selectedIndex?this.elements.length-1:this.selectedIndex-1:40===n&&(this.selectedIndex=this.selectedIndex===this.elements.length-1?0:this.selectedIndex+1),this.selectCurrentElementBasedOnSelectedIndex())}},{key:"selectCurrentElementBasedOnSelectedIndex",value:function(){this.currentElement=this.elements[this.selectedIndex]}}],[{key:"preventDefaultAndPropagation",value:function(e){e.preventDefault(),e.stopPropagation()}}]),t}();return t.\u0275fac=function(e){return new(e||t)(o.Lb(u.a))},t.\u0275cmp=o.Fb({type:t,selectors:[["ct-mat-select"]],viewQuery:function(e,t){var n;(1&e&&(o.zc(m,!0,o.Q),o.zc(s.a,!0)),2&e)&&(o.kc(n=o.Yb())&&(t.group=n.first),o.kc(n=o.Yb())&&(t.select=n.first))},decls:6,vars:2,consts:[["tabindex","0",1,"container",3,"keydown"],["group",""],["panelClass","ag-custom-component-popup",3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],[3,"value"]],template:function(e,t){1&e&&(o.Qb(0,"mat-card"),o.Qb(1,"div",0,1),o.Xb("keydown",function(e){return t.onKeyDown(e)}),o.Qb(3,"mat-form-field"),o.Qb(4,"mat-select",2),o.Xb("ngModelChange",function(e){return t.currentElement=e}),o.vc(5,p,2,2,"mat-option",3),o.Pb(),o.Pb(),o.Pb(),o.Pb()),2&e&&(o.Ab(4),o.gc("ngModel",t.currentElement),o.Ab(1),o.gc("ngForOf",t.elements))},directives:[l.a,c.c,s.a,d.l,d.o,h.j,f.k],styles:["mat-form-field[_ngcontent-%COMP%] {\n            width: 100px;\n        }\n\n        .container[_ngcontent-%COMP%]:focus {\n            outline: none;\n        }"]}),t}()},sU9S:function(t,r,i){"use strict";i.d(r,"a",function(){return f});var a=i("fXoL"),o=i("d3UM"),s=i("kmnG"),u=i("3Pt+"),l=i("ofXK"),c=i("FKr1"),d=["group"];function h(e,t){if(1&e&&(a.Qb(0,"mat-option",4),a.wc(1),a.Pb()),2&e){var n=t.$implicit;a.gc("value",n),a.Ab(1),a.yc(" ",n," ")}}var f=function(){var t=function(){function t(){e(this,t)}return n(t,[{key:"agInit",value:function(e){var t=this;this.params=e,this.currentElement=this.params.value,this.elements=this.params.elements,this.selectedIndex=Math.max(this.elements.findIndex(function(e){return e===t.params.value}),0)}},{key:"ngAfterViewInit",value:function(){var e=this;window.setTimeout(function(){e.group.element.nativeElement.focus()}),this.selectCurrentElementBasedOnSelectedIndex(),this.select.open(),this.select.focus({preventScroll:!1})}},{key:"getValue",value:function(){return this.currentElement}},{key:"isPopup",value:function(){return!0}},{key:"onKeyDown",value:function(e){var t=e.which||e.keyCode;38!==t&&40!==t||(this.preventDefaultAndPropagation(e),this.select._handleKeydown(e),this.selectedIndex=Math.max(this.select._keyManager.activeItemIndex,0),this.selectCurrentElementBasedOnSelectedIndex())}},{key:"preventDefaultAndPropagation",value:function(e){e.preventDefault(),e.stopPropagation()}},{key:"selectCurrentElementBasedOnSelectedIndex",value:function(){this.currentElement=this.elements[this.selectedIndex]}}]),t}();return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=a.Fb({type:t,selectors:[["ct-mat-select"]],viewQuery:function(e,t){var n;(1&e&&(a.zc(d,!0,a.Q),a.zc(o.a,!0)),2&e)&&(a.kc(n=a.Yb())&&(t.group=n.first),a.kc(n=a.Yb())&&(t.select=n.first))},decls:5,vars:2,consts:[["tabindex","0",1,"container",3,"keydown"],["group",""],["panelClass","ag-custom-component-popup",3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],[3,"value"]],template:function(e,t){1&e&&(a.Qb(0,"div",0,1),a.Xb("keydown",function(e){return t.onKeyDown(e)}),a.Qb(2,"mat-form-field"),a.Qb(3,"mat-select",2),a.Xb("ngModelChange",function(e){return t.currentElement=e}),a.vc(4,h,2,2,"mat-option",3),a.Pb(),a.Pb(),a.Pb()),2&e&&(a.Ab(3),a.gc("ngModel",t.currentElement),a.Ab(1),a.gc("ngForOf",t.elements))},directives:[s.c,o.a,u.l,u.o,l.j,c.k],styles:["mat-form-field[_ngcontent-%COMP%] {\n            width: 100px;\n            margin: 0 !important;\n            padding: 0 !important;\n        }\n\n\n        .container[_ngcontent-%COMP%] {\n            margin: 0 !important;\n            padding: 0 !important;\n        }\n\n        .container[_ngcontent-%COMP%]:focus {\n            outline: none;\n        }"]}),t}()},tXqc:function(t,r,i){"use strict";i.d(r,"a",function(){return u});var a=i("fXoL"),o=i("bSwM"),s=i("3Pt+"),u=function(){var t=function(){function t(){e(this,t),this.checked=!1}return n(t,[{key:"agInit",value:function(e){this.params=e,this.checked=this.params.value}},{key:"onChange",value:function(e){this.checked=e,this.params.node.setDataValue(this.params.colDef,this.checked),this.params.eGridCell&&this.params.eGridCell.focus()}},{key:"refresh",value:function(){return!1}}]),t}();return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=a.Fb({type:t,selectors:[["ct-checkbox-cell"]],decls:1,vars:1,consts:[[3,"ngModel","ngModelChange"]],template:function(e,t){1&e&&(a.Qb(0,"mat-checkbox",0),a.Xb("ngModelChange",function(e){return t.onChange(e)}),a.Pb()),2&e&&a.gc("ngModel",t.checked)},directives:[o.a,s.l,s.o],styles:[".mat-checkbox-layout {\n                \n                width: 100%;\n                display: inline-block !important;\n                text-align: center;\n                margin-top: -4px;\n                margin-left: 2px;\n                \n                \n                line-height: 36px;\n\n            }\n\n             \n            .mat-checkbox-layout .mat-ripple-element {\n                opacity: 0.2;\n            }"]}),t}()}}])}();