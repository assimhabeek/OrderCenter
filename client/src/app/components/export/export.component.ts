import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrdersService} from '../../services/orders.service';
import {Helpers} from '../../ultils/Helpers';
import {GridApi, RowNode} from '@ag-grid-community/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmService} from '../../services/confirm.service';
import {AlertService} from '../../services/alert.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {TooltipComponent} from '../../shared/tooltip.component';
import {HttpResponse} from '@angular/common/http';
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';


@Component({
    selector: 'ct-export',
    templateUrl: './export.component.html',
    styleUrls: ['./export.component.scss']
})
export class ExportComponent {

    gridApi!: GridApi;
    gridColumnApi: any;
    orderStatus = 2;
    rowData = [];
    columns: any;
    options!: any;
    selected!: any;
    modules: any = [ClientSideRowModelModule];

    currentFileParams: any = {};

    orderDateRange = new FormGroup({
        startDate: new FormControl(Helpers.now(), Validators.required),
        endDate: new FormControl(Helpers.now(), Validators.required),
        type: new FormControl('carifex', Validators.required),
    });


    constructor(public ordersService: OrdersService,
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


    exportOrders(): void {

        let data: any[];
        data = [];
        this.gridApi.forEachNode((row: RowNode) => {
            data.push(row.data);
        });

        if (data.length === 0) {
            this.onError('Nothing to export');
            return;
        }

        this.currentFileParams.data = data;

        this.confirmService.requestConfirmation('Export Confirmation', 'All the visible orders will be achieved automatically, Would you like to proceed ?').subscribe(answer => {
            if (answer) {
                this.ordersService.exportOrders(this.currentFileParams).subscribe((res: HttpResponse<any>) => {
                    this.saveAsExcelFile(res.body, res.headers.get('x-file-name') || '');
                    this.refresh();
                });
            }
        });

    }

    getFormattedDates(): {} {
        const value = this.orderDateRange.value;
        const startDate: any = value.startDate;
        const endDate: any = value.endDate;
        startDate.startOf('day');
        endDate.endOf('day');
        return {
            formattedStart: Helpers.formatDate(startDate),
            formattedEnd: Helpers.formatDate(endDate)
        };
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
        this.save(data, fileName);
    }

    save(content: Blob, filename: string): void {
        const element = document.createElement('a');
        element.setAttribute('href', (window.webkitURL || window.URL).createObjectURL(content));
        element.setAttribute('download', filename);
        element.dataset.downloadurl = ['text/plain', element.download, element.href].join(':');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    onGridReady(params: any): void {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.listenToOrderDateForm();
        this.refresh();

    }


    listenToOrderDateForm(): void {
        if (this.orderDateRange.valid) {
            this.orderDateRange.valueChanges.subscribe(() => {
                this.refresh();
            });
        }
    }

    loadHeaders(): Observable<any> {
        return this.ordersService.getHeader().pipe(tap((header: any) => {
            this.columns = header;
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
            frameworkComponents: {
                tooltipRenderer: TooltipComponent
            }
        };

    }

    refresh(): void {
        if (this.orderDateRange.valid) {

            const dates: any = this.getFormattedDates();
            this.ordersService.loadOrdersByRange(dates.formattedStart, dates.formattedEnd, this.orderDateRange.value.type)
                .subscribe(res => {
                    if (res.status) {
                        this.rowData = res.data;
                        this.currentFileParams = {
                            startDate: dates.formattedStart,
                            endDate: dates.formattedEnd,
                            type: this.orderDateRange.value.type
                        };
                    } else {
                        this.onError('Couldn\'t load the data');
                    }
                }, error => {
                    this.onError(error.message);
                });
        }
    }

    onSuccess(message: string): any {
        this.alertService.alertSuccess(message);
    }


    onError(error: string): void {
        this.alertService.alertError(error);
    }

    clearFilters(): void {
        this.orderDateRange.reset({orderDate: null});
        this.gridApi?.setFilterModel({});
        this.refresh();
    }

}
