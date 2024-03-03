import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private http: HttpClient) {}

  addPlayer(matchId: string, playerData: any) {
    return this.http.post(`http://localhost:8080/api/${matchId}/player`, playerData);
  }
}
