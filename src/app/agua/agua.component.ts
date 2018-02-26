import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AguaService } from '../services/agua.service';
import { MensajeService } from '../services/mensaje.service';
import { Chartop } from '../models/chartop';

declare var jQuery: any;

@Component({
  selector: 'app-agua',
  templateUrl: './agua.component.html',
  styleUrls: ['./agua.component.css']
})
export class AguaComponent implements OnInit, AfterViewInit {

  meses: string[] =
  ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  mesesCorto: string[] =
  ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

  model = { contrato: undefined, identificacion: undefined };
  result: any;
  loading = false;

  chart: Chartop = new Chartop(undefined, {}, {});

  constructor(private aguaService: AguaService,
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

    if (!this.model.contrato) {

      this.mensajeService.error('Ingrese un número de contrato');
      jQuery('#mensaje-modal').modal('open');
      return;
    }

    if (!this.model.identificacion) {

      this.mensajeService.error('Ingrese una identificación');
      jQuery('#mensaje-modal').modal('open');
      return;
    }

    this.loading = true;

    this.aguaService.getAll(this.model)
      .subscribe(
      result => {
        if (result.success) {

          this.loading = false;
          this.result = result.data;

          setTimeout(() => {

            jQuery('.collapsible').collapsible();
          }, 600);

          this.goStatistics();
          this.reverse();

          if (result.origen === 0) {

            this.guardaMeta();
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

    this.aguaService.guardaMeta(this.result)
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

    for (let i = 0; i < this.result.consumos.length; i++) {

      labels.push(this.mesesCorto[this.result.consumos[i].mes - 1] + '/' + this.result.consumos[i].anio);
      data_consumo.push(this.result.consumos[i].valor);
    }

    const data = {
      datasets: [{
        label: 'Consumo',
        borderColor: 'rgba(90, 190, 255, 1)',
        backgroundColor: 'rgba(0, 155, 255, 0.5)',
        data: data_consumo
      }],
      labels: labels
    };

    this.chart = new Chartop('bar', data, {});

  }

  reverse() {
    let data_reverse = [];

    for (let i = this.result.consumos.length - 1; i >= 0; i--) {
      data_reverse.push(this.result.consumos[i]);
    }

    this.result.reverse = data_reverse;
  }

}
