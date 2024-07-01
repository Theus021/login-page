import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'signup-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
  ],
  providers: [LoginService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
signupForm!: FormGroup;

  constructor(
  private router: Router,
  private toastR: ToastrService,
  private loginService: LoginService
  ){
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(7)])
    })
  }

submit(){
  this.loginService.login(this.signupForm.value.email, this.signupForm.value.password).subscribe({
    next: () => this.toastR.success("Login realizado com sucesso"),
    error: () => this.toastR.error("Erro inesperado !")
  })
}

navigate(){
  this.router.navigate(["login"])
}

}
