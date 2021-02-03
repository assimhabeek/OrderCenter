import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OrdersService} from '../../services/orders.service';
import {VehiclesService} from '../../services/vehicles.service';
import {AlertService} from '../../services/alert.service';

@Component({
    selector: 'ct-orders-form',
    templateUrl: './orders-form.component.html',
    styleUrls: ['./orders-form.component.scss']
})
export class OrdersFormComponent implements OnInit {

    lowBeam = [];
    highBeam = [];
    fogLight = [];
    bulbTypes = [];
    hbCanBus = [];
    bulbTypeFogLight = [];
    lbCanBus = [];
    years = [];
    make = [];
    model = [];

    constructor(
        public dialogRef: MatDialogRef<OrdersFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public ordersService: OrdersService,
        public vehiclesService: VehiclesService,
        public alertService: AlertService) {
    }

    ngOnInit(): void {
        this.ordersService.getSKUs().subscribe(skus => {
            this.bulbTypes = skus['BULB_TYPE'];
            this.bulbTypeFogLight = skus['BULB_TYPE_FOG_LIGHT'];
            this.highBeam = skus['HIGH_BEAM'];
            this.lowBeam = skus['LOW_BEAM'];
            this.fogLight = skus['FOG_LIGHT'];
            this.hbCanBus = skus['HB_CAN_BUS'];
            this.lbCanBus = skus['LB_CAN_BUS'];
        });

        this.vehiclesService.getYear().subscribe(years => {
            this.years = years;
        });
    }

    onYearChange() {
        this.vehiclesService.getMake(this.data.vehicleYear).then(make => {
            this.make = make;
        });
    }

    onMakeChange() {
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
