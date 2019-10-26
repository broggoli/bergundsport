import { Component, Input } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ValidationService } from "../../../../../services/validation/validation.service";

@Component({
  selector: "control-messages",
  template: `
    <div *ngIf="errorMessage !== null">
      {{ errorMessage }}
    </div>
  `
})
// tslint:disable-next-line: component-class-suffix
export class ControlMessages {
  @Input() control: FormControl;
  constructor() {
    console.log(this.control);
  }

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        return ValidationService.getValidatorErrorMessage(
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }

    return null;
  }
}
