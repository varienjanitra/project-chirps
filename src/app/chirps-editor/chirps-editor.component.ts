import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chirp } from '../chirp-data.model';
import { ChirpService } from '../chirp-data.service';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription, switchMap } from 'rxjs';

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
  maxBodyTextLength: number;
  newChirp?: Chirp;

  private addChirp: Subscription = new Subscription();

  constructor(private ChirpService: ChirpService) {
    this.maxBodyTextLength = ChirpService.maxChirpBodyTextLength;
  }

  postChirp() {
    if(this.bodyText.length > this.maxBodyTextLength) {
      alert(`Your chirp length is ${this.bodyText.length}, which is over than allowable length of ${this.maxBodyTextLength}`)
      return;
    }

    this.addChirp = this.ChirpService.addChirp({bodyText: this.bodyText})
      .subscribe();
  }

  ngOnDestroy() {
    this.addChirp.unsubscribe();
  }
}
