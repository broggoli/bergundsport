import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PageData } from "../../interfaces/pageData";
import { Observable, of } from "rxjs";
import { map, shareReplay, startWith } from "rxjs/operators";
import { SERVER_URL } from "../../../environments/environment";
import { Router, RouterEvent, NavigationEnd } from '@angular/router';


const CACHE_KEY = "locallyStoredPages";
@Injectable({
  providedIn: "root"
})
export class PageService {
  getPages(): any {
    return [
        {
          title: "Home",
          open: false,
          url: "/menu/home"
        },
        {
          title: "Programm",
          open: false,
          url: "/menu/programm"
        },
        {
          title: "Kontakt",
          open: false,
          url: "/menu/kontakt"
        },
        {
          title: "Wissenswertes",
          open: true,
          subPages:  
          [
            {
              title: "Bergführer-Tarife",
              url: "/menu/bergführerTarife"
            },
            {
              title : "Links",
              url: "/menu/links"
            }

          ]
        }
      ];
  }
  // tslint:disable-next-line: variable-name
  private _url = SERVER_URL + "pages/";
  constructor(private http: HttpClient,
              private router: Router) { 
  }

  currURL(): Observable<string> {
    return this.router.events.pipe( 
      map( (event: RouterEvent) => {
        if (event instanceof NavigationEnd) {
          return event.url;
        }
        return ""; 
      })
    )
  }
  getPageData(page: string): Observable<PageData> {
    if(sessionStorage[CACHE_KEY+page]) {
      let storedData: PageData = JSON.parse(sessionStorage[CACHE_KEY+page]);
      return of(storedData);
    }
    let pages = this.http
      .get<any>(this._url)
      .pipe(
        shareReplay(5),
        map(data => this.convertToPage(data.filter(d => d.slug === page)[0]))
      )
      //.pipe(startWith(JSON.parse(sessionStorage[CACHE_KEY+page] || '[]')));
      pages.subscribe( p => {
        sessionStorage[CACHE_KEY+page] = JSON.stringify(p);
      });
      return pages;
  }
  private convertToPage(page: any): PageData {
    return {
      id: page.id,
      title: page.title.rendered,
      content: page.content.rendered,
      meta_box: page.meta_box
    };
  }
}
