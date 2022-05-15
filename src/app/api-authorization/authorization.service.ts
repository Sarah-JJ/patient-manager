import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, Subject} from "rxjs";
import {AccessToken} from "./access-token.model";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private accessToken: string = '';
  private accessTokenLocalStorageKey = 'accessToken'
  hasAuthenticated = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  private requestAuthorizationCode(): Observable<HttpResponse<string>> {
    console.log('request auth code method')

    return this.http.get<string>('https://clare.oceaninformatics.com/npscdrb2b/authorisation/oauth2/Authorize?response\n' +
      '_type=code&client_id=nps.mlplus&redirect_uri=https://clare.oceaninformatics.com/npscdrb2\n' +
      'b/authorisation/oauth2/callback?device_token=ZmFlYzdmZDZhMmIyNGU1NDlkMDk4ZDMyM2Y3YmEzYWY\n' +
      '=&state=30fb55af4834416aaa2c2d4de27bfcfd',
      {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + environment.authRequestToken,
        'Host': environment.apiUrlHost
      }),
      observe: 'response'
    });
  }

  async authenticate(): Promise<void> {

    this.requestAuthorizationCode().subscribe({
      error: error => {

        const authCode = error.url.split('code=')[1].split('&')[0];

        console.log(authCode)

        const path = '/npscdrb2b/authorisation/oauth2/token';

        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Host': environment.apiUrlHost,
          'Expect': '100-continue'
        });

        let body = new URLSearchParams();

        body.set('client_id', 'nps.mlplus');
        body.set('grant_type', 'authorization_code');
        body.set('redirect_uri', 'https://clare.oceaninformatics.com/npscdrb2b/authorisation/oauth2/callback?device_token=ZmFlYzdmZDZhMmIyNGU1NDlkMDk4ZDMyM2Y3YmEzYWY=');
        body.set('state', '30fb55af4834416aaa2c2d4de27bfcfd');
        body.set('code', authCode);


        this.http.post(environment.apiUrlScheme + environment.apiUrlHost + path,
          body,
          {headers: headers}
        )
          .subscribe(accessToken => {
            this.setLocalStorageItem(this.accessTokenLocalStorageKey, JSON.stringify(accessToken));
          });

        this.hasAuthenticated.next(true);
      }
    });
  }

  getAccessToken(): AccessToken | null {
    let accessToken = this.getLocalStorageItem(this.accessTokenLocalStorageKey);
    return JSON.parse(<string> accessToken);
  }

  isAuthenticated(): boolean {
    let accessToken = this.getAccessToken();

    if(accessToken == null)
      return false;

    let tokenExpirationDate = accessToken.expires_in;

    // TODO: check if token is expired
    return true;
  }

  private setLocalStorageItem (key: string, value: string) {
    localStorage.setItem(key, value);
  }

  private getLocalStorageItem (key: string) {
    return localStorage.getItem(key);
  }

}
