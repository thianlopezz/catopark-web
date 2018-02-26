import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AguaService {

  constructor(private http: Http) { }

  getAll(model: any) {

    return this.http.post('/api/agua/', model).map((response: Response) => response.json());
  }

  guardaMeta(model: any) {

    return this.http.post('/api/registraagua/', model).map((response: Response) => response.json());
  }

}
