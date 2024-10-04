import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

 loginForm!: FormGroup;  

  constructor(private router: Router, private fb:FormBuilder , private auth:AuthService ) { }

 ngOnInit():void{
    this.loginForm= this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]

    })


  }


 onSubmit(){
   if(this.loginForm.valid){
     console.log(this.loginForm.value)
    
   }
   else{
     console.log("formulaire invalide")
     this.validateAllFormFields(this.loginForm);
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
  onlogin(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)

      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          console.log(res);
          alert(res.message)
          if(res.role =='admin')
          this.router.navigate(['dashboard'])
          else
          this.router.navigate(['DashboardUser'])
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }

  } 

 }  


  



