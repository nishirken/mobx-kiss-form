import { computed, makeObservable } from "mobx";
import {
  FormErrorsVisibility,
  FormFieldsErrorsVisility,
} from "../src/ErrorsVisibility/FormErrorsVisibility";
import { CredentialsFormStorage } from "./FormStorage";
import { CredentialsFormValidation } from "./FormValidation";

export class CredentialsFormErrorsVisibility extends FormErrorsVisibility<
  CredentialsFormStorage,
  CredentialsFormValidation
> {
  @computed
  override get fields(): FormFieldsErrorsVisility<CredentialsFormStorage> {
    return {
      email: this.isErrorsVisible && !this.validation.fields.email.isValid,
      password:
        this.isErrorsVisible && !this.validation.fields.password.isValid,
    };
  }
}

