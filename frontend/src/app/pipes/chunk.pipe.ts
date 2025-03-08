import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chunk',
  standalone: true
})
export class ChunkPipe implements PipeTransform {

  transform(value: any[], chunkSize: number): any[] {
    if (!value || chunkSize <= 0) {
      return [];
    }

    const result = [];
    for (let i = 0; i < value.length; i += chunkSize) {
      result.push(value.slice(i, i + chunkSize));
    }

    return result;
  }

}
