import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Co2SavingsService } from '../co2-savings.service';

@Component({
    selector: 'app-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.css'],
    standalone: false
})
export class HelpComponent implements OnInit {

  currentField: string;
  currentFieldSub: Subscription;
  constructor(private co2SavingsService: Co2SavingsService) { }

  ngOnInit(): void {
    this.currentFieldSub = this.co2SavingsService.currentField.subscribe(value => {
      this.currentField = value;
    });
  }

  ngOnDestroy() {
    this.currentFieldSub.unsubscribe();
  }

}
