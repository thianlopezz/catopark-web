import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var jQuery: any;
declare var Materialize: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    jQuery('select').material_select();
    jQuery('ul.tabs').tabs();
    jQuery('.collapsible').collapsible();
    jQuery('.modal').modal();
  }

}
