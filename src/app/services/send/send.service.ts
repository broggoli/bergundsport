import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MailData } from "../../interfaces/sendData"

@Injectable({
  providedIn: "root"
})
export class SendService {
  constructor(private http: HttpClient) {}

  sendMail(data : MailData) {
    const API_URL = "/api/php/sendMail.php";
    const formData = new FormData();

    formData.append("firstName", capitalizeFirstLetter(data.firstName));
    formData.append("lastName", capitalizeFirstLetter(data.lastName));
    formData.append("address", data.address);
    formData.append("PLZ", data.PLZ.toString());
    formData.append("place", capitalizeFirstLetter(data.place));
    formData.append("email", data.email);
    formData.append("tel", data.tel.toString());
    formData.append("mobile", data.mobile.toString());
    formData.append("bemerkung", data.bemerkung);
    formData.append("alpenClubMember", data.alpenClubMember.toString());
    formData.append("vegi", data.vegi.toString());
    
    formData.append("eventTitle", data.event.title.toString());
    formData.append("eventId", data.event.id.toString());
    // formData.append("vegan", data.vegan);
    console.log(formData);
    return this.http.post(API_URL, formData);
  }
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}