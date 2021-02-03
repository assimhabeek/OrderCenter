import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../../services/users.service';
import {HttpErrorResponse} from '@angular/common/http';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'ct-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: any = {};
  public showPassword!: boolean;


  constructor(private usersService: UsersService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.showPassword = false;
    this.usersService.user().subscribe(usr => {
      if (usr) {
        this.router.navigate([`/main`]);
      }
    });

  }

  submit(state: any): void {
    if (state) {
      this.usersService.login(this.user)
        .subscribe(response => {
          if (response.status) {
            this.usersService.registerLogin(response.data, this.user.rememberMe)
              .subscribe(x => {
                this.router.navigate([`/main`]);
              });
          } else {
            console.log(response);
          }
        }, (error: HttpErrorResponse) => console.log(error));
    }
  }

}
