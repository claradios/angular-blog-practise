import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtenemos el token
    const token = sessionStorage.getItem('token');
    // Guardamos la ruta login que queremos excluir en una expresión regular
    const re = /login/gi;
    // Importante: modificamos de forma inmutable,
    // haciendo el clonado de la petición
    let authReq = req;
    if (req.url.search(re) === -1) {
      authReq = req.clone(
        { headers: req.headers.set('Authorization', 'Bearer ' + token) }
      );
    // Pasamos al siguiente interceptor de
    // la cadena la petición modificada
      return next.handle(authReq);
    }
    return next.handle(authReq);
  }
}
