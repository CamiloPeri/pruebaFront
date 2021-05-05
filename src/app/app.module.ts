import { CommonModule, CurrencyPipe, PercentPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { AppRoutingModule } from './app-routing.module';
import { PagesComponent } from './pages/pages.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { FilterPipe } from './pipes/filter.pipe';
import { CrearCategoriaComponent } from './components/crear-categoria/crear-categoria.component';
import { CrearProductosComponent } from './components/crear-productos/crear-productos.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    PagesComponent,
    InventarioComponent,
    FilterPipe,
    CrearCategoriaComponent,
    CrearProductosComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
  ],
  exports: [FilterPipe],
  providers: [MaterialModule, CurrencyPipe, PercentPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
