import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-charts-resumen',
  templateUrl: './charts-resumen.component.html',
  styleUrls: ['./charts-resumen.component.css']
})
export class ChartsResumenComponent implements OnInit {
  public data: any = [];

  public single = [
    {
      'name': 'Germany',
      'value': 8940000
    },
    {
      'name': 'USA',
      'value': 5000000
    },
    {
      'name': 'France',
      'value': 7200000
    }
  ];

  public multi = [
    {
      'name': 'Germany',
      'series': [
        {
          'name': '2010',
          'value': 7300000
        },
        {
          'name': '2011',
          'value': 8940000
        }
      ]
    },

    {
      'name': 'USA',
      'series': [
        {
          'name': '2010',
          'value': 7870000
        },
        {
          'name': '2011',
          'value': 8270000
        }
      ]
    },

    {
      'name': 'France',
      'series': [
        {
          'name': '2010',
          'value': 5000002
        },
        {
          'name': '2011',
          'value': 5800000
        }
      ]
    }
  ];


  view: any[] = [1000, 400];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Number';
  showYAxisLabel = true;
  yAxisLabel = 'Value';
  timeline = false;


  colorScheme = {
    domain: ['#A10A28', '#c76400', '#2c6b35']
  };

  // line, area
  autoScale = true;

  //pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  constructor() {
  }

  ngOnInit() {
    this.data = [
      {
        'name': 'Germany',
        'series': [
          {
            'name': '2010',
            'value': 7300000,
            'min': 7000000,
            'max': 7600000
          },
          {
            'name': '2011',
            'value': 8940000,
            'min': 8840000,
            'max': 9300000
          }
        ]
      },

      {
        'name': 'USA',
        'series': [
          {
            'name': '2010',
            'value': 7870000,
            'min': 7800000,
            'max': 7950000
          },
          {
            'name': '2011',
            'value': 8270000,
            'min': 8170000,
            'max': 8300000
          }
        ]
      }
    ];
  }

}
