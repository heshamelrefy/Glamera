import { Component, forwardRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { HelpHeaderComponent } from "../../shared/help-header/help-header.component";
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TooltipModule } from 'primeng/tooltip';
import { BusinessForm } from './models/business-form';
import { FormDataService } from '../../shared/services/form-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-business-information',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HelpHeaderComponent,DropdownModule,SelectButtonModule,TooltipModule],
  templateUrl: './business-information.component.html',
  styleUrl: './business-information.component.scss',
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => MyInputField),
  //     multi: true
  //   }
  // ]
})
export class BusinessInformationComponent implements OnInit {
  businessForm!:FormGroup<BusinessForm>;
  radioValue:any;
  router = inject(Router)
  governorates:any[]=['Cairo']
  districts:any[]=['Nasr City']
  socialInfo:any[]=['Facebook', 'Twitter','Google']
  formControl= new FormControl();
  formDataService = inject(FormDataService)
  typeRadios = [
    {
      value: 'Yes',
      label: 'Yes',
      inputId: 'Yes',
      control: 'useSystem',
    },
    {
      value: 'No',
      label: 'No',
      inputId: 'No',
      control: 'useSystem',
    },
  ];
  typeOptions: any[] = [
    { name: 'Salon', value: 'Salon' },
    { name: 'Gym', value: 'Gym' },
    { name: 'Spa', value: 'Spa' },
    { name: 'Clinic', value: 'Clinic' },
];
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.initForm()
  }
  get f() {
    return this.businessForm.controls;
  }
  initForm()
  {
    this.businessForm = (this.formDataService.form.controls['businessForm'] as FormGroup)
  }
  clearAuth()
  {
    localStorage.removeItem('isVerified');
    this.router.navigate(['/registration'])

  }
  onSubmit()
  {
    if (this.formDataService.form.invalid) {
      this.businessForm.markAllAsTouched();
      return;
    }
    localStorage.setItem('Auth','true')
    localStorage.setItem('form',JSON.stringify(this.formDataService.form.value))
    this.router.navigate(['/successfully'])
  }
}
