import {Component} from '@angular/core';
import {ICellRendererAngularComp} from '@ag-grid-community/angular';

@Component({
    selector: `ct-checkbox-cell`,
    template: `
        <mat-checkbox [ngModel]="checked" (ngModelChange)="onChange($event)"></mat-checkbox>
    `,
    styles: [
        `

            ::ng-deep
            .mat-checkbox-layout {
                /* horizontally align the checkbox */
                width: 100%;
                display: inline-block !important;
                text-align: center;
                margin-top: -4px;
                margin-left: 2px;
                /* to offset the cells internal padding - could be done in cells CSS instead*/
                /* vertically align the checkbox when not using the ag-material theme - should be the same as the
                rowHeight - cell padding
                   (you can of course alter the cell padding via CSS instead if you'd prefer)
                 */
                line-height: 36px;

            }

            ::ng-deep
            .mat-checkbox-layout .mat-ripple-element {
                opacity: 0.2;
            }
        `
    ]
})
export class MatCheckboxComponent implements ICellRendererAngularComp {
    params: any;
    checked = false;

    agInit(params: any): void {
        this.params = params;
        this.checked = this.params.value;
    }

    onChange(checked: boolean): void {
        this.checked = checked;
        this.params.node.setDataValue(this.params.colDef, this.checked);

        if (this.params.eGridCell) {
            this.params.eGridCell.focus();
        }
    }

    refresh(): boolean {
        return false;
    }
}
