import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'soccer-stats-analysis';
  constructor(private router: Router) {}
  
  goToNextPage(): void {
    this.router.navigate(['/match-details']);
  }
}


