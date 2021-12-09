import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Usuario} from "../../model/usuario";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  usuario: Usuario;

  constructor() {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach(control => control.markAsTouched());
      return;
    }
    console.log(form.value);
  }

}
