import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ShopifyOrdersComponent} from './shopify-orders.component';
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
                component: ShopifyOrdersComponent,
                pathMatch: 'full'
            }
        ])
    ],
    declarations: [
        ShopifyOrdersComponent
    ]
})
export class ShopifyOrdersModule {
}
