import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
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
                component: LoginComponent,
                pathMatch: 'full'
            }
        ])
    ],
    declarations: [LoginComponent]
})
export class LoginModule {
}
