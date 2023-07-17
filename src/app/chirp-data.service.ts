import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Chirp } from './chirp-data.model';
import { BehaviorSubject, concat, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChirpService {
  private backendUrl: string = 'http://localhost:5280';
  public chirpTimeline$: BehaviorSubject<Chirp[]>;
  private nextChirpid : number = 0;

  constructor(private http: HttpClient) {
    this.chirpTimeline$ = new BehaviorSubject<Chirp[]>([]);
    this.getChirps();
  }

  addChirp(newChirp: Chirp)
  {
    console.log(newChirp);
    this.http.post<Chirp>(this.backendUrl + '/postchirp', newChirp)
      .subscribe();
  }

  getChirpId() {
    this.nextChirpid += 1;
    return this.nextChirpid;
  }

  getChirps() {
    this.http.get<Chirp[]>(this.backendUrl + '/getchirps')
      .pipe(
        tap(retrievedChirps => {
          this.nextChirpid = retrievedChirps[retrievedChirps.length - 1].id;
        })
      )
      .subscribe(this.chirpTimeline$);
  }
}