import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChirpDataService } from '../chirp-data.service';
import { chirps } from '../chirp-data.model';

@Component({
  selector: 'app-chirps-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chirps-timeline.component.html',
  styleUrls: ['./chirps-timeline.component.scss']
})
export class ChirpsTimelineComponent {

  chirps: chirps[] = this.chirpService.chirpsList;
  
  constructor(private chirpService: ChirpDataService) {
  }

  

}
