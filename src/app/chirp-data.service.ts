import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Chirp } from './chirp-data.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChirpService {
  private backendUrl: string = 'http://localhost:5280';
  
  private nextChirpid: number = 0;
  private refetchChirps$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.getChirps();
  }

  get refreshChirps$() {
    return this.refetchChirps$.asObservable();
  }

  addChirp(newChirp: Chirp): Observable<Chirp>
  {
    return this.http.post<Chirp>(this.backendUrl + '/postchirp', newChirp)
      .pipe(
        tap(() => this.refetchChirps$.next(null))
      )
  }

  getChirpId(): number {
    this.nextChirpid += 1;
    return this.nextChirpid;
  }

  getChirps(): Observable<Chirp[]> {
    return this.http.get<Chirp[]>(this.backendUrl + '/getchirps')
      .pipe(
        tap(retrievedChirps => {
          this.nextChirpid = retrievedChirps[retrievedChirps.length - 1].id;
        })
      )
  }
}