import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';


@Component({
    selector: 'ct-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
    mobileQuery: MediaQueryList;
    isAdmin = false;
    private readonly mobileQueryListener: () => void;


    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
                public usersService: UsersService,
                public router: Router) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this.mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this.mobileQueryListener);
    }

    ngOnInit(): void {
        this.getUserInfo();
    }


    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this.mobileQueryListener);
        /*
            this.notificationSubscription.unsubscribe();
        */
    }

    getUserInfo(): void {
        this.usersService.user().subscribe((user: any) => {
            this.isAdmin = user && +user.admin === 1;
        });
    }

    logout(): void {
        this.usersService.logout();
        this.router.navigate(['/login']).then();
    }

}
