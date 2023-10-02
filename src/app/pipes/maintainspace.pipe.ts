import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maintainspace'
})
export class MaintainspacePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/\n/g, "<br/>");
  }

}
