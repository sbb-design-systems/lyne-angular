import { Component, type OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SbbButton } from '@sbb-esta/lyne-angular/button/button';

@Component({
  selector: 'sbb-app',
  imports: [RouterOutlet, SbbButton],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  public ngOnInit() {
    console.log('New showcase works!');
  }
}
