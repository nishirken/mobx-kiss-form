import { action, observable, makeObservable } from "mobx";

export class FormField<T> {
  @observable
  public value: T;

  public readonly initialValue: T;

  constructor(initialValue: T) {
    this.initialValue = initialValue;
    this.value = initialValue;
    makeObservable(this);
  }

  @action
  onChange = (newValue: T): void => {
    this.value = newValue;
  };

  @action
  reset = (): void => {
    this.value = this.initialValue;
  };
}
