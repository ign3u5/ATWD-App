import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Injectable } from '@angular/core';
import { timer, Subject, Observable } from 'rxjs';
import { Token } from '../../models/token';
import { StorageService } from '../storageService';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  expiryTimer: Observable<number>;
  private tokenValidity: boolean;
  private expiryBuffer = 10000;

  private token: Token;
  private currentTime: number;

  constructor(private storageService: StorageService) {
    this.checkToken();
  }

  public checkToken()
  {
    if (this.Token.exp != 0)
    {
      if (this.timeToExpire() < this.expiryBuffer)
      {
        console.log(`Token has expired`);
        this.tokenValidity = false;
        this.storageService.removeCurrentUserData();
      }
      else
      {
        this.tokenValidity = true;
        this.expiryTimer = timer(this.timeToExpire())
        this.expiryTimer.subscribe(value => {
          console.log("The token expiry timer ended");
          if (this.timeToExpire() < this.expiryBuffer)
          {
            this.tokenValidity = false;
            console.warn("Token has expired");
          }
          else
          {
            this.expiryTimer = timer(this.timeToExpire());
          }
        });
      }
    }
    else
    {
      this.tokenValidity = false;
      console.log(`No authentication token`);
    }
  }

  private refreshCurrentTime()
  {
    this.currentTime = Date.now();
    console.log(`Current time set to: ${this.currentTime}`);
  }

  get TokenIsValid(): boolean
  {
    return this.tokenValidity;
  }

  private timeToExpire(): number
  {
    var tokenExpiryTime = this.Token.exp - Date.now();
    console.log(`Time to expiry is ${tokenExpiryTime}`);
    return tokenExpiryTime;
  }

  private get Token(){
    var token = this.storageService.Token;
    if (token)
    {
      this.token = JSON.parse(atob(this.storageService.Token.split('.')[1])) as Token;
      this.token.exp *= 1000;
    }
    else
    {
      this.token = new Token();
    }
    console.groupCollapsed(`TokenService Token reset`)
    console.log(`Token value ${JSON.stringify(this.token)}`);
    console.groupEnd();
    return this.token;
  }
}
