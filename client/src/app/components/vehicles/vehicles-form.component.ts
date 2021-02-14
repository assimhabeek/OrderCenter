import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {VehiclesService} from '../../services/vehicles.service';

@Component({
    selector: 'ct-vehicles-form',
    templateUrl: './vehicles-form.component.html',
    styleUrls: ['./vehicles-form.component.scss']
})
export class VehiclesFormComponent implements OnInit {

    lowBeam!: [];
    highBeam!: [];
    fogLight!: [];
    highLowBeam!: any;

    constructor(
        public dialogRef: MatDialogRef<VehiclesFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public vehiclesService: VehiclesService) {
    }

    ngOnInit(): void {
        this.vehiclesService.getSKUs().subscribe((skus) => {
            this.highBeam = skus['HIGH_BEAM'];
            this.lowBeam = skus['LOW_BEAM'];
            this.fogLight = skus['FOG_LIGHT'];
            this.highLowBeam = this.highBeam.filter(value => this.lowBeam.includes(value));
        });

    }

    cancel(): void {
        this.dialogRef.close(false);
    }

    save($event: any): void {
        if (!$event.invalid) {
            this.dialogRef.close(this.data);
        }
    }

}
