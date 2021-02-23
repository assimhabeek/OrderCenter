import {Component} from '@angular/core';
import {GridApi} from '@ag-grid-community/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmService} from '../../services/confirm.service';
import {AlertService} from '../../services/alert.service';
import {SyncOrdersService} from '../../services/sync-orders.service';
import {Observable, of} from 'rxjs';
import {OrdersService} from '../../services/orders.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'ct-users-list',
    templateUrl: './shopify-orders.component.html',
    styleUrls: ['./shopify-orders.component.scss']
})
export class ShopifyOrdersComponent {

    gridApi!: GridApi;
    gridColumnApi: any;
    rowData = [];
    columns: any;
    options!: any;
    duplications: [] = [];
    selected!: any;
    modules: any = [];
    disableImport = false;

    constructor(public syncOrdersService: SyncOrdersService,
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
        this.syncOrdersService.getShopifyProducts().subscribe(res => {
            if (res.status) {
                this.rowData = res.data;
                this.gridApi.setRowData(res.data);
                this.setAutoSize();
                this.duplications = res.duplication;
            }
        });
    }

    defineHeader(): void {
        this.columns = [
            {
                field: 'orderNo',
                headerName: 'Order No',
                pinned: 'left'
            },
            {
                field: 'matchScore',
                headerName: 'Match Score',
                pinned: 'left'
            },
            {
                field: 'quantity',
                headerName: 'Quantity',
                type: 'numericColumn',
            },
            {
                field: 'productName',
                headerName: 'Product name',

            },
            {
                field: 'productTitle',
                headerName: 'Product title',
            },
            {
                field: 'highBeam',
                headerName: 'High Beam',
            },
            {
                field: 'lowBeam',
                headerName: 'Low Beam',
            },
            {
                field: 'fogLight',
                headerName: 'Fog Light',
            },
            {
                field: 'vehicleYear',
                headerName: 'Vehicle Year',
            },
            {
                field: 'vehicleMake',
                headerName: 'Vehicle Make',
            },
            {
                field: 'vehicleModel',
                headerName: 'Vehicle Model',
            },
            {
                field: 'vehicle',
                headerName: 'Original',
            },
            {
                field: 'orderNotes',
                headerName: 'Order notes',

            },
            {
                field: 'additionalDetails',
                headerName: 'Additional details',

            },
            {
                field: 'shippingName',
                headerName: 'Shipping name',

            },
            {
                field: 'shippingAddress1',
                headerName: 'Shipping address1',

            },
            {
                field: 'address2',
                headerName: 'Address2',

            },
            {
                field: 'shippingCity',
                headerName: 'Shipping city',

            },
            {
                field: 'shippingZip',
                headerName: 'Shipping zip',

            },
            {
                field: 'shippingProvince',
                headerName: 'Shipping province',

            },
            {
                field: 'shippingCountryCode',
                headerName: 'Shipping country code',

            },
            {
                field: 'shippingCountry',
                headerName: 'Shipping country',

            },
            {
                field: 'shippingPhone',
                headerName: 'Shipping phone',

            },
            {
                field: 'shippingCompany',
                headerName: 'Shipping company',

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
            rowClassRules: {
                'rag-green': 'data.matchScore > 97',
                'rag-amber': 'data.matchScore >= 85 && data.matchScore <= 97',
                'rag-red': 'data.matchScore < 85 && data.matchScore > 0'
            },
            rowSelection: 'single',
            columnDefs: this.columns,
            onGridReady: this.onGridReady.bind(this),
            paginationAutoPageSize: true,
        };

    }

    insertOrders(): void {

        const insert = this.duplications.length > 0 ? this.askForConfirmation() : of(true);
        this.disableImport = true;
        insert.subscribe(x => {
            if (x) {
                this.ordersService.addAll(this.rowData).subscribe(res => {
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
            } else {
                this.disableImport = false;
            }
        });
    }


    askForConfirmation(): Observable<boolean> {
        return this.confirmService.requestConfirmation(
            'Import confirmation',
            'The Following ORDER No(s) already exist, Importing them my cause ' +
            'duplication, would you like to import them any way ? Duplicated Order No : ' + this.duplications.join(' , '));
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
