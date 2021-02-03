import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';
import {NotificationsService} from '../../services/notifications.service';
import {Observable, Subscription} from 'rxjs';

interface Notification {
  message: string;
  unread: boolean;
}

@Component({
  selector: 'ct-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  isAdmin = false;
  private mobileQueryListener: () => void;
/*
  notificationSubscription!: Subscription;
  notifications: Notification[] = [];
*/

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              public usersService: UsersService,
              public router: Router,
/*              public notificationService: NotificationsService*/) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit(): void {
    this.getUserInfo();
/*
    this.notificationSubscription = this.notificationService.notifications.subscribe((res: MessageEvent) => {
      console.log(res.data);
      const message = JSON.parse(res.data).message;
      this.notifications.push({message, unread: true});
    });
*/
  }

  showNotifications(): void {

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
/*
    this.notificationSubscription.unsubscribe();
*/
  }

  getUserInfo(): void {
    this.usersService.user().subscribe(user => {
      this.isAdmin = user && +user.admin === 1;
    });
  }

  logout(): void {
    this.usersService.logout();
    this.router.navigate(['/login']);
  }

}
