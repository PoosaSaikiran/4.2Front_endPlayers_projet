import { Component } from '@angular/core';
import { MatchService } from '../match.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent {
  isAddEdt = false; aeTyp='a'; playersList: any; editData: any; winLossCount: any;
  
  matchForm!: FormGroup;

  constructor(private matchService: MatchService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.winLoss();
    this.LoadList(); 
    this.formInit();
  }

  formInit(){
    this.matchForm = this.fb.group({
      match_id: '',
      league_name: '',
      date: '',
      opponent: '',
      result: '',
      players: this.fb.array([
        this.createPlayer()
      ])
    });
  }

  get players(): FormArray {
    return this.matchForm.get('players') as FormArray;
  }

  createPlayer(): FormGroup {
    return this.fb.group({
      name: '',
      rushing_yards: '',
      touchdowns_thrown: '',
      sacks: '',
      field_goals: this.fb.group({
        made: '',
        missed: ''
      }),
      catches_made: ''
    });
  }

  addPlayer(): void {
    this.players.push(this.createPlayer());
  }
  LoadList(){
    this.matchService.getplayers().subscribe(
      (response) => {
        console.log(response),
       this.playersList = response
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    console.log(this.matchForm.value);
    let payload = this.matchForm.getRawValue();
    this.matchService.addMatch(payload).subscribe(
      (response) => {
        console.log(response);this.LoadList();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onEdit(id:any){
    this.matchService.getPlayerById(id).subscribe(
      (res:any) => {
        this.editData = res,
        this.matchForm.patchValue({
          match_id: res.match_id,
          league_name: res.league_name,
          date: res.date,
          opponent: res.opponent,
          result: res.result,
          players: res.players
        })
        
        this.players.clear();
        res.players.forEach((e:any) => {
          this.players.push(this.fb.group({
            name: [e.name],
            rushing_yards: [e.rushing_yards],
            touchdowns_thrown: [e.touchdowns_thrown],
            sacks: [e.sacks],
            catches_made: [e.catches_made],
            field_goals: this.fb.group({
              made: [e.field_goals.made],
              missed: [e.field_goals.missed]
            })
          }));
      })


      },
      (error) => {
        console.error(error);
      }
    );
  }

  onUpdate(){
    let payload = this.matchForm.getRawValue();
    this.matchService.updatePlayer(this.editData._id, payload).subscribe(
      (response:any) => {
        console.log(response);this.LoadList();
        
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onDelete(id:any){
    this.matchService.deletePlayer(id).subscribe(
      (res:any) => {
        this.editData = res,
        this.LoadList();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  winLoss(){
    this.matchService.getWinLossCount().subscribe(
      (response:any) => {
        this.winLossCount = response?.data;
        console.log('winloss', response);
        
      },
      (error) => {
        console.error(error);
      }
    );
  }
  

  onRst(){
    this.formInit();
  }
}