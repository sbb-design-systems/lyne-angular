import { Component, type OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SbbButton } from '@sbb-esta/lyne-angular/button/button';

@Component({
  selector: 'sbb-new-showcase',
  imports: [RouterOutlet, SbbButton],
  templateUrl: './new-showcase.html',
  styleUrl: './new-showcase.scss',
})
export class NewShowcaseComponent implements OnInit {
  public ngOnInit() {
    console.log('New showcase works!');
  }
}
