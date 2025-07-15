import { Component, OnInit } from '@angular/core';
import { PreventasService, Preventa } from '../../services/preventas.service';

@Component({
  selector: 'app-preventas',
  templateUrl: './preventas.component.html',
  styleUrls: ['./preventas.component.css']
})
export class PreventasComponent implements OnInit {
  preventas: Preventa[] = [];

  constructor(private preventasService: PreventasService) {}

  ngOnInit(): void {
    this.preventasService.getPreventas().subscribe(
      (data) => {
        this.preventas = data;
      },
      (error) => {
        console.error('Error al cargar preventas:', error);
      }
    );
  }

}
