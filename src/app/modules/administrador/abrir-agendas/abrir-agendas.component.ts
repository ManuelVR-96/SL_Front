import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CentroMedicoDTO } from '../../../models/CentroMedicoDTO';
import { MedicoDTO } from '../../../models/MedicoDTO';
import { CentroMedicoService } from '../../../services/centro-medico.service';
import { AgendaService } from '../../../services/agenda.service';
import { UserService } from '../../../services/user.service';
import { OperarioSessionDTO } from '../../../models/OperarioSession';
import Swal from 'sweetalert2';
import { AlertsService } from '../../../services/alerts.service';

import * as holidays from 'colombia-holidays'
import { DatePipe } from '@angular/common';

/**
 * Componente para apertura de nuevas agendas
 */

@Component({
  selector: 'app-abrir-agendas',
  templateUrl: './abrir-agendas.component.html',
  styleUrls: ['./abrir-agendas.component.css']
})
export class AbrirAgendasComponent implements OnInit{

  form : FormGroup;
  minDate = new Date();
  listaCentros : CentroMedicoDTO[] = [];
  listaMedicos : MedicoDTO[] = [];
  currentUser : OperarioSessionDTO;
  holidayList = []
  fechasAgendadas = []
  myFilter = null

  dateClass = (d: Date) => {
    const date = d.getDate();
    console.log((date === 1 || date === 20))
    // Highlight the 1st and 20th day of each month.
    return (date === 1 || date === 20) ? 'example-custom-date-class' : undefined;
  }

  @ViewChild('formDirective') private formDirective: NgForm;
  
  constructor(private fb: FormBuilder, private centroService : CentroMedicoService, private agendaService : AgendaService,
    private userService : UserService, private alertService : AlertsService, private datePipe : DatePipe) {
    // SE CREA FORMULARIO
    this.form = this.fb.group({
      fechaInicio: [,[Validators.required]],
      fechaFinal : [,[Validators.required]],
      idMedico : [,[Validators.required]],
      idCentroMedico : [, [Validators.required]],
    })
   }

  ngOnInit(): void {
    //SE CARGAN LOS CENTROS MÉDICOS MEDIANTE EL SERVICIO centroService
    this.centroService.getCentros().subscribe(centros => this.listaCentros = centros)
    //SE GUARDAN EN UNA LISTA LOS FESTIVOS DEL AÑO 2021
    holidays.getColombiaHolidaysByYear(2021).map(fecha => this.holidayList.push(new Date(this.datePipe.transform(fecha.holiday, 'MM-dd-yy')))),
    // SUSCRIPCIÓN AL CAMPO CENTRO MÉDICO PARA DETECTAR CAMBIOS. CUANDO ESTOS OCURRAN, SE ENVÍA LA PETICIÓN PARA OBTENER
    // MÉDICO DE DICHO CENTRO MÉDICO
    this.form.get("idCentroMedico").valueChanges.subscribe(selectedValue => {
      if(selectedValue!=null){
        this.centroService.getMedicos(selectedValue).subscribe(response => {
          this.listaMedicos = response
        },
        err => this.alertService.showError(err, "", "")
        )
      }
    })

    //SUSCRIPCIÓN AL CAMPO DEL MÉDICO. CUANDO ESTE OCURRE, SE ENVÍA LA PETICIÓN PARA OBTENER LAS FECHAS EN QUE EL MÉDICO YA 
    // TIENE AGENDA, Y REFLEJARLOS EN EL DATE PICKER
    this.form.get("idMedico").valueChanges.subscribe(selectedValue =>{
      if(selectedValue!=null){
        this.agendaService.getFechasAgendadas(selectedValue).subscribe(
          fechas => {
          // SE CONFORMA LA LISTA DE FECHA A DESHABILITAR, CONCATENANDO LA LISTA DE FESTIVOS, CON LA DE FECHAS YA AGENDADAS
          this.fechasAgendadas = fechas.map(fecha => new Date(this.datePipe.transform(fecha, 'MM-dd-yy'))),
          this.holidayList = this.holidayList.concat(this.fechasAgendadas)
          // SE INICIALIZA EL FILTRO (PARA DESHABILITAR FECHAS)
          this.myFilter = (d: Date): boolean => {
            const time=d.getTime()
            return !this.holidayList.find(x=>x.getTime()==time)
          }
        })
      }
    })
    
    console.log(this.userService.getUser())
  }

  /**
  * Método para manejar el submit del formulario. 
  * Se envía la data del formulario y emite una alerta indicando el éxito o el error del proceso
  */
  onSubmit() {
    console.log(this.minDate)
    // AL SUBMITEAR EL FORMULARIO, SE ENVÍA LA PETICIÓN PARA AGREGAR CITA
    // DEPENDIENDO DEL RESULTADO SE LLAMA UNA U OTRA FUNCIÓN DEL SERVICIO PARA MOSTRAR ALERTAS
    this.agendaService.saveAgenda(this.form.value).subscribe(
      resp => {
        this.alertService.showExito("Agenda abierta con éxito", "La agenda está lista para ser asignada")
        console.log(resp)
      },
      err => {
        console.log(err)
        this.alertService.showError(err, "Agenda no pudo ser agregada", "Asegúrese de que no existía una agenda para dicha fecha")
      }
    )
    this.formDirective.resetForm()
  }

}
