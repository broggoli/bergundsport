import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProgrammService } from "src/app/services/programm/programm.service";
import { VeranstaltungData } from "src/app/interfaces/veranstaltungData";
import { SendService } from "src/app/services/send/send.service";
import { ValidationService } from "src/app/services/validation/validation.service";

import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-anmeldung",
  templateUrl: "./anmeldung.page.html",
  styleUrls: ["./anmeldung.page.scss"]
})
export class AnmeldungPage implements OnInit {
  selectedPath = "";
  id: number;
  anmeldung: FormGroup;

  veranstaltung: VeranstaltungData = {
    id: 0,
    title: "...",
    description: "...",
    long_description: "...",
    tour_destinations: "...",
    programm: "...",
    skills: "...",
    stay: "...",
    specialities: "...",
    service: "...",
    price: {
      currency: "CHF",
      value: 0
    },
    start_date: new Date(),
    end_date: new Date()
  };

  constructor(
    private route: ActivatedRoute,
    private programmService: ProgrammService,
    private mailService: SendService,
    private formBuilder: FormBuilder
  ) {
    this.anmeldung = this.formBuilder.group({
      lastName: ["", Validators.required],
      firstName: ["", Validators.required],
      address: ["", Validators.required],
      PLZ: ["", Validators.required],
      place: ["", Validators.required],
      email: ["", [Validators.required, ValidationService.emailValidator]],
      tel: ["", [Validators.required, ValidationService.telValidator]],
      mobile: ["", [ValidationService.telValidator]],
      bemerkung: [""],
      mitgliedAlpenclub: [""],
      vegi: [""]
    });
  }

  logForm() {
    if (this.anmeldung.dirty && this.anmeldung.valid) {
      console.log(this.anmeldung.value);
    } else {
      alert(
        `Name: ${this.anmeldung.value.name} Email: ${this.anmeldung.value.email}`
      );
    }
  }
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

  anmelden() {
    if (this.anmeldung.dirty && this.anmeldung.valid) {
      const data = this.anmeldung.value;
      this.mailService.sendMail(data).subscribe(d => console.log(d));
    } else {
      alert(
        `Name: ${this.anmeldung.value.firstName} Email: ${this.anmeldung.value.email}`
      );
    }
  }
}
