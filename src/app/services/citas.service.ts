import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CitaDTO } from '../models/CitaDTO';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para peticiones relacionadas a las citas
 */
export class CitasService {

  private urlEndPoint: string = 'http://localhost:8080/citas/';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private httpClient : HttpClient) { }

  /**
   * Método para obtener mediante petición GET, las citas pendientes de agendamiento
   * @returns {Observable<CitaDTO[]>} Observable con lista de citas pendientes
   */
  getCitasPendientes (): Observable<CitaDTO[]>{
    return this.httpClient.get<CitaDTO[]>(`${this.urlEndPoint}pendientes`)
  }

  /**
   * Método para obtener citas de un paciente
   * @param idPaciente {Number} id del paciente del cual se buscan las citas
   * @returns {Observable<CitaDTO[]>} Observable con la lista de citas del paciente
   */
  getCitasPaciente (idPaciente : number): Observable<CitaDTO[]>{
    return this.httpClient.get<CitaDTO[]>(`${this.urlEndPoint}citasPaciente/${idPaciente}`)
  }

  /**
   * Método para agregar una nueva cita mediante petición POST
   * @param cita {CitaDTO} Cita a guardar
   * @returns {Observable<CitaDTO>} Observable indicando el éxito de la operación o el error de la misma
   */
  saveCita (cita : CitaDTO): Observable<CitaDTO>{
    return this.httpClient.post<CitaDTO>(`${this.urlEndPoint}`, cita, {headers:this.httpHeaders})
  }

  /**
   * Método para cancelar una cita mediante petición PUT
   * @param cita {CitaDTO} Cita a cancelar
   * @returns {Observable<CitaDTO>} Observable con la cita actualizada
   */
  cancelCita (cita : CitaDTO): Observable<CitaDTO>{
    return this.httpClient.put<CitaDTO>(`${this.urlEndPoint}cancel`, cita, {headers:this.httpHeaders})
  }

  /**
   * Método para cancelar una cita mediante petición PUT
   * @returns {Observable<CitaDTO>} Observable con la cita actualizada
   */
   agregar_masivo (): Observable<any>{
    return this.httpClient.get<any>(`${this.urlEndPoint}agregar_muchas`)
  }
  
}
