import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LuzService } from '../services/luz.service';
import { MensajeService } from '../services/mensaje.service';
import { Chartop } from '../models/chartop';

declare var jQuery: any;

@Component({
  selector: 'app-luz',
  templateUrl: './luz.component.html',
  styleUrls: ['./luz.component.css']
})
export class LuzComponent implements OnInit, AfterViewInit {

  meses: string[] =
  ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  model = { PP: 0, tipo: '', valor: '' };
  result: any;
  loading = false;
  opciones = [{ value: 'CU', text: 'Código único' }, { value: 'CA', text: 'Clave de acceso' }];

  chart: Chartop = new Chartop(undefined, {}, {});

  constructor(private luzService: LuzService,
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

    this.model.tipo = jQuery('#tipo').val();

    if (!this.model.tipo || this.model.tipo === '') {

      this.mensajeService.error('Ingrese un tipo de búsqueda');
      jQuery('#mensaje-modal').modal('open');
      return;
    }

    if (!this.model.valor || this.model.valor === '') {

      this.mensajeService.error('Ingrese un valor de búsqueda');
      jQuery('#mensaje-modal').modal('open');
      return;
    }

    if (this.model.tipo === 'CU' || this.model.tipo === 'CA') {
      this.model.PP = 0;
    }

    this.loading = true;

    this.luzService.getAll(this.model)
      .subscribe(
      result => {
        if (result.success) {

          this.loading = false;
          this.result = result.data;

          setTimeout(() => {

            jQuery('.collapsible').collapsible();
          }, 600);

          this.goStatistics();

          if (result.origen === 0 && this.result.Result && JSON.stringify(this.result.Result) !== '{}') {

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

  guardaMeta() {

    this.luzService.guardaMeta(this.result)
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

  goStatistics() {

    let labels = [];
    let data_consumo = [];
    let data_valor = [];

    // for (let i = this.result.Stats.length - 1; i > 0 ; i--) {
    for (let i = 0; i < this.result.Stats.length; i++) {

      labels.push(this.result.Stats[i].mes + '/' + this.result.Stats[i].anio);
      data_consumo.push(this.result.Stats[i].consumo);
      data_valor.push(this.result.Stats[i].valor);
    }

    const data = {
      datasets: [{
        label: 'Consumo',
        borderColor: 'rgba(90, 190, 255, 1)',
        backgroundColor: 'rgba(0, 155, 255, 0.5)',
        data: data_consumo
      }, {
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

}
