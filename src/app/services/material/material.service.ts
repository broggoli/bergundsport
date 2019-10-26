import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { MaterialData } from "src/app/interfaces/materialData";
import { map } from "rxjs/operators";
import { SERVER_URL } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class MaterialService {
  material: Observable<MaterialData[]>;
  constructor(private http: HttpClient) {}

  url = SERVER_URL + "material";
  getMaterialData(): Observable<MaterialData[]> {
    if (!this.material) {
      this.material = this.http
        .get<any>(this.url)
        .pipe(
          map((mat: any[]) =>
            mat.map((material: any) => this.convertToMaterial(material))
          )
        );
    }
    return this.material;
  }
  private convertToMaterial(mat: any): MaterialData {
    return {
      id: this.convertToNr(mat.id),
      name: mat.title.rendered,
      detail: mat.details,
      day_1: this.convertToNr(mat["1_tag"]),
      day_2: this.convertToNr(mat["2_tage"]),
      day_3_4: this.convertToNr(mat["3-4_tage"]),
      day_5_8: this.convertToNr(mat["5-8_tage"]),
      currency: "CHF"
    };
  }

  private convertToNr(val) {
    return parseInt(val ? val : 0);
  }
}
