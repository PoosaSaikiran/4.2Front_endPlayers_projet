import { Component } from '@angular/core';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent {
  
  matchId!: string;
  formData: any;

  constructor(private playerService: PlayerService) {}

  addPlayer(): void {
    this.playerService.addPlayer(this.matchId, this.formData).subscribe(
      (response) => {
        console.log(response);
        // Optionally, reset the form after successful submission
        this.formData = {};
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
}
