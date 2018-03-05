import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { VehiculoComponent } from './vehiculo/vehiculo.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ActivatorService } from './services/activator.service';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'vehiculo', component: VehiculoComponent, canActivate: [ActivatorService] },
    { path: 'usuario', component: UsuarioComponent, canActivate: [ActivatorService] },
    { path: '**', redirectTo: 'usuario' }
];

export const routing = RouterModule.forRoot(appRoutes);
