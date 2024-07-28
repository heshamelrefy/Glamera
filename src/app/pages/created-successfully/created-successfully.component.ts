import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-created-successfully',
  standalone: true,
  imports: [],
  templateUrl: './created-successfully.component.html',
  styleUrl: './created-successfully.component.scss'
})
export class CreatedSuccessfullyComponent {
  router = inject(Router)
  constructor(){
    
  }
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/registration']);
  }
}
