import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {DndDirective} from './directives/dnd.directive';
import {FileSelectComponent} from './components/file-select/file-select.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MatSelectComponent} from './components/mat-select.component';
import {SyncShopifyComponent} from './components/sync-shopify/sync-shopify.component';
import {ExportComponent} from './components/export/export.component';
import {HttpClientModule} from '@angular/common/http';
import {AgGridModule} from 'ag-grid-angular';
import {UsersSelectComponent} from './components/users-select.component';
import {ActiveOrdersListComponent} from './components/active-orders-list/active-orders-list.component';
import {VehiclesFormComponent} from './components/vehicles-form/vehicles-form.component';
import {LoginComponent} from './components/login/login.component';
import {MainComponent} from './components/main/main.component';
import {SkusListComponent} from './components/skus-list/skus-list.component';
import {SkusFormComponent} from './components/skus-form/skus-form.component';
import {UsersFormComponent} from './components/users-form/users-form.component';
import {UsersListComponent} from './components/users-list/users-list.component';
import {MatCheckboxComponent} from './components/mat-checkbox.component';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {AdminGuardService} from './services/admin-guard.service';
import {GuestGuardService} from './services/guest-guard.service';
import {LoginGuardService} from './services/login-guard.service';
import {TooltipComponent} from './components/tooltip.component';
import {ExportQueueComponent} from './components/export-queue/export-queue.component';
import {ExportHistoryComponent} from './components/export-history/export-history.component';
import {ArchivedOrdersComponent} from './components/archived-orders/archived-orders.component';
import {QueueButtonComponent} from './components/queue-button.component';
import {ArchiveButtonComponent} from './components/archive-button.component';
import {DownloadExportButtonComponent} from './components/download-export-button.component';
import {MatMakeModelSelectComponent} from './components/mat-make-model-select.component';
import {VehiclesListComponent} from './components/vehicles-list/vehicles-list.component';
import {OrdersFormComponent} from './components/orders-form/orders-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DndDirective,
    FileSelectComponent,
    ActiveOrdersListComponent,
    MatSelectComponent,
    MatMakeModelSelectComponent,
    MatCheckboxComponent,
    UsersSelectComponent,
    SyncShopifyComponent,
    ExportComponent,
    UsersListComponent,
    UsersFormComponent,
    SkusListComponent,
    VehiclesFormComponent,
    OrdersFormComponent,
    LoginComponent,
    MainComponent,
    SkusFormComponent,
    ConfirmDialogComponent,
    TooltipComponent,
    ExportQueueComponent,
    QueueButtonComponent,
    ExportHistoryComponent,
    ArchivedOrdersComponent,
    ArchiveButtonComponent,
    DownloadExportButtonComponent,
    VehiclesListComponent
  ],
  entryComponents: [
    ActiveOrdersListComponent,
    VehiclesFormComponent,
    OrdersFormComponent,
    UsersFormComponent,
    UsersListComponent,
    SkusFormComponent,
    SkusListComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [GuestGuardService]
      },
      {
        path: 'main',
        component: MainComponent,
        canActivate: [LoginGuardService],
        children: [
          {path: 'upload-file', component: FileSelectComponent},
          {path: 'active-orders', component: ActiveOrdersListComponent},
          {path: 'archived-orders', component: ArchivedOrdersComponent},
          {path: 'shopify-import', component: SyncShopifyComponent},
          {path: 'export', component: ExportComponent},
          {path: 'export-history', component: ExportHistoryComponent},
          {path: 'update-queue', component: ExportQueueComponent},
          {path: 'skus', component: SkusListComponent},
          {path: 'users', component: UsersListComponent, canActivate: [AdminGuardService]},
          {path: 'vehicles', component: VehiclesListComponent, canActivate: [AdminGuardService]}
        ]
      },
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: '**', redirectTo: 'login', pathMatch: 'full'}
    ]),
    AgGridModule.withComponents()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
