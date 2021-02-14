import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ArchivedOrdersComponent} from './archived-orders.component';
import {SharedModule} from '../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import {MaterialModule} from '../../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ArchiveButtonComponent} from './archive-button.component';


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
                component: ArchivedOrdersComponent,
                pathMatch: 'full'
            }
        ])
    ],
    declarations: [
        ArchivedOrdersComponent,
        ArchiveButtonComponent
    ]
})
export class ArchivedOrdersModule {
}
