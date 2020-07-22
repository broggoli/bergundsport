import { Component, OnInit } from "@angular/core";

import { Platform } from "@ionic/angular";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.platform.ready().then(() => {
      console.log("Platform is ready.");
      setTimeout(() => (this.showSplash = false), 2000);
    });
  }
  showSplash: boolean = true;
  constructor(private platform: Platform) {
    this.showSplash = true;
    //this.loadingApp();
    //this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log("Platform is ready.");
      setTimeout(() => (this.showSplash = true), 1500);
    });
  }
}
