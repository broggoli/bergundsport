import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { VeranstaltungData } from "../../interfaces/veranstaltungData";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
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

  getProgramm(): Observable<VeranstaltungData[]> {
    if (!this.programm) {
      this.programm = this.http
        .get<any>(this.url)
        .pipe(map(data => data))
        .pipe(
          map((events: any[]) =>
            events.map((event: any) => this.convertToVeranstaltung(event))
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
      end_date: new Date(event.end_datum)
    };
  }
}
