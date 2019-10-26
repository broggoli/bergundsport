import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      required: "Muss angegeben werden.",
      invalidEmailAddress: "Ungültige E-Mail Addresse",
      invalidTelNr: "Ungültige Telefonnummer."
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
    if (control.value.match(/^(\+\d{2,4})?\s?(\d{10})$/)) {
      return null;
    } else {
      return { invalidTelNr: true };
    }
  }
}
