import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ActiveOrdersListComponent} from './active-orders-list.component';
import {ActiveOrdersFormComponent} from './active-orders-form.component';
import {SharedModule} from '../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import {MaterialModule} from '../../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMakeModelSelectComponent} from './mat-make-model-select.component';
import {CommonModule} from '@angular/common';


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
                component: ActiveOrdersListComponent,
                pathMatch: 'full'
            }
        ])
    ],
    declarations: [
        ActiveOrdersListComponent,
        ActiveOrdersFormComponent,
        MatMakeModelSelectComponent
    ],
    entryComponents: [
        ActiveOrdersFormComponent
    ]
})
export class ActiveOrdersModule {
}
