import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Response } from '../model/response';
import { OffreRequest } from '../model/offre.request';
import { OffreResponse } from '../model/offre.response';

import { OffreDto } from '../model/offre.dto';
import { environment } from 'src/environments/environment';
import { OffreRequestDto } from '../model/offre.request.dto';

const API_URL = environment.apiUrl + 'offre';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OffreService {
  constructor(private http: HttpClient) { }

  createOffre(offreRequest: OffreRequest): Observable<any> {
    return this.http.post<any>(API_URL + '/create', offreRequest);
  }

  getOffre(id: number): Observable<OffreResponse> {
    return this.http.get<OffreResponse>(API_URL + '/' + id);
  }

  updateOffre(id: number, updatedOffre: OffreRequest): Observable<any> {
    return this.http.put<any>(API_URL + "/" + id, updatedOffre);
  }

  deleteOffre(id: number): Observable<any> {
    return this.http.delete<any>(API_URL + "/" + id);
  }

  getAllOffre(
    pageNo: number = 0,
    pageSize: number = 10,
    sortBy: string = "id",
    sortDir: string = "desc",
    request?: OffreRequestDto
  ): Observable<Response<OffreDto>> {
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

    return this.http.get<Response<OffreDto>>(API_URL + '/all', { params: params });
  }

  getserch(
    domaine: string,

    diplome: string,
    typeContrat: string,

    experienceProf: string,

  ): Observable<any> {
    const params: { [key: string]: string } = {};


    params['domaine'] = domaine;


    params['diplome'] = diplome;

    params['typeContrat'] = typeContrat;


    params['experienceProf'] = experienceProf;

console.log(params)

    return this.http.get(API_URL + '/search', { params: params })

  }




}



