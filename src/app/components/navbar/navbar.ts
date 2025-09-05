import {Component, inject, PLATFORM_ID, signal, OnInit, OnDestroy} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {ChkNet} from '../../services/chk-net';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  standalone: true,
})
export class Navbar implements OnInit{
  private platformId = inject(PLATFORM_ID);
  private chkNet = inject(ChkNet);

  isBrowser = isPlatformBrowser(this.platformId);
  isInstalled = signal(false);
  isOnline = signal(true);
  deferredPrompt: BeforeInstallPromptEvent | null = null;

  private beforeInstallHandler = (e: Event) => {
    e.preventDefault();
    this.deferredPrompt = e as BeforeInstallPromptEvent;
    this.isInstalled.set(false);
  };

  private appInstalledHandler = () => {
    this.isInstalled.set(true);
    this.deferredPrompt = null;
  };

  ngOnInit() {
    const installed = localStorage.getItem('pwaInstalled') === 'true';
    this.isInstalled.set(installed);

    this.chkNet.online$.subscribe(status => this.isOnline.set(status));
    if (this.isBrowser) {
      window.addEventListener('beforeinstallprompt', this.beforeInstallHandler);
      window.addEventListener('appinstalled', ()=> {
        this.isInstalled.set(true);
        localStorage.setItem('pwaInstalled', 'true');
        this.deferredPrompt = null;
      });
    }
  }



  async installPWA() {
    if (!this.deferredPrompt) return;

    await this.deferredPrompt.prompt();
    const choice = await this.deferredPrompt.userChoice;

    if (choice.outcome === 'accepted') {
      this.isInstalled.set(true);
      localStorage.setItem('pwaInstalled', 'true')
    } else {
      console.log('User dismissed PWA install');
    }

    this.deferredPrompt = null;
  }
}
