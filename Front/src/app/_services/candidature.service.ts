import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../model/response';
import { CandidatureForRecruteur } from '../model/candidature.recruteur.response';
import { CandidatureForCandidat } from '../model/candidature.candidat.response';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl + 'candidatures/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  constructor(private http: HttpClient) { }

  createCandidature(idj: any, idc: any): Observable<any> {
    const params = {
      idj,
      idc

    };

    return this.http.post<any>(API_URL + "postulation?idj=" + idj + '&idc=' + idc, null);
  }

  condidaturebyia(id: any): Observable<Response<CandidatureForRecruteur>> {
    return this.http.get<Response<CandidatureForRecruteur>>("http://127.0.0.1:5000/similarity/" + id)
  }
  
  getAllCandidatureForRecruteur(
    pageNo?: number,
    pageSize?: number,
    sortBy?: string,
    sortDir?: string,

    offreId?: number
  ): Observable<Response<CandidatureForRecruteur>> {
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

    return this.http.get<Response<CandidatureForRecruteur>>(API_URL + 'recruteur/all', { params });
  }




  getAllCandidatureForCandidat(
    pageNo?: number,
    pageSize?: number,
    sortBy?: string,
    sortDir?: string,

    CondidatId?: number
  ): Observable<Response<CandidatureForCandidat>> {
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

    if (CondidatId !== undefined) {
      params['CondidatId'] = CondidatId.toString();
    }

    return this.http.get<Response<CandidatureForCandidat>>(API_URL + 'condidat/all', { params });
  }


  updateCandidatureStatus(id?: number, status?: string, date?: string, horaire?: string, meet?: string, idcondidature?: number): Observable<string> {


    const params: { [key: string]: string } = {};

    if (id !== undefined) {
      params['id'] = id.toString();
    }
    if (status !== undefined) {
      params['status'] = status.toString();
    }

    if (date !== undefined) {
      params['date'] = date;
    }
    if (meet !== undefined) {
      params['meet'] = meet;
    }
    if (horaire !== undefined) {
      params['horaire'] = horaire;
    }

    if (idcondidature !== undefined) {
      params['idcondidature'] = idcondidature.toString();
    }
    console.log(params)

    return this.http.put<string>(API_URL + 'status',  params );
  }



  deleteCandidature(candidatureId: number): Observable<any> {
    return this.http.delete(API_URL + candidatureId);
  }


}