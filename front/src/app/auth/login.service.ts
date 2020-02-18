import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenDTO } from './token.dto';
// export interface UserToken {
// expires_in: number;
// access_token: string;
// }

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              @Inject('config') private config) { }
  getUserToken(body): Observable<TokenDTO> {
    const auth = 'Basic ' + btoa(body.username + ':' + body.password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'basic' + auth
      })
    };
    return this.http.post<TokenDTO>(this.config.api + 'login', '', httpOptions);
  }
}
// this.config.api + 'auth'
// 'http://localhost:3001/auth/'
