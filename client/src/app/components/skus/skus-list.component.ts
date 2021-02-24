import {Component} from '@angular/core';
import {GridApi} from '@ag-grid-community/core';
import {SkusService} from '../../services/skus.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSelectComponent} from '../../shared/mat-select.component';
import {SkusFormComponent} from './skus-form.component';
import {ConfirmService} from '../../services/confirm.service';
import {AlertService} from '../../services/alert.service';
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';

@Component({
    selector: 'ct-skus-list',
    templateUrl: './skus-list.component.html',
    styleUrls: ['./skus-list.component.scss']
})
export class SkusListComponent {

    gridApi!: GridApi;
    gridColumnApi: any;
    rowData = [];
    columns: any;
    options!: any;
    selected!: any;
    modules: any = [ClientSideRowModelModule];

    constructor(public skusService: SkusService,
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
        this.skusService.getSkus().subscribe(res => {
            if (res.status) {
                this.gridApi.setRowData(res.data);
            }
        });
    }

    defineHeader(): void {
        this.columns = [
            {
                field: 'name',
                headerName: 'Name',
            },
            {
                field: 'skuType',
                headerName: 'SKU type',
                cellEditor: 'selectEditor',
                cellEditorParams: {
                    elements: [
                        'BULB_TYPE',
                        'BULB_TYPE_FOG_LIGHT',
                        'HIGH_BEAM',
                        'LOW_BEAM',
                        'FOG_LIGHT',
                        'HB_CAN_BUS',
                        'LB_CAN_BUS'
                    ]
                },
            }
        ];
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
        const response = await this.skusService.updateCell(toUpdate);

        const callback = response.status ? this.onSuccess.bind(this) : this.onError.bind(this);
        callback(response.message);

        return response.status;
    }

    noRowSelected(): any {
        const selectedRows = this.gridApi ? this.gridApi.getSelectedNodes() : null;
        return !selectedRows || selectedRows.length === 0;
    }

    onRemove(): void {
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
        this.skusService.deleteRow(+selectedRow.data.id).subscribe(x => {
            if (x.status) {
                this.gridApi.deselectAll();
                this.refresh();
                this.onSuccess(x.message);
            } else {
                console.log(x);
                this.onError(x.message);
            }
        });
    }


    onAdd(): void {
        this.openDialog({});
    }


    onDuplicate(): void {
        const selectedRows = this.gridApi.getSelectedNodes();
        if (!selectedRows || selectedRows.length === 0) {
            return;
        }
        const selectedRow = selectedRows[0];
        const row: any = selectedRow.data;
        this.openDialog(row);
    }


    openDialog(selectedRow: any): void {
        const dialogRef = this.dialog.open(SkusFormComponent, {
            data: selectedRow,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {

                this.skusService.addRow(result).subscribe(x => {
                    if (x.status) {
                        this.gridApi.deselectAll();
                        this.refresh();
                        this.onSuccess(x.message);
                    } else {
                        console.log(x);
                        this.onError(x.message);
                    }
                });
            }
        });
    }

    onSuccess(message: string): void {
        this.alertService.alertSuccess(message);
    }


    onError(error: string): void {
        this.alertService.alertError(error);
        this.refresh();
    }


}
