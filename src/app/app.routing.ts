import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { VehiculoComponent } from './vehiculo/vehiculo.component';
import { OcupanteComponent } from './ocupante/ocupante.component';
import { UsuarioComponent } from './usuario/usuario.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'ocupante', component: OcupanteComponent },
    { path: 'vehiculo', component: VehiculoComponent },
    { path: 'usuario', component: UsuarioComponent },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
