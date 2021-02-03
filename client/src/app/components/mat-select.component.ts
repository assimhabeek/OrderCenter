import {AfterViewInit, Component, ViewChild, ViewContainerRef} from '@angular/core';
import {ICellEditorAngularComp} from 'ag-grid-angular';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'ct-mat-select',
  template: `
    <mat-card>
      <div class="container" #group tabindex="0" (keydown)="onKeyDown($event)">
        <mat-form-field>
          <mat-select panelClass="ag-custom-component-popup" [(ngModel)]="currentElement">
            <mat-option *ngFor="let e of elements" [value]="e">
              {{ e }}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>
    </mat-card>
  `,
  styles: [`

    mat-form-field {
      width: 100px;
    }

    .container:focus {
      outline: none;
    }`
  ]
})

export class MatSelectComponent implements AfterViewInit, ICellEditorAngularComp {
  private params: any;

  elements!: string[];
  currentElement!: string;
  private selectedIndex!: number;

  @ViewChild('group', {read: ViewContainerRef}) group!: any;
  @ViewChild(MatSelect) select!: MatSelect;

  static preventDefaultAndPropagation($event: any): void {
    $event.preventDefault();
    $event.stopPropagation();
  }

  agInit(params: any): void {
    this.params = params;

    this.currentElement = this.params.value;
    this.elements = this.params.elements;

    this.selectedIndex = this.elements.findIndex(item => {
      return item === this.params.value;
    });
  }

  // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
  ngAfterViewInit(): void {
    window.setTimeout(() => {
      this.group.element.nativeElement.focus();
    });
    this.selectCurrentElementBasedOnSelectedIndex();
  }

  private selectCurrentElementBasedOnSelectedIndex(): void {
    this.currentElement = this.elements[this.selectedIndex];
  }

  getValue(): string {
    return this.currentElement;
  }

  isPopup(): boolean {
    return true;
  }

  onKeyDown($event: any): void {
    const key = $event.key;
    if (key === 38 || key === 40) {
      MatSelectComponent.preventDefaultAndPropagation($event);

      if (key === 38) {
        this.selectedIndex = this.selectedIndex === 0 ? this.elements.length - 1 : this.selectedIndex - 1;
      } else if (key === 40) {
        this.selectedIndex = this.selectedIndex === this.elements.length - 1 ? 0 : this.selectedIndex + 1;
      }
      this.selectCurrentElementBasedOnSelectedIndex();
    }
  }


}
