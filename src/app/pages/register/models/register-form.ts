import { FormControl } from "@angular/forms";

export interface RegisterForm {
    firstName: FormControl<string | null>;
    lastName: FormControl<string | null>;
    email: FormControl<string | null>;
    phone: FormControl<string | null>;
    password: FormControl<string | null>;
    terms: FormControl<boolean | null>;
  }