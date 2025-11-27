import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Response } from '../model/response';
import { EntretienDto } from '../model/entretien.dto';
import { Entretien } from '../model/entretien';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl + 'entretien/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EntretienService {
  constructor(private http: HttpClient) { }

  createEntretienCandidat(candidatureId: number, date: Date, horaire: string, intervieweur: string): Observable<any> {
    const params = {
      candidatureId: candidatureId.toString(),
      date: date.toISOString(),
      horaire,
      intervieweur
    };

    return this.http.post<any>(API_URL, params);
  }

  getAllEntretiens(
    pageNo?: number,
    pageSize?: number,
    sortBy?: string,
    sortDir?: string,
    offreId?: number,
    status?: string
  ): Observable<Response<EntretienDto>> {
    const params: { [key: string]: string } = {};

    if (pageNo !== undefined) {
      params['pageNo'] = pageNo.toString();
    }
    if (pageSize !== undefined) {
      params['pageSize'] = pageSize.toString();
    }
    if (sortBy !== undefined) {
      params['sortBy'] = sortBy;
    }
    if (sortDir !== undefined) {
      params['sortDir'] = sortDir;
    }
    if (offreId !== undefined) {
      params['offreId'] = offreId.toString();
    }
    if (status !== undefined) {
      params['status'] = status;
    }

    return this.http.get<Response<EntretienDto>>(API_URL, { params });
  }

  getAllEntretiensForCandidat(candidatId: number): Observable<Entretien[]> {
    const params = {
      candidatId: candidatId.toString()
    };

    return this.http.get<Entretien[]>(API_URL + 'entretiens', { params });
  }

  updateEntretienCandidat(candidatureId: number, date?: Date, horaire?: string, intervieweur?: string): Observable<any> {
    const params = {
      date: date ? date.toISOString() : null,
      horaire,
      intervieweur
    };

    return this.http.put<any>(API_URL + `${candidatureId}`, params);
  }

  getEntretienByCandidatureId(candidatureId: number): Observable<any> {
    return this.http.get<any>(API_URL + 'date/' + candidatureId);
  }
  getEntretienByoffreId(Id: number): Observable<any> {
    return this.http.get<any>(API_URL  + Id);
  }
}