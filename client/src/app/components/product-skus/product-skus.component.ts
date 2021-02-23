import {Component} from '@angular/core';
import {GridApi} from '@ag-grid-community/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSelectComponent} from '../../shared/mat-select.component';
import {ConfirmService} from '../../services/confirm.service';
import {AlertService} from '../../services/alert.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ProductSkusService} from '../../services/product-skus.service';

@Component({
    selector: 'ct-skus-list',
    templateUrl: './product-skus.component.html',
    styleUrls: ['./product-skus.component.scss']
})
export class ProductSkusComponent {

    gridApi!: GridApi;
    gridColumnApi: any;
    rowData = [];
    columns: any;
    options!: any;
    selected!: any;
    modules: any = [];

    constructor(public productSkusService: ProductSkusService,
                public dialog: MatDialog,
                public confirmService: ConfirmService,
                public alertService: AlertService) {

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
        this.refresh();
    }

    refresh(): void {
        this.productSkusService.getProductSkus().subscribe(res => {
            if (res.status) {
                this.gridApi.setRowData(res.data);
            }
        });
    }

    loadHeaders(): Observable<any> {
        return this.productSkusService.getHeader().pipe(tap((header: any) => this.columns = header));
    }


    setupOptions(): void {
        this.options = {
            pagination: false,
            defaultColDef: {
                filter: true,
                sortable: true,
                resizable: true,
                editable: true,
                valueSetter: this.setValue.bind(this)
            },
            animateRows: true,
            rowSelection: 'single',
            columnDefs: this.columns,
            onGridReady: this.onGridReady.bind(this),
            paginationAutoPageSize: true,
            frameworkComponents: {
                selectEditor: MatSelectComponent,
            }
        };

    }

    async setValue(params: any): Promise<any> {
        const toUpdate = {id: params.data.id, name: params.colDef.field, value: params.newValue};
        params.data[params.colDef.field] = params.newValue;
        const response = await this.productSkusService.updateCell(toUpdate);

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
        this.refresh();
    }


}
