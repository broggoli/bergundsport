import { Component, OnInit, Input } from "@angular/core";
import { VeranstaltungData } from "../../interfaces/veranstaltungData";
const SVGSOURCE = "../../assets/category_images/";
@Component({
  selector: "veranstaltung-item",
  templateUrl: "./veranstaltung.component.html",
  styleUrls: ["./veranstaltung.component.scss"]
})
export class VeranstaltungComponent implements OnInit {
  categoryName = "";
  categoryNr: number;
  @Input() data: VeranstaltungData;
  constructor() {}
  
  ngOnInit() {
  }    
  getSVGSource() {
    this.categoryNr = this.data.category;
    switch( this.categoryNr ) {
      case 2:
        this.categoryName = "abfahrt";
        break;
      case 3:
        this.categoryName = "skitour";
        break;
      case 4:
        this.categoryName = "klettern";
        break;
      case 7:
        this.categoryName = "bergtour"
    }
    return `${SVGSOURCE}${this.categoryName}.svg`;
  }
  
}
