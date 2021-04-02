import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CentroMedicoDTO } from 'src/app/models/CentroMedicoDTO';
import { MedicoDTO } from 'src/app/models/MedicoDTO';
import { CentroMedicoService } from '../../../services/centro-medico.service';
import { AgendaDTO } from '../../../models/AgendaDTO';
import { AgendaService } from '../../../services/agenda.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TurnosViewComponent } from '../turnos-view/turnos-view.component';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-consultar-agendas',
  templateUrl: './consultar-agendas.component.html',
  styleUrls: ['./consultar-agendas.component.css']
})
/**
 * Componente para consultar las agendas de los médicos
 */
export class ConsultarAgendasComponent implements OnInit {

  form : FormGroup;
  minDate = new Date();
  listaCentros : CentroMedicoDTO[] = [];
  listaMedicos : MedicoDTO[] = [];
  listaAgendas : AgendaDTO[] = [];
  page : number =1
  dialogConfig = new MatDialogConfig();
  constructor(private fb: FormBuilder, private centroMedicoService : CentroMedicoService, 
    private agendaService : AgendaService, private dialog : MatDialog, private alertsService:AlertsService) { 
    this.form = fb.group({
      idMedico : [,[Validators.required]],
      idCentroMedico : [,[Validators.required]],
    })
  }

  /**
   * Método onInit. Se carga la información del centros médicos y se establece un observable en dicho campo.
   * Una vez se cambie el valor, se cargan los médicos del centro médico elegido
   * Posteriormente se establece un observable en el campo del médico y una vez haya cambios
   * se hace la petición con el médico seleccionado
   * Se reinicia el paginador
   */
  ngOnInit(): void {
    this.centroMedicoService.getCentros().subscribe(
      centros => this.listaCentros = centros,
      err => console.log(err)
    )
    this.form.get("idCentroMedico").valueChanges.subscribe(selectedValue => {
      this.centroMedicoService.getMedicos(selectedValue).subscribe(response => {
        console.log(response),
        this.listaMedicos = response,
        console.log(this.listaMedicos)
      },)
    })

    this.form.get("idMedico").valueChanges.subscribe(selectedValue => {
      this.agendaService.getAgendaMedico(selectedValue).subscribe(response => {
        console.log(response),
        this.listaAgendas = response,
        this.page=1
        },
        err => {
          this.alertsService.showError(err, "", "")
        }
      )
    })
  }

  onSubmit(e){
    console.log("submit")
  }
  /**
   * Método para abrir la ventana emergente que muestra los turnos de la agenda seleccionada
   * @param idAgenda
   */
  openTurnos(idAgenda){
    this.dialogConfig.data = {
      idAgenda : idAgenda
    }
    this.dialogConfig.width = '700px'
    this.dialogConfig.height = '450px'
    this.dialog.open(TurnosViewComponent, this.dialogConfig, )
  }

}
