import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEntreprise } from '../models/entreprise.model';

@Injectable({
  providedIn: 'root',
})
export class EntrepriseService {
  private dataUrl = 'assets/data.json';

  constructor(private http: HttpClient) {}

  getFakeEntrepriseData(): Observable<IEntreprise[]> {
    return this.http.get<IEntreprise[]>(this.dataUrl);
  }
}
