import { Component, inject, OnInit } from '@angular/core';
import { InputMaskModule } from 'primeng/inputmask';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { HelpHeaderComponent } from "../../shared/help-header/help-header.component";
import { RegisterForm } from './models/register-form';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VerificationCodeComponent } from '../verification-code/verification-code.component';
import { SaudiSvgComponent } from "./svg/saudi-svg/saudi-svg.component";
import { GalleriaModule } from 'primeng/galleria';
import { FormDataService } from '../../shared/services/form-data.service';
import { RefdialogService } from '../../shared/services/refdialog.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputMaskModule, InputGroupModule, InputGroupAddonModule, InputTextModule,
    PasswordModule, FormsModule, CheckboxModule, ReactiveFormsModule, HelpHeaderComponent,
     InputNumberModule, SaudiSvgComponent,GalleriaModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [DialogService]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup<RegisterForm>;
  ref: DynamicDialogRef | undefined;
  verificationSent:boolean = false;
  verificationCode:string='';
  formDataService = inject(FormDataService)
  responsiveOptions = [
    {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
];
  images: any[] | undefined;
  
  constructor(private fb: FormBuilder,public dialogService: DialogService,private refDialog:RefdialogService) {}

  ngOnInit() {
    this.initForm()

    this.images=[
    {
      itemImageSrc: 'images/left-image.png',
      alt: 'Description for Image 1',
      title: 'Title 1'
    },
    {
      itemImageSrc: 'images/left-image.png',
      alt: 'Description for Image 1',
      title: 'Title 1'
    },
    {
      itemImageSrc: 'images/left-image.png',
      alt: 'Description for Image 1',
      title: 'Title 1'
    },
  ]
  }
  get f() {
    return this.registerForm.controls;
  }
  initForm()
  {
    this.registerForm = (this.formDataService.form.controls['registerForm'] as FormGroup)
  }

  sendVerificationCode() {
    (this.formDataService.form.controls['otpForm'] as FormGroup).controls['otp'].patchValue(this.generateVerificationCode())
    this.verificationSent = true;
  }

  private generateVerificationCode(): string {
    // Generate a 4-digit verification code
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  onSubmit() {
   
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched()
      return;
    }

    this.ref = this.dialogService.open(VerificationCodeComponent, { 
      width: '27vw',
      modal:true,
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
    });
    localStorage.setItem('form',JSON.stringify(this.formDataService.form.value))
    this.refDialog.setDialogRef(this.ref)
    this.sendVerificationCode()
    this.ref.onClose.subscribe(() => {
  });
    
  }
}
