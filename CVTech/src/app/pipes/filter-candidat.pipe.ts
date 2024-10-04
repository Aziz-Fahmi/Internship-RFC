import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCandidat'
})
export class FilterCandidatPipe implements PipeTransform {

  transform(value: any, searchTerm: string) {
    if(value.length ===0 || searchTerm ===''){
      return value
    }
    const cvs=[];
     for (const cv of value){
      if(cv['candidat'].toLowerCase().includes(searchTerm.toLowerCase()) ){
        cvs.push(cv);
      }
    }
    return cvs
  
  }
}
