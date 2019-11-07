import { Component, OnInit } from "@angular/core";
import { ProgrammService } from "../../services/programm/programm.service";
import {
  VeranstaltungData,
  SortedProgram
} from "src/app/interfaces/veranstaltungData";
import { mergeMap } from "rxjs/operators";
@Component({
  selector: "app-programm",
  templateUrl: "./programm.page.html",
  styleUrls: ["./programm.page.scss"]
})
export class ProgrammPage implements OnInit {
  programm: SortedProgram[] = [];
  constructor(private programmService: ProgrammService) {}

  ngOnInit() {
    this.programmService
      .getSortedProgramm()
      .subscribe(programm => this.programm.push(programm));
  }
}
