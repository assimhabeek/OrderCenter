import {Component, ViewEncapsulation} from '@angular/core';
import {ITooltipAngularComp} from 'ag-grid-angular';
import {Helpers} from '../ultils/Helpers';

@Component({
  selector: 'tooltip-component',
  template: `
    <div class="tooltip">
      <p>
        {{parseDate()}}
      </p>
    </div>`,
  styles: [
    `
      :host {
        position: absolute;
        width: 150px;
        height: 70px;
        pointer-events: none;
        transition: opacity 1s;
      }

      :host.ag-tooltip-hiding {
        opacity: 0;
      }

      .tooltip p {
        margin: 5px;
        padding: 8px;
        background: rgba(0, 0, 0, 0.9);
        color: #eeeeee;
        white-space: nowrap;
      }

    `,
  ],
})
export class TooltipComponent implements ITooltipAngularComp {
  params: any;
  data: any;

  agInit(params: any): void {
    this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
  }

  parseDate() {
    Helpers.fromMysqlDateTime(this.data.lastModification).format('YYYY-MM-DD HH:mm:ss');
  }
}
