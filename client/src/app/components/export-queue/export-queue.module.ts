import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ExportQueueComponent} from './export-queue.component';
import {SharedModule} from '../../shared/shared.module';
import {MaterialModule} from '../../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {QueueButtonComponent} from './queue-button.component';
import {AgGridModule} from '@ag-grid-community/angular';


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
