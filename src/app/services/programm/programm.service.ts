import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { VeranstaltungData } from "../../interfaces/veranstaltungData";
import { Observable } from "rxjs";
import { map, filter } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class ProgrammService {
  programm: Observable<VeranstaltungData[]>;
  url =
    "http://localhost/wordpress-site/wordpress/wp-json/tribe/events/v1/events";
  constructor(private http: HttpClient) {}

  getProgramm(): Observable<VeranstaltungData[]> {
    if (!this.programm) {
      this.programm = this.http
        .get<any>(this.url)
        .pipe(map(data => data.events))
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
      title: event.title,
      description: event.description.replace(/<\/?[^>]+(>|$)/g, ""),
      price: {
        currency: event.cost_details.currency_symbol,
        value: parseInt(event.cost_details.values[0])
      },

      start_date: new Date(event.start_date),
      end_date: new Date(event.start_date)
    };
  }
}
