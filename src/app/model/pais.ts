export class Pais {
  private _codigo: string;
  private _nombre: string;

  constructor() {
    this._codigo = "";
    this._nombre = "";
  }

  get codigo(): string {
    return this._codigo;
  }

  set codigo(value: string) {
    this._codigo = value;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }
}
