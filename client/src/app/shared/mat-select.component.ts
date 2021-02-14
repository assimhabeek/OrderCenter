import {AfterViewInit, Component, ViewChild, ViewContainerRef} from '@angular/core';
import {ICellEditorAngularComp} from 'ag-grid-angular';
import {MatSelect} from '@angular/material/select';

@Component({
    selector: 'ct-mat-select',
    template: `
        <div class="container" #group tabindex="0" (keydown)="onKeyDown($event)">
            <mat-form-field>
                <mat-select panelClass="ag-custom-component-popup" [(ngModel)]="currentElement">
                    <mat-option *ngFor="let e of elements" [value]="e">
                        {{ e }}
                    </mat-option>
                </mat-select>
            </mat-form-field>
        </div>
    `,
    styles: [`

        mat-form-field {
            width: 100px;
            margin: 0 !important;
            padding: 0 !important;
        }


        .container {
            margin: 0 !important;
            padding: 0 !important;
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
    private selectedIndex!: any;

    @ViewChild('group', {read: ViewContainerRef}) group!: any;
    @ViewChild(MatSelect) select!: MatSelect;


    agInit(params: any): void {
        this.params = params;

        this.currentElement = this.params.value;
        this.elements = this.params.elements;

        this.selectedIndex = Math.max(this.elements.findIndex(item => {
            return item === this.params.value;
        }), 0);
    }

    // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
    ngAfterViewInit(): void {
        window.setTimeout(() => {
            this.group.element.nativeElement.focus();
        });
        this.selectCurrentElementBasedOnSelectedIndex();
        this.select.open();
        this.select.focus({preventScroll: false});
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

    /*
         * A little over complicated for what it is, but the idea is to illustrate how you might navigate through the radio
         * buttons with up & down keys (instead of finishing editing)
         */
    onKeyDown(event: any): void {
        const key = event.which || event.keyCode;
        if (key === 38 || key === 40) {
            this.preventDefaultAndPropagation(event);
            this.select._handleKeydown(event);
            // @ts-ignore
            this.selectedIndex = Math.max(this.select._keyManager.activeItemIndex, 0);
            this.selectCurrentElementBasedOnSelectedIndex();
        }
    }

    preventDefaultAndPropagation(event: any): void {
        event.preventDefault();
        event.stopPropagation();
    }

}
