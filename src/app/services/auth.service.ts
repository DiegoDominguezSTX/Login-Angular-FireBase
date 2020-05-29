import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /* Crear nuevo usuario */
  /* https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY] */

  /* Iniciar sesion */
  /* https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY] */
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyDo3r9VfBDXCy_aVwNpGj5_S41hF0Fy7RU';
  private userToken: string;


  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logOut() {

  }

  logIn(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken : true
    };

    return this.http.post(
      `${ this.url }signInWithPassword?key=${ this.apiKey }`,
      authData
    ).pipe(
      map( resp => {
        console.log('Entro al map de rxjs');
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }

  registrarUsuario(usuario: UsuarioModel  ) {
    const authData = {
      ...usuario,
      returnSecureToken : true
    };

    return this.http.post(
      `${ this.url }signUp?key=${ this.apiKey }`,
      authData
    ).pipe(
      map( resp => {
        console.log('Entro al map de rxjs');
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }
}
