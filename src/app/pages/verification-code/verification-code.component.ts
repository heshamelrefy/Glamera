import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';
import { VerifyForm } from './models/verify';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormDataService } from '../../shared/services/form-data.service';
import { SlicePipe } from '@angular/common';
import { interval, Subscription, take } from 'rxjs';
import { Router } from '@angular/router';
import { RefdialogService } from '../../shared/services/refdialog.service';
@Component({
  selector: 'app-verification-code',
  standalone: true,
  imports: [InputOtpModule,FormsModule,ReactiveFormsModule,SlicePipe],
  templateUrl: './verification-code.component.html',
  styleUrl: './verification-code.component.scss'
})
export class VerificationCodeComponent {
  verifyForm!: FormGroup<VerifyForm>;
  ref: DynamicDialogRef | undefined;
  formDataService = inject(FormDataService)
  router = inject(Router)
  destroyRef = inject(DestroyRef)
  timerSubscription: Subscription | undefined;
  remainingTime: number = 60; // Countdown from 60 seconds
  timerStarted = false;
  sentCode!:number 
  constructor(private fb: FormBuilder,public dialogService: DialogService,private refDialog:RefdialogService) {}

  ngOnInit() {
    this.initForm()
    const unregisterFn = this.destroyRef.onDestroy(() => this.stopTimer() );
    // stop the destroy callback from executing if needed
    unregisterFn();
    this.startTimer()
  }
  startTimer() {
    this.timerStarted = true;
    this.timerSubscription = interval(1000).pipe(
      take(this.remainingTime + 1) // Ensure it stops after the countdown ends
    ).subscribe(val => {
      this.remainingTime = 60 - val; // Adjust the value as needed
      if (this.remainingTime === 0) {
        this.stopTimer();
      }
    });
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timerStarted = false;
  }
  get f() {
    return this.verifyForm.controls;
  }
  initForm()
  {
    this.verifyForm = (this.formDataService.form.controls['otpForm'] as FormGroup)
    this.sentCode = +this.verifyForm.controls.otp.value!
    
  }

  onSubmit() {
    this.verifyForm.markAllAsTouched();
    if (this.f.otp.invalid) {
      return;
    }
    if (+this.f.otp.value! == +this.sentCode) {
      localStorage.setItem('isVerified','true')
      localStorage.setItem('form',JSON.stringify(this.formDataService.form.value))
      this.f.isVerified.patchValue(true)
      this.refDialog.closeDialog()
      this.router.navigate(['/business'])
    }
    

  }
}
