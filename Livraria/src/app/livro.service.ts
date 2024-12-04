import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private baseUrl = 'https://openlibrary.org/search.json';

  constructor(private http: HttpClient) {}

  buscarLivros(titulo: string, page: number = 1): Observable<any> {
    const url = `${this.baseUrl}?title=${titulo}&page=${page}&limit=15`;
    return this.http.get<any>(url);
  }

  getDetalhes(livroKey: string): Observable<any> {
    const url = `https://openlibrary.org/works/${livroKey}.json`;
    return this.http.get<any>(url);
  }
}
