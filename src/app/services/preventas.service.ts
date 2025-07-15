import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Preventa {
  nombre: string;
  descripcion: string;
  fechaLanzamiento: string;
  precio: number;
  imagen?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PreventasService {
  private apiUrl = 'https://krhisnao.github.io/apivault/api.json';

  constructor( private http: HttpClient) {}

  getPreventas(): Observable<Preventa[]> {
    return this.http.get<Preventa[]>(this.apiUrl);
  }
}

