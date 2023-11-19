import { Component } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  listOfValues: TotalAmounts[] = [];

  digit5 = '';
  digit4 = '';
  digit3 = '';
  digit2 = '';
  digit1 = '';
  total = '';
  totalAmount = 0.00;
  sumTotal = 0.00;
  budget = 0.00;
  displayBudget = false;

  ngOnInit() {
    var retrievedObject = localStorage.getItem('values');
    if (retrievedObject != null) {
      this.listOfValues = [];
      let eachObj = JSON.parse(retrievedObject);
      for (var i = 0; i < eachObj.length; i++) {
        this.listOfValues.push(eachObj[i]);
        this.sumTotal += eachObj[i].amount;
      }       
    }
    this.calcBudget();
  }

  add(number: string) {    
    if (this.total.length <= 4) {
      console.clear();
      if (this.total == '') {
        this.total = number;
      } else {
        this.total = `${this.total}${number}`;
      }
      let exploded = this.total.split('');
      for (var i = 0; i < exploded.length; i++) {
        if (exploded.length == 1) {
          this.digit1 = exploded[0];
        }
        if (exploded.length == 2) {
          this.digit1 = exploded[1];
          this.digit2 = exploded[0];
        }
        if (exploded.length == 3) {
          this.digit1 = exploded[2];
          this.digit2 = exploded[1];
          this.digit3 = exploded[0];
        }
        if (exploded.length == 4) {
          this.digit1 = exploded[3];
          this.digit2 = exploded[2];
          this.digit3 = exploded[1];
          this.digit4 = exploded[0];
        }
        if (exploded.length == 5) {
          this.digit1 = exploded[4];
          this.digit2 = exploded[3];
          this.digit3 = exploded[2];
          this.digit4 = exploded[1];
          this.digit5 = exploded[0];
        }
      }
    }
  }
  addAmount() {
    if (this.total.length > 0) {
      this.totalAmount = parseFloat(this.total) / 100;
      this.listOfValues.push({ index: this.listOfValues.length, amount: this.totalAmount });
      localStorage.setItem('values', JSON.stringify(this.listOfValues));
      this.sumTotal += this.totalAmount;
      this.resetDigits();      
      let msgbox = document.querySelector('.list');
      if (msgbox) {
        console.log(msgbox.scrollTop, msgbox.scrollHeight);
        msgbox.scrollTop = msgbox.scrollHeight;
      }
    }
  }
  resetDigits(): void {
    this.digit5 = '';
    this.digit4 = '';
    this.digit3 = '';
    this.digit2 = '';
    this.digit1 = '';
    this.totalAmount = 0.00;
    this.total = '';
    this.calcBudget();
  }

  clearAll(): void {
    if (this.listOfValues.length > 0) {
      if (confirm('Are you sure?')) {
        localStorage.removeItem('values');
        this.listOfValues = [];
        this.resetDigits();
        this.sumTotal = 0.00;
        this.calcBudget();
      }
    }
  }

  calcBudget(): void {
    let budget = localStorage.getItem('budget');
    if (budget != null) {
      this.budget = parseFloat(budget) - this.sumTotal;
      this.displayBudget = true;
    }
  }

  addBudget(): void {
    let budget = prompt('Please enter your budget');
    if (budget?.length != null) {
      if (parseFloat(budget) > 0.00) {
        localStorage.setItem('budget', budget);
        this.displayBudget = true;
        this.calcBudget();
      } else {
        this.displayBudget = false;
        localStorage.removeItem('budget');
      }
    }
  }

  remove(item: TotalAmounts) {
    if (confirm('Are you sure?')) {
      this.listOfValues = this.listOfValues.filter(x => x.index != item.index);
      this.sumTotal -= item.amount;
      let newArray: TotalAmounts[] = [];
      for (var i = 0; i < this.listOfValues.length; i++) {
        newArray.push({ index: i, amount: this.listOfValues[i].amount });
      }
      this.listOfValues = newArray;
      localStorage.setItem('values', JSON.stringify(this.listOfValues));
      this.calcBudget();
    }
  }
}
interface TotalAmounts {
  index: number;
  amount: number;
}
