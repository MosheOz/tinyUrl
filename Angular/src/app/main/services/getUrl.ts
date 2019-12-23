import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Subject, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TinyUrl } from '../models/TinyUrl.model';



@Injectable({
    providedIn: "root"
})
export class GetUrlService {

    // url dtails response, using Subject to provide its details to display details component
    tinyUrl = new Subject<TinyUrl>();
    isTinyMode = new Subject<boolean>();

    constructor(private http: HttpClient) { }

    // get long url and create short one
    generateTinyUrl(url: object) {
        return this.http.post<TinyUrl>("http://localhost:3000/api/url/shorten", url)
            .pipe(catchError(this.handleError));
    }

    // get short Url and send the long one
    generateLongUrl(url: object) {
        return this.http.post<TinyUrl>("http://localhost:3000/api/url/long-url", url)
            .pipe(catchError(this.handleError));
    }

    // get details url from server and fire the subject event 
    handleTinyUrl(tinyUrl: TinyUrl, isTiny: boolean) {
        this.tinyUrl.next(tinyUrl);
        this.isTinyMode.next(isTiny);
    }

    // get the error message and send the appropriate message
    private handleError(errorRes: HttpErrorResponse) {
        // default msg
        let errorMessage = 'An Uknowen Error Occurred!';

        // if it's a server error or so
        if (!errorRes.error) {
            return throwError(errorMessage);
        }

        switch (errorRes.error) {

            case 'Invalid long url':
                errorMessage = 'Invalid long url';
                break;

            case 'Invalid base url':
                errorMessage = 'Invalid base url';
                break;

            case 'Invalid short url':
                errorMessage = 'Invalid short url';
                break;
                
            case 'No url found':
                errorMessage = 'No url found!';
                break;
        }

        return throwError(errorMessage);
    }
}
