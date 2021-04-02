import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EspecialidadDTO } from '../models/EspecialidadDTO';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para manejar peticiones relacionadas a especialidades
 */
export class EspecialidadService {

  private urlEndPoint: string = 'http://localhost:8080/especialidades/';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private httpClient : HttpClient) { }
  /**
   * Método para obtener lista de especialidades
   * @returns {Observable <EspecialidadDTO[]>} Observable con lista de especialidades
   */
  getEspecialidades(): Observable <EspecialidadDTO[]>{
    return this.httpClient.get<EspecialidadDTO[]>(this.urlEndPoint)
  }

  /**
   * Método para obtener especialidades asociadas a un síntoma
   * @param idSintoma id del síntoma del cual se buscan las especialidades asociadas
   * @returns {Observable <EspecialidadDTO[]>} retorna observable con lista de especialides asociadas a un síntoma
   */
  getEspecialidadesAsociadas(idSintoma): Observable <EspecialidadDTO[]>{
    return this.httpClient.get<EspecialidadDTO[]>(`${this.urlEndPoint}asociadas/${idSintoma}`)
  }
}
