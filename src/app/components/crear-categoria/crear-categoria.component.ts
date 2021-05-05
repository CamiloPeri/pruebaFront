import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Categoria } from 'src/app/models/categorias';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css'],
})
export class CrearCategoriaComponent implements OnInit {
  formCategoria: FormGroup;
  public data: Categoria;

  constructor(public dialogRef: MatDialogRef<CrearCategoriaComponent>) {}

  ngOnInit(): void {
    this.InicializarFormularioTotales();
  }
  guardar(): void {
    let formulario = this.formCategoria.value;
    let objetoCategoria = {
      id: formulario.id,
      category: formulario.category,
      products: [],
    };
    this.dialogRef.close(objetoCategoria);
  }

  InicializarFormularioTotales() {
    this.formCategoria = new FormGroup({
      id: new FormControl(Math.random(), [Validators.required]),
      category: new FormControl('', [
        Validators.required,
        Validators.pattern(/[a-zA-Z]/),
      ]),
    });
  }
}
