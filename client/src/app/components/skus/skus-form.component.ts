import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OrdersService} from '../../services/orders.service';

@Component({
    selector: 'ct-skus-form',
    templateUrl: './skus-form.component.html',
    styleUrls: ['./skus-form.component.scss']
})
export class SkusFormComponent {

    constructor(
        public dialogRef: MatDialogRef<SkusFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public ordersService: OrdersService) {
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
