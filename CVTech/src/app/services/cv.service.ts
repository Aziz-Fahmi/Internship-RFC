import { Injectable } from '@angular/core';
import { CV } from '../models/CV';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class CVService {
  private url ="CV";  //contorller name 
  constructor(private http: HttpClient) { }

  public getCVs(): Observable<CV[]> {
    return this.http.get<CV[]>(`${environment.apiUrl}/${this.url}`);
    
  }
  public updateCV(cv: CV): Observable<CV[]> {
    return this.http.put<CV[]>(
      `${environment.apiUrl}/${this.url}`,
      cv
    );
  }

  public createCV(cv: CV): Observable<CV[]> {
    return this.http.post<CV[]>(
      `${environment.apiUrl}/${this.url}`,
      cv
    );
  }

  public deleteCV(cv: CV): Observable<CV[]> {
    return this.http.delete<CV[]>(
      `${environment.apiUrl}/${this.url}/${cv.id}`
    );
  }
}
