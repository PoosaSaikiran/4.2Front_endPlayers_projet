import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  constructor(private http: HttpClient) {}

  getplayers() {
    return this.http.get('http://localhost:8080/api/players');
  }

  addMatch(matchData: any) {
    return this.http.post('http://localhost:8080/api/add', matchData);
  }

  getPlayerById(id: string) {
    return this.http.get(`http://localhost:8080/api/players/${id}`);
  }

  updatePlayer(id:any, playerData: any) {
    return this.http.post(`http://localhost:8080/api/update/${id}`, playerData);
  }

  getWinLossCount() {
    return this.http.get('http://localhost:8080/api/win-loss-count');
  }

  getTopSackPlayers() {
    return this.http.get('http://localhost:8080/api/top-sack-players');
  }

  deletePlayer(id: number){
    return this.http.delete(`http://localhost:8080/api/deleate/${id}`);
  }

}
