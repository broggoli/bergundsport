import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PageData } from "../../interfaces/pageData";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SERVER_URL } from "../../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class PageService {
  // tslint:disable-next-line: variable-name
  private _url = SERVER_URL + "pages/";
  constructor(private http: HttpClient) {}

  getPageData(page: string): Observable<PageData> {
    return this.http
      .get<any>(this._url)
      .pipe(
        map(data => this.convertToPage(data.filter(d => d.slug === page)[0]))
      );
  }
  /*
  getMaterialData(): Observable<MaterialData[]> {
    return this.getPageData("material")
      .pipe(map(data => data.meta_box))
      .pipe(map(meta_box => meta_box.material))
      .pipe(
        map((materials: any[]) =>
          materials.map((mat: any) => this.convertToMaterial(mat))
        )
      );
  }*/
  private convertToPage(page: any): PageData {
    return {
      id: page.id,
      title: page.title,
      content: page.content.rendered,
      meta_box: page.meta_box
    };
  }
  /*
  private (mat: any): MaterialData {
    return {convertToMaterial
      name: mat.materialname,
      detail: mat.materialdetail,
      day_1: this.convertToNr(mat["1_tag_koste"]),
      day_2: this.convertToNr(mat["2_tag_koste"]),
      day_3_4: this.convertToNr(mat["3-4_tag_koste"]),
      day_5_8: this.convertToNr(mat["5-8_tag_koste"]),
      currency: mat.currency
    };
  }*/
  private convertToNr(val) {
    // tslint:disable-next-line: radix
    return parseInt(val ? val : 0);
  }
}
