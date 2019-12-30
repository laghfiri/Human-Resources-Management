import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent {
  doughnutChartLabels: Label[] = ['Informatique', 'Stock', 'Agronomie','Comptabilité'];
  doughnutChartData: MultiDataSet = [
    [40, 25, 20,10]
  ];
  doughnutChartType: ChartType = 'doughnut';


}
