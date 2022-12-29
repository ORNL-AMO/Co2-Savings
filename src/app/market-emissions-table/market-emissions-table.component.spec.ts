import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketEmissionsTableComponent } from './market-emissions-table.component';

describe('MarketEmissionsTableComponent', () => {
  let component: MarketEmissionsTableComponent;
  let fixture: ComponentFixture<MarketEmissionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketEmissionsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketEmissionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
