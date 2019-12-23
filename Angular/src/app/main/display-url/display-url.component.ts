import { Component, OnInit, OnDestroy } from '@angular/core';
import { TinyUrl } from '../models/TinyUrl.model';
import { Subscription } from 'rxjs';
import { GetUrlService } from '../services/getUrl';

@Component({
  selector: 'app-display-url',
  templateUrl: './display-url.component.html',
  styleUrls: ['./display-url.component.css']
})
export class DisplayUrlComponent implements OnInit, OnDestroy {

  urlDetails: TinyUrl;
  isTiny: boolean;
  urlDetailsubscribe: Subscription;
  isTinysubscribe: Subscription;

  constructor(private getUrlService: GetUrlService) { }

  ngOnInit() {
    // subscribe to service Subject events, to display the current details from server
    this.urlDetailsubscribe = this.getUrlService.tinyUrl
      .subscribe(
        res => { 
          this.urlDetails = res 
        },
        err => console.log(err)
      )

    // display values according to this var value
    this.isTinysubscribe = this.getUrlService.isTinyMode
      .subscribe(
        res => { this.isTiny = res },
        err => console.log(err)
      )
  }

  // on user clicked the browse button
  onURLClicked() {
    if (this.urlDetails) {
      window.open(
        this.urlDetails.longUrl,
        '_blank'
      );
    }
  }

  // unsubscribe on destroy
  ngOnDestroy() {
    this.urlDetailsubscribe.unsubscribe();
    this.isTinysubscribe.unsubscribe();
  }

}
