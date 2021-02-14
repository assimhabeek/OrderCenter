import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorage} from './token.storage';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private httpUrl = environment.url;

  constructor(public http: HttpClient,
              public tokenStorage: TokenStorage) {
  }

  get(url: string, args?: any): Observable<any> {
    return this.http.get(this.httpUrl + url, args);
  }

  post(url: string, data: any, options?: any): Observable<any> {
    return this.http.post(this.httpUrl + url, data, options);
  }


  postWithAuth(url: string, data: any, options?: any): Observable<any> {
    return this.http.post(this.httpUrl + url, data, this.addHeaders(options));
  }

  putWithAuth(url: string, data: any, options?: any): Observable<any> {
    return this.http.put(this.httpUrl + url, data, this.addHeaders(options));
  }

  deleteWithAuth(url: string, args?: any): Observable<any> {
    return this.http.delete(this.httpUrl + url, this.addHeaders(args));
  }

  getWithAuth(url: string, args?: any): Observable<any> {
    return this.get(url, this.addHeaders(args));
  }

  addHeaders(opt: any) {
    const options: any = opt || {};
    const headers = options.headers != null ? options.headers : {};
    if (this.tokenStorage.getStoredToken() != null) {
      headers[environment.authHeader] = 'Bearer ' + this.tokenStorage.getStoredToken();
    }
    options.headers = headers;
    return options;
  }

}
