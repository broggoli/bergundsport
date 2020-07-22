import { Component, OnInit } from "@angular/core";
import { PageService } from "src/app/services/page/page.service";
import { PageData } from "src/app/interfaces/pageData";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  pageData: PageData;

  constructor(private pageService: PageService) {}

  ngOnInit() {
    this.pageService
      .getPageData("home")
      .subscribe(data => (this.pageData = data));
  }
}
