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
import { MailData } from 'src/app/interfaces/sendData';

@Component({
  selector: "app-anmeldung",
  templateUrl: "./anmeldung.page.html",
  styleUrls: ["./anmeldung.page.scss"]
})
export class AnmeldungPage implements OnInit {
  selectedPath = "";
  id: number;
  anmeldung: FormGroup;

  veranstaltung: VeranstaltungData;

  constructor(
    private route: ActivatedRoute,
    private programmService: ProgrammService,
    private mailService: SendService,
    private formBuilder: FormBuilder
  ) {
    this.anmeldung = this.formBuilder.group({
      lastName: ["asd", Validators.required],
      firstName: ["asd", Validators.required],
      address: ["asd", Validators.required],
      PLZ: ["as", Validators.required],
      place: ["asd", Validators.required],
      email: ["broggoli.nb@gmail.com", [Validators.required, ValidationService.emailValidator]],
      tel: ["0202020202", [Validators.required, ValidationService.telValidator]],
      mobile: ["0202020202", [ValidationService.telValidator]],
      bemerkung: ["asd"],
      alpenClubMember: [false],
      vegi: [true]
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
      const data: MailData = this.anmeldung.value ;
      console.log(data)
      this.mailService.sendMail(data).subscribe(d => {console.log(d); alert(
        `Anmeldung erfolgreich übermittelt!`)});
    } else {
      alert(
        `Anmeldung konnte nicht abgeschickt werden!`
      );
    }
  }
}
