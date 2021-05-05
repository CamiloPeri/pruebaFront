import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/categorias';
import { Respuesta } from '../models/Respuesta';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  public url = '';
  public httpOptions = new HttpHeaders().append(
    'Content-Type',
    'application/json; charset=UTF-8'
  );
  constructor(private http: HttpClient) {
    this.url = environment.urlServicios;
  }

  obtenerCategorias() {
    const url = `${this.url}/Categorias`;
    return this.http.get<Respuesta<Categoria>>(url);
  }

  crearCategoria(objetoCategoria: Categoria) {
    debugger;
    const url = `${this.url}/Categorias`;
    return this.http.post(url, objetoCategoria, { headers: this.httpOptions });
  }

  crearProductos(id) {
    debugger;
    const url = `${this.url}/Categorias/${id}`;
    return this.http.delete(url);
  }
}
