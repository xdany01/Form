export class Usuario {
  private _apellido: string;
  private _email: string;
  private _nombre: string;
  private _pais: string;
  private _genero: string;

  constructor() {
    this._apellido = "";
    this._email = "";
    this._nombre = "";
    this._pais = "";
    this._genero = "M";
  }

  get apellido(): string {
    return this._apellido;
  }

  set apellido(value: string) {
    this._apellido = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }

  get pais(): string {
    return this._pais;
  }

  set pais(value: string) {
    this._pais = value;
  }

  get genero(): string {
    return this._genero;
  }

  set genero(value: string) {
    this._genero = value;
  }
}
