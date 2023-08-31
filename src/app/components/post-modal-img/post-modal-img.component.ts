import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Image } from '../../models/interface/product.interface';

@Component({
  selector: 'app-post-modal-img',
  templateUrl: './post-modal-img.component.html',
  styleUrls: ['./post-modal-img.component.scss'],
})
export class PostModalImgComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public images: Image[],
    public dialogRef: MatDialogRef<PostModalImgComponent>,
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
