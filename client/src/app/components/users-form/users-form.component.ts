import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OrdersService} from '../../services/orders.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'ct-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent {
  showPassword: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<UsersFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ordersService: OrdersService) {
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  save($event:any): void {
    if (!$event.invalid) {
      this.dialogRef.close(this.data);
    }
  }


}
