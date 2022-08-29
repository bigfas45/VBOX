import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoplayerComponent implements OnInit, OnDestroy {
  @ViewChild('target', { static: true }) target: ElementRef;

  @Input() options;
  player: videojs.Player;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // instantiate Video.js
    this.player = videojs(
      this.target.nativeElement,
      this.options,
      function onPlayerReady() {
        console.log('onPlayerReady', this);
      }
    );
  }

  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }
}
