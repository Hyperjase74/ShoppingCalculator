import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemName } from '../models/itemname';
import { ConfirmAction, ConfirmData } from '../models/confirmdata';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent implements OnInit {
  confirm!: FormGroup;
  confirmAction!: ConfirmAction;
  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public confirmData: ConfirmData
  ) { }

  ngOnInit(): void {
    console.log(this.confirmData)
    this.confirm = new FormGroup({

    })
  }

  yes(): void {
    this.action(true);
  }
  no(): void {
    this.action(false);
  }
  action(action: boolean) {
    this.confirmAction = {
      action: action
    }
    this.dialogRef.close(this.confirmAction);
  }
}
