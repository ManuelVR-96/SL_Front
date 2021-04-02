import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoCitaDTO } from '../models/TipoCitaDTO';
import { TipoContratoDTO } from '../models/TipoContratoDTO';
import { CuotaDTO } from '../models/CuotaDTO';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para peticiones asociadas a cuotas moderadoras y sus parámetros asociados
 */
export class CuotaService {

  private urlEndPoint: string = 'http://localhost:8080/cuotas/';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private httpClient : HttpClient) { }

  /**
   * Método para obtener los tipos de citas mediante petición GET
   * @returns {Observable<TipoCitaDTO[]>} Observable con los tipos de citas
   */
  getTiposCita() : Observable<TipoCitaDTO[]>{
    return this.httpClient.get<TipoCitaDTO[]>(`${this.urlEndPoint}tiposCita`)
  }

  /**
   * Método para obtener mediante petición GET, lista con los tipos de contrato
   * @returns {Observable<TipoContratoDTO[]>} Observable con lista de tipos de contrato
   */
  getTiposContrato() : Observable<TipoContratoDTO[]>{
    return this.httpClient.get<TipoContratoDTO[]>(`${this.urlEndPoint}tiposContrato`)
  }
  
  /**
   * Método para actualizar cuota moderadora
   * @param data Información de la cuota moderadora a actualizar
   * @param idOperario id del operario que realiza el cambio
   * @returns Observable informando éxito o error de la operación
   */
  saveCuota(data : CuotaDTO, idOperario:Number) : Observable<any>{
    return this.httpClient.put<any>(`${this.urlEndPoint}${idOperario}`, data, {headers:this.httpHeaders})
  }
}
