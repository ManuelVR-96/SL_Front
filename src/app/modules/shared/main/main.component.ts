import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { OperarioSessionDTO } from '../../../models/OperarioSession';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
/**
 * Componente principal de la aplicación que incluye el header y el footer
 */
export class MainComponent implements OnInit {

  currentUser : OperarioSessionDTO;
  constructor(private router: Router, private userService:UserService) { }

  ngOnInit(): void {
    console.log('configured routes: ', this.router.config);
    this.currentUser = this.userService.getUser();
  }
  /**
   * Método para llamar el servicio de logout
   */
  logout(){
    this.userService.logout()
  }

}
