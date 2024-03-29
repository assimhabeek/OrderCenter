import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UsersService} from './users.service';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoginGuardService implements CanActivate {


    constructor(private usersService: UsersService,
                private router: Router) {
    }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.usersService.isLoggedIn().pipe(
            map((IsLoggedIn: any) => {
                if (!IsLoggedIn) {
                    this.router.navigate(['/login']);
                }
                return IsLoggedIn;
            })
        );
    }
}
