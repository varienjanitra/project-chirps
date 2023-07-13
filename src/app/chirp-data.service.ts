import { Injectable } from '@angular/core';
import { Chirp } from './chirp-data.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChirpService {

  chirpsList$: BehaviorSubject<Chirp[]> = new BehaviorSubject<Chirp[]>([]);
  chirpIdStatic: number = 0;

  constructor() { }

  addChirp(newChirp: Chirp)
  {
    let updatedChirpList = structuredClone(this.chirpsList$.value);
    updatedChirpList.push(newChirp);
    this.chirpsList$.next(updatedChirpList);
  }

  getChirpId() {
    ++this.chirpIdStatic;
    return this.chirpIdStatic;
  }
}