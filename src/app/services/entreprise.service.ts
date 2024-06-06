import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { IEntreprise } from '../models/entreprise.model';

@Injectable({
  providedIn: 'root',
})
export class EntrepriseService {
  private dataUrl = 'assets/data.json';
  private discordWebhookUrl = 'WEBHOOK_URL';

  constructor(private http: HttpClient) {}

  getFakeEntrepriseData(): Observable<IEntreprise[]> {
    return this.http.get<IEntreprise[]>(this.dataUrl);
  }

  postDataToDiscord(data: IEntreprise): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.discordWebhookUrl, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error posting data to Discord:', error);
        throw error;
      })
    );
  }

  getEntrepriseById(id: string): Observable<IEntreprise> {
    return this.http.get<IEntreprise[]>(this.dataUrl).pipe(
      map((entreprises: IEntreprise[]) => {
        const entreprise = entreprises.find((e) => e.id === Number(id));
        if (entreprise) {
          return entreprise;
        } else {
          throw new Error('Entreprise not found');
        }
      }),
      catchError((error) => {
        console.error('Error fetching entreprise by id:', error);
        throw error;
      })
    );
  }
}
