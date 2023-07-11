import { Injectable } from '@angular/core';
import { chirps } from './chirp-data.model';

@Injectable({
  providedIn: 'root'
})
export class ChirpDataService {

  chirpsList: chirps[] = [];
  chirpIdStatic: number = 0;

  constructor() { }

  addChirp(newChirp: chirps)
  {
    this.chirpsList.push(newChirp);
    this.chirpsList.sort((a, b) => b.chirpPublishDate.getTime() - a.chirpPublishDate.getTime());
  }

  getChirpId() {
    ++this.chirpIdStatic;
    return this.chirpIdStatic;
  }
}
