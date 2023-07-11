import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChirpsEditorComponent } from './chirps-editor/chirps-editor.component';
import { ChirpsTimelineComponent } from './chirps-timeline/chirps-timeline.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ChirpsEditorComponent,
    ChirpsTimelineComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project-chirps';
}
