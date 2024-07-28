import { FormControl } from "@angular/forms";

export interface VerifyForm
{
    otp:FormControl<string | null>;
    isVerified:FormControl<boolean | null>;
}