import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {VehiclesListComponent} from './vehicles-list.component';
import {VehiclesFormComponent} from './vehicles-form.component';
import {SharedModule} from '../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import {MaterialModule} from '../../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
                component: VehiclesListComponent,
                pathMatch: 'full'
            }
        ])
    ],
    declarations: [
        VehiclesListComponent,
        VehiclesFormComponent
    ]
})
export class VehiclesModule {
}
