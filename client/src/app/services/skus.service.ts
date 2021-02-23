import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SkusService {

    constructor(protected httpService: HttpService) {
    }

    getSkus(): Observable<any> {
        return this.httpService.getWithAuth(environment.routes.skus);
    }

    addRow(data: any): Observable<any> {
        return this.httpService.postWithAuth(environment.routes.skus, data);
    }

    updateCell(data: any): Promise<any> {
        return this.httpService.putWithAuth(environment.routes.skus, data).toPromise();
    }

    deleteRow(id: number): Observable<any> {
        return this.httpService.deleteWithAuth(environment.routes.skus + `/${id}`);
    }

}
