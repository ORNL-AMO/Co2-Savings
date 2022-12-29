import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; 
import { Subscription } from 'rxjs';
import { Co2SavingsService } from './co2-savings.service';
import { EGridService } from './e-grid.service';

// declare ga as a function to access the JS code in TS
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Co2-Savings';

  tabSelect: string = "results";
  @ViewChild('bannerElement', { static: false }) bannerElement: ElementRef;
  @ViewChild('contentContainer', { static: false }) contentContainer: ElementRef;
  containerHeight: number;
  formHeight: number;


  @HostListener('window:resize', ['$event'])
  onResize(event) {
      this.setContainerSize();
  }
  headerHeight: number;
  isModalOpenSub: Subscription;
  baselineSelected: boolean = true;
  isModalOpen: boolean;

  constructor(public router: Router, private eGridService: EGridService, private co2SavingsService: Co2SavingsService){   
    this.router.events.subscribe(event => {
       if(event instanceof NavigationEnd){
           gtag('config', 'G-29K0R91S12', 
                 {
                   'page_path': event.urlAfterRedirects
                 }
                );
        }
     }
  )}

  async ngOnInit() {
    this.isModalOpenSub = this.co2SavingsService.modalOpen.subscribe(val => {
      this.isModalOpen = val;
    });

    await this.eGridService.parseEGridData();
  }

  ngOnDestroy() {
    this.isModalOpenSub.unsubscribe();
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.setContainerSize();
    }, 10);
  }


  setTab(str: string) {
    this.tabSelect = str;
  }

  setContainerSize() {
    if (this.contentContainer) {
      this.containerHeight = this.contentContainer.nativeElement.offsetHeight - this.bannerElement.nativeElement.offsetHeight;
    }
  }

  selectBaseline(){
    this.baselineSelected = true;
  }

  selectModification(){
    this.baselineSelected = false;
  }
}
