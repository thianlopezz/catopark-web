import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VehiOcupanteService {

  constructor(private http: Http) { }

  getAll() {

    const parker = JSON.parse(localStorage.getItem('parker'));

    const param = encodeURIComponent('<params accion="C" />');
    return this.http.get('/api/vehiocupante/all/' + param, this.jwt()).map((response: Response) => response.json());
  }

  getPorIdVehiculo(idVehiculo) {

    const parker = JSON.parse(localStorage.getItem('parker'));

    const param = encodeURIComponent('<params accion="C0" idVehiculo="' + idVehiculo + '" />');
    return this.http.get('/api/vehiocupante/all/' + param, this.jwt()).map((response: Response) => response.json());
  }

  mantenimiento(vehiOcupante) {

    const parker = JSON.parse(localStorage.getItem('parker'));

    return this.http.post('/api/vehiocupante/', vehiOcupante, this.jwt()).map((response: Response) => response.json());
  }

  private jwt() {

    const parker = JSON.parse(localStorage.getItem('parker'));

    if (parker && parker.token) {
      const headers = new Headers({ 'x-access-token': parker.token });
      return new RequestOptions({ headers: headers });
    }
  }

}
