import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {RoutingModule} from './routing.module';
import {MainComponent} from './components/main/main.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {RouteReuseStrategy} from '@angular/router';
import {RouterReuse} from './services/router.reuse';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        MatSnackBarModule,
        MatTabsModule,
        HttpClientModule,
        RoutingModule,
    ],
    providers: [
        {
            provide: RouteReuseStrategy,
            useClass: RouterReuse
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
