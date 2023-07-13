import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chirp } from '../chirp-data.model';
import { ChirpService } from '../chirp-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chirps-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './chirps-editor.component.html',
  styleUrls: ['./chirps-editor.component.scss']
})
export class ChirpsEditorComponent {
  chirpText: string = '';
  newChirp?: Chirp;
  maximumChirpLength: number = 140;

  constructor(private ChirpService: ChirpService) {

  }

  postChirp() {
    if(this.chirpText.length > this.maximumChirpLength) {
      alert(`Your chirp length is ${this.chirpText.length}, which is over than allowable length of ${this.maximumChirpLength}`)
      return;
    }

    let timeNow = new Date();

    this.newChirp = {
      id: this.ChirpService.getChirpId(),
      text: this.chirpText,
      publishedTime: timeNow
    };

    this.ChirpService.addChirp(this.newChirp);
  }
}