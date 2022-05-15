import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthorizationService} from "./authorization.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {

  constructor(private authorizationService: AuthorizationService, private router: Router) {

    // in a real-world scenario, it's not the responsibility of the auth guard to redirect after authenticating,
    // this is just to make the app work
    this.authorizationService.hasAuthenticated.subscribe(hasAuthenticated => {
      if(hasAuthenticated)
        this.router.navigate(['']);
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let isAuthenticated = this.authorizationService.isAuthenticated();

    // in a real-world scenario, this would redirect to a login page instead
    if(!isAuthenticated)
      this.authorizationService.authenticate();

    return true;
  }

}
