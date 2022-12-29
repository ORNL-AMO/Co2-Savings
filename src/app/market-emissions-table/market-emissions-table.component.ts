import { Component, Input, OnInit } from '@angular/core';
import { SubregionEmissions } from '../e-grid.service';

@Component({
  selector: 'app-market-emissions-table',
  templateUrl: './market-emissions-table.component.html',
  styleUrls: ['./market-emissions-table.component.css']
})
export class MarketEmissionsTableComponent implements OnInit {

  @Input()
  currentEmissionsMarket: SubregionEmissions;
  constructor() { }

  ngOnInit(): void {
  }

}
