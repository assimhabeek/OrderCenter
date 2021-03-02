import {AfterViewInit, Component, ViewChild, ViewContainerRef} from '@angular/core';
import {ICellEditorAngularComp} from '@ag-grid-community/angular';
import {MatSelect} from '@angular/material/select';
import {VehiclesService} from '../../services/vehicles.service';

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

export class MatMakeModelSelectComponent implements AfterViewInit, ICellEditorAngularComp {
    elements: string[] = [];
    currentElement!: string;
    @ViewChild('group', {read: ViewContainerRef}) group!: any;
    @ViewChild(MatSelect) select!: MatSelect;
    private params: any;
    private selectedIndex!: number;

    constructor(public vehicleService: VehiclesService) {
    }

    static preventDefaultAndPropagation($event: any): void {
        $event.preventDefault();
        $event.stopPropagation();
    }

    async agInit(params: any): Promise<void> {
        this.params = params;

        this.currentElement = this.params.value;
        await this.getElement(params.requested);
        this.selectedIndex = this.elements.findIndex(item => {
            return item === this.params.value;
        });
    }

    async getElement(requested: string): Promise<any> {
        const year = this.params.node.data.vehicleYear;
        if (requested === 'make') {
            this.elements = await this.vehicleService.getMake(year);
        } else {
            const make = this.params.node.data.vehicleMake;
            this.elements = await this.vehicleService.getModel(year, make);
        }
    }

    // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
    ngAfterViewInit(): void {
        window.setTimeout(() => {
            this.group.element.nativeElement.focus();
        });
        this.selectCurrentElementBasedOnSelectedIndex();
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
            MatMakeModelSelectComponent.preventDefaultAndPropagation($event);

            if (key === 38) {
                this.selectedIndex = this.selectedIndex === 0 ? this.elements.length - 1 : this.selectedIndex - 1;
            } else if (key === 40) {
                this.selectedIndex = this.selectedIndex === this.elements.length - 1 ? 0 : this.selectedIndex + 1;
            }
            this.selectCurrentElementBasedOnSelectedIndex();
        }
    }

    private selectCurrentElementBasedOnSelectedIndex(): void {
        this.currentElement = this.elements[this.selectedIndex];
    }


}
