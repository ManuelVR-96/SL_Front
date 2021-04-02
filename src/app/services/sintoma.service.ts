import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EspecialidadDTO } from '../models/EspecialidadDTO';
import { PrioridadSintomaDTO } from '../models/PrioridadSintomaDTO';
import { SintomatologiaDTO } from '../models/Sintomatologia';
import { RegistroSintomaDTO } from '../models/RegistroSintomaDTO';


@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para peticiones asociadas a síntomas
 */
export class SintomaService {

  private urlEndPoint: string = 'http://localhost:8080/sintomatologias';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private httpClient : HttpClient) { }

  /**
   * Método para obtener lista de síntomas
   * @returns {Observable<SintomatologiaDTO[]>} Observable con lista de síntomas
   */
  getSintomas () : Observable<SintomatologiaDTO[]> {
    return this.httpClient.get<SintomatologiaDTO[]>(this.urlEndPoint)
  }

  /**
   * Método para agregar nuevos síntomas mediante petición POST
   * @param data {RegistroSintomaDTO} Información del síntoma a agregar. Incluye nombre del síntoma, especialidades asociadas
   * y la prioridad de esta.
   * @returns {Observable<SintomatologiaDTO>} Observable con el nuevo síntoma
   */
  saveSintomas (data: RegistroSintomaDTO) : Observable<SintomatologiaDTO> {
    return this.httpClient.post<SintomatologiaDTO>(this.urlEndPoint+"/", data, {headers:this.httpHeaders});
  }

  /**
   * Método para obtener las prioridades que puede tener un síntoma
   * @returns {Observable<PrioridadSintomaDTO[]>} Observable con lista de prioridades
   */
  getPrioridades () : Observable<PrioridadSintomaDTO[]> {
    return this.httpClient.get<PrioridadSintomaDTO[]>(`${this.urlEndPoint}/prioridades`)
  }
}