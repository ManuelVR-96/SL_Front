import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})

// GUARD PARA VERIFICAR SI EL USUARIO LOGUEADO ES UN ADMINISTRADOR
export class AdminGuard implements CanActivate {
  
  constructor(private userService:UserService, private route:Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // HACIENDO USO DEL SERVICIO DE USUARIOS, VERIFICAMOS SI ES ADMINISTRADOR. SI NO LO ES, REDIRIGE AL LOGIN, DE LO CONTRARIO
      // RETORNA TRUE
      if (!this.userService.isAdmin()){
          return this.route.navigate(["/login"])
      }
      return this.userService.isAdmin()
  }
  
}
