import { observable } from "mobx";
import {
  FormFieldValidation,
  required,
} from "../src/Validation/FormFieldValidation";
import { FormValidation } from "../src/Validation/FormValidation";
import { CredentialsFormStorage } from "./FormStorage";

export const minEmailLen = 4;
export const maxEmailLen = 20;
export const minPasswordLen = 4;
export const maxPasswordLen = 200;

export class CredentialsFormValidation extends FormValidation<CredentialsFormStorage> {
  @observable
  public readonly fields = {
    email: new FormFieldValidation(this.storage.fields.email, {
      required,
      tooLong: (x: string) => x.length > maxEmailLen,
      tooShort: (x: string) => x.length < minEmailLen,
      invalidChars: (x: string) => !x.includes("@"),
    }),
    password: new FormFieldValidation(this.storage.fields.password, {
      required,
      tooLong: (x: string) => x.length > maxEmailLen,
      tooShort: (x: string) => x.length < minEmailLen,
      notEnoughSpecChars: (x: string) => !/([\!\@\_])/.test(x),
    }),
  };
}

