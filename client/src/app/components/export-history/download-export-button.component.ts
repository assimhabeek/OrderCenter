import {Component} from '@angular/core';
import {ICellRendererAngularComp} from '@ag-grid-community/angular';
import {HttpResponse} from '@angular/common/http';
import {ExportHistoryService} from '../../services/export-history.service';
import {AlertService} from '../../services/alert.service';

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
    styles: [`
        button {
            font-size: 12px !important;
            height: 24px !important;
            padding: 2px !important;
            line-height: 12px !important;
        }
    `]
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

    download(): void {
        this.exportHistoryService.downloadFile(this.value).subscribe((res: HttpResponse<any>) => {
                this.saveAsExcelFile(res.body, res.headers.get('x-file-name'));
            },
            () => {
                this.alertService.alertError('Couldn\'t load file');
            });
    }

    refresh(): boolean {
        return true;
    }


    saveAsExcelFile(buffer: any, fileName: string | null): void {
        const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
        this.save(data, fileName + '_export' + EXCEL_EXTENSION);
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

}
