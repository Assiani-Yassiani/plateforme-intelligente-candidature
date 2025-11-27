import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private affichagenavbareSubject = new BehaviorSubject<boolean>(true);
  affichagenavbare$ = this.affichagenavbareSubject.asObservable();

  setAffichageNavbare(value: boolean) {
    this.affichagenavbareSubject.next(value);
  }

  getAffichageNavbare(): boolean {
    return this.affichagenavbareSubject.value;
  }
}
