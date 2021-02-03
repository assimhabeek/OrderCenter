import {Component} from '@angular/core';
import {GridApi} from '@ag-grid-enterprise/all-modules';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmService} from '../../services/confirm.service';
import {AlertService} from '../../services/alert.service';
import {ExportHistoryService} from '../../services/export-history.service';
import {DownloadExportButtonComponent} from '../download-export-button.component';

@Component({
  selector: 'ct-skus-list',
  templateUrl: './export-history.component.html',
  styleUrls: ['./export-history.component.scss']
})
export class ExportHistoryComponent {

  gridApi!: GridApi;
  gridColumnApi: any;
  rowData = [];
  columns: any;
  options!: any;
  selected!: any;
  modules: any = [];

  constructor(public historyService: ExportHistoryService,
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
    this.historyService.getHistory().subscribe(res => {
      if (res.status) {
        this.gridApi.setRowData(res.data);
      }
    });
  }

  defineHeader(): void {
    this.columns = [
      {
        field: 'download',
        cellRenderer: 'archiveButtonDownload',
        headerName: '/'
      },
      {
        field: 'fileName',
        headerName: 'Name',
      },
      {
        field: 'startDate',
        headerName: 'From',
      },
      {
        field: 'endDate',
        headerName: 'To',
      },
      {
        field: 'type',
        headerName: 'Type',
      },
      {
        field: 'exportedBy',
        headerName: 'Exported By',
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
        editable: false,
      },
      animateRows: true,
      rowSelection: 'single',
      columnDefs: this.columns,
      onGridReady: this.onGridReady.bind(this),
      paginationAutoPageSize: true,
      frameworkComponents: {
        archiveButtonDownload: DownloadExportButtonComponent
      }
    };

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
    this.confirmService.requestConfirmation(
      'Delete confirmation',
      'Are you sure you want to delete this record, ' +
      'All related orders will remain achieved ' +
      ' If you want to edit them need to unarchive them manually '
    ).subscribe(confirmation => {

      if (confirmation) {
        this.removeRow(selectedRow);
      }

    });
  }

  removeRow(selectedRow: any): void {
    this.historyService.deleteRow(+selectedRow.data.id).subscribe(x => {
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


  onSuccess(message: string) {
    this.alertService.alertSuccess(message);
  }


  onError(error: string): void {
    this.alertService.alertError(error);
    this.refresh();
  }


}
