import { Component, type OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SbbButton } from '@sbb-esta/lyne-angular/button/button';

@Component({
  selector: 'sbb-new-showcase-root',
  imports: [RouterOutlet, SbbButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public ngOnInit() {
    console.log('AppComponent');
  }
}
