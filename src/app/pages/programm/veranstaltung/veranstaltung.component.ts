import { Component, OnInit, Input } from "@angular/core";
import { VeranstaltungData } from "../../../interfaces/veranstaltungData";

@Component({
  selector: "veranstaltung-item",
  templateUrl: "./veranstaltung.component.html",
  styleUrls: ["./veranstaltung.component.scss"]
})
export class VeranstaltungComponent implements OnInit {
  constructor() {}
  @Input() data: VeranstaltungData;
  ngOnInit() {}
}
