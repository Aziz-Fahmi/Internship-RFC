import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterLangue'
})
export class FilterLanguePipe implements PipeTransform {

  transform(value: any, searchTerm: string) {
    if(value.length ===0 || searchTerm ===''){
      return value
    }
    const cvs=[];
     for (const cv of value){
      if(cv['langue'].toLowerCase().includes(searchTerm.toLowerCase()) ){
        cvs.push(cv);
      }
    }
    return cvs
  
  }


}
