import {Component} from '@angular/core';
import {MatSelectComponent} from '../../shared/mat-select.component';
import {OrdersService} from '../../services/orders.service';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {GridApi, ServerSideRowModelModule} from '@ag-grid-enterprise/all-modules';
import {MatDialog} from '@angular/material/dialog';
import {AlertService} from '../../services/alert.service';
import {ConfirmService} from '../../services/confirm.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Helpers} from '../../ultils/Helpers';
import {TooltipComponent} from '../../shared/tooltip.component';
import {RowNode} from 'ag-grid-community';
import {MatCheckboxComponent} from '../users/mat-checkbox.component';
import {MatMakeModelSelectComponent} from './mat-make-model-select.component';
import {ActiveOrdersFormComponent} from './active-orders-form.component';

export declare type OrderType = 'all' | 'completed' | 'uncompleted' |
    'carifex completed' | 'carifex uncompleted' |
    'non carifex completed' | 'non carifex uncompleted';

@Component({
    selector: 'ct-order-list',
    templateUrl: './active-orders-list.component.html',
    styleUrls: ['./active-orders-list.component.scss']
})
export class ActiveOrdersListComponent {


    orderType: OrderType = 'all';
    orderDateForm = new FormGroup({
        orderDate: new FormControl(Helpers.now())
    });

    gridApi!: GridApi;
    gridColumnApi: any;
    rowData = [];
    columns: any;
    options!: any;
    selected!: any;
    modules: any = [];

    constructor(public ordersService: OrdersService,
                public dialog: MatDialog,
                public confirmService: ConfirmService,
                public alertService: AlertService) {

        this.modules = [ServerSideRowModelModule];

        this.loadHeaders().subscribe(x => {
                this.setupOptions();
            },
            error => {
                console.log(error);
                this.onError('Could not load grid info');
            });

    }


    onGridReady(params: any): void {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.addFilter({orderDate: {filter: Helpers.toMysqlDate(this.orderDateForm.value.orderDate)}});
        this.addFilter({orderStatus: {filter: Helpers.orderStatus.ORDER_ACTIVE}});
        this.gridApi!.setServerSideDatasource(this.ordersService);
        this.listenToOrderDateForm();
    }


    addFilter(filter: any) {
        if (this.gridApi) {
            const filterModel = this.gridApi.getFilterModel() ? this.gridApi.getFilterModel() : {};
            this.gridApi.setFilterModel(Object.assign(filterModel, filter));
        }
    }

    listenToOrderDateForm(): void {
        this.orderDateForm.valueChanges.subscribe(x => {
            this.addFilter({orderDate: {filter: Helpers.toMysqlDate(x.orderDate)}});
        });
    }

    orderTypeChanged(newValue: OrderType): void {
        this.orderType = newValue;
        if (this.orderType === 'all') {
            this.addFilter({completed: {}});
        } else {
            this.addFilter({completed: {filter: this.orderType}});
        }
    }

    loadHeaders(): Observable<any> {
        return this.ordersService.getHeader().pipe(tap((header: any) => this.columns = header));
    }

    setupOptions(): void {
        this.options = {
            pagination: false,
            tooltipShowDelay: 0,
            defaultColDef: {
                sortable: true,
                filter: true,
                tooltipComponent: 'tooltipRenderer',
                filterParams: {
                    filterOptions: ['contains'],
                    defaultOption: 'contains',
                    suppressAndOrCondition: true
                },
                resizable: true,
                editable: true,
                valueSetter: this.setValue.bind(this)
            },
            animateRows: true,
            rowModelType: 'serverSide',
            rowSelection: 'single',
            cacheBlockSize: 10,
            columnDefs: this.columns,
            onGridReady: this.onGridReady.bind(this),
            paginationAutoPageSize: true,
            frameworkComponents: {
                selectEditor: MatSelectComponent,
                makeSelectEditor: MatMakeModelSelectComponent,
                tooltipRenderer: TooltipComponent,
                checkboxRenderer: MatCheckboxComponent,
            }
        };

    }

    refresh(): void {
        this.gridApi.purgeServerSideCache();
    }

    async setValue(params: any) {

        const toUpdate = {id: params.data.id, name: params.colDef.field, value: params.newValue};
        params.data[params.colDef.field] = params.newValue;
        const response = await this.ordersService.updateCell(toUpdate);

        const callback = response.status ? this.onSuccess.bind(this) : this.onError.bind(this);
        callback(response.message);

        const node: RowNode = params.node;

        if (params.colDef.field === 'vehicleYear') {
            node.setDataValue('vehicleMake', null);
        } else if (params.colDef.field === 'vehicleMake') {
            node.setDataValue('vehicleModel', null);
        } else if (params.colDef.field === 'vehicleMake' && params.newValue != null) {
            // TODO :: update skus
        }

        if (response.status) {
            node.setDataValue('lastModification', Helpers.formatDate(Helpers.now()));
        }
        return response.status;
    }


    noRowSelected() {
        const selectedRows = this.gridApi ? this.gridApi.getSelectedNodes() : null;
        return !selectedRows || selectedRows.length === 0;
    }


    onRemove() {
        const selectedRows = this.gridApi.getSelectedNodes();
        if (!selectedRows || selectedRows.length === 0) {
            return;
        }
        const selectedRow = selectedRows[0];
        this.confirmService.requestDeleteConfirmation().subscribe(confirmation => {

            if (confirmation) {
                this.removeRow(selectedRow);
            }

        });
    }

    removeRow(selectedRow: any): void {
        this.ordersService.deleteRow(+selectedRow.data.id).subscribe(x => {
            if (x.status) {
                this.gridApi.deselectAll();
                this.gridApi.purgeServerSideCache();
                this.onSuccess(x.message);
            } else {
                this.onError(x.message);
            }
        });
    }

    onAdd() {
        this.openDialog({});
    }

    isExternalFilterPresent() {
        return this.orderType !== 'all';
    }

    onDuplicate() {
        const selectedRows = this.gridApi.getSelectedNodes();
        if (!selectedRows || selectedRows.length === 0) {
            return;
        }
        const selectedRow = selectedRows[0];
        const row: any = selectedRow.data;
        this.openDialog(row);
    }


    openDialog(selectedRow: any): void {
        const dialogRef = this.dialog.open(ActiveOrdersFormComponent, {
            width: '100%',
            disableClose: true,
            data: selectedRow
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.ordersService.addRow(result).subscribe(x => {
                    if (x.status) {
                        this.gridApi.deselectAll();
                        this.gridApi.purgeServerSideCache();
                        this.onSuccess(x.message);
                    } else {
                        console.log(x);
                        this.onError(x.message);
                    }
                });
            }
        });
    }

    onSuccess(message: string) {
        this.alertService.alertSuccess(message);
    }


    onError(error: string): void {
        this.alertService.alertError(error);
    }

    clearFilters() {
        this.orderDateForm.reset({orderDate: null});
        this.orderType = 'all';
        this.gridApi.setFilterModel({orderStatus: {filter: Helpers.orderStatus.ORDER_ACTIVE}});
    }


}
