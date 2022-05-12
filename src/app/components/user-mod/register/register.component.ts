import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { passwordMatchValidator } from 'src/app/Custom Validators/Password';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
   RegFormGroup:FormGroup;
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router) {
    this.RegFormGroup=fb.group({
      fullName:['',[Validators.required,Validators.minLength(5)]],
      email:['',[Validators.required,Validators.email]],
      mobileNum:fb.array([fb.control('',[Validators.required,Validators.pattern("^01[0-2,5]{1}[0-9]{8}$")])]),
      address:fb.group({
        city:['',Validators.required],
        postalCode:['',Validators.required],
        street:['',Validators.required]
      }),
      password:['',[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")]],
      confirmPassword:[''],
      deliveryOptions:[''],
      specificDays:['']
    }, { validators: passwordMatchValidator });
  
  
  }

  ngOnInit(): void {
  }
  get fullName() {
    return this.RegFormGroup.controls['fullName'];
  }

  get mobileNumArray(): FormArray {
    return this.RegFormGroup.controls['mobileNum'] as FormArray;
  }
  getValidityPhone(i:number) {
    return (<FormArray>this.RegFormGroup.get('mobileNumArray')).controls[i].valid;
  }
  getInValidityPhone(i:number) {
    return (<FormArray>this.RegFormGroup.get('mobileNumArray')).controls[i].invalid && (<FormArray>this.RegFormGroup.get('mobileNumArray')).controls[i].touched;
  }

  get deliveryOptions() {
    return this.RegFormGroup.controls['deliveryOptions'];
  }

  get password() {
    return this.RegFormGroup.controls['password'];
  }
  get email() {
    return this.RegFormGroup.controls['email'];
  }

  get confirmPassword() {
    return this.RegFormGroup.controls['confirmPassword'];
  }

  addPhone() {
    if(this.mobileNumArray.controls[this.mobileNumArray.length-1].value !="")
    {
      this.mobileNumArray.push(this.fb.control('',[Validators.required,Validators.pattern("^01[0-2,5]{1}[0-9]{8}$")]));
    }
    
  }
  removePhone() {
    if(this.mobileNumArray.length>1)
    {
      this.mobileNumArray.removeAt(this.mobileNumArray.length-2);
    }
  }
  setDeliveryOptions()
  {
    if (this.deliveryOptions.value == "SpecificDay")
      this.RegFormGroup.controls['specificDays'].setValidators([Validators.required]);
    else
      this.RegFormGroup.controls['specificDays'].clearValidators();

    this.RegFormGroup.controls['specificDays'].updateValueAndValidity();

  }
  Reg()
  {

     this.authService.Register(this.RegFormGroup.value).subscribe(user=>{
         console.log(user);
         this.router.navigate(['/Home']);
     },(error)=>{
       console.log(error.error);
     })
  }

}
