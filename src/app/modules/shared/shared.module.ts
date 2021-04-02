import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorModule } from '../administrador/administrador.module';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { LlenarComponent } from './llenar/llenar.component';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [MainComponent, LoginComponent, LlenarComponent],
  imports: [
    NgxSpinnerModule,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    // AdministradorModule
    AppRoutingModule,
    BrowserModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MainComponent,
    LoginComponent,
  ]
})
export class SharedModule { }
