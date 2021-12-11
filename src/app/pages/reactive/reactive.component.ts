import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators, ValidatorFn} from "@angular/forms";
import {ValidadoresService} from "../../services/validadores.service";

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {

  form: FormGroup;

  constructor(
    private validadoresService: ValidadoresService
  ) {
    this.form = new FormGroup({
        nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
        apellido: new FormControl('', [Validators.required, Validators.minLength(3), this.validadoresService.noNunez]),
        email: new FormControl('', this.emailSynValidators),
        usuario: new FormControl('', [Validators.required, Validators.minLength(3)], this.validadoresService.existeUsuario),
        password1: new FormControl('', this.passwordSynValidators),
        password2: new FormControl(''),
        direccion: new FormGroup({
          distrito: new FormControl('', [Validators.required, Validators.minLength(3)]),
          ciudad: new FormControl('', [Validators.required, Validators.minLength(3)])
        }),
        pasatiempos: new FormArray([])
      }
      , {
        validators: this.validadoresService.passwordsDistintos2('password1', 'password2')
      }
    );
    this.cargarDataForm();
    this.crearListener();
  }

  ngOnInit(): void {
  }

  crearListener() {
    // this.form.valueChanges.subscribe(valor => console.log(valor))
    // this.form.statusChanges.subscribe(status => console.log({status}))
    this.form.get('nombre')?.valueChanges.subscribe(valor => console.log(valor))
  }

  get pasatiempos(): FormArray {
    return this.form.get('pasatiempos') as FormArray;
  }

  get passwordSynValidators(): ValidatorFn[] {
    return [Validators.required, Validators.pattern('(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{6,}$')];
  }

  get emailSynValidators(): ValidatorFn[] {
    return [Validators.required, Validators.pattern("^(([^<>()\\[\\]\\\\.,:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")];
  }

  get nombreNoValido(): boolean {
    // @ts-ignore
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  get apellidoNoValido(): boolean {
    // @ts-ignore
    return this.form.get('apellido').invalid && this.form.get('apellido').touched;
  }

  get emailNoValido(): boolean {
    // @ts-ignore
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get usuarioNoValido(): boolean {
    // @ts-ignore
    return this.form.get('usuario').invalid && this.form.get('usuario').touched;
  }

  passwordNoValido(i: number): boolean {
    // @ts-ignore
    return this.form.get(`password${i}`).invalid && this.form.get(`password${i}`).touched;
  }

  get distritoNoValido(): boolean {
    // @ts-ignore
    return this.form.get('direccion.distrito').invalid && this.form.get('direccion.distrito').touched;
  }

  get ciudadNoValido(): boolean {
    // @ts-ignore
    return this.form.get('direccion.ciudad').invalid && this.form.get('direccion.ciudad').touched;
  }

  get pass2Distinto() {
    const pass1 = this.form.get('password1')?.value;
    const pass2 = this.form.get('password2')?.value;
    return (pass1 !== pass2 && this.form.get('password2')?.touched);
  }

  validationMinLength(input: string): boolean {
    return this.form.get(input)?.errors?.['minlength'] && this.form.get(input)?.touched;
  }

  validationRequired(input: string): boolean {
    return this.form.get(input)?.errors?.['required'] && this.form.get(input)?.touched;
  }

  validationNoNunez(input: string): boolean {
    return this.form.get(input)?.errors?.['noNunez'] && this.form.get(input)?.touched;
  }

  validationPattern(input: string): boolean {
    return this.form.get(input)?.errors?.['pattern'] && this.form.get(input)?.touched;
  }

  validationUsuario(): boolean {
    return this.form.get('usuario')?.errors?.['usuariExiste'] && this.form.get('usuario')?.touched;
  }

  /* Es posible cargar datos con setValue y con reset
--------------------------------------------*/
  cargarDataForm() {
    // this.form.setValue({
    this.form.reset({
      nombre: 'Daniel',
      apellido: 'Nunez',
      email: 'xd_dany@me.com',
      direccion: {
        distrito: 'La Matanza',
        ciudad: 'Isidro Casanova'
      }
    });
  }

  guardar() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
      Object.values(this.form.controls).forEach(c => {
        if (c instanceof FormGroup) {
          Object.values(c.controls).forEach(c2 => console.log(c2.errors))
        } else {
          console.log(c.errors);
        }
      });
      console.log(this.form.errors);
      return;
    }
    console.log(this.form.value);
    this.form.reset();
  }

  agregarPasatiempo() {
    this.pasatiempos.push(new FormControl(''))
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }

}
