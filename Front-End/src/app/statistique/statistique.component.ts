
import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent  {


  barChartLabels: Label[] = ['Janvier', 'février', 'Mars', 'Avril', 'May', 'Juin','Juin','Aout','Sptembre','Novembre','Decembre'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  public barChartColors: Color[] = [
    { backgroundColor: 'blue' }
  ]

  barChartData: ChartDataSets[] = [
    { data: [5, 0, 2, 10, 1, 33, 0, 58, 5, 3, 20], label: 'Utilisateurs' }
  ];



}
