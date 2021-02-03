import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UsersService} from './users.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuestGuardService implements CanActivate {


  constructor(private usersService: UsersService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.usersService.isLoggedIn().pipe(
      map((IsLoggedIn: any) => {
        if (IsLoggedIn) {
          this.router.navigate(['/main']);
        }
        return !IsLoggedIn;
      })
    );
  }
}
