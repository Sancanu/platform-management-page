import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProjectService } from '@services/projects-service/project.service';
import { ICreateProjects } from 'src/app/models/create-project.model';
import { IProjects } from 'src/app/models/projects.models';


@Component({
  selector: 'app-modal-project',
  templateUrl: './modal-project.component.html',
  styleUrls: ['./modal-project.component.scss']
})
export class ModalProjectComponent implements OnInit {

  @Input('dataProject') dataProject: IProjects;
  miFormProject: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    public modal: NgbModal,
    private readonly projectService: ProjectService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.miFormProject = this.initForm();
  }

  initForm(): FormGroup {
    return this.miFormProject = this.formBuilder.group({
      title: [this.dataProject?.title ?? '', [Validators.required]],
      description: [this.dataProject?.description ?? '', [Validators.required]],
      startDate: [this.dataProject?.startDate ?? '', [Validators.required]],
      finishDate: [this.dataProject?.finishDate ?? '', [Validators.required]],
      ammount: [this.dataProject?.amount ?? 0, [Validators.required]],
      typeProject: [this.dataProject?.typeProject ?? '', [Validators.required]],
      totalCost: [this.dataProject?.totalCost ?? 0, [Validators.required]],
      expenseAmount: [this.dataProject?.expenseAmount ?? 0, [Validators.required]],
      directorName: [this.dataProject?.directorName ?? "", [Validators.required]],

    });
  }

  onSubmit(): void {
    if (this.miFormProject.valid) {
      // El formulario es válido, realiza la acción deseada aquí
      
      let body:ICreateProjects = this.miFormProject.value
      
      if(this.dataProject != null ){
        console.log("aca");
        body["projectId"] = this.dataProject.projectId
      }
      console.log("body",body)
      debugger;
      this.projectService.editOrCreateProject(body).subscribe(
        (response) => {
          this.modal.dismissAll('Cerrar')
        },
        (error) => { console.log(error); }
      );

    }
  }
}
