import { Component, OnInit } from "@angular/core";
import { ProgrammService } from "../../services/programm/programm.service";
import { VeranstaltungData } from "src/app/interfaces/veranstaltungData";
@Component({
  selector: "app-programm",
  templateUrl: "./programm.page.html",
  styleUrls: ["./programm.page.scss"]
})
export class ProgrammPage implements OnInit {
  programm: VeranstaltungData[];
  constructor(private programmService: ProgrammService) {}

  ngOnInit() {
    this.programmService
      .getProgramm()
      .subscribe(programm => (this.programm = programm));
  }
}
