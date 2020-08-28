import { Component, OnInit } from "@angular/core";

import { Platform, MenuController } from "@ionic/angular";
import { Router } from '@angular/router';
import { PageService } from './services/page/page.service';
import { PageData } from './interfaces/pageData';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent implements OnInit {

  showSplash: boolean = true;
  selectedPath: string = "/";
  pages: PageData;
  openSubmenu: string = "";

  constructor(private platform: Platform,
    private router: Router,
    private pageService: PageService,
    private menu: MenuController) {
    this.showSplash = true;
    //this.loadingApp();
    //this.initializeApp();
  }
  
  ngOnInit(): void {
    this.platform.ready().then(() => {
      console.log("Platform is ready.");
      setTimeout(() => (this.showSplash = false), 2000);
    });
    this.pageService.currURL().subscribe( url => {if( url ) this.selectedPath =  url} )
    this.pages = this.pageService.getPages();
  }
  checkURL(selectedPath, url) {
    return selectedPath.includes(url) || ( selectedPath === "/" &&  url.includes("/home")) ;
  }
  ionViewDidEnter() {
    this.menu.swipeGesture(false);
  }

  toggleSubMenu(submenuTitle: string) {
    if(this.openSubmenu == submenuTitle) {
      this.openSubmenu = "";
    } else {
      this.openSubmenu = submenuTitle;
    }
  }
  initializeApp() {
    this.platform.ready().then(() => {
      console.log("Platform is ready.");
      setTimeout(() => (this.showSplash = true), 1500);
    });
  }
}
