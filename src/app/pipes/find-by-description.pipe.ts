import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'findByDescriptionFiler'
})
export class FindByDescriptionPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {return []; }
    if (!searchText) {return items; }

    searchText = searchText.toLowerCase();
    return items.filter( item => {
      return item.Description.toLowerCase().includes(searchText);
    });
  }

}
