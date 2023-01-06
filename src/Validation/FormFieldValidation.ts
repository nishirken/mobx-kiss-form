import { computed, makeObservable } from "mobx";
import { FormField } from "../FormField/FormField";

export const required = (x: string) => x === "";

export class FormFieldValidation<E extends string | number, T = string> {
  constructor(
    protected readonly value: FormField<T>,
    protected readonly validators: Record<E, (val: T) => boolean>
  ) {
    makeObservable(this);
  }

  @computed
  public get errors(): Record<E, boolean> {
    console.log(this.value);
    const errors: any = {};
    for (const [key, value] of Object.entries(this.validators) as any) {
      errors[key] = value(this.value.value);
    }

    return errors;
  }

  @computed
  public get isValid(): boolean {
    for (const val of Object.values(this.validators) as any) {
      if (val(this.value.value)) {
        return false;
      }
    }
    return true;
  }
}
