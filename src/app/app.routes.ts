import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { BusinessInformationComponent } from './pages/business-information/business-information.component';
import { VerificationCodeComponent } from './pages/verification-code/verification-code.component';
import { CreatedSuccessfullyComponent } from './pages/created-successfully/created-successfully.component';
import { unauthorizedGuard } from './core/guards/unauthorized.guard';
import { verificationGuard } from './core/guards/verification.guard';
import { authorizedGuard } from './core/guards/authorized.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/registration', pathMatch: 'full' },
  { path: 'registration', component: RegisterComponent, canActivate:[authorizedGuard] },
  { path: 'business', component: BusinessInformationComponent , canActivate: [verificationGuard,authorizedGuard] },
  { path: 'successfully', component: CreatedSuccessfullyComponent , canActivate: [unauthorizedGuard] },
];
