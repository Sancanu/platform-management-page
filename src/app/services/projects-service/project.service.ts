import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
//Enviroment
import { environment } from '../../../environments/environment';
import { AuthService } from '@services/auth-service/auth.service';
import { ICreateProjects } from 'src/app/models/create-project.model';
import { IProjects } from 'src/app/models/projects.models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private urlServer: string = ""
  private patch_projects: string = ""

  constructor(
    private http: HttpClient,
    private authService: AuthService,

  ) {
    this.urlServer = environment["url_server"];
    this.patch_projects = environment["patch_projects"];
  }

  searchProjects(): Observable<any> {

    const token = this.authService.getLocalStorageToken();
    const options = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    return this.http.get(
      this.urlServer + this.patch_projects,
      options
    )


  }

  searchProject(id: number): Observable<any> {
    const token = this.authService.getLocalStorageToken();
    const options = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    return this.http.get(
      this.urlServer + this.patch_projects + "/" + id,
      options
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
        if(res){
          return res
        }
        return null
      },
        (error) => {
          console.log(error);
        }
      )

    )

  }

  deleteProject(id: number): Observable<any> {
    const token = this.authService.getLocalStorageToken();
    const options = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    return this.http.delete(
      this.urlServer + this.patch_projects + "/" + id,
      options
    )

  }

  editOrCreateProject(body:ICreateProjects|IProjects){
    const token = this.authService.getLocalStorageToken();
    const options = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    return this.http.post(
      this.urlServer + this.patch_projects,
      body,
      options
    )
  }


  login(_params: any) {

  }



}
