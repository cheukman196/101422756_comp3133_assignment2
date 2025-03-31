import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function enumValidator(enumType: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // check value matches given enum values
    const isValid = Object.values(enumType).includes(control.value);
    return isValid ? null : { invalidEnum: { value: control.value } };
  };
}