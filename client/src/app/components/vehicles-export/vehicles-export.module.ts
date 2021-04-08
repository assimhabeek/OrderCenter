import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {MaterialModule} from '../../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AgGridModule} from '@ag-grid-community/angular';
import {VehiclesExportComponent} from './vehicles-export.component';


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
                component: VehiclesExportComponent,
                pathMatch: 'full'
            }
        ])
    ],
    declarations: [
        VehiclesExportComponent
    ]
})
export class VehiclesExportModule {
}
