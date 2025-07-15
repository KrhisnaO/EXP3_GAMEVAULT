import { Component, OnInit } from '@angular/core';
import { PreventasService, Preventa } from '../../services/preventas.service';

/**
 * Componente PreventasComponent
 * 
 * Muestra una lista de preventas de juegos.
 * Carga los datos desde el servicio PreventasService al inicializar el componente.
 */
@Component({
  selector: 'app-preventas',
  templateUrl: './preventas.component.html',
  styleUrls: ['./preventas.component.css']
})
export class PreventasComponent implements OnInit {
  /**
   * Lista de preventas disponibles.
   * Cada preventa contiene información sobre el juego, la fecha de lanzamiento y el precio.
   * * Se inicializa como un arreglo vacío y se llena al cargar el componente.
   */
  preventas: Preventa[] = [];

  constructor(private preventasService: PreventasService) {}
/**
 * Inicializa el componente.
 * Carga las preventas desde el servicio PreventasService.
 * Suscribe a los cambios para actualizar la lista de preventas.
 */
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
