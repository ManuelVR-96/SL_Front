import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { AgendaService } from '../../../services/agenda.service';
import { TurnoDTO } from '../../../models/TurnoDTO';

/**
 * Componente para la ventana emergente en que se muestran los turnos de una agenda
 */
@Component({
  selector: 'app-turnos-view',
  templateUrl: './turnos-view.component.html',
  styleUrls: ['./turnos-view.component.css']
})
export class TurnosViewComponent implements OnInit {

  idAgenda : number;
  listaTurnos : TurnoDTO[];

  // Se inyecta la dependencia para capturar los parámetros enviados en la carga de la ventana emergente
  constructor(@Inject (MAT_DIALOG_DATA) data, private agendaService : AgendaService) {
    this.idAgenda = data.idAgenda
   }

  /**
   * Método OnInit donde se cargan los turnos relacionados a la agenda
   */
  ngOnInit(): void {
    this.agendaService.getTurnosAgenda(this.idAgenda).subscribe(
      listaTurnos => {
        this.listaTurnos = listaTurnos,
        console.log(this.listaTurnos)
      },
      err => console.log(err)
    )
  }

}
