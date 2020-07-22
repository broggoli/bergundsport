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
      case 5:
        this.categoryName = "klettern";
        break;
      default:
        this.categoryName = "skitour";
        break;
    }
    return `${SVGSOURCE}${this.categoryName}.svg`;
  }
  
}
