import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: "root",
})
export class FormService {
  constructor() {}
  public handelError(form: FormGroup): void {
    Object.keys(form.controls).forEach((key) => {
      const controlErrors = form.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          console.log(
            "Key control: " +
              key +
              ", keyError: " +
              keyError +
              ", error value: ",
            controlErrors[keyError]
          );
        });
      }
    });
  }
}
