import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      required: "Muss angegeben werden.",
      invalidEmailAddress: "Ungültige E-Mail Addresse",
      invalidTelNr: "Ungültiges Format."
    };

    return config[validatorName];
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (
      control.value.match(
        // tslint:disable-next-line: max-line-length
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }
  static telValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/^(\+?\d{2}\s?|0)\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/) || control.value === "") {
      return null;
    } else {
      return { invalidTelNr: true };
    }
  }
}
