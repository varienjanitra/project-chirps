import { Injectable } from '@angular/core';
import { Chirp } from './chirp-data.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChirpService {

  public chirpTimeline$: BehaviorSubject<Chirp[]> = new BehaviorSubject<Chirp[]>([]);
  nextChirpUuid : number = 0;

  constructor() { }

  addChirp(newChirp: Chirp)
  {
    let updatedChirpTimeline = structuredClone(this.chirpTimeline$.value);
    updatedChirpTimeline.push(newChirp);
    this.chirpTimeline$.next(updatedChirpTimeline);
  }

  getChirpUuid() {
    this.nextChirpUuid += 1;
    return this.nextChirpUuid;
  }
}