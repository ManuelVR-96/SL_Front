import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OperarioLoginDTO } from '../models/OperarioLoginDTO';
import { Observable } from 'rxjs';
import { OperarioSessionDTO } from '../models/OperarioSession';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para peticiones y funcionalidades asociadas a un usuario
 */
export class UserService {

  private urlEndPoint: string = 'http://localhost:8080/';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  
  constructor(private httpClient : HttpClient, private router:Router) { }

  /**
   * Método para login de usuario mediante petición POST
   * @param credenciales {OperarioLoginDTO} contraseña y password ingresadas
   * @returns Observable que contiene la información de sesión del usuario si el login fue exitoso
   */
  login(credenciales : OperarioLoginDTO) : Observable<OperarioSessionDTO> {
    return this.httpClient.post<OperarioSessionDTO>(`${this.urlEndPoint}login`, credenciales, {headers:this.httpHeaders})
  }

  /**
   * Método para almacenar en el local storage la sesión del usuario
   * @param userInfo Información de sesión del usuario. Incluye nombre, id y rol.
   */
  saveSession(userInfo){
    localStorage.setItem('usuario', JSON.stringify(userInfo));
  }

  /**
   * Método para obtener información de sesión del usuario
   * @returns {OperarioSessionDTO} Información de sesión del usuario
   */
  getUser(): OperarioSessionDTO{
    const localUsuario = localStorage['usuario'] || '{}'
    return JSON.parse(localUsuario)|| {};
  }

  /**
   * Método para saber si un usuario es administrador
   * @returns {Boolean} Booleano Indicando si el usuario tiene rol de administrador
   */
  isAdmin(): boolean{
    return this.getUser().idRol===1
  }
  /**
   * 
   * @returns {Boolean} Booleano indicando si el usuario tiene rol de operario
   */
  isOperario(): boolean{
    return this.getUser().idRol===2
  }

  /**
   * Método de Logout. Elimina del local Storage la info del usuario
   */
  logout(){
    console.log("al login")
    localStorage.removeItem('usuario');
    this.router.navigate(["/login"])
  }


}
