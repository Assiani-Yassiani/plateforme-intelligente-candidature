import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FileInfo } from '../model/file.dto';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl+'files/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
};

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    
    const req = new HttpRequest('POST', API_URL + 'upload-pdf', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  
  }

  updateFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(API_URL + 'update-img', formData);
  }

  getListCv(): Observable<FileInfo[]> {
    return this.http.get<FileInfo[]>(API_URL + 'all/cv');
  }

  getListImg(): Observable<FileInfo[]> {
    return this.http.get<FileInfo[]>(API_URL + 'all/img');
  }

  getFile(filename: string): Observable<Blob> {
    return this.http.get(API_URL + filename, { responseType: 'blob' });
  }

  deleteAllFiles(): Observable<any> {
    return this.http.delete(API_URL + 'all');
  }
}