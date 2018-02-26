import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { GoogleAnalyticsEventsService } from './services/google-analytics-events.service';

declare var jQuery: any;
// declare const ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  constructor(public router: Router,
    public googleAnalyticsEventsService: GoogleAnalyticsEventsService) {

    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     ga('set', 'page', event.urlAfterRedirects);
    //     ga('send', 'pageview');
    //   }
    // });
  }

  ngAfterViewInit() {

    jQuery('.button-collapse').sideNav();
  }
}
