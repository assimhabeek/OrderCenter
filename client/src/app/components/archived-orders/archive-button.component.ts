import {Component} from '@angular/core';
import {ICellRendererAngularComp} from '@ag-grid-community/angular';

@Component({
    selector: 'ct-archive-button',
    template: `
    <button *ngIf="!isFileSet" mat-flat-button
            (click)="onClick(1)"
            color="accent">UnArchive
    </button>
  `,
    styles: [
        `
        button {
          font-size: 12px !important;
          height: 24px !important;
          padding: 2px !important;
          line-height: 12px !important;
        }
      `
    ]
})
export class ArchiveButtonComponent implements ICellRendererAngularComp {
    params: any;
    value!: number;
    isFileSet!: boolean;

    agInit(params: any): void {
        this.params = params;
        this.isFileSet = this.params.data.exportFile != null;
        this.value = +this.params.value;
    }

    onClick(status: number) {
        this.value = status;
        this.params.node.setDataValue(this.params.colDef, this.value);
    }

    refresh(): boolean {
        return true;
    }
}
