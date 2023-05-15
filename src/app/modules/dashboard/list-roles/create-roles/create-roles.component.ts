import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { AlertSwallService } from 'src/app/core/alert-swall.service';
import { FuncionarioService } from 'src/app/modules/services/funcionario.service';
import { RolesService } from 'src/app/modules/services/roles.service';

@Component({
  selector: 'app-create-roles',
  templateUrl: './create-roles.component.html',
  styleUrls: ['./create-roles.component.css']
})
export class CreateRolesComponent implements OnInit {
  basicForm!: FormGroup;
  @Input() title: string = "";
  @Input() id: string = "";
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public baseService: RolesService,
    public alertSwal: AlertSwallService
  ) { }

  ngOnInit(): void {
    this.createForm();

    if (this.id !== "") {
      this.baseService.getById(this.id).subscribe( data => {
        this.basicForm.setValue({
          nombre: data.data.nombre,
        });
      });
    }
  }

  createForm() {
    this.basicForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
    });
  }

  register(basicForm: any) {
    this.isLoading = true;
    if (this.id !== "") {
      this.baseService
        .update(this.id, basicForm)
        .pipe(
          finalize(() => {
            this.basicForm.markAsPristine();
            this.isLoading = false;
          })
        )
        .subscribe(
          data3 => {
            this.alertSwal.showSwallSuccess(data3.success);
            this.activeModal.close(data3);
          },
          (error: any) => {
            this.alertSwal.showSwallError(error);
          }
        );
    } else {
      this.baseService
        .create(basicForm)
        .pipe(
          finalize(() => {
            this.basicForm.markAsPristine();
            this.isLoading = false;
          })
        )
        .subscribe(
          data => {
            this.alertSwal.showSwallSuccess(data.success);
            this.activeModal.close(data);
          },
          (error: any) => {
            this.alertSwal.showSwallError(error.error);
          }
        );
    }
  }
}
