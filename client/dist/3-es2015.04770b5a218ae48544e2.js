(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{A9p3:function(t,e,o){"use strict";o.d(e,"a",function(){return d});var r=o("0IaG"),i=o("fXoL"),n=o("ofXK"),s=o("bTqV");function a(t,e){if(1&t&&(i.Ob(0),i.Qb(1,"h1",1),i.wc(2),i.Pb(),i.Qb(3,"div",2),i.Qb(4,"p"),i.wc(5),i.Pb(),i.Pb(),i.Qb(6,"div",3),i.Qb(7,"button",4),i.wc(8,"No"),i.Pb(),i.Qb(9,"button",5),i.wc(10,"Yes"),i.Pb(),i.Pb(),i.Nb()),2&t){const t=i.bc();i.Ab(2),i.xc(t.data.title),i.Ab(3),i.xc(t.data.description),i.Ab(2),i.gc("mat-dialog-close",!1),i.Ab(2),i.gc("mat-dialog-close",!0)}}let p=(()=>{class t{constructor(t){this.data=t}}return t.\u0275fac=function(e){return new(e||t)(i.Lb(r.a))},t.\u0275cmp=i.Fb({type:t,selectors:[["ct-confirm-dialog"]],decls:1,vars:1,consts:[[4,"ngIf"],["mat-dialog-title",""],["mat-dialog-content",""],["mat-dialog-actions",""],["cdkFocusInitial","","mat-button","",3,"mat-dialog-close"],["color","warn","mat-button","",3,"mat-dialog-close"]],template:function(t,e){1&t&&i.vc(0,a,11,4,"ng-container",0),2&t&&i.gc("ngIf",e.data)},directives:[n.k,r.h,r.e,r.c,s.a,r.d],styles:[""]}),t})();var l=o("PCNd");let d=(()=>{class t{constructor(t){this.dialog=t}requestDeleteConfirmation(){return this.dialog.open(p,{data:{title:"Delete confirmation",description:"Are you sure you want to delete this row permanently."},disableClose:!0}).afterClosed()}requestConfirmation(t,e){return this.dialog.open(p,{data:{title:t,description:e},disableClose:!0}).afterClosed()}}return t.\u0275fac=function(e){return new(e||t)(i.Ub(r.b))},t.\u0275prov=i.Hb({token:t,factory:t.\u0275fac,providedIn:l.a}),t})()},sspt:function(t,e,o){"use strict";o.d(e,"a",function(){return E});var r,i,n=o("Y7sv"),s=function(){function t(e,o,r,i,n,s,a,p){this.nextId=0,this.allNodesMap={},this.rootNode=e,this.gridOptionsWrapper=o,this.context=r,this.eventService=i,this.columnController=n,this.gridApi=s,this.columnApi=a,this.selectionController=p,this.rootNode.group=!0,this.rootNode.level=-1,this.rootNode.id=t.ROOT_NODE_ID,this.rootNode.allLeafChildren=[],this.rootNode.childrenAfterGroup=[],this.rootNode.childrenAfterSort=[],this.rootNode.childrenAfterFilter=[],this.postConstruct()}return t.prototype.postConstruct=function(){this.suppressParentsInRowNodes=this.gridOptionsWrapper.isSuppressParentsInRowNodes(),this.isRowMasterFunc=this.gridOptionsWrapper.getIsRowMasterFunc(),this.doingTreeData=this.gridOptionsWrapper.isTreeData(),this.doingMasterDetail=this.gridOptionsWrapper.isMasterDetail()},t.prototype.getCopyOfNodesMap=function(){return n.A.cloneObject(this.allNodesMap)},t.prototype.getRowNode=function(t){return this.allNodesMap[t]},t.prototype.setRowData=function(e){if(this.rootNode.childrenAfterFilter=null,this.rootNode.childrenAfterGroup=null,this.rootNode.childrenAfterSort=null,this.rootNode.childrenMapped=null,this.rootNode.updateHasChildren(),this.nextId=0,this.allNodesMap={},!e)return this.rootNode.allLeafChildren=[],void(this.rootNode.childrenAfterGroup=[]);this.rootNode.allLeafChildren=this.recursiveFunction(e,this.rootNode,t.TOP_LEVEL)},t.prototype.updateRowData=function(t,e){var o={remove:[],update:[],add:[]},r=[];return this.executeRemove(t,o,r),this.executeUpdate(t,o,r),this.executeAdd(t,o),this.updateSelection(r),e&&n.A.sortRowNodesByOrder(this.rootNode.allLeafChildren,e),o},t.prototype.updateSelection=function(t){var e=t.length>0;e&&t.forEach(function(t){t.setSelected(!1,!1,!0)}),this.selectionController.updateGroupsFromChildrenSelections(),e&&this.eventService.dispatchEvent({type:n.k.EVENT_SELECTION_CHANGED,api:this.gridApi,columnApi:this.columnApi})},t.prototype.executeAdd=function(t,e){var o=this,r=t.add,i=t.addIndex;n.A.missingOrEmpty(r)||("number"==typeof i&&i>=0?r.reverse().forEach(function(t){var r=o.addRowNode(t,i);e.add.push(r)}):r.forEach(function(t){var r=o.addRowNode(t);e.add.push(r)}))},t.prototype.executeRemove=function(t,e,o){var r=this,i=t.remove;if(!n.A.missingOrEmpty(i)){var s={};i.forEach(function(t){var i=r.lookupRowNode(t);i&&(i.isSelected()&&o.push(i),i.clearRowTopAndRowIndex(),s[i.id]=!0,delete r.allNodesMap[i.id],e.remove.push(i))}),this.rootNode.allLeafChildren=this.rootNode.allLeafChildren.filter(function(t){return!s[t.id]})}},t.prototype.executeUpdate=function(e,o,r){var i=this,s=e.update;n.A.missingOrEmpty(s)||s.forEach(function(e){var n=i.lookupRowNode(e);n&&(n.updateData(e),!n.selectable&&n.isSelected()&&r.push(n),i.setMasterForRow(n,e,t.TOP_LEVEL,!1),o.update.push(n))})},t.prototype.addRowNode=function(e,o){var r=this.createNode(e,this.rootNode,t.TOP_LEVEL);return n.A.exists(o)?n.A.insertIntoArray(this.rootNode.allLeafChildren,r,o):this.rootNode.allLeafChildren.push(r),r},t.prototype.lookupRowNode=function(t){var e,o=this.gridOptionsWrapper.getRowNodeIdFunc();if(n.A.exists(o)){var r=o(t);if(!(e=this.allNodesMap[r]))return console.error("AG Grid: could not find row id="+r+", data item was not found for this id"),null}else if(!(e=n.A.find(this.rootNode.allLeafChildren,function(e){return e.data===t})))return console.error("AG Grid: could not find data item as object was not found",t),null;return e},t.prototype.recursiveFunction=function(t,e,o){var r=this;if("string"!=typeof t){var i=[];return t.forEach(function(t){var n=r.createNode(t,e,o);i.push(n)}),i}console.warn("AG Grid: rowData must be an array, however you passed in a string. If you are loading JSON, make sure you convert the JSON string to JavaScript objects first")},t.prototype.createNode=function(t,e,o){var r=new n.v;return this.context.createBean(r),r.group=!1,this.setMasterForRow(r,t,o,!0),e&&!this.suppressParentsInRowNodes&&(r.parent=e),r.level=o,r.setDataAndId(t,this.nextId.toString()),this.allNodesMap[r.id]&&console.warn("ag-grid: duplicate node id '"+r.id+"' detected from getRowNodeId callback, this could cause issues in your grid."),this.allNodesMap[r.id]=r,this.nextId++,r},t.prototype.setMasterForRow=function(t,e,o,r){if(this.doingTreeData)t.setMaster(!1),r&&(t.expanded=!1);else if(t.setMaster(!!this.doingMasterDetail&&(!this.isRowMasterFunc||this.isRowMasterFunc(e))),r){var i=this.columnController.getRowGroupColumns();t.expanded=!!t.master&&this.isExpanded(o+(i?i.length:0))}},t.prototype.isExpanded=function(t){var e=this.gridOptionsWrapper.getGroupDefaultExpanded();return-1===e||t<e},t.prototype.setLeafChildren=function(t){t.allLeafChildren=[],t.childrenAfterGroup&&t.childrenAfterGroup.forEach(function(e){e.group?e.allLeafChildren&&e.allLeafChildren.forEach(function(e){return t.allLeafChildren.push(e)}):t.allLeafChildren.push(e)})},t.TOP_LEVEL=0,t.ROOT_NODE_ID="ROOT_NODE_ID",t}(),a=(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),p=function(t,e,o,r){var i,n=arguments.length,s=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(n<3?i(s):n>3?i(e,o,s):i(e,o))||s);return n>3&&s&&Object.defineProperty(e,o,s),s};!function(t){t[t.Normal=0]="Normal",t[t.AfterFilter=1]="AfterFilter",t[t.AfterFilterAndSort=2]="AfterFilterAndSort",t[t.PivotNodes=3]="PivotNodes"}(i||(i={}));var l=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.onRowGroupOpenedPending=!1,e}return a(e,t),e.prototype.init=function(){var t=this.refreshModel.bind(this,{step:n.g.EVERYTHING}),e=this.refreshModel.bind(this,{step:n.g.EVERYTHING,afterColumnsChanged:!0,keepRenderedRows:!0,animate:!0});this.addManagedListener(this.eventService,n.k.EVENT_NEW_COLUMNS_LOADED,e),this.addManagedListener(this.eventService,n.k.EVENT_COLUMN_ROW_GROUP_CHANGED,t),this.addManagedListener(this.eventService,n.k.EVENT_COLUMN_VALUE_CHANGED,this.onValueChanged.bind(this)),this.addManagedListener(this.eventService,n.k.EVENT_COLUMN_PIVOT_CHANGED,this.refreshModel.bind(this,{step:n.g.PIVOT})),this.addManagedListener(this.eventService,n.k.EVENT_ROW_GROUP_OPENED,this.onRowGroupOpened.bind(this)),this.addManagedListener(this.eventService,n.k.EVENT_FILTER_CHANGED,this.onFilterChanged.bind(this)),this.addManagedListener(this.eventService,n.k.EVENT_SORT_CHANGED,this.onSortChanged.bind(this)),this.addManagedListener(this.eventService,n.k.EVENT_COLUMN_PIVOT_MODE_CHANGED,t);var o=this.refreshModel.bind(this,{step:n.g.MAP,keepRenderedRows:!0,animate:!0});this.addManagedListener(this.gridOptionsWrapper,n.m.PROP_GROUP_REMOVE_SINGLE_CHILDREN,o),this.addManagedListener(this.gridOptionsWrapper,n.m.PROP_GROUP_REMOVE_LOWEST_SINGLE_CHILDREN,o),this.rootNode=new n.v,this.nodeManager=new s(this.rootNode,this.gridOptionsWrapper,this.getContext(),this.eventService,this.columnController,this.gridApi,this.columnApi,this.selectionController),this.createBean(this.rootNode)},e.prototype.start=function(){var t=this.gridOptionsWrapper.getRowData();t&&this.setRowData(t)},e.prototype.ensureRowHeightsValid=function(t,e,o,r){var i,n=!1;do{i=!1;for(var s=this.getRowIndexAtPixel(t),a=this.getRowIndexAtPixel(e),p=Math.max(s,o),l=Math.min(a,r),d=p;d<=l;d++){var c=this.getRow(d);if(c.rowHeightEstimated){var h=this.gridOptionsWrapper.getRowHeightForNode(c);c.setRowHeight(h.height),i=!0,n=!0}}i&&this.setRowTops()}while(i);return n},e.prototype.setRowTops=function(){for(var t=0,e=0;e<this.rowsToDisplay.length;e++){var o=this.gridOptionsWrapper.getDomLayout()===n.j.DOM_LAYOUT_NORMAL,r=this.rowsToDisplay[e];if(n.A.missing(r.rowHeight)){var i=this.gridOptionsWrapper.getRowHeightForNode(r,o);r.setRowHeight(i.height,i.estimated)}r.setRowTop(t),r.setRowIndex(e),t+=r.rowHeight}},e.prototype.resetRowTops=function(t,e){if(t.clearRowTopAndRowIndex(),t.hasChildren()){if(t.childrenAfterGroup&&(!e.isActive()||t.expanded))for(var o=0;o<t.childrenAfterGroup.length;o++)this.resetRowTops(t.childrenAfterGroup[o],e);t.sibling&&t.sibling.clearRowTopAndRowIndex()}t.detailNode&&t.detailNode.clearRowTopAndRowIndex()},e.prototype.ensureRowsAtPixel=function(t,e,o){var r=this;void 0===o&&(o=0);var i=this.getRowIndexAtPixel(e);return this.getRow(i)!==t[0]&&(t.forEach(function(t){n.A.removeFromArray(r.rootNode.allLeafChildren,t)}),t.forEach(function(t,e){n.A.insertIntoArray(r.rootNode.allLeafChildren,t,Math.max(i+o,0)+e)}),this.refreshModel({step:n.g.EVERYTHING,keepRenderedRows:!0,animate:!0,keepEditingRows:!0}),!0)},e.prototype.highlightRowAtPixel=function(t,e){var o=null!=e?this.getRowIndexAtPixel(e):null,r=null!=o?this.getRow(o):null;if(r&&t&&r!==t&&null!=e){var i=this.getHighlightPosition(e,r);this.lastHighlightedRow&&this.lastHighlightedRow!==r&&(this.lastHighlightedRow.setHighlighted(null),this.lastHighlightedRow=null),r.setHighlighted(i),this.lastHighlightedRow=r}else this.lastHighlightedRow&&(this.lastHighlightedRow.setHighlighted(null),this.lastHighlightedRow=null)},e.prototype.getHighlightPosition=function(t,e){if(!e){var o=this.getRowIndexAtPixel(t);if(!(e=this.getRow(o||0)))return"below"}return t-e.rowTop<e.rowHeight/2?"above":"below"},e.prototype.getLastHighlightedRowNode=function(){return this.lastHighlightedRow},e.prototype.isLastRowIndexKnown=function(){return!0},e.prototype.getRowCount=function(){return this.rowsToDisplay?this.rowsToDisplay.length:0},e.prototype.getTopLevelRowCount=function(){return this.rowsToDisplay&&this.rowsToDisplay[0]===this.rootNode?1:this.rootNode.childrenAfterFilter?this.rootNode.childrenAfterFilter.length:0},e.prototype.getTopLevelRowDisplayedIndex=function(t){if(this.rowsToDisplay&&this.rowsToDisplay[0]===this.rootNode)return t;var e=this.rootNode.childrenAfterSort[t];if(this.gridOptionsWrapper.isGroupHideOpenParents())for(;e.expanded&&e.childrenAfterSort&&e.childrenAfterSort.length>0;)e=e.childrenAfterSort[0];return e.rowIndex},e.prototype.getRowBounds=function(t){if(n.A.missing(this.rowsToDisplay))return null;var e=this.rowsToDisplay[t];return e?{rowTop:e.rowTop,rowHeight:e.rowHeight}:null},e.prototype.onRowGroupOpened=function(){var t=this;if(!this.onRowGroupOpenedPending){this.onRowGroupOpenedPending=!0;var e=function(){t.onRowGroupOpenedPending=!1;var e=t.gridOptionsWrapper.isAnimateRows();t.refreshModel({step:n.g.MAP,keepRenderedRows:!0,animate:e})};this.gridOptionsWrapper.isSuppressAnimationFrame()?e():this.animationFrameService.addDestroyTask(e)}},e.prototype.onFilterChanged=function(t){if(!t.afterDataChange){var e=this.gridOptionsWrapper.isAnimateRows();this.refreshModel({step:n.g.FILTER,keepRenderedRows:!0,animate:e})}},e.prototype.onSortChanged=function(){var t=this.gridOptionsWrapper.isAnimateRows();this.refreshModel({step:n.g.SORT,keepRenderedRows:!0,animate:t,keepEditingRows:!0})},e.prototype.getType=function(){return n.j.ROW_MODEL_TYPE_CLIENT_SIDE},e.prototype.onValueChanged=function(){this.columnController.isPivotActive()?this.refreshModel({step:n.g.PIVOT}):this.refreshModel({step:n.g.AGGREGATE})},e.prototype.createChangePath=function(t){var e=n.A.missingOrEmpty(t),o=new n.f(!1,this.rootNode);return(e||this.gridOptionsWrapper.isTreeData())&&o.setInactive(),o},e.prototype.isSuppressModelUpdateAfterUpdateTransaction=function(t){if(!this.gridOptionsWrapper.isSuppressModelUpdateAfterUpdateTransaction())return!1;if(null==t.rowNodeTransactions)return!1;var e=n.A.filter(t.rowNodeTransactions,function(t){return null!=t.add&&t.add.length>0||null!=t.remove&&t.remove.length>0});return null==e||0==e.length},e.prototype.refreshModel=function(t){var e=this;if(!this.isSuppressModelUpdateAfterUpdateTransaction(t)){var o=this.createChangePath(t.rowNodeTransactions);switch(t.step){case n.g.EVERYTHING:this.doRowGrouping(t.groupState,t.rowNodeTransactions,t.rowNodeOrder,o,!!t.afterColumnsChanged);case n.g.FILTER:this.doFilter(o);case n.g.PIVOT:this.doPivot(o);case n.g.AGGREGATE:this.doAggregate(o);case n.g.SORT:this.doSort(t.rowNodeTransactions,o);case n.g.MAP:this.doRowsToDisplay()}this.resetRowTops(this.rootNode,o),this.setRowTops(),this.eventService.dispatchEvent({type:n.k.EVENT_MODEL_UPDATED,api:this.gridApi,columnApi:this.columnApi,animate:t.animate,keepRenderedRows:t.keepRenderedRows,newData:t.newData,newPage:!1}),this.$scope&&window.setTimeout(function(){e.$scope.$apply()},0)}},e.prototype.isEmpty=function(){var t=n.A.missing(this.rootNode.allLeafChildren)||0===this.rootNode.allLeafChildren.length;return n.A.missing(this.rootNode)||t||!this.columnController.isReady()},e.prototype.isRowsToRender=function(){return n.A.exists(this.rowsToDisplay)&&this.rowsToDisplay.length>0},e.prototype.getNodesInRangeForSelection=function(t,e){var o,r=!e,i=!1,n=[],s=this.gridOptionsWrapper.isGroupSelectsChildren();return this.forEachNodeAfterFilterAndSort(function(a){var p=r&&!i;if(r||a!==e&&a!==t||(r=!0),!a.group||!s){var l=r&&!i,d=a.isParentOfNode(o);(l||d)&&n.push(a)}p&&(a!==e&&a!==t||(i=!0,o=a===e?e:t))}),n},e.prototype.setDatasource=function(t){console.error("AG Grid: should never call setDatasource on clientSideRowController")},e.prototype.getTopLevelNodes=function(){return this.rootNode?this.rootNode.childrenAfterGroup:null},e.prototype.getRootNode=function(){return this.rootNode},e.prototype.getRow=function(t){return this.rowsToDisplay[t]},e.prototype.isRowPresent=function(t){return this.rowsToDisplay.indexOf(t)>=0},e.prototype.getRowIndexAtPixel=function(t){if(this.isEmpty())return-1;var e=0,o=this.rowsToDisplay.length-1;if(t<=0)return 0;if(n.A.last(this.rowsToDisplay).rowTop<=t)return this.rowsToDisplay.length-1;for(;;){var r=Math.floor((e+o)/2),i=this.rowsToDisplay[r];if(this.isRowInPixel(i,t))return r;i.rowTop<t?e=r+1:i.rowTop>t&&(o=r-1)}},e.prototype.isRowInPixel=function(t,e){return t.rowTop<=e&&t.rowTop+t.rowHeight>e},e.prototype.forEachLeafNode=function(t){this.rootNode.allLeafChildren&&this.rootNode.allLeafChildren.forEach(function(e,o){return t(e,o)})},e.prototype.forEachNode=function(t){this.recursivelyWalkNodesAndCallback(this.rootNode.childrenAfterGroup,t,i.Normal,0)},e.prototype.forEachNodeAfterFilter=function(t){this.recursivelyWalkNodesAndCallback(this.rootNode.childrenAfterFilter,t,i.AfterFilter,0)},e.prototype.forEachNodeAfterFilterAndSort=function(t){this.recursivelyWalkNodesAndCallback(this.rootNode.childrenAfterSort,t,i.AfterFilterAndSort,0)},e.prototype.forEachPivotNode=function(t){this.recursivelyWalkNodesAndCallback([this.rootNode],t,i.PivotNodes,0)},e.prototype.recursivelyWalkNodesAndCallback=function(t,e,o,r){if(!t)return r;for(var n=0;n<t.length;n++){var s=t[n];if(e(s,r++),s.hasChildren()){var a=null;switch(o){case i.Normal:a=s.childrenAfterGroup;break;case i.AfterFilter:a=s.childrenAfterFilter;break;case i.AfterFilterAndSort:a=s.childrenAfterSort;break;case i.PivotNodes:a=s.leafGroup?null:s.childrenAfterSort}a&&(r=this.recursivelyWalkNodesAndCallback(a,e,o,r))}}return r},e.prototype.doAggregate=function(t){this.aggregationStage&&this.aggregationStage.execute({rowNode:this.rootNode,changedPath:t})},e.prototype.expandOrCollapseAll=function(t){var e=this.gridOptionsWrapper.isTreeData();this.rootNode&&function o(r){r&&r.forEach(function(r){(e?n.A.exists(r.childrenAfterGroup):r.group)&&(r.expanded=t,o(r.childrenAfterGroup))})}(this.rootNode.childrenAfterGroup),this.refreshModel({step:n.g.MAP}),this.eventService.dispatchEvent({api:this.gridApi,columnApi:this.columnApi,type:n.k.EVENT_EXPAND_COLLAPSE_ALL,source:t?"expandAll":"collapseAll"})},e.prototype.doSort=function(t,e){this.sortStage.execute({rowNode:this.rootNode,rowNodeTransactions:t,changedPath:e})},e.prototype.doRowGrouping=function(t,e,o,r,i){this.groupStage?(e?this.groupStage.execute({rowNode:this.rootNode,rowNodeTransactions:e,rowNodeOrder:o,changedPath:r}):(this.selectionController.removeGroupsFromSelection(),this.groupStage.execute({rowNode:this.rootNode,changedPath:r,afterColumnsChanged:i}),this.restoreGroupState(t)),this.gridOptionsWrapper.isGroupSelectsChildren()&&this.selectionController.updateGroupsFromChildrenSelections(r)):(this.rootNode.childrenAfterGroup=this.rootNode.allLeafChildren,this.rootNode.updateHasChildren())},e.prototype.restoreGroupState=function(t){t&&n.A.traverseNodesWithKey(this.rootNode.childrenAfterGroup,function(e,o){"boolean"==typeof t[o]&&(e.expanded=t[o])})},e.prototype.doFilter=function(t){this.filterStage.execute({rowNode:this.rootNode,changedPath:t})},e.prototype.doPivot=function(t){this.pivotStage&&this.pivotStage.execute({rowNode:this.rootNode,changedPath:t})},e.prototype.getGroupState=function(){if(!this.rootNode.childrenAfterGroup||!this.gridOptionsWrapper.isRememberGroupStateWhenNewData())return null;var t={};return n.A.traverseNodesWithKey(this.rootNode.childrenAfterGroup,function(e,o){return t[o]=e.expanded}),t},e.prototype.getCopyOfNodesMap=function(){return this.nodeManager.getCopyOfNodesMap()},e.prototype.getRowNode=function(t){return this.nodeManager.getRowNode(t)},e.prototype.setRowData=function(t){var e=this.getGroupState();this.nodeManager.setRowData(t),this.eventService.dispatchEvent({type:n.k.EVENT_ROW_DATA_CHANGED,api:this.gridApi,columnApi:this.columnApi}),this.refreshModel({step:n.g.EVERYTHING,groupState:e,newData:!0})},e.prototype.batchUpdateRowData=function(t,e){var o=this;if(null==this.applyAsyncTransactionsTimeout){this.rowDataTransactionBatch=[];var r=this.gridOptionsWrapper.getAsyncTransactionWaitMillis();this.applyAsyncTransactionsTimeout=window.setTimeout(function(){o.executeBatchUpdateRowData()},r)}this.rowDataTransactionBatch.push({rowDataTransaction:t,callback:e})},e.prototype.flushAsyncTransactions=function(){null!=this.applyAsyncTransactionsTimeout&&(clearTimeout(this.applyAsyncTransactionsTimeout),this.executeBatchUpdateRowData())},e.prototype.executeBatchUpdateRowData=function(){var t=this;this.valueCache.onDataChanged();var e=[],o=[],r=!1;if(this.rowDataTransactionBatch&&this.rowDataTransactionBatch.forEach(function(i){var n=t.nodeManager.updateRowData(i.rowDataTransaction,void 0);o.push(n),i.callback&&e.push(i.callback.bind(null,n)),"number"==typeof i.rowDataTransaction.addIndex&&(r=!0)}),this.commonUpdateRowData(o,void 0,r),e.length>0&&window.setTimeout(function(){e.forEach(function(t){return t()})},0),o.length>0){var i={api:this.gridOptionsWrapper.getApi(),columnApi:this.gridOptionsWrapper.getColumnApi(),type:n.k.EVENT_ASYNC_TRANSACTIONS_FLUSHED,results:o};this.eventService.dispatchEvent(i)}this.rowDataTransactionBatch=null,this.applyAsyncTransactionsTimeout=void 0},e.prototype.updateRowData=function(t,e){this.valueCache.onDataChanged();var o=this.nodeManager.updateRowData(t,e);return this.commonUpdateRowData([o],e,"number"==typeof t.addIndex),o},e.prototype.createRowNodeOrder=function(){if(!this.gridOptionsWrapper.isSuppressMaintainUnsortedOrder()){var t={};if(this.rootNode&&this.rootNode.allLeafChildren)for(var e=0;e<this.rootNode.allLeafChildren.length;e++)t[this.rootNode.allLeafChildren[e].id]=e;return t}},e.prototype.commonUpdateRowData=function(t,e,o){o&&(e=this.createRowNodeOrder()),this.refreshModel({step:n.g.EVERYTHING,rowNodeTransactions:t,rowNodeOrder:e,keepRenderedRows:!0,animate:!0,keepEditingRows:!0}),this.eventService.dispatchEvent({type:n.k.EVENT_ROW_DATA_UPDATED,api:this.gridApi,columnApi:this.columnApi})},e.prototype.doRowsToDisplay=function(){this.rowsToDisplay=this.flattenStage.execute({rowNode:this.rootNode})},e.prototype.onRowHeightChanged=function(){this.refreshModel({step:n.g.MAP,keepRenderedRows:!0,keepEditingRows:!0})},e.prototype.resetRowHeights=function(){var t=!1;this.forEachNode(function(e){e.setRowHeight(e.rowHeight,!0);var o=e.detailNode;o&&o.setRowHeight(o.rowHeight,!0),t=!0}),t&&this.onRowHeightChanged()},p([Object(n.b)("columnController")],e.prototype,"columnController",void 0),p([Object(n.b)("filterManager")],e.prototype,"filterManager",void 0),p([Object(n.b)("$scope")],e.prototype,"$scope",void 0),p([Object(n.b)("selectionController")],e.prototype,"selectionController",void 0),p([Object(n.b)("valueService")],e.prototype,"valueService",void 0),p([Object(n.b)("valueCache")],e.prototype,"valueCache",void 0),p([Object(n.b)("columnApi")],e.prototype,"columnApi",void 0),p([Object(n.b)("gridApi")],e.prototype,"gridApi",void 0),p([Object(n.b)("animationFrameService")],e.prototype,"animationFrameService",void 0),p([Object(n.b)("filterStage")],e.prototype,"filterStage",void 0),p([Object(n.b)("sortStage")],e.prototype,"sortStage",void 0),p([Object(n.b)("flattenStage")],e.prototype,"flattenStage",void 0),p([Object(n.p)("groupStage")],e.prototype,"groupStage",void 0),p([Object(n.p)("aggregationStage")],e.prototype,"aggregationStage",void 0),p([Object(n.p)("pivotStage")],e.prototype,"pivotStage",void 0),p([n.q],e.prototype,"init",null),p([Object(n.d)("rowModel")],e)}(n.e),d=function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function r(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}(),c=function(t,e,o,r){var i,n=arguments.length,s=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(n<3?i(s):n>3?i(e,o,s):i(e,o))||s);return n>3&&s&&Object.defineProperty(e,o,s),s},h=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return d(e,t),e.prototype.execute=function(t){var e=t.rowNode;this.filterService.filter(t.changedPath),this.selectableService.updateSelectableAfterFiltering(e)},c([Object(n.b)("selectableService")],e.prototype,"selectableService",void 0),c([Object(n.b)("filterService")],e.prototype,"filterService",void 0),c([Object(n.d)("filterStage")],e)}(n.e),u=function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function r(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}(),f=function(t,e,o,r){var i,n=arguments.length,s=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(n<3?i(s):n>3?i(e,o,s):i(e,o))||s);return n>3&&s&&Object.defineProperty(e,o,s),s},g=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return u(e,t),e.prototype.execute=function(t){var e=this.sortController.getSortOptions(),o=n.A.exists(e)&&e.length>0,r=o&&n.A.exists(t.rowNodeTransactions)&&this.gridOptionsWrapper.isDeltaSort(),i=r?this.calculateDirtyNodes(t.rowNodeTransactions):null,s=this.columnController.getValueColumns(),a=n.A.missingOrEmpty(s);this.sortService.sort(e,o,r,i,t.changedPath,a)},e.prototype.calculateDirtyNodes=function(t){var e={},o=function(t){t&&t.forEach(function(t){return e[t.id]=!0})};return t&&t.forEach(function(t){o(t.add),o(t.update),o(t.remove)}),e},f([Object(n.b)("sortService")],e.prototype,"sortService",void 0),f([Object(n.b)("sortController")],e.prototype,"sortController",void 0),f([Object(n.b)("columnController")],e.prototype,"columnController",void 0),f([Object(n.d)("sortStage")],e)}(n.e),w=function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function r(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}(),y=function(t,e,o,r){var i,n=arguments.length,s=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(n<3?i(s):n>3?i(e,o,s):i(e,o))||s);return n>3&&s&&Object.defineProperty(e,o,s),s},v=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return w(e,t),e.prototype.execute=function(t){var e=t.rowNode,o=[],r={value:0},i=this.columnController.isPivotMode(),n=i&&e.leafGroup;return this.recursivelyAddToRowsToDisplay(n?[e]:e.childrenAfterSort,o,r,i,0),!n&&o.length>0&&this.gridOptionsWrapper.isGroupIncludeTotalFooter()&&(this.ensureFooterNodeExists(e),this.addRowNodeToRowsToDisplay(e.sibling,o,r,0)),o},e.prototype.recursivelyAddToRowsToDisplay=function(t,e,o,r,i){if(!n.A.missingOrEmpty(t))for(var s=this.gridOptionsWrapper.isGroupHideOpenParents(),a=this.gridOptionsWrapper.isGroupRemoveSingleChildren(),p=!a&&this.gridOptionsWrapper.isGroupRemoveLowestSingleChildren(),l=0;l<t.length;l++){var d=t[l],c=d.hasChildren(),h=a&&c&&1===d.childrenAfterGroup.length,u=p&&c&&d.leafGroup&&1===d.childrenAfterGroup.length;if(!(r&&!c||s&&d.expanded&&(!r||!d.leafGroup)||h||u)&&this.addRowNodeToRowsToDisplay(d,e,o,i),!r||!d.leafGroup)if(c){var f=h||u;(d.expanded||f)&&(this.recursivelyAddToRowsToDisplay(d.childrenAfterSort,e,o,r,f?i:i+1),this.gridOptionsWrapper.isGroupIncludeFooter()&&(this.ensureFooterNodeExists(d),this.addRowNodeToRowsToDisplay(d.sibling,e,o,i)))}else if(d.master&&d.expanded){var g=this.createDetailNode(d);this.addRowNodeToRowsToDisplay(g,e,o,i)}}},e.prototype.addRowNodeToRowsToDisplay=function(t,e,o,r){var i=this.gridOptionsWrapper.isGroupMultiAutoColumn();e.push(t),t.setUiLevel(i?0:r)},e.prototype.ensureFooterNodeExists=function(t){if(!n.A.exists(t.sibling)){var e=new n.v;this.context.createBean(e),Object.keys(t).forEach(function(o){e[o]=t[o]}),e.footer=!0,e.setRowTop(null),e.setRowIndex(null),e.oldRowTop=null,n.A.exists(e.id)&&(e.id="rowGroupFooter_"+e.id),e.sibling=t,t.sibling=e}},e.prototype.createDetailNode=function(t){if(n.A.exists(t.detailNode))return t.detailNode;var e=new n.v;return this.context.createBean(e),e.detail=!0,e.selectable=!1,e.parent=t,n.A.exists(t.id)&&(e.id="detail_"+t.id),e.data=t.data,e.level=t.level+1,t.detailNode=e,e},y([Object(n.b)("selectionController")],e.prototype,"selectionController",void 0),y([Object(n.b)("columnController")],e.prototype,"columnController",void 0),y([Object(n.d)("flattenStage")],e)}(n.e),A=function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function r(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}(),N=function(t,e,o,r){var i,n=arguments.length,s=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(n<3?i(s):n>3?i(e,o,s):i(e,o))||s);return n>3&&s&&Object.defineProperty(e,o,s),s},R=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return A(e,t),e.prototype.init=function(){this.postSortFunc=this.gridOptionsWrapper.getPostSortFunc()},e.prototype.sort=function(t,e,o,r,i,n){var s=this;i&&i.forEachChangedNodeDepthFirst(function(a){s.pullDownGroupDataForHideOpenParents(a.childrenAfterFilter,!0),a.childrenAfterSort=e?o?s.doDeltaSort(a,t,r,i,n):s.rowNodeSorter.doFullSort(a.childrenAfterFilter,t):a.childrenAfterFilter.slice(0),s.updateChildIndexes(a),s.postSortFunc&&s.postSortFunc(a.childrenAfterSort)}),this.updateGroupDataForHiddenOpenParents(i)},e.prototype.mapNodeToSortedNode=function(t,e){return{currentPos:e,rowNode:t}},e.prototype.doDeltaSort=function(t,e,o,r,i){var n=t.childrenAfterSort.filter(function(t){var e=!o[t.id],n=i||r&&r.canSkip(t);return e&&n}).map(this.mapNodeToSortedNode.bind(this)),s={};n.forEach(function(t){return s[t.rowNode.id]=t.rowNode});var a=t.childrenAfterFilter.filter(function(t){return!s[t.id]}).map(this.mapNodeToSortedNode.bind(this));return a.sort(this.rowNodeSorter.compareRowNodes.bind(this,e)),(0===a.length?n:0===n.length?a:this.mergeSortedArrays(e,n,a)).map(function(t){return t.rowNode})},e.prototype.mergeSortedArrays=function(t,e,o){for(var r=[],i=0,n=0;i<e.length&&n<o.length;){var s=this.rowNodeSorter.compareRowNodes(t,e[i],o[n]);r.push(s<0?e[i++]:o[n++])}for(;i<e.length;)r.push(e[i++]);for(;n<o.length;)r.push(o[n++]);return r},e.prototype.updateChildIndexes=function(t){if(!n.A.missing(t.childrenAfterSort))for(var e=t.childrenAfterSort,o=0;o<e.length;o++){var r=e[o],i=o===t.childrenAfterSort.length-1;r.setFirstChild(0===o),r.setLastChild(i),r.setChildIndex(o)}},e.prototype.updateGroupDataForHiddenOpenParents=function(t){var e=this;if(this.gridOptionsWrapper.isGroupHideOpenParents()){var o=function(t){e.pullDownGroupDataForHideOpenParents(t.childrenAfterSort,!1),t.childrenAfterSort.forEach(function(t){t.hasChildren()&&o(t)})};t&&t.executeFromRootNode(function(t){return o(t)})}},e.prototype.pullDownGroupDataForHideOpenParents=function(t,e){var o=this;this.gridOptionsWrapper.isGroupHideOpenParents()&&!n.A.missing(t)&&t.forEach(function(t){o.columnController.getGroupDisplayColumns().forEach(function(r){var i=r.getColDef().showRowGroup;if("string"==typeof i){var n=o.columnController.getPrimaryColumn(i);if(n!==t.rowGroupColumn)if(e)t.setGroupValue(r.getId(),null);else{var s=t.getFirstChildOfFirstChild(n);s&&t.setGroupValue(r.getId(),s.key)}}else console.error("AG Grid: groupHideOpenParents only works when specifying specific columns for colDef.showRowGroup")})})},N([Object(n.b)("columnController")],e.prototype,"columnController",void 0),N([Object(n.b)("rowNodeSorter")],e.prototype,"rowNodeSorter",void 0),N([n.q],e.prototype,"init",null),N([Object(n.d)("sortService")],e)}(n.e),O=function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function r(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}(),b=function(t,e,o,r){var i,n=arguments.length,s=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(n<3?i(s):n>3?i(e,o,s):i(e,o))||s);return n>3&&s&&Object.defineProperty(e,o,s),s},m=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return O(e,t),e.prototype.postConstruct=function(){this.doingTreeData=this.gridOptionsWrapper.isTreeData()},e.prototype.filter=function(t){var e=this.filterManager.isAnyFilterPresent();this.filterNodes(e,t)},e.prototype.filterNodes=function(t,e){var o=this,r=function(e,r){e.hasChildren()?(e.childrenAfterFilter=t&&!r?e.childrenAfterGroup.filter(function(t){var e=t.childrenAfterFilter&&t.childrenAfterFilter.length>0,r=t.data&&o.filterManager.doesRowPassFilter({rowNode:t});return e||r}):e.childrenAfterGroup,o.setAllChildrenCount(e)):(e.childrenAfterFilter=e.childrenAfterGroup,e.setAllChildrenCount(null))};if(this.doingTreeDataFiltering()){var i=function(t,e){if(t.childrenAfterGroup)for(var n=0;n<t.childrenAfterGroup.length;n++){var s=t.childrenAfterGroup[n],a=e||o.filterManager.doesRowPassFilter({rowNode:s});s.childrenAfterGroup?i(t.childrenAfterGroup[n],a):r(s,a)}r(t,e)};e.executeFromRootNode(function(t){return i(t,!1)})}else e.forEachChangedNodeDepthFirst(function(t){return r(t,!1)},!0)},e.prototype.setAllChildrenCountTreeData=function(t){var e=0;t.childrenAfterFilter.forEach(function(t){e++,e+=t.allChildrenCount}),t.setAllChildrenCount(e)},e.prototype.setAllChildrenCountGridGrouping=function(t){var e=0;t.childrenAfterFilter.forEach(function(t){t.group?e+=t.allChildrenCount:e++}),t.setAllChildrenCount(e)},e.prototype.setAllChildrenCount=function(t){this.doingTreeData?this.setAllChildrenCountTreeData(t):this.setAllChildrenCountGridGrouping(t)},e.prototype.doingTreeDataFiltering=function(){return this.gridOptionsWrapper.isTreeData()&&!this.gridOptionsWrapper.isExcludeChildrenWhenTreeDataFiltering()},b([Object(n.b)("filterManager")],e.prototype,"filterManager",void 0),b([n.q],e.prototype,"postConstruct",null),b([Object(n.d)("filterService")],e)}(n.e),C=function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function r(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}(),T=function(t,e,o,r){var i,n=arguments.length,s=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(n<3?i(s):n>3?i(e,o,s):i(e,o))||s);return n>3&&s&&Object.defineProperty(e,o,s),s},S=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return C(e,t),e.prototype.postConstruct=function(){this.rowModel.getType()===n.j.ROW_MODEL_TYPE_CLIENT_SIDE&&(this.clientSideRowModel=this.rowModel)},e.prototype.createTransactionForRowData=function(t){if(n.A.missing(this.clientSideRowModel))console.error("AG Grid: ImmutableService only works with ClientSideRowModel");else{var e=this.gridOptionsWrapper.getRowNodeIdFunc();if(e&&!n.A.missing(e)){var o={remove:[],update:[],add:[]},r=this.clientSideRowModel.getCopyOfNodesMap(),i=this.gridOptionsWrapper.isSuppressMaintainUnsortedOrder()?null:{};return n.A.exists(t)&&t.forEach(function(t,n){var s=e(t),a=r[s];i&&(i[s]=n),a?(a.data!==t&&o.update.push(t),r[s]=void 0):o.add.push(t)}),n.A.iterateObject(r,function(t,e){e&&o.remove.push(e.data)}),[o,i]}console.error("AG Grid: ImmutableService requires getRowNodeId() callback to be implemented, your row data need IDs!")}},T([Object(n.b)("rowModel")],e.prototype,"rowModel",void 0),T([n.q],e.prototype,"postConstruct",null),T([Object(n.d)("immutableService")],e)}(n.e),E={moduleName:n.n.ClientSideRowModelModule,beans:[h,g,v,R,m,S],rowModels:{clientSide:l}}}}]);