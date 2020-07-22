import { Component, OnInit } from "@angular/core";
import { Router, RouterEvent, NavigationEnd } from "@angular/router";
import { PageService } from 'src/app/services/page/page.service.js';
import { MenuController } from '@ionic/angular';

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"]
})
export class MenuPage implements OnInit {
  pages: any;
  selectedPath = "";

  constructor(private router: Router,
    private pageService: PageService,
    private menu: MenuController) {
    this.pages = pageService.getPages();
  }
  checkURL(selectedPath, url) {
    return selectedPath.includes(url) || ( selectedPath === "/" &&  url.includes("/home")) ;
  }
  ngOnInit() {
    this.pageService.currURL().subscribe( url => {if( url ) this.selectedPath =  url} )
  }
  ionViewDidEnter() {
    this.menu.swipeGesture(false);
  }
}
