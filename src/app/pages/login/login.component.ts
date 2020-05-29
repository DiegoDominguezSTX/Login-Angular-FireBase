import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Cargando...!'
    });

    /* Swal.showLoading(); */
    this.auth.logIn(this.usuario)
    .subscribe(resp => {
      console.log(resp);
    }, (err) => {
      console.log(err.error.error.message);
    });
  }

}
