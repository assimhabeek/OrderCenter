import {Component} from '@angular/core';
import {OrdersService} from '../../services/orders.service';
import {tap} from 'rxjs/operators';
import {forkJoin, Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AlertService} from '../../services/alert.service';
import {ConfirmService} from '../../services/confirm.service';
import {FormControl, FormGroup} from '@angular/forms';
import {TooltipComponent} from '../../shared/tooltip.component';
import {GridApi, RowNode} from '@ag-grid-community/core';
import {Helpers} from '../../ultils/Helpers';
import {QueueButtonComponent} from './queue-button.component';
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';


@Component({
    selector: 'ct-order-list',
    templateUrl: './export-queue.component.html',
    styleUrls: ['./export-queue.component.scss']
})
export class ExportQueueComponent {

    orderDateForm = new FormGroup({
        orderDate: new FormControl(Helpers.now())
    });

    gridApi!: GridApi;
    gridColumnApi: any;
    orderStatus = 0;
    rowData = [];
    columns: any;
    options!: any;
    selected!: any;
    modules: any = [];

    constructor(public ordersService: OrdersService,
                public dialog: MatDialog,
                public confirmService: ConfirmService,
                public alertService: AlertService) {

        this.modules = [ClientSideRowModelModule];
        this.loadHeaders().subscribe(() => {
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
        this.listenToOrderDateForm();
        this.refresh();

    }


    listenToOrderDateForm(): void {
        this.orderDateForm.valueChanges.subscribe(() => {
            this.gridApi.onFilterChanged();
        });
    }

    loadHeaders(): Observable<any> {
        return this.ordersService.getHeader().pipe(tap((header: any) => {
            this.columns = header;
            this.columns[0].hide = false;
            this.columns[0].editable = true;
            this.columns[0].valueSetter = this.setValue.bind(this);
            this.columns[0].cellRenderer = 'QueueButtonRenderer';
        }));
    }

    setupOptions(): void {
        this.options = {
            pagination: false,
            tooltipShowDelay: 0,
            defaultColDef: {
                sortable: true,
                filter: false,
                tooltipComponent: 'tooltipRenderer',
                filterParams: {
                    filterOptions: ['contains'],
                    defaultOption: 'contains',
                    suppressAndOrCondition: true
                },
                resizable: true,
                editable: false,
            },
            animateRows: true,
            rowSelection: 'single',
            columnDefs: this.columns,
            onGridReady: this.onGridReady.bind(this),
            paginationAutoPageSize: false,
            doesExternalFilterPass: this.filterRows.bind(this),
            isExternalFilterPresent: this.isExternalFilterPresent.bind(this),
            frameworkComponents: {
                tooltipRenderer: TooltipComponent,
                QueueButtonRenderer: QueueButtonComponent,
            }
        };

    }

    refresh(): void {
        if (this.orderStatus === 0) {
            this.loadBoth();
        } else {
            this.loadOne();
        }
    }

    loadBoth(): void {
        forkJoin([
            this.ordersService.getQueueOrders(Helpers.orderStatus.ORDER_ACTIVE),
            this.ordersService.getQueueOrders(Helpers.orderStatus.ORDER_QUEUED)
        ]).subscribe(res => {
            if (res[0].status && res[1].status) {
                this.gridApi.setRowData(res[0].data.concat(res[1].data));
                this.setAutoSize();
            } else {
                this.onError('Couldn\'t load the data');
            }
        }, error => {
            this.onError(error.message);
        });
    }

    loadOne(): void {
        this.ordersService.getQueueOrders(this.orderStatus)
            .subscribe(res => {
                if (res.status) {
                    this.gridApi.setRowData(res.data);
                    this.setAutoSize();
                } else {
                    this.onError('Couldn\'t load the data');
                }
            }, error => {
                this.onError(error.message);
            });
    }

    setAutoSize(): void {
        const allColumnIds: any[] = [];
        this.gridColumnApi.getAllColumns()?.forEach((column: any) => {
            allColumnIds.push(column.colId);
        });
        this.gridColumnApi?.autoSizeColumns(allColumnIds, false);
    }

    async setValue(params: any): Promise<any> {
        const toUpdate = {id: params.data.id, name: params.colDef.field, value: params.newValue};
        console.log(toUpdate);

        params.data[params.colDef.field] = params.newValue;
        const response = await this.ordersService.updateCell(toUpdate);

        const callback = response.status ? this.onSuccess.bind(this) : this.onError.bind(this);
        callback(response.message);

        return response.status;
    }

    noRowSelected(): any {
        const selectedRows = this.gridApi ? this.gridApi.getSelectedNodes() : null;
        return !selectedRows || selectedRows.length === 0;
    }


    onSuccess(message: string): void {
        this.alertService.alertSuccess(message);
    }


    onError(error: string): void {
        this.alertService.alertError(error);
    }

    queueAll(): void {
        this.confirmService.requestConfirmation(
            'Queue all orders',
            'Are you sure you want to add all the visible orders to the export queue.'
        ).subscribe((res) => {
            if (res) {
                this.updateAllRows(Helpers.orderStatus.ORDER_QUEUED);
            }
        });
    }

    unQueueAll(): void {
        this.confirmService.requestConfirmation(
            'UnQueue all orders',
            'Are you sure you want to remove all the visible orders from the export queue.'
        ).subscribe((res) => {
            if (res) {
                this.updateAllRows(Helpers.orderStatus.ORDER_ACTIVE);
            }
        });
    }


    updateAllRows(orderStatus: number): void {
        let ids: any[];
        ids = [];
        this.gridApi.forEachNode((row: RowNode) => {
            ids.push(row.data.id);
        });

        if (ids.length === 0) {
            this.onError('Nothing to queue');
            return;
        }

        this.ordersService.queueAll({value: orderStatus, data: ids}).subscribe(res => {
            if (res.status) {
                this.refresh();
                this.onSuccess(res.message);
            } else {
                this.refresh();
                this.onError(res.message);
            }
        }, err => {
            this.onError(err.message);
        });
    }

    isExternalFilterPresent(): boolean {
        return this.orderDateForm.value.orderDate != null;
    }

    filterRows(node: RowNode): boolean {
        return this.filterByDate(node.data.orderDate, this.orderDateForm.value.orderDate);
    }

    filterByDate(sourceDate: string, searchDate: any): boolean {
        return sourceDate.includes(Helpers.toMysqlDate(searchDate));
    }

    clearFilters(): void {
        this.orderDateForm.reset({orderDate: null});
        this.orderStatus = 0;
        this.gridApi.setFilterModel({});
        this.refresh();
    }
}
