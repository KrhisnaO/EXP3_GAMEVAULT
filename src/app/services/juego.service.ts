import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  constructor(private http: HttpClient) {}

  async precargarJuegos(): Promise<void> {
    const juegosStr = localStorage.getItem('juegos');
    if (!juegosStr || juegosStr === '[]') {
      const juegos = await firstValueFrom(this.http.get<any[]>('assets/data/juegos.json'));
      localStorage.setItem('juegos', JSON.stringify(juegos));
      console.log('📦 Juegos precargados desde JSON.');
    }
  }
}
