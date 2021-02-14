import {Component} from '@angular/core';
import {OrdersService} from '../../services/orders.service';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AlertService} from '../../services/alert.service';
import {ConfirmService} from '../../services/confirm.service';
import {FormControl, FormGroup} from '@angular/forms';
import {TooltipComponent} from '../../shared/tooltip.component';
import {GridApi, ServerSideRowModelModule} from '@ag-grid-enterprise/all-modules';
import {Helpers} from '../../ultils/Helpers';
import {FocusMonitor} from '@angular/cdk/a11y';
import {ArchiveButtonComponent} from './archive-button.component';


@Component({
  selector: 'ct-archived-orders',
  templateUrl: './archived-orders.component.html',
  styleUrls: ['./archived-orders.component.scss']
})
export class ArchivedOrdersComponent {

  orderDateForm = new FormGroup({
    orderDate: new FormControl(Helpers.now())
  });

  gridApi!: GridApi;
  gridColumnApi: any;
  orderStatus: number = 0;
  rowData = [];
  columns: any;
  options!: any;
  selected!: any;
  modules: any = [];

  constructor(public ordersService: OrdersService,
              public dialog: MatDialog,
              private _focusMonitor: FocusMonitor,
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

    this.addFilter({lastModification: {filter: Helpers.toMysqlDate(this.orderDateForm.value.orderDate)}});
    this.addFilter({orderStatus: {filter: Helpers.orderStatus.ORDER_ARCHIVED}});
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
      this.addFilter({lastModification: {filter: Helpers.toMysqlDate(x.orderDate)}});
    });
  }

  loadHeaders(): Observable<any> {
    return this.ordersService.getHeader().pipe(tap((header: any) => {
      this.columns = header;
      this.columns[0].hide = false;
      this.columns[0].editable = true;
      this.columns[0].valueSetter = this.setValue.bind(this);
      this.columns[0].cellRenderer = 'archiveButtonRenderer';
    }));
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
        editable: false,
      },
      animateRows: true,
      rowModelType: 'serverSide',
      rowSelection: 'single',
      cacheBlockSize: 10,
      columnDefs: this.columns,
      onGridReady: this.onGridReady.bind(this),
      paginationAutoPageSize: true,
      frameworkComponents: {
        tooltipRenderer: TooltipComponent,
        archiveButtonRenderer: ArchiveButtonComponent,
      }
    };

  }

  refresh(): void {
    this.gridApi.purgeServerSideCache();
  }


  async setValue(params: any) {
    const toUpdate = {id: params.data.id, name: params.colDef.field, value: params.newValue};
    console.log(toUpdate);

    params.data[params.colDef.field] = params.newValue;
    const response = await this.ordersService.updateCell(toUpdate);

    const callback = response.status ? this.onSuccess.bind(this) : this.onError.bind(this);
    callback(response.message);

    this.refresh();

    return response.status;
  }


  noRowSelected() {
    const selectedRows = this.gridApi ? this.gridApi.getSelectedNodes() : null;
    return !selectedRows || selectedRows.length === 0;
  }


  onSuccess(message: string) {
    this.alertService.alertSuccess(message);
  }


  onError(error: string): void {
    this.alertService.alertError(error);
  }

  clearFilters() {
    this.orderDateForm.reset({orderDate: null});
    this.gridApi.setFilterModel({orderStatus: {filter: Helpers.orderStatus.ORDER_ARCHIVED}});
    this.refresh();
  }
}
