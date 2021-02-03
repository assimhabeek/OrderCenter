import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'ct-order-status-button',
  template: `
    <button *ngIf="value==1" mat-flat-button (click)="onClick(2)" color="primary">Queue</button>
    <button *ngIf="value==2" mat-flat-button (click)="onClick(1)" color="warn">UnQueue</button>
  `,
  styles: []
})
export class QueueButtonComponent implements ICellRendererAngularComp {
  params: any;
  value!: number;

  agInit(params: any): void {
    this.params = params;
    this.value = +this.params.value;
  }

  onClick(status: number) {
    this.value = status;
    this.params.node.setDataValue(this.params.colDef, this.value);
  }

  refresh(params: any): boolean {
    return true;
  }
}
