import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProgrammService } from "src/app/services/programm/programm.service";
import { VeranstaltungData } from "src/app/interfaces/veranstaltungData";

@Component({
  selector: "app-veranstaltung-detail",
  templateUrl: "./veranstaltung-detail.component.html",
  styleUrls: ["./veranstaltung-detail.component.scss"]
})
export class VeranstaltungDetailComponent implements OnInit {
  id: number;
  veranstaltung: VeranstaltungData = {
    id: 0,
    title: "...",
    description: "...",
    price: {
      currency: "",
      value: 0
    },
    start_date: new Date(),
    end_date: new Date()
  };
  constructor(
    private route: ActivatedRoute,
    private programmService: ProgrammService
  ) {}

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.programmService
      .getProgramm()
      .subscribe(
        programm =>
          (this.veranstaltung = programm.filter(
            veranstaltung => veranstaltung.id === this.id
          )[0])
      );
  }
}
