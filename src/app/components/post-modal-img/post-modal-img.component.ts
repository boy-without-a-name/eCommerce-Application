import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITransfer } from '../../models/interface/product.interface';

@Component({
  selector: 'app-post-modal-img',
  templateUrl: './post-modal-img.component.html',
  styleUrls: ['./post-modal-img.component.scss'],
})
export class PostModalImgComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public transfer: ITransfer,
    public dialogRef: MatDialogRef<PostModalImgComponent>,
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
