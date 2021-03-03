import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';

export class RouterReuse implements RouteReuseStrategy {


    private storedRoutes = new Map<string, DetachedRouteHandle>();

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return true;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        if (route.routeConfig?.path != null) {
            this.storedRoutes.set(this.getKey(route), handle);
        }
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return this.storedRoutes.has(this.getKey(route));
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        return <DetachedRouteHandle>this.storedRoutes.get(this.getKey(route));
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }

    getKey(route: ActivatedRouteSnapshot): string {
        return route.pathFromRoot
            .map((el: ActivatedRouteSnapshot) => el.routeConfig ? el.routeConfig.path : '')
            .filter(str => str != null && str.length > 0)
            .join('');
    }

}
