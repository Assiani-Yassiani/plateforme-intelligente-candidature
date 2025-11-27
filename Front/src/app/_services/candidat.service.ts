import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProfilDto } from '../model/profil.response';
import { CandidatDto } from "../model/CandidatDto";
import { CompetenceDto } from '../model/competence.dto';
import { QuestionDto } from '../model/question.dto';
import { Candidature } from '../model/candidature';
import { NavResponse } from '../model/navbar.data';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) { }

  createCandidat(requestDTO: CandidatDto): Observable<any> {
    return this.http.post<any>(API_URL + 'candidat', requestDTO);
  }

  getProfileDataByCandidatId(idCandidat: number): Observable<ProfilDto> {
    return this.http.get<ProfilDto>(API_URL + 'profile/' + idCandidat);
  }

  updateCandidat(requestDTO: CandidatDto): Observable<any> {
    return this.http.put<any>(API_URL + 'candidat', requestDTO);
  }

  getCompetencesByCandidatId(candidatId: number): Observable<CompetenceDto[]> {
    return this.http.get<CompetenceDto[]>(API_URL + 'candidats/competences/' + candidatId);
  }

  getQuestionsByTestId(testId: number): Observable<QuestionDto[]> {
    return this.http.get<QuestionDto[]>(API_URL + 'test/' + testId);
  }

  getLatestCandidaturesByCandidatId(candidatId: number): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(API_URL + 'candidatures/' + candidatId);
  }

  candidatNav(): Observable<NavResponse> {
    return this.http.get<NavResponse>(API_URL + 'nav');
  }
  getLatestCandidat(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(API_URL + 'condidat');
  }
}