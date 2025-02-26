import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salaryFormat',
  standalone: true 
})
export class SalaryFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(2) + 'M'; 
    } else {
      return (value / 10000).toFixed(2) + 'K'; 
    }
  }
}
