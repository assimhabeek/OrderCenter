import {Component} from '@angular/core';
import {GridApi} from '@ag-grid-community/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmService} from '../../services/confirm.service';
import {AlertService} from '../../services/alert.service';
import {OrdersService} from '../../services/orders.service';
import {HttpErrorResponse} from '@angular/common/http';
import {SyncProductsService} from '../../services/sync-products.service';
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';

@Component({
    selector: 'ct-users-list',
    templateUrl: './shopify-products.component.html',
    styleUrls: ['./shopify-products.component.scss']
})
export class ShopifyProductsComponent {

    gridApi!: GridApi;
    gridColumnApi: any;
    rowData = [];
    columns: any;
    options!: any;
    duplications: [] = [];
    selected!: any;
    modules: any = [ClientSideRowModelModule];
    disableImport = false;

    constructor(public syncProductsService: SyncProductsService,
                public ordersService: OrdersService,
                public dialog: MatDialog,
                public confirmService: ConfirmService,
                public alertService: AlertService) {

        this.defineHeader();
        this.setupOptions();
    }


    onGridReady(params: any): void {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.refresh();
    }

    refresh(): void {
        this.syncProductsService.getShopifyProducts().subscribe(res => {
            if (res.status) {
                this.rowData = res.data;
                this.gridApi.setRowData(res.data);
                this.setAutoSize();
            }
        });
    }

    defineHeader(): void {
        this.columns = [
            {
                field: 'id',
                headerName: 'Product Id',

            },
            {
                field: 'productName',
                headerName: 'Product name',

            },
            {
                field: 'productTitle',
                headerName: 'Product title',
            }
        ];
    }

    setupOptions(): void {
        this.options = {
            pagination: false,
            defaultColDef: {
                filter: false,
                sortable: false,
                resizable: true
            },
            animateRows: true,
            rowSelection: 'single',
            columnDefs: this.columns,
            onGridReady: this.onGridReady.bind(this),
            paginationAutoPageSize: true,
        };

    }


    insertOrders(): void {
        this.syncProductsService.import(this.rowData).subscribe(res => {
                if (res.status) {
                    this.onSuccess(res.message);
                } else {
                    console.log(res);
                    this.disableImport = false;
                    this.onError(res.message);
                }
            },
            (error: HttpErrorResponse) => {
                this.disableImport = false;
                console.log(error);
                this.onError(error.message);
            });
    }


    onSuccess(message: string): void {
        this.alertService.alertSuccess(message);
    }


    onError(error: string): void {
        this.alertService.alertError(error);
        this.refresh();
    }

    setAutoSize(): void {
        const allColumnIds: any[] = [];
        this.gridColumnApi.getAllColumns()?.forEach((column: any) => {
            allColumnIds.push(column.colId);
        });
        this.gridColumnApi?.autoSizeColumns(allColumnIds, false);
    }


}
