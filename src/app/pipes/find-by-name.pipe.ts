import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'findByNameFiler'
})
export class FindByNamePipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {return []; }
    if (!searchText) {return items; }

    searchText = searchText.toLowerCase();
    return items.filter( item => {
      return item.FullName.toLowerCase().includes(searchText);
    });
  }

}
