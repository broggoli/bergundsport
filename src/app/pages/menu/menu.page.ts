import { Component, OnInit } from "@angular/core";
import { Router, RouterEvent, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"]
})
export class MenuPage implements OnInit {
  pages = [
    {
      title: "Porträt",
      url: "/menu/home"
    },
    {
      title: "Programm",
      url: "/menu/programm"
    } /*,
    {
      title: "Material",
      url: "/menu/material"
    }*/,
    {
      title: "Kontakt",
      url: "/menu/kontakt"
    }
  ];

  selectedPath = "";
  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.selectedPath = event.url.split("/")[0];
      }
    });
  }
  ngOnInit() {}
}
