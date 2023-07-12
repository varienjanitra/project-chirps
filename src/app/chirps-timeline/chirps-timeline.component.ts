import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChirpDataService } from '../chirp-data.service';
import { chirpData } from '../chirp-data.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-chirps-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chirps-timeline.component.html',
  styleUrls: ['./chirps-timeline.component.scss']
})
export class ChirpsTimelineComponent {

  chirps$: Observable<chirpData[]> = this.chirpService.chirpsList$.pipe(
    map(chirps => chirps.sort((a, b) => b.chirpPublishDate.getTime() - a.chirpPublishDate.getTime()))
  )
  
  constructor(private chirpService: ChirpDataService) {
    
  }
}