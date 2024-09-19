import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemName } from '../models/itemname';

@Component({
  selector: 'app-itemname',
  templateUrl: './itemname.component.html',
  styleUrl: './itemname.component.css'
})
export class ItemnameComponent implements OnInit {

  itemForm!: FormGroup;
  dialogOutput!: ItemName;
  constructor(
    public dialogRef: MatDialogRef<ItemnameComponent>,
    @Inject(MAT_DIALOG_DATA) public itemName: ItemName
  ) { }

  ngOnInit(): void {    
    this.itemForm = new FormGroup({
      name: new FormControl(this.itemName.name)
    });
  }

  ok(): void {
    this.dialogOutput = {
      name: this.itemForm.value['name']
    }
    this.dialogRef.close(this.dialogOutput);
  }
  cancel(): void {
    var name = '';
    if (this.itemForm.value['name'].length > 0) {
      name = this.itemForm.value['name'];
    }
    this.dialogOutput = {
      name: name
    }
    this.dialogRef.close(this.dialogOutput);
  }
}
