import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPole'
})
export class FilterPolePipe implements PipeTransform {

  transform(value: any, searchTerm: string) {
    if(value.length ===0 || searchTerm ===''){
      return value
    }
    const cvs=[];
     for (const cv of value){
      if(cv['pole'].toLowerCase().includes(searchTerm.toLowerCase()) ){
        cvs.push(cv);
      }
    }
    return cvs
  
  }

}
