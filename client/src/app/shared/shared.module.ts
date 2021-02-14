import {NgModule} from '@angular/core';
import {TooltipComponent} from './tooltip.component';
import {MatSelectComponent} from './mat-select.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../material.module';
import {HttpClientModule} from '@angular/common/http';
import {RoutingModule} from '../routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


@NgModule({
    declarations: [
        TooltipComponent,
        MatSelectComponent,
        ConfirmDialogComponent
    ],
    entryComponents: [
        TooltipComponent,
        MatSelectComponent,
        ConfirmDialogComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        TooltipComponent,
        MatSelectComponent,
        ConfirmDialogComponent
    ],
})
export class SharedModule {
}
