import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TelefonoService {

  constructor(private http: Http) { }

  getAll(model: any) {

    return this.http.post('/api/telefono/', model).map((response: Response) => response.json());
  }

  guardaMeta(model: any) {

    return this.http.post('/api/registratelefono/', model).map((response: Response) => response.json());
  }

}
