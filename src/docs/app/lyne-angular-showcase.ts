import { Component, type OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SbbButton } from '@sbb-esta/lyne-angular/button/button';

@Component({
  selector: 'sbb-lyne-angular-showcase',
  imports: [RouterOutlet, SbbButton],
  templateUrl: './lyne-angular-showcase.html',
  styleUrl: './lyne-angular-showcase.scss',
})
export class LyneAngularShowcaseComponent implements OnInit {
  public ngOnInit() {
    console.log('New showcase works!');
  }
}
