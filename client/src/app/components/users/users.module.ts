import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UsersListComponent} from './users-list.component';
import {UsersFormComponent} from './users-form.component';
import {SharedModule} from '../../shared/shared.module';
import {MaterialModule} from '../../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxComponent} from './mat-checkbox.component';
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
                component: UsersListComponent,
                pathMatch: 'full'
            }
        ])
    ],
    declarations: [
        UsersListComponent,
        UsersFormComponent,
        MatCheckboxComponent
    ]
})
export class UsersModule {
}
