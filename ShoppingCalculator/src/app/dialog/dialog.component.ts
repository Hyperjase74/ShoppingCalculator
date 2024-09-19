import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../models/dialogdata';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  budget: number = 0.00;
  budgetForm!: FormGroup;
  dialogData!: DialogData;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>
  ) { }

  ngOnInit(): void {
    var budget = localStorage.getItem('budget');
    if (budget != undefined && budget != null) {
      this.budget = parseFloat(budget);      
    }
    this.budgetForm = new FormGroup({
      value: new FormControl(this.budget, [
        Validators.pattern('([0-9]{1,}.[0=9]{2})')
      ])
    })
  }
  ok(): void {
    this.dialogData = {
      budget: this.budgetForm.value['value']
    }
    this.dialogRef.close(this.dialogData);
  }
  remove(): void {
    this.dialogData = {
      budget: 0.00
    }
    this.dialogRef.close(this.dialogData);
  }
  cancel(): void {
    var budget = 0.00;
    if (this.budgetForm.value['value'] > 0) {
      budget = this.budgetForm.value['value'];
    }
    this.dialogData = {
      budget: budget
    }
    this.dialogRef.close(this.dialogData);
  }

}
