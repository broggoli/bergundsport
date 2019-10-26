import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class SendService {
  constructor(private http: HttpClient) {}

  sendMail(data) {
    const API_URL = "/api/php/sendMail.php";
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("address", data.address);
    formData.append("plz", data.PLZ);
    formData.append("ort", data.place);
    formData.append("email", data.email);
    formData.append("phone", data.tel);
    formData.append("mobile", data.mobile);
    formData.append("anmerkung", data.bemerkung);
    formData.append("mitgliedAlpenclub", data.mitgliedAlpenclub);
    formData.append("vegi", data.vegi);
    // formData.append("vegan", data.vegan);

    return this.http.post(API_URL, formData);
    // return this.http.post<myData>("/api/php/uploadTicket.php", formData);
  }
}
