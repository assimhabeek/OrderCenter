import {GuestGuardService} from './services/guest-guard.service';
import {MainComponent} from './components/main/main.component';
import {LoginGuardService} from './services/login-guard.service';
import {AdminGuardService} from './services/admin-guard.service';
import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule),
        canActivate: [GuestGuardService]
    },
    {
        path: 'main',
        component: MainComponent,
        canActivate: [LoginGuardService],
        children: [
            {
                path: 'active-orders',
                loadChildren: () => import('./components/active-orders/active-orders.module').then(m => m.ActiveOrdersModule),
            },
            {
                path: 'archived-orders',
                loadChildren: () => import('./components/archived-orders/archived-orders.module').then(m => m.ArchivedOrdersModule),
            },
            {
                path: 'shopify-order-import',
                loadChildren: () => import('./components/shopify-orders/shopify-orders.module').then(m => m.ShopifyOrdersModule),
            },
            {
                path: 'shopify-product-import',
                loadChildren: () => import('./components/shopify-products/shopify-products.module').then(m => m.ShopifyProductsModule),
            },
            {
                path: 'export',
                loadChildren: () => import('./components/export/export.module').then(m => m.ExportModule),
            },
            {
                path: 'export-history',
                loadChildren: () => import('./components/export-history/export-history.module').then(m => m.ExportHistoryModule),
            },
            {
                path: 'update-queue',
                loadChildren: () => import('./components/export-queue/export-queue.module').then(m => m.ExportQueueModule),
            },
            {
                path: 'skus',
                loadChildren: () => import('./components/skus/skus.module').then(m => m.SkusModule),
            },
            {
                path: 'productSkus',
                loadChildren: () => import('./components/product-skus/product-skus.module').then(m => m.ProductSkusModule),
            },
            {
                path: 'upload-file',
                loadChildren: () => import('./components/file-select/file-select.module').then(m => m.FileSelectModule),
                canActivate: [AdminGuardService]
            },
            {
                path: 'users',
                loadChildren: () => import('./components/users/users.module').then(m => m.UsersModule),
                canActivate: [AdminGuardService]
            },
            {
                path: 'vehicles',
                loadChildren: () => import('./components/vehicles/vehicles.module').then(m => m.VehiclesModule),
                canActivate: [AdminGuardService]
            }
        ]
    },
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: '**', redirectTo: 'login', pathMatch: 'full'}
];
