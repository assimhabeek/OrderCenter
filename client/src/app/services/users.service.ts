import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Observable, ReplaySubject} from 'rxjs';
import {TokenStorage} from './token.storage';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private isLoggedInEvent: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private userEvent: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(private httpService: HttpService,
              private tokenStorage: TokenStorage) {
    this.init();
  }

  init() {
    this.getUserInfo();
  }

  login(user: any): Observable<any> {
    return this.httpService.post(environment.routes.login, user);
  }

  getUserInfo() {
    this.httpService.getWithAuth(environment.routes.isLoggedIn).subscribe((res: any) => {
      this.isLoggedInEvent.next(!!res.data);
      this.userEvent.next(res.data);
    });
  }

  isLoggedIn() {
    return this.isLoggedInEvent;
  }

  user() {
    return this.userEvent;
  }

  registerLogin(token: string, rememberMe: boolean) {
    this.tokenStorage.storeToken(token, rememberMe);
    return this.httpService.getWithAuth(environment.routes.isLoggedIn).pipe(
      map((res: any) => {
        this.isLoggedInEvent.next(res.status);
        this.userEvent.next(res.data);
        return res.data;
      }));
  }

  logout() {
    this.tokenStorage.removeToken();
    this.userEvent.next(null);
    this.isLoggedInEvent.next(false);
  }

  getUsers(): Observable<any> {
    return this.httpService.getWithAuth(environment.routes.users);
  }

  addRow(data: any): Observable<any> {
    return this.httpService.postWithAuth(environment.routes.users, data);
  }

  updateCell(data: any): Promise<any> {
    return this.httpService.putWithAuth(environment.routes.users, data).toPromise();
  }

  deleteRow(id: number): Observable<any> {
    return this.httpService.deleteWithAuth(environment.routes.users + `/${id}`);
  }

}
