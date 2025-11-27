
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TestDto } from '../model/testDtot';

@Injectable({
  providedIn: 'root'
})
export class TestteschniqueService {

  API_URL = environment.apiUrl + "test"
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  createTest(test: TestDto): Observable<any> {

    return this.http.post(this.API_URL, test, this.httpOptions);
  }
  getTest(id: number): Observable<any> {

    return this.http.get(this.API_URL + "/" + id);
  }

  scors(id: number, scors: number): Observable<any> {

    return this.http.put(this.API_URL + "/" + id + "/" + scors, null, this.httpOptions);
  }


}
