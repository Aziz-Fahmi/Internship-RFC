import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPoste'
})
export class FilterPostePipe implements PipeTransform {

  transform(value: any, searchTerm: string) {
    if(value.length ===0 || searchTerm ===''){
      return value
    }
    const cvs=[];
     for (const cv of value){
      if(cv['poste'].toLowerCase().includes(searchTerm.toLowerCase()) ){
        cvs.push(cv);
      }
    }
    return cvs
  
  }

}
