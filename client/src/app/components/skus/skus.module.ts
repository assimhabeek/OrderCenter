import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SkusListComponent} from './skus-list.component';
import {SkusFormComponent} from './skus-form.component';
import {SharedModule} from '../../shared/shared.module';
import {MaterialModule} from '../../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
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
                component: SkusListComponent,
                pathMatch: 'full'
            }
        ])
    ],
    declarations: [
        SkusListComponent,
        SkusFormComponent
    ]
})
export class SkusModule {
}
