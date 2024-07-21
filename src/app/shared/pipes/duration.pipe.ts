import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(value: any): string {
    const numValue = Number(value);
  
    if (isNaN(numValue) || numValue < 0) {
      return 'Invalid duration';
    }
    
    if (numValue === 0) {
      return '00:00 hours';
    }

    const hours = Math.floor(numValue).toString().padStart(2, '0');
    const minutes = ((numValue - Math.floor(numValue)) * 60).toFixed(0).padStart(2, '0');

    return `${hours}:${minutes} hours`;
  }
}
  