import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LuzService {

  constructor(private http: Http) { }

  getAll(model: any) {

    return this.http.post('/api/luz/', model).map((response: Response) => response.json());
  }

  guardaMeta(model: any) {

    return this.http.post('/api/registraluz/', model).map((response: Response) => response.json());
  }

}
