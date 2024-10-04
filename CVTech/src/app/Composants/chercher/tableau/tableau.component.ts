import { Component } from '@angular/core';
import { CV } from '../../../models/CV';
import { CVService } from '../../../services/cv.service';


@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent {

  searchTerms:string='';
  searchCandidat:string='';
  searchPoste:string='';
  searchuniversites:string='';
  searchniveau_d_etudes:string='';
  searchannees_d_experience:string='';
  searchpole:string='';
  searchmail:string='';
  searchtel:string='';
  searchcV_URL:string='';
  searchid:string='';
  searchlangue:string='';
  searchexperience:string='';
  searchcompetance:string='';
  searchformation:string='';
  searchcompetences_et_Experiences_detectees:string='';
  cvs: CV[] =[];
  cvToEdit? : CV
  constructor(private CVservice:CVService){

  }  
  
  ngOnInit():void{
   this.CVservice.getCVs().subscribe((result: CV[])=>(this.cvs = result));

  }
  updateCVList(cv: CV[]) {
    this.cvs = cv;
  }

  initNewCV() {
    this.cvToEdit = new CV();
  }

  editCV(cv: CV) {
    this.cvToEdit = cv;
  }
  
}
