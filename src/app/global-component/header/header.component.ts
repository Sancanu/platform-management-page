import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { config } from '@helpers/config/config';

//Services
import { AuthService } from '@services/auth-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logo_empreesa: string = "";
  empresaData: any;
  config = config;
  constructor(
    private readonly authService: AuthService,
  ) { }

  ngOnInit(): void {

  }

  logout() {
    this.authService.logout().subscribe
      (
        (response) => {

        },
        (error) => {
          // aca se debe mostar un error cuando no recibe los proyectos
          console.log("error en projects", error);
        }
      );
  }

}
