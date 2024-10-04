import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signUpForm!: FormGroup;  
 

  constructor(private router: Router,private fb: FormBuilder ,  private auth:AuthService) { }

  ngOnInit():void{
    this.signUpForm= this.fb.group({
      nom:['',Validators.required],
      prenom:['',Validators.required],
      role:['',Validators.required],
      username:['',Validators.required],
      password:['',Validators.required]

    })


  }


  onSignUp(){
   if(this.signUpForm.valid){
     console.log(this.signUpForm.value)
    
   }
   else{
     console.log("formulaire invalide")
     this.validateAllFormFields(this.signUpForm);
     alert("le formulaire est invalide")

    }

  }



  private validateAllFormFields(formGroup: FormGroup){
   Object.keys(formGroup.controls).forEach(field => {

    const control = formGroup.get(field);
    if(control instanceof FormControl) {
      control.markAsDirty({onlySelf: true });

    } else if(control instanceof FormGroup){
      this.validateAllFormFields(control)
    }   
   })
  }

  onAjout(){
    if(this.signUpForm.valid){
   

    this.auth.ajouter(this.signUpForm.value)
    .subscribe({
      next:(res)=>{
        alert(res.message);
        this.signUpForm.reset();
      },
      error:(err)=>{
        alert(err?.error.message)
      }
    })
   }
  }

  onRetour(){
    this.router.navigate(['dashboard'])
  }

}
