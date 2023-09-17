import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, from, of, map, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

//Enviroment
import { environment } from '../../../environments/environment';
import { config } from '@helpers/config/config';
import { IJwtPayload } from 'src/app/models/jwt-payload.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlServer: string = ""
  private patch_user: string = ""

  public currentUser: any;
  responseApi: any;
  dataEmp: any;
  idModulo: any;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.urlServer = environment["url_server"];
    this.patch_user = environment["patch_user"];
  }




  login(_params: any) {

    return this.http.post(
      this.urlServer + this.patch_user + "/authentication",
      {
        "email": _params.email,
        "password": _params.pass
      }
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Aquí puedes manejar el error 403 como desees
          console.log('Error 403: Acceso no autorizado');
        }
        return throwError(error); // Puedes relanzar el error para que el componente también pueda manejarlo
      }),
      map(res => {

        // login successful if there's a jwt token in the response
        this.responseApi = res;

        if (this.responseApi && this.responseApi.access_token && this.responseApi.refresh_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          let dataJWT: string = this.responseApi.access_token
          let refresh_token: string = this.responseApi.refresh_token
          this.saveLocalStorage(dataJWT, refresh_token);
        }
        return this.responseApi;
      },
        (error) => {
          console.log(error);
        }
      )

    )
  }

  saveLocalStorage(token: string, refresh_token: string) {
    localStorage.setItem(environment.token, token);
    localStorage.setItem(environment.refresh_token, refresh_token);
  }
  getLocalStorageToken() {
    const token: string = localStorage.getItem(environment.token) ?? null;
    return token;
  }
  getLocalStorageRefreshToken(): string {
    const refreshToken: string = localStorage.getItem(environment.refresh_token) ?? null;
    return refreshToken;
  }


  logout() {
    // remove user from local storage to log user out
    const token: string = localStorage.getItem(environment.token) ?? null;
    return this.http.post(
      this.urlServer + this.patch_user + "/logout",
      null,
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Aquí puedes manejar el error 403 como desees
          console.log('Error 403: Acceso no autorizado, no borre el token ');
        }
        return throwError(error); // Puedes relanzar el error para que el componente también pueda manejarlo
      }),
      map(res => {
        localStorage.removeItem(environment.token);
        this.router.navigate([`/${config.router.login}`]);
      },
        (error) => {
          console.log(error);
        }
      )

    )
  }


  loginVerifyAuth(dataJWT: any) {
    localStorage.setItem(environment.token, dataJWT);
    this.router.navigate([`/${config.router.home}`]);
  }

  getJwtPayload():IJwtPayload {
    const decode = jwt_decode<IJwtPayload>(this.getLocalStorageToken());
    return decode

  }



}
