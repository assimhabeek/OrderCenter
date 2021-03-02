import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ArchivedOrdersComponent} from './archived-orders.component';
import {SharedModule} from '../../shared/shared.module';
import {MaterialModule} from '../../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ArchiveButtonComponent} from './archive-button.component';
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
