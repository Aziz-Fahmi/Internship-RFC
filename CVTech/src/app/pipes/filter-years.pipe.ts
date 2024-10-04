import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterYears'
})
export class FilterYearsPipe implements PipeTransform {

  transform(value: any, searchTerm: string) {
    if(value.length ===0 || searchTerm ===''){
      return value
    }
    const cvs=[];
     for (const cv of value){
      if(cv['annees_d_experience']==searchTerm ){
        cvs.push(cv);
      }
    }
    return cvs
  
  }

}
