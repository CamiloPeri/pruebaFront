import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css'],
})
export class CrearProductosComponent implements OnInit {
  formCategoria: FormGroup;
  public data: Producto;

  constructor(public dialogRef: MatDialogRef<CrearProductosComponent>) {}

  ngOnInit(): void {
    this.InicializarFormularioTotales();
  }
  guardar(): void {
    this.dialogRef.close(this.formCategoria.value);
  }

  InicializarFormularioTotales() {
    this.formCategoria = new FormGroup({
      titleProduct: new FormControl('', [Validators.required]),
      precio: new FormControl(0, [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
      ]),
    });
  }
}
