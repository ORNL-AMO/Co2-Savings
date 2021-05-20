import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { ResultsComponent } from './results/results.component';
import { HelpComponent } from './help/help.component';
import { EnergyUseFormsComponent } from './energy-use-forms/energy-use-forms.component';
import { FormComponent } from './energy-use-forms/form/form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    ResultsComponent,
    HelpComponent,
    EnergyUseFormsComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
