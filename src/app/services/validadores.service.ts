import {Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() {
  }

  /* Cuando se utiliza va sin parentesis
--------------------------------------------*/
  noNunez(control: AbstractControl): ValidationErrors | null {
    return (control.value?.toLowerCase() === 'nuñez') ? {noNunez: true} : null;
  }

  /* Cuando se utiliza va con parentesis
--------------------------------------------*/
  noNunez2(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return (control.value?.toLowerCase() === 'nuñez') ? {noNunez: true} : null;
    };
  }

  /* Cuando se utiliza va sin parentesis
--------------------------------------------*/
  passwordsDistintos(control: AbstractControl): ValidationErrors | null {
    let password = control.get(['password1'])?.value;
    let confirmPassword = control.get(['password2'])?.value;
    return (password !== confirmPassword) ? {passwordsDistintos: true} : null;
  }

  /* Cuando se utiliza va con parentesis y los parametros respectivos
--------------------------------------------*/
  passwordsDistintos2(pass1: string, pass2: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let password = control.get([pass1])?.value;
      let confirmPassword = control.get([pass2])?.value;
      return (password !== confirmPassword) ? {passwordsDistintos: true} : null;
    };
  }

  existeUsuario(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    if (!control.value) {
      return Promise.resolve(null);
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value?.toLowerCase() === 'xddany') {
          resolve({usuariExiste: true});
        } else {
          resolve(null);
        }
      }, 3500);
    });
  }
}
