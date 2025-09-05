import {Component, inject, PLATFORM_ID, signal, OnDestroy} from '@angular/core';
import {Navbar} from '../navbar/navbar';
import {isPlatformBrowser, NgClass} from '@angular/common';
import {ChkNet} from '../../services/chk-net';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Navbar,
    NgClass
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class Home  {
  private platformid = inject(PLATFORM_ID);
  private chkNet = inject(ChkNet);

  isBrowser = isPlatformBrowser(this.platformid);
  online = signal<boolean>(true);

  constructor() {
    this.chkNet.online$.subscribe(status => this.online.set(status));
    if (this.isBrowser) {
      setInterval(() => {
        this.online.set(navigator.onLine);
      }, 1000);
    }
  }



}


