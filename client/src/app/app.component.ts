import {Component, OnInit} from '@angular/core';
import {AlertService} from './services/alert.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'ct-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private confService: AlertService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(p => {
      if (p && +p.installed === 1) {
        this.confService.alertSuccess('Application installed successfully.');
      } else if (p && +p.installed === -1) {
        this.confService.alertError('Could not install Application.');
      }
    });

  }


}
