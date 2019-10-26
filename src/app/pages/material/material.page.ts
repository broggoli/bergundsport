import { Component, OnInit } from "@angular/core";
import { MaterialService } from "src/app/services/material/material.service";
import { MaterialData } from "src/app/interfaces/materialData";

@Component({
  selector: "app-material",
  templateUrl: "./material.page.html",
  styleUrls: ["./material.page.scss"]
})
export class MaterialPage implements OnInit {
  material: MaterialData[];
  constructor(private materialService: MaterialService) {}

  ngOnInit() {
    this.materialService.getMaterialData().subscribe(mat => {
      this.material = mat;
    });
  }
}
