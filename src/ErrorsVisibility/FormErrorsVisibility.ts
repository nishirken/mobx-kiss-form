import { FormStorage } from "../Storage/FormStorage";
import { FormValidation } from "../Validation/FormValidation";
import { action, makeObservable, computed, observable } from "mobx";

export type FormFieldsErrorsVisility<S extends FormStorage> = Record<
  keyof S["fields"],
  boolean
>;

export abstract class FormErrorsVisibility<
  S extends FormStorage,
  V extends FormValidation<S>
> {
  constructor(protected readonly storage: S, protected readonly validation: V) {
    makeObservable(this);
  }

  abstract get fields(): FormFieldsErrorsVisility<S>;

  @observable
  protected _errorsVisible = false;

  @action
  public showErrors = () => {
    this._errorsVisible = true;
  };

  @action
  public hideErrors = () => {
    this._errorsVisible = false;
  };

  @computed
  public get isErrorsVisible(): boolean {
    return this._errorsVisible;
  }
}

