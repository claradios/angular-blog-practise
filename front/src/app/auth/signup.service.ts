import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(private http: HttpClient,
              @Inject('config') private config) { }
  getData(body): Observable<object> {
    return this.http.post<object>(this.config.api + 'signup', body);
  }
}

