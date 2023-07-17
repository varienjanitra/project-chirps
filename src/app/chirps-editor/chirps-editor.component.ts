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
  bodyText: string = '';
  maxBodyTextLength: number = 140;
  newChirp?: Chirp;

  constructor(private ChirpService: ChirpService) {

  }

  postChirp() {
    if(this.bodyText.length > this.maxBodyTextLength) {
      alert(`Your chirp length is ${this.bodyText.length}, which is over than allowable length of ${this.maxBodyTextLength}`)
      return;
    }

    let timeNow = new Date();

    this.newChirp = {
      uuid: this.ChirpService.getChirpUuid(),
      bodyText: this.bodyText,
      publishedTime: timeNow
    };

    this.ChirpService.addChirp(this.newChirp);
  }
}