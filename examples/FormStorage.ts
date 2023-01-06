import { FormField } from "../src/FormField/FormField";
import { FormStorage } from "../src/Storage/FormStorage";

export class CredentialsFormStorage implements FormStorage {
  public readonly fields = {
    email: new FormField(""),
    password: new FormField(""),
  };
}

