import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChirpService } from '../chirp-data.service';
import { Chirp } from '../chirp-data.model';
import { Observable, Subscription, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-chirps-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chirps-timeline.component.html',
  styleUrls: ['./chirps-timeline.component.scss']
})
export class ChirpsTimelineComponent {

  chirps$: Observable<Chirp[]>;
  deleteChirp$: Subscription = new Subscription();

  constructor(private chirpService: ChirpService) {
    this.chirps$ = this.chirpService.refreshChirps$
      .pipe(
        switchMap(() => this.chirpService.getChirps()),
      );
   }

   deleteChirp(chirpId: number) {
    this.deleteChirp$ = this.chirpService.deleteChirp(chirpId)
      .subscribe();
   }

   ngOnDestroy() {
    this.deleteChirp$.unsubscribe();
   }
}
