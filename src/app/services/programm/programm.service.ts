import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  VeranstaltungData,
  SortedProgram
} from "../../interfaces/veranstaltungData";
import { Observable, pipe, of, from } from "rxjs";
import { map, tap, groupBy, mergeMap, toArray } from "rxjs/operators";
import { SERVER_URL } from "../../../environments/environment";
import { VeranstaltungComponent } from "src/app/pages/programm/veranstaltung/veranstaltung.component";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class ProgrammService {
  programm: Observable<VeranstaltungData[]>;
  url = SERVER_URL + "programm";
  constructor(private http: HttpClient) {}
  monthNames = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember"
  ];
  sortProgramm(
    programm: Observable<VeranstaltungData[]>
  ): Observable<SortedProgram[]> {
    const sortedProgramm = programm
      .pipe(mergeMap(eventsArray => eventsArray.sort()))
      .pipe(sort)
      .pipe(
        groupBy((event: VeranstaltungData) => event.start_date.getFullYear())
      )
      .pipe(
        map(year =>
          year.pipe(
            groupBy((event: VeranstaltungData) => event.start_date.getMonth()),
            // return each item in group as array
            mergeMap(group => group.pipe(toArray())),
            map(monthProgram => {
              const yearName = this.monthNames[
                monthProgram[0].start_date.getFullYear()
              ];
              const monthName = this.monthNames[
                monthProgram[0].start_date.getMonth()
              ];
              const sorted: SortedProgram = {
                year: [
                  {
                    year_name: yearName,
                    month: {
                      name: monthName,
                      veranstaltungen: monthProgram
                    }
                  }
                ]
              };
              return sorted;
            })
          )
        )
      );
    return sortedProgramm;
  }
  getSortedProgramm(): Observable<SortedProgram[]> {
    return this.sortProgramm(this.getProgramm());
  }
  getProgramm(): Observable<VeranstaltungData[]> {
    if (!this.programm) {
      this.programm = this.http
        .get<any>(this.url)
        .pipe(map(data => data))
        .pipe(
          map((events: any[]) =>
            events
              .map((event: VeranstaltungData) =>
                this.convertToVeranstaltung(event)
              )
              .filter((ev: VeranstaltungData) => ev.show)
          )
        );
    }
    return this.programm;
  }
  private convertToVeranstaltung(event: any): VeranstaltungData {
    return {
      id: event.id,
      title: event.title.rendered,
      description: event.kurz_beschreibung.replace(/<\/?[^>]+(>|$)/g, ""),
      long_description: event.beschreibung.replace(/<\/?[^>]+(>|$)/g, ""),
      tour_destinations: event.moegliche_tourenziele.replace(
        /<\/?[^>]+(>|$)/g,
        ""
      ),
      programm: event.programm.replace(/<\/?[^>]+(>|$)/g, ""),
      skills: event.anforderungen.replace(/<\/?[^>]+(>|$)/g, ""),
      stay: event.unterkunft.replace(/<\/?[^>]+(>|$)/g, ""),
      specialities: event.besonderes.replace(/<\/?[^>]+(>|$)/g, ""),
      service: event.leistung.replace(/<\/?[^>]+(>|$)/g, ""),
      price: {
        currency: "CHF",
        value: parseInt(event.preis)
      },
      start_date: new Date(event.start_datum),
      end_date: new Date(event.end_datum),
      ausgebucht: event.boolean === "1",
      image_urls: Array(event.bilder).map(image => image.guid),
      header_image: event.kopf_bild.guid,
      show: event.anzeigen === "1"
    };
  }
}
