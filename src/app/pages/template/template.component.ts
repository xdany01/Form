import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Usuario} from "../../model/usuario";
import {PaisService} from "../../services/pais.service";
import {Pais} from "../../model/pais";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  usuario: Usuario;
  paises: Pais[];

  constructor(
    private paisService: PaisService
  ) {
    this.usuario = new Usuario();
    this.paises = [];
  }

  ngOnInit(): void {
    this.paisService.getPaises()
      // @ts-ignore
      .subscribe((paises: Pais[]) => {
        this.paises = paises;
      });
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach(control => control.markAsTouched());
      return;
    }
    console.log(form.value);
  }

}
