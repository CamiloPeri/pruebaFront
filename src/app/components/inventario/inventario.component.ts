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
  public total: number = 0;
  public iva: number = 0.16;
  importe: number;
  productoSeleccionado: any;
  grupoCategoria: any;
  objSesion: any;
  botonesAgregar: boolean;
  constructor(
    public _servicioInventario: InventarioService,
    public dialog: MatDialog,
    private currencyPipe: CurrencyPipe
  ) {
    debugger;
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
    debugger;
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
    if (evento.value.products.length !== 0) {
      this.productos = evento.value.products;
      this.cajaProductos = true;
      this.seleccionProductos = true;
      this.resetFormulario();
    } else {
      this.cajaProductos = false;
    }
  }

  seleccionProducto(valor, seleccion) {
    debugger;
    if (seleccion === true) {
      this.productoSeleccionado = valor.value;
      this.arregloProductos.push(this.productoSeleccionado);
      this.obtenerImporteyTotales();
      this.mostrarValoresFormulario();
    } else {
      var indice = this.arregloProductos.indexOf();
      this.arregloProductos.splice(indice, 1);

      if (this.arregloProductos.length === 0) {
        this.InicializarFormularioTotales();
      } else {
        this.importe = (this.productoSeleccionado.precio * this.iva) / 100;
        this.arregloProductos.forEach((element) => {
          this.total -= element.precio;
        });
        this.mostrarValoresFormulario();
      }
    }
  }

  obtenerImporteyTotales() {
    this.importe = (this.productoSeleccionado.precio * this.iva) / 100;
    this.arregloProductos.forEach((element) => {
      this.total += element.precio;
    });
  }

  mostrarValoresFormulario() {
    debugger;
    this.formTotales.patchValue({
      Subtotal: this.currencyPipe.transform(this.productoSeleccionado.precio),
      Importe: this.importe,
      Iva: `${this.iva}%`,
      Total: this.currencyPipe.transform(this.total),
    });
  }

  modalAgregarCategorias() {
    const dialogComponent = new MatDialogConfig();
    dialogComponent.data = false;
    dialogComponent.autoFocus = false;
    dialogComponent.disableClose = false;
    const dialogRef = this.dialog.open(
      CrearCategoriaComponent,

      {
        width: '250px',
      }
    );

    dialogRef.afterClosed().subscribe((data) => {
      debugger;
      if (data) {
        this._servicioInventario.crearCategoria(data).subscribe((res) => {
          this.obtenerListaCategorias();

          Swal.fire(
            'Respuesta exitosa',
            'Categoria agregada correctamente',
            'success'
          );
        });
      }
    });
  }

  resetFormulario() {
    this.total = 0;
    this.arregloProductos = [];
    this.formTotales.patchValue({
      Subtotal: 0,
      Importe: 0,
      Iva: 0,
      Total: 0,
    });
  }

  modalAgregarProductos() {
    const dialogComponent = new MatDialogConfig();
    dialogComponent.data = false;
    dialogComponent.autoFocus = true;
    dialogComponent.disableClose = false;

    const dialogRef = this.dialog.open(
      CrearProductosComponent,

      {
        width: '250px',
      }
    );

    dialogRef.afterClosed().subscribe((data) => {
      debugger;
      if (data) {
        this.grupoCategoria.products.push(data);

        const NuevoObjeto = _.cloneDeep(this.grupoCategoria);

        this._servicioInventario
          .crearProductos(this.grupoCategoria.id)
          .subscribe((res) => {
            NuevoObjeto.products.push(data);
            this._servicioInventario
              .crearCategoria(NuevoObjeto)
              .subscribe((res) => {
                this.obtenerListaCategorias();
                Swal.fire(
                  'Respuesta exitosa',
                  'Categoria agregada correctamente',
                  'success'
                );
              });
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
      Importe: new FormControl({ value: 0, disabled: true }),
      Total: new FormControl({ value: 0, disabled: true }),
    });
  }
}
