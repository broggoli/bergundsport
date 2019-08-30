import { Component, OnInit, Input } from "@angular/core";
import { MaterialData } from "src/app/interfaces/materialData";

@Component({
  selector: "material-item",
  templateUrl: "./material-item.component.html",
  styleUrls: ["./material-item.component.scss"]
})
export class MaterialItemComponent implements OnInit {
  @Input() data: MaterialData;
  constructor() {}
  ngOnInit() {}
}
