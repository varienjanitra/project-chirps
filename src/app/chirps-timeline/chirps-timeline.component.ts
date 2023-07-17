import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChirpService } from '../chirp-data.service';
import { Chirp } from '../chirp-data.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-chirps-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chirps-timeline.component.html',
  styleUrls: ['./chirps-timeline.component.scss']
})
export class ChirpsTimelineComponent {

  chirps$: Observable<Chirp[]> = this.chirpService.chirpTimeline$.pipe(
    map(chirps => chirps.sort((current, next) => next.id - current.id))
  );
 
  constructor(private chirpService: ChirpService) {  }
}