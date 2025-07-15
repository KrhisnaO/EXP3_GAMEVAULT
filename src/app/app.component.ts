import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gamevault';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const juegosCargados = localStorage.getItem('juegos');
    if (!juegosCargados) {
      this.http.get<any[]>('assets/data/juegos.json').subscribe((datos) => {
        localStorage.setItem('juegos', JSON.stringify(datos));
        console.log('📦 Juegos precargados desde juegos.json');
      });
    }
  }
}
