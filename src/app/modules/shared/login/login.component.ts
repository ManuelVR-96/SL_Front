import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';
import { OperarioSessionDTO } from '../../../models/OperarioSession';
import { Router } from '@angular/router';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/**
 * Componente para el login de los usuarios
 */
export class LoginComponent implements OnInit {

  form : FormGroup

  constructor(private fb: FormBuilder, private userService : UserService,  private router:Router,
    private alertService : AlertsService
    ) {

    this.form = fb.group({
      password: [, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      cedula : [, [Validators.required, Validators.minLength(6), 
        Validators.maxLength(10), Validators.pattern('[0-9]*')]]
    })
   }
  
  /**
   * Método OnInit. Se verifica que quien intenta acceder a la ruta no está logueada ya.
   * De ser así, se llama a la ruta redirigir
   */
  ngOnInit(): void {
    if(this.userService.getUser()){
      this.redirect()
    }
  }

  /**
   * Método para redirigir. Valida si el usuario es administrador u operario y redirige a la página correspondiente.
   */
  redirect() {
    const userSession = this.userService.getUser()
    if (userSession.idRol === 1){
      this.router.navigate(['/admin']); 
    } else if (userSession.idRol === 2) {
      console.log("Es operario")
      this.router.navigate(['/operario']); 
    }
  }

  /**
   * Método para manejar el submit del formulario. De resultar exitoso, guarda la info de sesión del usuario en el Local Storage
   * De lo contrario, informará del error mediante una alerta.
   * Posteriormente redirige a la página que corresponde al usuario.
   */
  onSubmit(){
    this.userService.login(this.form.value).subscribe(
      userSession => {
        this.userService.saveSession(userSession)
        this.redirect()
      },
      err => {
        this.alertService.showError(err, "Credenciales inválidas", "Verifique cédula y contraseña ingresados")
        console.log(err)
      }
    )
    
  }

}
