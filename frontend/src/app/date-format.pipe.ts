import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    const isoString = new Date(Number(value)).toISOString();
    return isoString.split('T')[0];
  }

}
