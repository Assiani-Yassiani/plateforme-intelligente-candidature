import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class EventDriverService {
    sourceEventSubject:Subject<any> = new Subject<any>()
    sourceEventSubjectObservable = this.sourceEventSubject.asObservable()

    publishEvent(user:any){
        console.log(user)
        this.sourceEventSubject.next(user)
    }
  }