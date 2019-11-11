import { Injectable, ComponentFactoryResolver } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  VeranstaltungData
} from "../../interfaces/veranstaltungData";
import { Observable, pipe, of, from, zip } from "rxjs";
import { map, tap, groupBy, mergeMap, toArray, flatMap, scan,  } from "rxjs/operators";
import { SERVER_URL } from "../../../environments/environment";

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
  sortDate(event1: VeranstaltungData, event2: VeranstaltungData) { 
    if( event1.start_date < event2.start_date ) return 1;
    else return -1;
  }
  /*
  yearBins(programm: Observable<VeranstaltungData[]>) 
    : Observable<VeranstaltungData[]>{
      return programm.pipe(
        //mergeMap(eventsArray => eventsArray.sort((event1, event2) => this.sortDate(event1, event2))),
        mergeMap(eventsArray => eventsArray),
        groupBy((event: VeranstaltungData) => event.start_date.getFullYear()),
        mergeMap( group => group.pipe(toArray())),
      )
  }
  monthBins(programm: Observable<VeranstaltungData[]>) 
    : Observable<VeranstaltungData[][]>{
      return this.yearBins(programm)
      .pipe(
        map(eventsArray => from(eventsArray.sort((event1, event2) => this.sortDate(event1, event2)))
          .pipe(
            groupBy((event: VeranstaltungData) => event.start_date.getMonth()),
            mergeMap( group => group.pipe(toArray())),
          )
        ),
        mergeMap( group => group.pipe(toArray()))
      )
      
  }*/
  sortProgramm(
    programm: Observable<VeranstaltungData[]>
  ): Observable<VeranstaltungData[][]> {
    return programm.pipe(
      //mergeMap(eventsArray => eventsArray.sort((event1, event2) => this.sortDate(event1, event2))),
      mergeMap(eventsArray => eventsArray.sort((event1, event2) => this.sortDate(event1, event2))),
      groupBy((event: VeranstaltungData) => event.start_date.getFullYear()),
      mergeMap( group => group.pipe(toArray())),
      map(eventsArray => from(eventsArray)
          .pipe(
            groupBy((event: VeranstaltungData) => event.start_date.getMonth()),
            mergeMap( group => group.pipe(toArray())),
          )
        ),
        mergeMap( group => group.pipe(toArray()))
    )
  }
  getSortedProgramm(): Observable<VeranstaltungData[][]> {
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
