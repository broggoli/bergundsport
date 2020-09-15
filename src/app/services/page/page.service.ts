import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PageData } from "../../interfaces/pageData";
import { Observable, of, from } from "rxjs";
import { map, shareReplay, startWith, share, tap, filter, takeLast, concatMap } from "rxjs/operators";
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
          url: "/home"
        },
        {
          title: "Programm",
          url: "/programm"
        },
        {
          title: "Kontakt",
          url: "/kontakt"
        },
        {
          title: "Wissenswertes",
          url: "wissenswertes",
          subPages:  
          [
            {
              title: "Bergführer-Tarife",
              url: "/wissenswertes/bergfuehrerTarife"
            },
            {
              title : "Links",
              url: "/wissenswertes/links"
            }

          ]
        }
      ];
  }
  private _url = SERVER_URL + "pages/";
  private pages: Observable<PageData> ;
  constructor(private http: HttpClient,
              private router: Router) { 
    this.pages = this.http
      .get<any>(this._url)
      .pipe(
        share(),
        shareReplay(1),
        concatMap(data => from(data)),
        map(data => this.convertToPage(data)),
        tap((data: PageData) => sessionStorage[CACHE_KEY+data.slug] = JSON.stringify(data))
      );
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
    return this.pages.pipe(
      filter(d => d.slug === page),
      takeLast(1)
    );
  }
  private convertToPage(page: any): PageData {
    return {
      id: page.id,
      slug: page.slug,
      title: page.title.rendered,
      content: page.content.rendered,
    };
  }
}
