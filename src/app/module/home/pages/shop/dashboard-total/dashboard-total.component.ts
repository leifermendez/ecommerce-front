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
          [1, 46.47],
          [2, 46.24],
          [3, 46.08],
          /* Jan 2011 */
          [4, 47.08],
          [5, 47.33],
          [6, 47.71],
        ],
        type: undefined
      }]
    });

  }

}
