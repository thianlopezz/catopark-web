import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { LoginService } from '../login/login.service';

@Injectable()
export class ActivatorService implements CanActivate {

    constructor(private router: Router,
        private loginService: LoginService) { }

    canActivate() {

        if (!this.loginService.isTokenExpired()) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }


}
