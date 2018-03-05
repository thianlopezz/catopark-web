import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LoginService } from './login/login.service';

declare var jQuery: any;
// declare const ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  parker: any;

  constructor(public router: Router,
    private cdRef: ChangeDetectorRef,
  private loginService: LoginService) {
  }

  ngAfterViewInit() {

    jQuery('.button-collapse').sideNav();    
    setTimeout(() => {
      jQuery('.dropdown-button').dropdown();
    }, 1000);
  }

  ngAfterViewChecked() {
    this.parker = this.loginService.getLogin();    
    this.cdRef.detectChanges();
  }

  isLogged() {
    return this.loginService.getLogin();
  }
}
