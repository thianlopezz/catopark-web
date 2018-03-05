import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as jwt_decode from 'jwt-decode';
export const TOKEN_NAME = 'jwt_token';

@Injectable()
export class LoginService {

    constructor(private http: Http) { }

    login(user: any) {

        user.usuario = user.usuario.trim();
        user.contrasena = user.contrasena.trim();

        return this.http.post('api/aut/login/admin', user)
            .map((response: Response) => {

                const _response = response.json();

                if (_response.success) {

                    const _user = _response.usuario;
                    if (_user && _user.token) {
                        localStorage.setItem('parker', JSON.stringify(_user));
                        return _response;
                    }
                } else {
                    return _response;
                }
            });
    }

    getLogin() {

        return JSON.parse(localStorage.getItem('parker'));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('parker');
    }

    isTokenExpired(token?: string): boolean {
        if (!this.getLogin()) { return true; }
        if (!token) { token = this.getLogin().token; }
        if (!token) { return true; }

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) { return false; }
        return !(date.valueOf() > new Date().valueOf());
    }

    private getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);

        if (decoded.exp === undefined) {
            return null;
        }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }
}
