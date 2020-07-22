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
import { LoadingController } from '@ionic/angular';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController
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
      alpenClubMember: [false],
      vegi: [true]
    });
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
    if (this.anmeldung.valid) {
      let data: MailData = this.anmeldung.value;
      data["event"] = this.veranstaltung;
      console.log(data.bemerkung)
      let loading = this.loadingCtrl.create({
          message: "Anmeldung wird verschickt..."
        }).then(loading => {
          loading.present();
          this.mailService.sendMail(data)
          .pipe(
            catchError(this.handleError),
            finalize( () => loading.dismiss() )
          ).subscribe(d => {
            //console.log(d);
            loading.dismiss();

            let check = this.loadingCtrl.create({
              spinner: null,
              message: "Erfolgreich verschickt...",
              duration: 1000
            }).then(check => {
              check.present();
              });
          });
        })
    } else {
      alert(
        `Anmeldung konnte nicht abgeschickt werden!`
      );
    }
  }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  presentLoadingCustom() {
    
  }
}
