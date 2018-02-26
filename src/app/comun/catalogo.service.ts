import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CatalogoService {

  constructor(private http: Http) { }

  getAll(tipo: string) {

    return this.http.get('/api/catalogo/all/' + tipo, this.jwt()).map((response: Response) => response.json());
  }

  private jwt() {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.token) {
      const headers = new Headers({ 'x-access-token': currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }

}
