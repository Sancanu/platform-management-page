import { Component, OnInit } from '@angular/core';
import { ProjectService } from '@services/projects-service/project.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProjects } from '../../../app/models/projects.models';


//Config
import { config } from '@helpers/config/config';
import { ERoles } from 'src/app/models/roles.model';
import { ModalProjectComponent } from '@components/modal-project/modal-project.component';
import { AuthService } from '@services/auth-service/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public projects: IProjects[] = []
  public role:string
  constructor(
    private readonly authService: AuthService,
    private readonly projectService: ProjectService,
    public router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {

    this.searchProjects()
    this.getRole()

  }

  searchProjects() {
    this.projectService.searchProjects().subscribe(
      (response) => {
        this.projects = response;

      },
      (error) => {
        // aca se debe mostar un error cuando no recibe los proyectos
        console.log("error en projects", error);
      }
    );

  }

  getRole(){
    const payload = this.authService.getJwtPayload()
    this.role = payload.role
  }



  goToProjectDetail(id: number) {

    if(this.authService.getJwtPayload().role == ERoles.ADMIN){
      const urlRouter = `${config.router.user_admin}/${config.router.user_admin_sub.project}/${id} `
      this.router.navigate([
        urlRouter.trim()
      ]);
    }

  }

  openProjectModal() {
    console.log("abir modal user-admin ")
    const modalRef = this.modalService.open(ModalProjectComponent,
      {
        centered: true,
        keyboard: false,
        backdrop: 'static',
      })
    //modalRef.componentInstance.DataNoticia = this.noticias[i];
  }


}
