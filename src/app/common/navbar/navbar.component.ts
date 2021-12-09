import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public menu: IMenu[];
  public titulo: string;

  constructor() {
    this.menu = [{
      titulo: 'Formulario por Template',
      menu: 'Template',
      ruta: 'template'
    }, {
      titulo: 'Formulario Reactivo',
      menu: 'Reactive',
      ruta: 'reactive'
    }];
    this.titulo = this.menu[0].titulo;
  }

  ngOnInit(): void {
  }

  cambiarTitulo(ruta: string) {
    if (ruta == null) {
      this.titulo = this.menu[0].titulo;

    }
    for (const m of this.menu) {
      if (m.ruta == ruta) {
        this.titulo = m.titulo;
      }
    }
  }
}

export interface IMenu {
  titulo: string,
  menu: string,
  ruta: string
}
