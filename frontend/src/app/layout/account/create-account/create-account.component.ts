import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { CreateAccountService } from "./create-account.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.component.html",
  styleUrls: ["./create-account.component.css"],
})
export class CreateAccountComponent implements OnInit {
  formUsuario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private createAccountService: CreateAccountService,
    private route: Router,
    private toast: ToastrService
  ) {
    this.formUsuario = this.fb.group({
      nomeCompleto: ["", Validators.required],
      cep: ["", [Validators.required]],
      usuario: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, Validators.email]],
      senha: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.formUsuario.valid) {
      this.createAccountService.cadastrarUsuario(this.formUsuario.value).subscribe(
        (response) => {
          console.log("Dados enviados com sucesso:", response);
          this.toast.success("Usuário criado com sucesso!");
          this.route.navigate(["login"]);
        },
        (error) => {
          console.error("Erro ao enviar dados:", error);
          this.toast.error(error);
        }
      );
    } else {
      console.error("Formulário inválido. Verifique os campos.");
    }
  }

  public isFormControlInvalid(controlName:string):boolean{
    return !!(this.formUsuario.get(controlName)?.invalid && this.formUsuario.get(controlName)?.touched)
  }
}
