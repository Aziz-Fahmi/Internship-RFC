import { Component } from '@angular/core';
import { CV } from '../../../models/CV';
import { CVService } from '../../../services/cv.service';

@Component({
  selector: 'app-tableau-user',
  templateUrl: './tableau-user.component.html',
  styleUrls: ['./tableau-user.component.css']
})
export class TableauUserComponent {

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


  
}

