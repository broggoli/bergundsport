import { Component, OnInit } from "@angular/core";
import { PageService } from "src/app/services/page/page.service";
import { MaterialData } from "src/app/interfaces/materialData";

@Component({
  selector: "app-material",
  templateUrl: "./material.page.html",
  styleUrls: ["./material.page.scss"]
})
export class MaterialPage implements OnInit {
  material: MaterialData[];
  constructor(private pageService: PageService) {}

  ngOnInit() {
    this.pageService.getMaterialData().subscribe(mat => {
      this.material = mat;
    });
  }
}
