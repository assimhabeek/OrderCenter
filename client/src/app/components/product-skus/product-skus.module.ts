import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProductSkusComponent} from './product-skus.component';
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
                component: ProductSkusComponent,
                pathMatch: 'full'
            }
        ])
    ],
    declarations: [
        ProductSkusComponent
    ]
})
export class ProductSkusModule {
}
