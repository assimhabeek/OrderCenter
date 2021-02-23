import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SyncOrdersService {

    constructor(protected httpService: HttpService) {
    }

    getShopifyProducts(): Observable<any> {
        return this.httpService.getWithAuth(environment.routes.shopifyOrders);
    }

}
