import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateFormatValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      // check if value matches YYYY-MM-DD format
      const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(value);
  
      if (!isValidFormat) {
        return { invalidDateFormat: { value } };
      }
  
      // check if date values are valid
      const date = new Date(value);
      const isValidDate = !isNaN(date.getTime()) && value === date.toISOString().split('T')[0];
  
      return isValidDate ? null : { invalidDate: { value } };
    };
  }