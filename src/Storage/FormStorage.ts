import { FormField } from "../FormField/FormField";

export interface FormStorage {
  fields: Record<string, FormField<any>>;
}

