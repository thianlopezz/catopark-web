import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';

declare var jQuery: any;
declare var Materialize: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  error: any = {};

  constructor(private route: ActivatedRoute,
    private router: Router,
  private loginService: LoginService) { }

  ngOnInit() {
    // reset login status
    this.loginService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngAfterViewInit() {

    jQuery('select').material_select();
    jQuery('ul.tabs').tabs();
    jQuery('.collapsible').collapsible();
    jQuery('.modal').modal();
  }

  login() {
    this.loading = true;
    this.loginService.login(this.model)
      .subscribe(
      data => {

        if (data.success) {
          this.router.navigate(['/home']);
        } else {

          Materialize.toast('Usuario o contraseña incorrecta', 2000);
          this.loading = false;
        }
      },
      error => {
        Materialize.toast(error.message, 2000);
        this.loading = false;
      });
  }

}
