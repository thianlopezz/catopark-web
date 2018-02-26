import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MensajeService {

  private subject = new Subject<any>();

  constructor() { }

  success(message: string) {

    this.subject.next({ type: 'Éxito', text: message });
  }

  error(message: string) {

    this.subject.next({ type: 'Error', text: message });
  }

  getMessage(): Observable<any> {

    return this.subject.asObservable();
  }

}
