import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { MensajeService } from './services/mensaje.service';
import { MensajeModalComponent } from './components/mensaje-modal/mensaje-modal.component';
import { ChartComponent } from './components/chart/chart.component';

import { UsuarioService } from './usuario/usuario.service';
import { CatalogoService } from './comun/catalogo.service';

import { VehiculoComponent } from './vehiculo/vehiculo.component';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { FiltrarPipe } from './comun/filtrar.pipe';
import { VehiculoService } from './vehiculo/vehiculo.service';
import { VehiOcupanteService } from './vehiculo/vehi-ocupante.service';
import { LoginService } from './login/login.service';
import { ActivatorService } from './services/activator.service';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    MensajeModalComponent,
    ChartComponent,
    VehiculoComponent,
    LoginComponent,
    UsuarioComponent,
    FiltrarPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    MensajeService,
    UsuarioService,
    CatalogoService,
    VehiculoService,
    VehiOcupanteService,
    LoginService,
    ActivatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
