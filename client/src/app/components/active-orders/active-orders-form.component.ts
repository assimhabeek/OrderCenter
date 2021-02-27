import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OrdersService} from '../../services/orders.service';
import {VehiclesService} from '../../services/vehicles.service';
import {AlertService} from '../../services/alert.service';

@Component({
    selector: 'ct-orders-form',
    templateUrl: './active-orders-form.component.html',
    styleUrls: ['./active-orders-form.component.scss']
})
export class ActiveOrdersFormComponent implements OnInit {

    lowBeam = [];
    highBeam = [];
    fogLight = [];
    hbCanBus = [];
    lbCanBus = [];
    years = [];
    make = [];
    model = [];

    constructor(
        public dialogRef: MatDialogRef<ActiveOrdersFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public ordersService: OrdersService,
        public vehiclesService: VehiclesService,
        public alertService: AlertService) {
    }

    ngOnInit(): void {
        this.ordersService.getSKUs().subscribe(skus => {
            this.highBeam = skus.HIGH_BEAM || this.ordersService.addEmptyAndCompletedToSkus([]);
            this.lowBeam = skus.LOW_BEAM || this.ordersService.addEmptyAndCompletedToSkus([]);
            this.fogLight = skus.FOG_LIGHT || this.ordersService.addEmptyAndCompletedToSkus([]);
            this.hbCanBus = skus.HB_CAN_BUS || this.ordersService.addEmptyAndCompletedToSkus([]);
            this.lbCanBus = skus.LB_CAN_BUS || this.ordersService.addEmptyAndCompletedToSkus([]);
        });

        this.vehiclesService.getYear().subscribe(years => {
            this.years = years;
        });
    }

    onYearChange(): void {
        this.vehiclesService.getMake(this.data.vehicleYear).then(make => {
            this.make = make;
        });
    }

    onMakeChange(): void {
        this.vehiclesService.getModel(this.data.vehicleYear, this.data.vehicleMake).then(model => {
            this.model = model;
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
