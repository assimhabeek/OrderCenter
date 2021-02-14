import {Component} from '@angular/core';
import {MatSelectComponent} from '../../shared/mat-select.component';
import {VehiclesService} from '../../services/vehicles.service';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {GridApi, ServerSideRowModelModule} from '@ag-grid-enterprise/all-modules';
import {MatDialog} from '@angular/material/dialog';
import {VehiclesFormComponent} from './vehicles-form.component';
import {AlertService} from '../../services/alert.service';
import {ConfirmService} from '../../services/confirm.service';
import {TooltipComponent} from '../../shared/tooltip.component';
import {MatCheckboxComponent} from '../users/mat-checkbox.component';
import {MatMakeModelSelectComponent} from '../active-orders/mat-make-model-select.component';


@Component({
  selector: 'ct-vehicle-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss']
})
export class VehiclesListComponent {

  gridApi!: GridApi;
  gridColumnApi: any;
  rowData = [];
  columns: any;
  options!: any;
  selected!: any;
  modules: any = [];

  constructor(public vehiclesService: VehiclesService,
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
    this.gridApi!.setServerSideDatasource(this.vehiclesService);
  }


  addFilter(filter: any) {
    if (this.gridApi) {
      const filterModel = this.gridApi.getFilterModel() ? this.gridApi.getFilterModel() : {};
      this.gridApi.setFilterModel(Object.assign(filterModel, filter));
    }
  }

  loadHeaders(): Observable<any> {
    return this.vehiclesService.getHeader().pipe(tap((header: any) => this.columns = header));
  }

  setupOptions(): void {
    this.options = {
      pagination: false,
      tooltipShowDelay: 0,
      defaultColDef: {
        sortable: true,
        filter: true,
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
    const response = await this.vehiclesService.updateCell(toUpdate);

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
    this.vehiclesService.deleteRow(+selectedRow.data.id).subscribe(x => {
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
    const dialogRef = this.dialog.open(VehiclesFormComponent, {
      width: '100%',
      disableClose: true,
      data: selectedRow
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vehiclesService.addRow(result).subscribe(x => {
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



}
