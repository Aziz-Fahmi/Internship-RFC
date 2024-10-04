import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterNiveau'
})
export class FilterNiveauPipe implements PipeTransform {

  transform(value: any, searchTerm: string) {
    if(value.length ===0 || searchTerm ===''){
      return value
    }
    const cvs=[];
     for (const cv of value){
      if(cv['niveau_d_etudes'].toLowerCase().includes(searchTerm.toLowerCase()) ){
        cvs.push(cv);
      }
    }
    return cvs
  
  }

}
