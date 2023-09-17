import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { config } from '@helpers/config/config';
import { ModalProjectComponent } from '@components/modal-project/modal-project.component';
import { ProjectService } from '@services/projects-service/project.service';

import { IProjects } from '../models/projects.models';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {
  public  id_project: number = 0
  public project: IProjects = {
    projectId: 0,
    amount: 0,
    description: "",
    directorName: "",
    expenseAmount: 0,
    finishDate: "",
    startDate: "",
    title: "",
    totalCost: 0,
    typeProject: ""
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public projectService: ProjectService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.id_project = Number(this.route.snapshot.paramMap.get('id_project'));
    this.searchProjects()

  }

  searchProjects() {
    this.projectService.searchProject(this.id_project).subscribe(
      (response) => {
        this.project = response;
      },
      (error) => { console.log(error); }
    );

  }

  deleteProject() {
    this.projectService.deleteProject(this.id_project).subscribe(
      (response) => {
        this.router.navigate([`/${config.router.home}`]);
      },
      (error) => { console.log(error); }
    );

  }

  openProjectModal() {
    console.log("abir modal user-admin ")
    const modalRef = this.modalService.open(ModalProjectComponent,
      {
        centered: true,
        keyboard: false,
        backdrop: 'static',
      })
    modalRef.componentInstance.dataProject = this.project;
  }

}
