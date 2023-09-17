import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import { JwtHelperService } from '@auth0/angular-jwt';

//Enviroment
import { environment } from '@environments/environment';

//Services
import { AuthService } from '@services/auth-service/auth.service'
import { config } from '@helpers/config/config';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI 
  banner_section_param: string = "login";
  userForm: FormGroup;
  responseApi: any;
  url_to_continue: any;
  message_login:any

  config = config;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    
  ) {

    
  }

  ngOnInit(): void {
    this.blockUI.stop();
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required,]],
      pass: ['', [Validators.required]]
    });


  }

  onSubmit(){
    this.blockUI.start('Validando...');
    this.message_login = '';

    this.authService.login(this.userForm.value).subscribe(
      (response) => {
        this.message_login = '';
        this.blockUI.stop();
        debugger
        this.router.navigate([`/${config.router.home}`]);
      },
      (error) => {
         this.message_login = 'Datos ingresados no válidos. Intente nuevamente.';
         this.blockUI.stop();
     }
    );

  }

  onPassSelect(value) {
    this.userForm.get("pass").setValue(value);
  }




}






