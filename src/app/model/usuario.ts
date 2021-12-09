export class Usuario{
  private _apellido: string;
  private _email: string;
  private _nombre: string;

  constructor() {
    this._apellido = "";
    this._email = "";
    this._nombre = "";
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
}
