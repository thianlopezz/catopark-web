import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UsuarioService } from '../usuario/usuario.service';
import { CatalogoService } from '../comun/catalogo.service';
// import { MensajeService } from '../comun/mensaje-modal/mensaje.service';

// import { AceptaService } from '../comun/confirma-modal/acepta.service';
// import { ConfirmaModalService } from '../comun/confirma-modal/confirma-modal.service';

declare var jQuery: any;
declare var Materialize: any;

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, AfterViewInit {

  filtro;

  loadingUsuarios = true;
  loading;
  usuarios = [];
  carreras = [];
  tipoUsuario = [{
    idTipo: 1, tipoUsuario: 'Portero'
  },
  {
    idTipo: 0, tipoUsuario: 'Ocupante'
  }];

  model: any = {
    idTipo: 1
  };

  subscripcion: any;

  constructor(private usuarioService: UsuarioService,
    private catalogoService: CatalogoService
    // private rolService: RolService,
    // private mensajeService: MensajeService,
    // private confirmaModalService: ConfirmaModalService,
    // private aceptaService: AceptaService
  ) {

    // this.subscripcion = this.aceptaService.getAcceptChangeEmitter()
    //   .subscribe(resp => this.goConfirma(resp));
  }

  ngOnInit() {
    this.getUsuarios();
    this.getCarreras();
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
        this.guardarUsuario();
      }
    }

  }

  private guardarUsuario(form?: NgForm) {

    this.loading = true;

    if (this.model.idTipo === 0) { this.model.idCarrera = jQuery('#idCarrera').val(); }

    this.usuarioService.mantenimiento(this.model)
      .subscribe(
      result => {
        if (result.success) {

          jQuery('#modalUsuario').modal('close');
          this.getUsuarios();

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

      jQuery('#modalUsuario').modal('open');

      setTimeout(() => {
        jQuery('select').material_select();
        let self = this;
        jQuery('#idTipo').on('change', function () {
          self.model.idTipo = Number(this.value);
          setTimeout(() => {
            jQuery('select').material_select();
          }, 50);
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

        this.model = Object.assign({accion: accion}, model);
      } else if (accion === 'I') {
        this.model = {
          accion: accion
        };
      }
    } if (accion === 'D') {

      this.model = Object.assign({ accion: accion }, model);
      // this.confirmaModalService.go('¿Está seguro de eliminar el usuario?');
      // confirmar
      this.guardarUsuario();
    }
  }

  private getUsuarios() {
    this.usuarioService.getAll()
      .subscribe(
      result => {
        if (result.success) {
          this.usuarios = result.data;
        } else {

          console.log(result.error);
        }

        this.loadingUsuarios = false;
      }, error => {

        console.log(error);
        this.loadingUsuarios = false;
      });
  }

  private getCarreras() {
    this.catalogoService.getAll('ca')
      .subscribe(
      result => {
        if (result.success) {
          this.carreras = result.data;
        } else {

          console.log(result.error);
        }

        this.loadingUsuarios = false;
      }, error => {

        console.log(error);
        this.loadingUsuarios = false;
      });
  }

  private getUsuario(model) {

    this.loading = true;

    this.usuarioService.getPorId(model.idusuario)
      .subscribe(
      result => {
        if (result.success) {

          this.model = result.data;
          this.model.accion = model.accion;

        } else {

          console.log(result.error);
        }

        this.loading = false;
      }, error => {

        console.log(error);
        this.loading = false;
      });
  }

}
