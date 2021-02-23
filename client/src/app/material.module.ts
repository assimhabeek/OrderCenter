import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
    declarations: [],
    exports: [
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatListModule,
        MatMenuModule,
        MatCardModule,
        MatMomentDateModule,
        MatDatepickerModule,
        MatDialogModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatTabsModule
    ],
    providers: []
})
export class MaterialModule {

}
