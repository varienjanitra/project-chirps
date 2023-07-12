import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { chirpData } from '../chirp-data.model';
import { ChirpDataService } from '../chirp-data.service';
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
  chirp?: chirpData;

  constructor(private chirpDataService: ChirpDataService) {

  }

  postChirp() {
    let timeNow = new Date();

    this.chirp = {
      id: this.chirpDataService.getChirpId(),
      chirpTextData: this.chirpText,
      chirpPublishDate: timeNow
    };

    this.chirpDataService.addChirp(this.chirp);
  }
}
