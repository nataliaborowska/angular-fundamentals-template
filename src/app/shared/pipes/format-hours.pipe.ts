import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatHours'
})
export class FormatHoursPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      value = '0';
    }

    if (typeof value !== 'number' || isNaN(value)) {
      return value.toString();
    }

    const hours = Math.floor(value).toString().padStart(2, '0');
    const minutes = ((value - Math.floor(value)) * 60).toFixed(0).padStart(2, '0');

    return `${hours}:${minutes} hours`;
  }
}
