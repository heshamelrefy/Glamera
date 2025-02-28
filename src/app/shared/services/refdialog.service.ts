import { Injectable } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root'
})
export class RefdialogService {

  private dialogRef: DynamicDialogRef | null = null;

  setDialogRef(ref: DynamicDialogRef) {
    this.dialogRef = ref;
  }

  closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
