import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TelefonoService } from './telefono.service';
import { MensajeService } from '../services/mensaje.service';
import { Chartop } from '../models/chartop';

declare var jQuery: any;

@Component({
  selector: 'app-telefono',
  templateUrl: './telefono.component.html',
  styleUrls: ['./telefono.component.css']
})
export class TelefonoComponent implements OnInit, AfterViewInit {
  meses: string[] =
    ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  model = { provincia: '0', valor: '' };
  result: any;
  loading = false;

  chart: Chartop = new Chartop(undefined, {}, {});

  opciones = [{ value: '02', text: '02 - Pinchincha, Santo Domingo' },
  { value: '03', text: '03 - Bolivar, Chimborazo, Cotopaxi, Tungurahua, Pastaza' },
  { value: '04', text: '04 - Guayas, Santa Elena' },
  { value: '05', text: '05 - Galápagos, Los Ríos, Manabí' },
  { value: '06', text: '06 - Carchi, Esmeraldas, Imbabura, Napo, Orellana, Sucumbios' },
  { value: '07', text: '07 - Azuay, Cañar, El Oro, Loja, Zamora' }];

  constructor(private telefonoService: TelefonoService,
    private mensajeService: MensajeService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    jQuery('select').material_select();
    jQuery('ul.tabs').tabs();
    jQuery('.collapsible').collapsible();
    jQuery('.modal').modal();
  }

  buscar() {

    this.model.provincia = jQuery('#provincia').val();

    if (!this.model.provincia || this.model.provincia === '') {

      this.mensajeService.error('Ingrese una provincia de búsqueda');
      jQuery('#mensaje-modal').modal('open');
      return;
    }

    if (!this.model.valor || this.model.valor === '') {

      this.mensajeService.error('Ingrese número de teléfono de búsqueda');
      jQuery('#mensaje-modal').modal('open');
      return;
    }

    this.loading = true;

    this.telefonoService.getAll(this.model)
      .subscribe(
      result => {
        debugger;
        if (result.success) {

          this.loading = false;
          this.result = result.data;

          if (this.result.planillas.length > 18) {
            this.result.planillas = this.result.planillas.slice(0, 18);
          }

          setTimeout(() => {

            jQuery('.collapsible').collapsible();
          }, 600);

          this.goStatistics();

          if (result.origen === 0) {

            this.guardaMeta();
          } else if (!this.result.Result || JSON.stringify(this.result.Result) === '{}') {

            this.mensajeService.error('No se encontraron registros.');
            jQuery('#mensaje-modal').modal('open');
          }

        } else {
          this.loading = false;
          this.mensajeService.error(result.mensaje);
          console.log(result);
          jQuery('#mensaje-modal').modal('open');
        }
      },
      error => {
        console.log(error);
        this.loading = false;
      });
  }

  getUrlDescarga(planilla: string) {

    let aux = 'href=\'';

    let url = planilla.substring(planilla.indexOf(aux) + aux.length, planilla.length - 1);

    aux = '\'';

    url = url.substring(0, url.indexOf(aux));

    url = 'http://soy.cnt.com.ec/cntapp/facturapdf/' + url;

    return url;
  }

  goStatistics() {

    let labels = [];
    let data_consumo = [];
    let data_valor = [];

    for (let i = this.result.planillas.length - 1; i >= 0; i--) {
      labels.push(this.result.planillas[i].cell[4] + '/' + this.result.planillas[i].cell[3]);
      data_valor.push(this.result.planillas[i].cell[5]);
    }

    const data = {
      datasets: [{
        label: 'Valor $',
        borderColor: 'rgba(0, 115, 185, 1)',
        backgroundColor: 'rgba(0, 115, 185, 0.7)',
        data: data_valor,

        type: 'line'
      }],
      labels: labels
    };

    this.chart = new Chartop('bar', data, {});

  }

  guardaMeta() {

    this.telefonoService.guardaMeta(this.result)
      .subscribe(
      result => {

        if (result.sucess) {

          console.log(result.mensaje);
        } else {

          console.log(result.mensaje);
        }
      },
      error => {
        console.log(error);
      });
  }

}
