import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChkNet {
  private onlineSubject = new BehaviorSubject<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
  private isBrowser = typeof window !== 'undefined';
  online$ = this.onlineSubject.asObservable();



  constructor() {
    if (this.isBrowser) {
      window.addEventListener('online', () => this.updateStatus(true));
      window.addEventListener('offline', () => this.updateStatus(false));
      setInterval(() => {
        this.updateStatus(navigator.onLine);
      }, 1000);
    }
  }


  private updateStatus(status: boolean) {
    this.onlineSubject.next(status);
  }
}
