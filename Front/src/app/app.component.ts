import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { EventBusService } from './_shared/event-bus.service';
import { TokenStorageService } from './_services/token-storage.service';
import { Subscription } from 'rxjs';
import { SharedService } from './_shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend-project';
  nav: boolean = true;

  eventBusSub?: Subscription;
  navSubscription?: Subscription;

  constructor(
    private token: TokenStorageService,
    private eventBusService: EventBusService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    console.log("AppComponent initialized");

    this.navSubscription = this.sharedService.affichagenavbare$.subscribe(value => {
      this.nav = value;
    });

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  ngOnDestroy(): void {
    if (this.navSubscription) {
      this.navSubscription.unsubscribe();
    }

    if (this.eventBusSub) {
      this.eventBusSub.unsubscribe();
    }
  }

  logout(): void {
    this.token.signOut();
    this.router.navigateByUrl('/login');
  }
}
