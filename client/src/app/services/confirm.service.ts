import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../shared/confirm-dialog/confirm-dialog.component';
import {Observable} from 'rxjs';
import {SharedModule} from '../shared/shared.module';

@Injectable({
    providedIn: SharedModule
})
export class ConfirmService {

    constructor(public dialog: MatDialog) {
    }

    requestDeleteConfirmation(): Observable<boolean> {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'Delete confirmation',
                description: 'Are you sure you want to delete this row permanently.'
            },
            disableClose: true
        });
        return dialogRef.afterClosed();
    }

    requestConfirmation(title: string, message: string): Observable<boolean> {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title,
                description: message
            },
            disableClose: true
        });
        return dialogRef.afterClosed();
    }

}
