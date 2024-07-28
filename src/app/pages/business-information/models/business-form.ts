import { FormControl } from "@angular/forms";

export interface BusinessForm {
    businessType: FormControl<string | null>;
    businessType2: FormControl<string | null>;
    governorate: FormControl<string | null>;
    district: FormControl<string | null>;
    social: FormControl<string | null>;
    useSystem: FormControl<string | null>;
  }