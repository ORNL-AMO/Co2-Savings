import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; 
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
  baselineSelected: boolean = true;
  constructor(public router: Router, private eGridService: EGridService){   
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

  ngOnInit() {
    this.eGridService.getAllSubRegions();
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
