import { computed, makeObservable } from "mobx";
import {
  FormErrorsMessages,
  FormFieldsErrorsMessages,
} from "../src/ErrorsMessages/FormErrorsMessages";
import { CredentialsFormStorage } from "./FormStorage";
import {
  CredentialsFormValidation,
  maxEmailLen,
  maxPasswordLen,
  minEmailLen,
  minPasswordLen,
} from "./FormValidation";

export class CredentialsFormErrorsMessages extends FormErrorsMessages<
  CredentialsFormStorage,
  CredentialsFormValidation
> {
  constructor(
    storage: CredentialsFormStorage,
    validation: CredentialsFormValidation
  ) {
    super(storage, validation);
    makeObservable(this);
  }

  @computed
  override get fields(): FormFieldsErrorsMessages<CredentialsFormStorage> {
    return {
      email: this.emailMessage,
      password: this.passwordMessage,
    };
  }

  @computed
  private get emailMessage(): string {
    const { email } = this.validation.fields;

    if (email.errors.required) {
      return "Email is required";
    } else if (email.errors.tooShort) {
      return `Email can\'t be shorter than ${minEmailLen}`;
    } else if (email.errors.tooLong) {
      return `Email can\'t be longer than ${maxEmailLen}`;
    } else if (email.errors.invalidChars) {
      return "Email contains invalid chars";
    } else {
      return "";
    }
  }

  @computed
  private get passwordMessage(): string {
    const { password } = this.validation.fields;

    switch (true) {
      case password.errors.required:
        return "Password is required";
      case password.errors.tooShort:
        return `Password can\'t be shorter than ${minPasswordLen}`;
      case password.errors.tooLong:
        return `Password can\'t be longer than ${maxPasswordLen}`;
      case password.errors.notEnoughSpecChars:
        return "Password must contain at least one spec char";
      default:
        return "";
    }
  }
}

