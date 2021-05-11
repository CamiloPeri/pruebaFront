import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { InventarioService } from 'src/app/services/inventario.service';
import { CrearCategoriaComponent } from '../crear-categoria/crear-categoria.component';
import Swal from 'sweetalert2';
import { CurrencyPipe } from '@angular/common';
import { CrearProductosComponent } from '../crear-productos/crear-productos.component';
import _ from 'lodash';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
})
export class InventarioComponent implements OnInit {
  search = new FormControl('', Validators.minLength(3));
  formTotales: FormGroup;
  public categorias;
  public filtro_valor;
  public productos: any;
  public seleccionProductos: boolean;
  public cajaProductos: boolean;
  public arregloProductos: any;
  public Total: number = 0;
  public Iva: number = 0;
  public Subtotal: number = 0;
  public productoSeleccionado: any;
  public grupoCategoria: any;
  public objSesion: any;
  public botonesAgregar: boolean;
  public operacionIva: number;
  public OperacionTotal: any;

  constructor(
    public _servicioInventario: InventarioService,
    public dialog: MatDialog,
    private currencyPipe: CurrencyPipe
  ) {
    this.arregloProductos = [];
    this.objSesion = JSON.parse(localStorage.getItem('objSesion'));
    if (this.objSesion.permiso === 'ningun permiso') {
      this.botonesAgregar = false;
    } else {
      this.botonesAgregar = true;
    }
  }

  ngOnInit(): void {
    this.obtenerListaCategorias();
    this.InicializarFormularioTotales();
  }

  obtenerListaCategorias() {
    this._servicioInventario.obtenerCategorias().subscribe((valor) => {
      this.categorias = valor;
    });
  }

  filtrarDatos() {
    if (this.search.valid === true) {
      this.search.valueChanges.pipe().subscribe((value) => {
        this.filtro_valor = value;
      });
    } else {
      this.filtro_valor = '';
    }
  }

  seleccionCategoria(evento) {
    this.grupoCategoria = evento.value;
    if (evento.value.products.length === 0) {
      this.productos = evento.value.products;
      this.cajaProductos = true;
      this.seleccionProductos = true;
      this.resetFormulario();
    } else {
      this.productos = evento.value.products;
      this.cajaProductos = false;
      this.seleccionProductos = true;
      this.arregloProductos = [];
    }
  }

  seleccionProducto(valor, seleccion) {
    if (seleccion === true) {
      this.productoSeleccionado = valor.value;

      this.operacionIva = this.productoSeleccionado.precio * 0.19;
      this.OperacionTotal =
        this.operacionIva + this.productoSeleccionado.precio;

      let objetoNuevoValores = {
        titulo: this.productoSeleccionado.titleProduct,
        subtotal: this.productoSeleccionado.precio,
        iva: this.operacionIva,
        total: this.OperacionTotal,
      };
      this.arregloProductos.push(objetoNuevoValores);

      this.obtenerTotalesSuma(objetoNuevoValores);

      this.mostrarValoresFormulario();
    } else {
      this.arregloProductos.forEach((item, index, object) => {
        if (item.titulo === this.productoSeleccionado.titleProduct) {
          this.obtenerTotalesResta(item);
          object.splice(index, 1);
          this.mostrarValoresFormulario();
        }
      });
    }
  }

  obtenerTotalesSuma(item) {
    this.Subtotal = this.Subtotal + item.subtotal;
    this.Iva = this.Iva + item.iva;
    this.Total = this.Total + item.total;
  }

  obtenerTotalesResta(item) {
    {
      this.Subtotal = this.Subtotal - item.subtotal;
      this.Iva = this.Iva - item.iva;
      this.Total = this.Total - item.total;
    }
  }

  mostrarValoresFormulario() {
    this.formTotales.patchValue({
      Subtotal: this.currencyPipe.transform(this.Subtotal),
      Iva: this.currencyPipe.transform(this.Iva),
      Total: this.currencyPipe.transform(this.Total),
    });
  }

  modalAgregarCategorias() {
    const dialogComponent = new MatDialogConfig();
    dialogComponent.data = false;
    dialogComponent.autoFocus = false;
    dialogComponent.disableClose = false;
    const dialogRef = this.dialog.open(CrearCategoriaComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this._servicioInventario.crearCategoria(data).subscribe((res) => {
          Swal.fire(
            'Respuesta exitosa',
            'Categoria agregada correctamente',
            'success'
          );
          this.obtenerListaCategorias();
        });
      }
    });
  }

  resetFormulario() {
    this.Total = 0;
    this.arregloProductos = [];
    this.formTotales.patchValue({
      Subtotal: 0,
      Iva: 0,
      Total: 0,
    });
  }

  modalAgregarProductos() {
    const dialogComponent = new MatDialogConfig();
    dialogComponent.data = false;
    dialogComponent.autoFocus = true;
    dialogComponent.disableClose = false;

    const dialogRef = this.dialog.open(CrearProductosComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.grupoCategoria.products.push(data);
        this._servicioInventario
          .crearProductos(this.grupoCategoria.id, this.grupoCategoria)
          .subscribe((res) => {
            Swal.fire(
              'Respuesta exitosa',
              'Categoria agregada correctamente',
              'success'
            );
          });
      }
    });
  }

  guardarInventario() {
    Swal.fire(
      'Respuesta exitosa',
      'Inventario agregado correctamente',
      'success'
    );
  }
  InicializarFormularioTotales() {
    this.formTotales = new FormGroup({
      Subtotal: new FormControl({ value: 0, disabled: true }),
      Iva: new FormControl({ value: 0, disabled: true }),

      Total: new FormControl({ value: 0, disabled: true }),
    });
  }
}
