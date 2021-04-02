import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatIcon, MatIconModule} from '@angular/material/icon'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgregarSintomaComponent } from './agregar-sintoma/agregar-sintoma.component';
import { AbrirAgendasComponent } from './abrir-agendas/abrir-agendas.component';
import { AdministradoRoutingModule } from './administrador-routing.module';
import { ConsultarAgendasComponent } from './consultar-agendas/consultar-agendas.component';
import { CuotaComponent } from './cuota/cuota.component';
import { CitasPendientesComponent } from './citas-pendientes/citas-pendientes.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {NgxPaginationModule} from 'ngx-pagination';
import { TranslateDatePipe } from '../../pipes/translate-date.pipe';
import { TurnosViewComponent } from './turnos-view/turnos-view.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';




@NgModule({
  declarations: [TranslateDatePipe,AgregarSintomaComponent, AbrirAgendasComponent, ConsultarAgendasComponent, CuotaComponent, CitasPendientesComponent, TurnosViewComponent],
  imports: [
    MatSnackBarModule,
    NgxSpinnerModule,
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule, 
    ReactiveFormsModule,
    MatNativeDateModule,
    //BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    AdministradoRoutingModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    NgxPaginationModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [
    AgregarSintomaComponent,
    AbrirAgendasComponent,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    //BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
  ],
  providers : [DatePipe, TranslateDatePipe]
})
export class AdministradorModule { }
