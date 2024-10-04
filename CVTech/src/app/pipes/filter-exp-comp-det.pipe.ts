import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterExpCompDet'
})
export class FilterExpCompDetPipe implements PipeTransform {

  transform(value: any, searchTerm: string) {
    if(value.length ===0 || searchTerm ===''){
      return value
    }
    const cvs=[];
     for (const cv of value){
      if(cv['competences_et_Experiences_detectees'].toLowerCase().includes(searchTerm.toLowerCase()) ){
        cvs.push(cv);
      }
    }
    return cvs
  
  }


}
