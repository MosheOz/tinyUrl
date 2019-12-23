import { Component, OnInit } from '@angular/core';
import { TinyUrl } from '../models/TinyUrl.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { GetUrlService } from '../services/getUrl';

@Component({
  selector: 'app-generate-url',
  templateUrl: './generate-url.component.html',
  styleUrls: ['./generate-url.component.css']
})
export class GenerateUrlComponent implements OnInit {

  error = null;
  isLoading = false;
  isShortenRequest = true;

  constructor(private getUrlService: GetUrlService) { }

  ngOnInit() {
  }

  // on form submit
  onSubmit(form: NgForm) {
    // reset error message to null
    this.error = null;

    // prevent from sending request to server in case form is not valid
    if (!form.valid) {
      return;
    }

    // display loader
    this.isLoading = true;

    // var of observable type
    let urlObs: Observable<TinyUrl>

    if (this.isShortenRequest) {
      // when user asking to get short url
      let url = { longUrl: form.value.url };
      urlObs = this.getUrlService.generateTinyUrl(url);
    }
    else {
      // when user asking to get long url
      let url = { shortUrl: form.value.url };
      urlObs = this.getUrlService.generateLongUrl(url);
    }

    // subscribe to observable response and create subject event for the response
    urlObs
      .subscribe(
        (res) => {
          this.isLoading = false;
          this.getUrlService.handleTinyUrl(res, this.isShortenRequest ? true : false);
        },
        (errRes) => {
          this.isLoading = false;
          this.error = errRes;
        }
      )
    form.reset;
  }

  // change to long/short link mode on click
  onSwitchMode() {
    this.isShortenRequest = !this.isShortenRequest;
  }

}
