import { Component, OnInit, AfterViewInit } from '@angular/core';
import { VehiculoService } from './vehiculo.service';
import { CatalogoService } from '../comun/catalogo.service';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../usuario/usuario.service';
import { VehiOcupanteService } from './vehi-ocupante.service';

declare var jQuery: any;
declare var Materialize: any;

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit, AfterViewInit {

  filtro;

  loadingVehiculos = true;
  loadingVehiOcupantes = true;
  loading;

  vehiculos = [];
  tipos = [];

  vehiOcupantes = [];

  ocupantes = [];
  ocupantesMap = {};

  model: any = {};
  modelVehiOcupante: any = {};

  subscripcion: any;

  constructor(private vehiculoService: VehiculoService,
    private vehiOcupanteService: VehiOcupanteService,
    private usuarioService: UsuarioService,
    private catalogoService: CatalogoService) {
  }

  ngOnInit() {
    this.getVehiculos();
    this.getTipos();
    this.getOcupantes();
  }

  ngAfterViewInit() {

    jQuery('select').material_select();
    jQuery('ul.tabs').tabs();
    jQuery('.collapsible').collapsible();
    jQuery('.modal').modal();
  }

  private goConfirma(resp) {
    if (resp === 'go') {

      if (this.model.accion === 'D') {
        this.guardarVehiculo();
      }
    }

  }

  private guardarVehiculo(form?: NgForm) {

    this.loading = true;

    // if (this.model.idTipo === 0) { this.model.idCarrera = jQuery('#idCarrera').val(); }

    this.vehiculoService.mantenimiento(this.model)
      .subscribe(
      result => {
        if (result.success) {

          jQuery('#modalVehiculo').modal('close');
          this.getVehiculos();

          if (form) { form.resetForm(); }

          // Materialize.toast(message, displayLength, className, completeCallback);
          Materialize.toast(result.mensaje, 2000, 'green lighten-1');
        } else {

          console.log(result.error);
          Materialize.toast(result.mensaje, 2000, 'red lighten-1');
        }

        this.loading = false;
      }, error => {

        console.log(error);
        Materialize.toast('Ocurrió un error al conectarse al servidor', 2000, 'red lighten-1');
        this.loading = false;
      });
  }

  private guardarVehiOcupante(form?: NgForm) {

    if (!this.modelVehiOcupante.accion) { this.modelVehiOcupante.accion = 'I' }

    this.vehiOcupanteService.mantenimiento(this.modelVehiOcupante)
      .subscribe(
      result => {
        if (result.success) {

          jQuery('#modalVehiOcupante').modal('close');
          this.getVehiOcupante();

          if (form) { form.resetForm(); }

          // Materialize.toast(message, displayLength, className, completeCallback);
          Materialize.toast(result.mensaje, 2000, 'green lighten-1');
        } else {

          console.log(result.error);
          Materialize.toast(result.mensaje, 2000, 'red lighten-1');
        }

        this.loading = false;
      }, error => {

        console.log(error);
        Materialize.toast('Ocurrió un error al conectarse al servidor', 2000, 'red lighten-1');
        this.loading = false;
      });
  }

  setAccionModel(accion, model?) {

    if (accion === 'U' || accion === 'I') {

      jQuery('#modalVehiculo').modal('open');

      setTimeout(() => {
        jQuery('select').material_select();
        let self = this;
        jQuery('#idTipo').on('change', function () {
          self.model.idTipo = Number(this.value);
        })
      }, 500);      

      if (accion === 'U') {

        jQuery("form#form input:text").reverse().each(function () {
          debugger;
          var input = jQuery(this);
          if (this.className !== 'select-dropdown') {

            setTimeout(() => {
              input.focus();
            }, 100);
          }
        });

        this.model = Object.assign({ accion: accion }, model);
      } else if (accion === 'I') {
        this.model = {
          accion: accion
        };
      }
    } if (accion === 'D') {

      this.model = Object.assign({ accion: accion }, model);
      // this.confirmaModalService.go('¿Está seguro de eliminar el usuario?');
      // confirmar
      this.guardarVehiculo();
    }
  }

  setAccionVehiOcupante(accion, model) {

    if (model.idVehiculo) {
      this.modelVehiOcupante = {
        idVehiculo: model.idVehiculo
      }
    }

    this.setAutoComplete();
    this.getVehiOcupante();

    if (accion === 'O') {

      jQuery('#modalVehiOcupante').modal('open');
    } if (accion === 'D') {

      this.model = Object.assign({ accion: accion }, model);
      // this.confirmaModalService.go('¿Está seguro de eliminar el usuario?');
      // confirmar
      this.guardarVehiOcupante();
    }
  }

  private getVehiculos() {
    this.vehiculoService.getAll()
      .subscribe(
      result => {
        if (result.success) {
          this.vehiculos = result.data;
        } else {

          console.log(result.error);
        }

        this.loadingVehiculos = false;
      }, error => {

        console.log(error);
        this.loadingVehiculos = false;
      });
  }

  private getVehiOcupante() {

    this.loadingVehiOcupantes = true;

    this.vehiOcupanteService.getPorIdVehiculo(this.modelVehiOcupante.idVehiculo)
      .subscribe(
      result => {
        if (result.success) {
          debugger;
          this.vehiOcupantes = result.data;
        } else {

          console.log(result.error);
        }

        this.loadingVehiOcupantes = false;
      }, error => {

        console.log(error);
        this.loadingVehiOcupantes = false;
      });
  }

  private getTipos() {
    this.catalogoService.getAll('tv')
      .subscribe(
      result => {
        if (result.success) {
          this.tipos = result.data;
        } else {

          console.log(result.error);
        }
      }, error => {

        console.log(error);
      });
  }

  getOcupantes() {

    this.usuarioService.getAll()
      .subscribe(
      result => {
        if (result.success) {
          this.ocupantes = result.data.filter(x => x.idTipo === 0);
          this.ocupantesMap = this.mapAuto(this.ocupantes);
        } else {

          console.log(result.error);
        }

        this.loadingVehiculos = false;
      }, error => {

        console.log(error);
        this.loadingVehiculos = false;
      });

  }

  setAutoComplete() {
    let self = this;
    jQuery('input.autocomplete').autocomplete({
      data: this.ocupantesMap,
      onAutocomplete: function (val) {
        self.modelVehiOcupante.idOcupante = self.ocupantes.filter(x => x.cedula === val)[0].idUsuario;
      },
      minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
    });
  }

  mapAuto(array: any) {
    let obj = {};
    for (let i = 0; i < array.length; i++) {

      // let aux[''] = array[i].cedula + ' - ' + array[i].nombre;
      obj['' + array[i].cedula + ''] = null;

      obj = Object.assign({ aux: null }, obj);
    }
    return obj;
  }

}
