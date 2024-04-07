import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { News } from '../Interfaces/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private baseUrl: string = environment.baseUrl;
  private apiUrl: string = `${this.baseUrl}/news/`;

  constructor(private http:HttpClient) { }

  getList(): Observable<News[]> {
    return this.http.get<News[]>(this.apiUrl);
  }

  add(model: News): Observable<News> {
    return this.http.post<News>(this.apiUrl, model);
  }

  update(id:number, model: News): Observable<News> {
    return this.http.put<News>(`${this.apiUrl}${id}`, model);
  }

  delete(id:number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}
