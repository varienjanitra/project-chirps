import { Injectable } from '@angular/core';
import { chirpData } from './chirp-data.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChirpDataService {

  chirpsList$: BehaviorSubject<chirpData[]> = new BehaviorSubject<chirpData[]>([])
  chirpIdStatic: number = 0

  constructor() { }

  addChirp(newChirp: chirpData)
  {
    let updatedChirpList = structuredClone(this.chirpsList$.value)
    updatedChirpList.push(newChirp)
    this.chirpsList$.next(updatedChirpList)
  }

  getChirpId() {
    ++this.chirpIdStatic;
    return this.chirpIdStatic;
  }
}