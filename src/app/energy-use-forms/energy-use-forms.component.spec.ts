import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyUseFormsComponent } from './energy-use-forms.component';

describe('EnergyUseFormsComponent', () => {
  let component: EnergyUseFormsComponent;
  let fixture: ComponentFixture<EnergyUseFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergyUseFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyUseFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
