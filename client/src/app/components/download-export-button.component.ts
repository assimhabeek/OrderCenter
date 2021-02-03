import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {HttpResponse} from '@angular/common/http';
import {ExportHistoryService} from '../services/export-history.service';
import * as FileSaver from 'file-saver';
import {AlertService} from '../services/alert.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
    selector: 'ct-download-export-button',
    template: `
        <button mat-flat-button
                (click)="download()"
                color="accent">Download
        </button>
    `,
    styles: []
})
export class DownloadExportButtonComponent implements ICellRendererAngularComp {
    params: any;
    value!: number;
    isFileSet!: boolean;


    constructor(public exportHistoryService: ExportHistoryService,
                public alertService: AlertService) {
    }

    agInit(params: any): void {
        this.params = params;
        this.value = this.params.data.id;
    }

    download() {
        this.exportHistoryService.downloadFile(this.value).subscribe((res: HttpResponse<any>) => {
                this.saveAsExcelFile(res.body, res.headers.get('x-file-name'));
            },
            error => {
                this.alertService.alertError('Couldn\'t load file');
            });
    }

    refresh(params: any): boolean {
        return true;
    }


    saveAsExcelFile(buffer: any, fileName: string | null): void {
        const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
        FileSaver.saveAs(data, fileName + '_export' + EXCEL_EXTENSION);
    }

}
