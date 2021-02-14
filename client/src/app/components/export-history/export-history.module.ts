import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ExportHistoryComponent} from './export-history.component';
import {SharedModule} from '../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import {MaterialModule} from '../../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DownloadExportButtonComponent} from './download-export-button.component';


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
                component: ExportHistoryComponent,
                pathMatch: 'full'
            }
        ])
    ],
    declarations: [
        ExportHistoryComponent,
        DownloadExportButtonComponent
    ]
})
export class ExportHistoryModule {
}
