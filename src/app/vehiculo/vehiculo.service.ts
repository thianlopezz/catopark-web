import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VehiculoService {

  constructor(private http: Http) { }

  getAll() {

    const parker = JSON.parse(localStorage.getItem('parker'));

    const param = encodeURIComponent('<params accion="C" />');
    return this.http.get('/api/vehiculos/all/' + param, this.jwt()).map((response: Response) => response.json());
  }

  getPorId(idusuario) {

    const parker = JSON.parse(localStorage.getItem('parker'));

    const param = encodeURIComponent('<params accion="C0" idusuario="' + idusuario + '" />');
    return this.http.get('/api/vehiculos/porid/' + param, this.jwt()).map((response: Response) => response.json());
  }

  mantenimiento(usuario) {

    const parker = JSON.parse(localStorage.getItem('parker'));

    return this.http.post('/api/vehiculos/', usuario, this.jwt()).map((response: Response) => response.json());
  }

  private jwt() {

    const parker = JSON.parse(localStorage.getItem('parker'));

    if (parker && parker.token) {
      const headers = new Headers({ 'x-access-token': parker.token });
      return new RequestOptions({ headers: headers });
    }
  }

}
