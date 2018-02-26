import { Component, OnInit } from '@angular/core';
import { MensajeService } from '../../services/mensaje.service';

@Component({
  selector: 'app-mensaje-modal',
  templateUrl: './mensaje-modal.component.html',
  styleUrls: ['./mensaje-modal.component.css']
})
export class MensajeModalComponent implements OnInit {
  message: any;

  constructor(private mensajeService: MensajeService) { }

  ngOnInit() {
    this.mensajeService.getMessage().subscribe(message => { this.message = message; });
  }

}
