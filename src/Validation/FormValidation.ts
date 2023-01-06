import { computed } from "mobx";
import { FormFieldValidation } from "./FormFieldValidation";
import { FormStorage } from "../Storage/FormStorage";

export type FormFieldsValidation<S extends FormStorage> = Record<keyof S['fields'], FormFieldValidation<any>>;

export abstract class FormValidation<S extends FormStorage> {
  constructor(protected readonly storage: S) {}

  abstract fields: FormFieldsValidation<S>;

  @computed
  public get isValid(): boolean {
    return Object.values(this.fields).every((f) => f.isValid);
  }
}
