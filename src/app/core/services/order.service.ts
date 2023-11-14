import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor() {}

  public store(value: any): Observable<any> {
    const headers = new HttpResponse({
      status: 200,
      statusText: 'OK',
      body: '',
    });
    return of(headers);
  }
}
