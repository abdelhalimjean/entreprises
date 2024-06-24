import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private uploadUrl = '';

  constructor(private http: HttpClient) {
    this.uploadUrl = environment.imageUploadUrl;
  }

  uploadFile(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');

    return this.http
      .post<{ url: string }>(this.uploadUrl, formData, { headers })
      .pipe(map((response) => response.url));
  }
}
