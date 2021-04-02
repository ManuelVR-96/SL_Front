import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CitasService } from '../../../services/citas.service';
import { CitaDTO } from '../../../models/CitaDTO';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AgendaService } from '../../../services/agenda.service';
import { AlertsService } from '../../../services/alerts.service';
import { NgxSpinnerService } from "ngx-spinner";
import {MatSnackBar} from "@angular/material/snack-bar";
import { UserService } from '../../../services/user.service';
import { OperarioSessionDTO } from '../../../models/OperarioSession';

/**
 * Componente para visualizar citas pendientes de agendamiento
 */
@Component({
  selector: 'app-citas-pendientes',
  templateUrl: './citas-pendientes.component.html',
  styleUrls: ['./citas-pendientes.component.css']
})
export class CitasPendientesComponent implements OnInit{

  citasPendientes : CitaDTO[] = [];
  cargando : boolean = true;
  columnas : string[] = [
  "especialidadDesc",
  "nombreCompleto",
  "sintomaDesc",
  "tipoCita"
  ]
  usuarioActual : OperarioSessionDTO
  
    /**
   * Referencia al paginador del componente
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource
  constructor(private snackBar: MatSnackBar, private citasService : CitasService, private agendaService : AgendaService, private alertsService: AlertsService,
    private spinner: NgxSpinnerService, private userService : UserService) { }
  /**
  * Método onInit donde se llama la carga de la data
  */
  ngOnInit(): void {
    this.usuarioActual = this.userService.getUser()
    this.cargaData()
  }

  /**
 * Método para cargar la data de citas pendientes. Se incluye un setTimeOut para que el paginador espere a que la data esté cargada
 */
  cargaData(){
    this.spinner.show()
    this.citasService.getCitasPendientes().subscribe(
      citasPendientes => {this.citasPendientes = citasPendientes,
      this.dataSource = new MatTableDataSource<CitaDTO>(this.citasPendientes);
      
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.cargando = false
      this.spinner.hide()
      },
      err => {
        this.spinner.hide()
        this.alertsService.showError(err,"Error cargando las citas", "")
      }
    )
  }
  /**
   * Método para lanzar el proceso de agendamiento de citas. Se llama de nuevo al método cargar data para actualizar lista de 
   * citas pendientes. Se emite alerta no bloqueante indicando la cantidad de citas asignadas, o un error si es el caso
   */
  agendar(){
    // this.spinner.show()
    this.snackBar.open('Proceso de agendamiento iniciado', 'En unos instantes se le notificará el resultado', {
      duration: 3000
    });
    console.log(this.usuarioActual.idOperario)
    this.agendaService.agendar(this.usuarioActual.idOperario).subscribe(
      resp => {
        console.log(resp),
        this.cargaData()
        // this.spinner.hide()
        this.alertsService.showExito("Proceso finalizado con éxito", `Han sido asignadas ${resp.Asignadas} citas. Quedan pendientes 
        ${resp.Faltan}`)
      },
      err => this.alertsService.showError(err, "", "")
    )  
  }

}
