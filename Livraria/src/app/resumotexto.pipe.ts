import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resumoTexto',
  standalone: true
})
export class ResumoTextoPipe implements PipeTransform {
  transform(value: string, limite: number = 100): string {
    return value.length > limite ? value.substring(0, limite) + '...' : value;
  }
}
