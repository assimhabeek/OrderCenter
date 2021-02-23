import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class FileUploaderService {

    constructor(public httpService: HttpService) {
    }

    upload(file: any): Observable<any> {
        if (!file && file.name) {
            return of(null);
        }
        const formData = new FormData();
        formData.append('file', file, file.name);
        return this.httpService.postWithAuth(environment.routes.upload, formData);
    }

}
