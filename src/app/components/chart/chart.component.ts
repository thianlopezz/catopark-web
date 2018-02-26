import { Component, OnInit, OnChanges, Input, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { Chartop } from '../../models/chartop';
import Chart from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {

  @ViewChild('myChart') myChart: ElementRef;
  @Input() chart_op: Chartop;

  chart;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    const _chart_op = changes.chart_op.currentValue;

    if (this.chart === undefined) {

      const _chart = this.myChart.nativeElement.getContext('2d');

      this.chart = new Chart(
        _chart,
        {
          'type': _chart_op.type || 'line',
          'data': _chart_op.data || {},
          'options': _chart_op.options || {}
        }
      );

    }

    this.chart.data.labels.pop();
    this.chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });

    this.chart.data = _chart_op.data;
    this.chart.update();

  }

}
