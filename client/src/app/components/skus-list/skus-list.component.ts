import {Component} from '@angular/core';
import {GridApi} from '@ag-grid-enterprise/all-modules';
import {SkusService} from '../../services/skus.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSelectComponent} from '../mat-select.component';
import {SkusFormComponent} from '../skus-form/skus-form.component';
import {ConfirmService} from '../../services/confirm.service';
import {AlertService} from '../../services/alert.service';

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
    modules: any = [];

    constructor(public skusService: SkusService,
                public dialog: MatDialog,
                public confirmService: ConfirmService,
                public alertService: AlertService) {

        this.defineHeader();
        this.setupOptions();
    }


    onGridReady(params: any) {
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
                        'bulbType',
                        'bulbTypeFogLight',
                        'highBeam',
                        'lowBeam',
                        'fogLight',
                        'hbCanBus',
                        'lbCanBus'
                    ]
                },
            }
        ];
    }

    setupOptions() {
        this.options = {
            rowHeight: 48,
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

    async setValue(params: any) {
        const toUpdate = {id: params.data.id, name: params.colDef.field, value: params.newValue};
        params.data[params.colDef.field] = params.newValue;
        const response = await this.skusService.updateCell(toUpdate);

        const callback = response.status ? this.onSuccess.bind(this) : this.onError.bind(this);
        callback(response.message);

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


    onAdd() {
        this.openDialog({});
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

    onSuccess(message: string) {
        this.alertService.alertSuccess(message);
    }


    onError(error: string): void {
        this.alertService.alertError(error);
        this.refresh();
    }


}
