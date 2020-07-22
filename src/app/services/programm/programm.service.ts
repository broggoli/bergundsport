import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { VeranstaltungData } from "../../interfaces/veranstaltungData";
import { Observable, pipe, of, from, zip } from "rxjs";
import { map, groupBy, mergeMap, toArray, shareReplay, tap } from "rxjs/operators";
import { SERVER_URL } from "../../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class ProgrammService {
  programm: Observable<VeranstaltungData[]>;
  programm_url = SERVER_URL + "programm?per_page=100";
  mat_url = SERVER_URL + "ausrstung?per_page=100";
  matLists: Observable<any[]>;
  constructor(private http: HttpClient) {}

  sortDate(event1: VeranstaltungData, event2: VeranstaltungData) { 
    if( event1.start_date > event2.start_date ) return 1;
    else return -1;
  }
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
    this.getMatLists().subscribe( d => console.log(d));
    if (!this.programm) {
      this.programm = this.http
        .get<any>(this.programm_url)
        .pipe(
          shareReplay(1),
          map((events: any[]) =>
            events
              .map((event: VeranstaltungData) =>
                this.convertToVeranstaltung(event)
              )
          )
        );
    }
    return this.programm;
  }
  getMatLists(): Observable<any[]> {
    if (!this.matLists) {
      console.log("asd")
      this.matLists = this.http
        .get<any>(this.mat_url)
        .pipe(
          shareReplay(5),
          map((items: any[]) =>
          items
              .map((item: any) => {
                return {
                  title: item.slug,
                  text: item.content.rendered
                }
              })
          ),
        );
    }
    return this.matLists;
  }
  private convertToVeranstaltung(event: any): VeranstaltungData {
    let matList = this.category2matList(event.categories[0]);
    let defaultImage = '../../../assets/header_image_mid.png';
    const imagesRaw: any[] = Array(event.bilder)[0];
    let image_urls;
    if(imagesRaw) {
      image_urls = imagesRaw.map(d => d.guid);
    }
    return {
      id: event.id,
      title: event.title.rendered.replace(/<\/?[^>]+(>|$)/g, ""),
      description: event.kurz_beschreibung.replace(/<\/?[^>]+(>|$)/g, ""),
      long_description: event.beschreibung,
      tour_destinations: event.moegliche_tourenziele,
      programm: event.programm,
      skills: event.anforderungen,
      stay: event.unterkunft,
      specialities: event.besonderes,
      service: event.leistung,
      price: {
        currency: "CHF",
        value: event.preis
      },
      start_date: new Date(event.start_datum),
      end_date: new Date(event.end_datum),
      ausgebucht: event.ausgebucht === "1",
      image_urls: image_urls,
      header_image: event.kopf_bild.guid ? event.kopf_bild.guid : defaultImage,
      category: event.categories[0],
      nr_free_spaces: event.freie_plaetze,
      nr_spaces: event.anzahl_plaetze,
      matList: matList
    };
  }
  category2matList(cat: number) {
    switch(cat) {
      case 1:
        return "hochtour-2-tage";
      case 5:
        return "skitouren-mehrtaegig-ab-hotel";
      case 2:
        return "skihochtour-mehrtaegig-ab-huette";
      case 3:
        return "snowboard-ski-tour";
      case 4:
        return "skitouren-mehrtaegig-ab-huette";
  }
}
}
