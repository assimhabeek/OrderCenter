import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FileSelectComponent} from './file-select.component';
import {DndDirective} from './dnd.directive';
import {SharedModule} from '../../shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import {MaterialModule} from '../../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: FileSelectComponent,
                pathMatch: 'full'
            }
        ])
    ],
    declarations: [
        FileSelectComponent,
        DndDirective
    ]
})
export class FileSelectModule {
}
