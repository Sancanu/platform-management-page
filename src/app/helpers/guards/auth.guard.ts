import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

//Service
import { AuthService } from '@services/auth-service/auth.service';
import { config } from '@helpers/config/config';
import { RouteData } from 'src/app/models/router-data.model';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    let expectedRole = (route.data as RouteData).role;
    const haveToken = this.authService.getLocalStorageToken();
    if (haveToken) {
      // role not authorised so redirect to home page
      let currentUserRole = this.authService.getJwtPayload().role
      if (expectedRole.length && expectedRole.indexOf(currentUserRole) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate([`/${config.router.home}`], { state: { url_continue: state.url } });
        return false;
      } else {
        // authorised so return true
        return true;
      }

    }
    // not logged in so redirect to login page with the return url
    this.router.navigate([`/${config.router.login}`], { state: { url_continue: state.url } });
    return false;
  }
}
