import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(protected snackService: MatSnackBar) {
  }

  alertSuccess(message: string): void {
    this.snackService.open(message, 'x', {
      horizontalPosition: 'start',
      duration: 30000,
      politeness: 'polite',
      panelClass: 'ct-primary'
    });
  }

  alertError(message: string): void {
    this.snackService.open(message, 'x', {
      horizontalPosition: 'start',
      duration: 30000,
      politeness: 'polite',
      panelClass: 'ct-warn'
    });
  }

}
