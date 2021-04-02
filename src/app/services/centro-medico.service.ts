import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CentroMedicoDTO } from '../models/CentroMedicoDTO';
import { MedicoDTO } from '../models/MedicoDTO';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para manejar peticiones referentes a centros médicos y médicos
 */
export class CentroMedicoService {

  private urlEndPoint: string = 'http://localhost:8080/medicos';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private httpClient : HttpClient) { }

  /**
   * Método para obtener centros médicos mediante petición get
   * @returns {Observable<CentroMedicoDTO[]>} Observable con lista de centros médico
   */
  getCentros () : Observable<CentroMedicoDTO[]> {
    return this.httpClient.get<CentroMedicoDTO[]>(`${this.urlEndPoint}/centros`)
  }

  /**
   * Servicios para obtener médicos relacionados a un centro médico
   * @param idCentro {Number} id del centro médico del cual se buscan los médicos
   * @returns {Observable<MedicoDTO[]>} Observable con lista de médicos
   */
  getMedicos (idCentro) : Observable<MedicoDTO[]> {
    return this.httpClient.get<MedicoDTO[]>(`${this.urlEndPoint}/porCentro/${idCentro}`)
  }
}
