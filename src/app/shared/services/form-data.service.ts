import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BusinessForm } from '../../pages/business-information/models/business-form';
import { VerifyForm } from '../../pages/verification-code/models/verify';
import { RegisterForm } from '../../pages/register/models/register-form';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    
    if (!this.formIsExist()) this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      registerForm: this.fb.group<RegisterForm>(
        {
          firstName: this.fb.control(null,[Validators.required,Validators.pattern(/^[a-zA-Z]+$/)]),
          lastName: this.fb.control(null,[Validators.required,Validators.pattern(/^[a-zA-Z]+$/)]),
          email: this.fb.control(null,[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
          phone: this.fb.control(null,[Validators.required,Validators.pattern(/^[0-9]{9}$/)]),
          password: this.fb.control(null,[Validators.required, Validators.pattern(/^[a-zA-Z0-9!@]{8,}$/)]),
          terms: this.fb.control(false)
        }
      ),
      otpForm: this.fb.group<VerifyForm>(
        {
          otp: this.fb.control(null,[Validators.required]),
          isVerified: this.fb.control(false,[Validators.pattern(/^true$/i)]),
        }
      ),
      businessForm: this.fb.group<BusinessForm>(
        {
          businessType: this.fb.control('Glamera',[Validators.required]),
          businessType2: this.fb.control(null,[Validators.required]),
          governorate: this.fb.control(null,[Validators.required]),
          district: this.fb.control(null,[Validators.required]),
          social: this.fb.control(null,[Validators.required]),
          useSystem: this.fb.control('No',[Validators.required])
        }
      ),
    });
  }

  get f() {
    return this.form.controls;
  }

  formIsExist(): boolean {
    if (localStorage.getItem('form')) {
      this.initForm()
      this.form.patchValue(JSON.parse(localStorage.getItem('form')!))
      return true;
    }
    return !!this.form;
  }
}
