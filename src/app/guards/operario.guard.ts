import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})

// GUARD PARA VERIFICAR SI EL USUARIO LOGUEADO ES OPERARIO
export class OperarioGuard implements CanActivate {
  constructor(private userService:UserService, private route:Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // HACIENDO USO DEL USER SERVICE, VERIFICAMOS SI EL USUARIO LOGUEADO ES OPERARIO, SI ES ASÍ RETORNA TRUE, DE LO CONTRARIO
      // REDIRIGE AL LOGIN
      if (!this.userService.isOperario()){
        return this.route.navigate(["/login"])
    }
    return this.userService.isOperario
    ()
  }
  
}
