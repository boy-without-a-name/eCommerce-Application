import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITransfer } from '../../models/interface/product.interface';

@Component({
  selector: 'app-post-modal-img',
  templateUrl: './post-modal-img.component.html',
  styleUrls: ['./post-modal-img.component.scss'],
})
export class PostModalImgComponent implements OnInit {
  loading = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public transfer: ITransfer,
    public dialogRef: MatDialogRef<PostModalImgComponent>,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = true;
    }, 1500);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
