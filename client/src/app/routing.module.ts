import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {routes} from './routes';


@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules
        }),

    ],
    exports: [RouterModule]
})
export class RoutingModule {

}
