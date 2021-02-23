import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ExportHistoryService {

    constructor(protected httpService: HttpService) {
    }

    getHistory(): Observable<any> {
        return this.httpService.getWithAuth(environment.routes.history);
    }

    deleteRow(id: number): Observable<any> {
        return this.httpService.deleteWithAuth(environment.routes.history + `/${id}`);
    }

    downloadFile(id: number) {
        return this.httpService.getWithAuth(environment.routes.files, {
            responseType: 'blob',
            observe: 'response',
            params: new HttpParams().set('id', id.toString())
        });
    }

}
