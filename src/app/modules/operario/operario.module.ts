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
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {NgxPaginationModule} from 'ngx-pagination';
import { TranslateDatePipe } from '../../pipes/translate-date.pipe';
import {MatDialogModule} from '@angular/material/dialog';

import { NuevaCitaComponent } from './nueva-cita/nueva-cita.component';
import { OperarioRoutingModule } from './operario-routing.module';
import { CitasClienteComponent } from './citas-cliente/citas-cliente.component';



@NgModule({
  declarations: [NuevaCitaComponent, CitasClienteComponent],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule, 
    ReactiveFormsModule,
    MatNativeDateModule,
    //BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    NgxPaginationModule,
    MatDialogModule,
    OperarioRoutingModule
  ],
  exports: [

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

export class OperarioModule { }
