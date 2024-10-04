import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchTerm: any) {
    if (value.length === 0 || searchTerm === '') {
      return value;
    }

    const results = [];
    for (const item of value) {
      let foundMatch = false;
      const keys = Object.keys(item);
      for (const key of keys) {
        const value = item[key];
        if (typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())) {
          foundMatch = true;
          break; // stop searching once a match is found
        }
      }
      if (foundMatch) {
        results.push(item); // add the item if a match was found
      }
    }

    return results;
  }

}
