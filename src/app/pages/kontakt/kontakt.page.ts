import { Component, OnInit, Input } from "@angular/core";
import { PageData } from "src/app/interfaces/pageData";
import { PageService } from "src/app/services/page/page.service";

@Component({
  selector: "app-kontakt",
  templateUrl: "./kontakt.page.html",
  styleUrls: ["./kontakt.page.scss"]
})
export class KontaktPage implements OnInit {
  constructor(private pageService: PageService) {}
  @Input() pageData: PageData;
  ngOnInit() {
    this.pageService
      .getPageData("kontakt")
      .subscribe(data => (this.pageData = data));
  }
}
