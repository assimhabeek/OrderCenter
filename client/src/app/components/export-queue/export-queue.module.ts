import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ExportQueueComponent} from './export-queue.component';
import {SharedModule} from '../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import {MaterialModule} from '../../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {QueueButtonComponent} from './queue-button.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AgGridModule.withComponents(),
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: ExportQueueComponent,
                pathMatch: 'full'
            }
        ])
    ],
    declarations: [
        ExportQueueComponent,
        QueueButtonComponent
    ]
})
export class ExportQueueModule {
}
