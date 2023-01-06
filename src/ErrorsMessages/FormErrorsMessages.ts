import { FormStorage } from "../Storage/FormStorage";
import { FormValidation } from "../Validation/FormValidation";

export type FormFieldsErrorsMessages<S extends FormStorage> = Partial<Record<keyof S['fields'], string>>;

export abstract class FormErrorsMessages<S extends FormStorage, V extends FormValidation<S>> {
    constructor(protected readonly storage: S, protected readonly validation: V) {}

    abstract get fields(): FormFieldsErrorsMessages<S>;
}