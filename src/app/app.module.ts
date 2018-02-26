import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { LuzComponent } from './luz/luz.component';
import { IndexComponent } from './index/index.component';
import { MensajeService } from './services/mensaje.service';
import { MensajeModalComponent } from './components/mensaje-modal/mensaje-modal.component';
import { ChartComponent } from './components/chart/chart.component';
import { AguaComponent } from './agua/agua.component';
import { TelefonoComponent } from './telefono/telefono.component';

import { LuzService } from './services/luz.service';
import { AguaService } from './services/agua.service';
import { TelefonoService } from './telefono/telefono.service';
import { UsuarioService } from './usuario/usuario.service';
import { CatalogoService } from './comun/catalogo.service';

import { GoogleAnalyticsEventsService } from './services/google-analytics-events.service';
import { OcupanteComponent } from './ocupante/ocupante.component';
import { VehiculoComponent } from './vehiculo/vehiculo.component';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { FiltrarPipe } from './comun/filtrar.pipe';
import { VehiculoService } from './vehiculo/vehiculo.service';
import { VehiOcupanteService } from './vehiculo/vehi-ocupante.service';

@NgModule({
  declarations: [
    AppComponent,
    LuzComponent,
    IndexComponent,
    MensajeModalComponent,
    ChartComponent,
    AguaComponent,
    TelefonoComponent,
    OcupanteComponent,
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
    LuzService,
    AguaService,
    MensajeService,
    TelefonoService,
    UsuarioService,
    CatalogoService,
    VehiculoService,
    VehiOcupanteService,
    GoogleAnalyticsEventsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
