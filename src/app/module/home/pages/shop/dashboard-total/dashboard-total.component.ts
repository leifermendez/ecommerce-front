import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard-total',
  templateUrl: './dashboard-total.component.html',
  styleUrls: ['./dashboard-total.component.css']
})
export class DashboardTotalComponent implements OnInit {
  chart: Chart;
  public loading = false;
  constructor() { }


  ngOnInit() {
    this.chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Funcion al tiempo',
        style:{'font-size':'10px'}
      },
      yAxis:{
        title: {
          style:{display:'none'}
        }
      },
      credits: {
        enabled: false
      },
      series: [  {
        name: 'Line 1',
        data: [
          [1293580800000, 46.47],
          [1293667200000, 46.24],
          [1293753600000, 46.08],
          /* Jan 2011 */
          [1294012800000, 47.08],
          [1294099200000, 47.33],
          [1294185600000, 47.71],
        ],
        type: undefined
      }]
    });

  }

}
