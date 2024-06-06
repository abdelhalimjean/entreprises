import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentInjector, Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
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
}
