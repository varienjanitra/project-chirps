import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Chirp } from './chirp-data.model';
import { BehaviorSubject, Observable, tap, map, startWith, of, switchMap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChirpService {
  private backendUrl: string = 'http://localhost:5280';
  private nextChirpid: number = 0;
  private refetchChirps$: BehaviorSubject<any> = new BehaviorSubject(null);
  readonly maxChirpBodyTextLength: number = 140;

  constructor(private http: HttpClient) {
    this.getChirps();
  }

  get refreshChirps$() {
    return this.refetchChirps$.asObservable();
  }

  addChirp(newChirp: Partial<Chirp>): Observable<Chirp>
  {
    let timeNow = new Date();

    newChirp = {
      id: this.getChirpId(),
      bodyText: newChirp.bodyText,
      publishedTime: timeNow
    };

    return this.http.post<Chirp>(this.backendUrl + '/postchirp', newChirp)
      .pipe(
        tap(() => this.refetchChirps$.next(null)),
      )
  }

  deleteChirp(chirpId: number): Observable<number> {
    return this.http.delete<number>(this.backendUrl + '/deletechirp/' + chirpId)
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
        tap((retrievedChirps: Chirp[]) => {
          if(retrievedChirps.length == 0) {
            this.nextChirpid = 0
          } else {
            this.nextChirpid = retrievedChirps[retrievedChirps.length - 1].id;
          }
        }),
        map((chirps: Chirp[]) => chirps.sort((currentElement, nextElement) => {
          return nextElement.id - currentElement.id
        })),
        catchError(() => {
          return of([]);
        })
      )
  }
}
