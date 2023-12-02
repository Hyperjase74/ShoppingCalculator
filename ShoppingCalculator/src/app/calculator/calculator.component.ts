import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

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
    // 390 on iPhone
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
      this.createDigits(this.total);
    }
  }
  delete(): void {
    if (this.total.length >= 0) {
      this.total = this.total.substring(0, this.total.length - 1);
      this.createDigits(this.total);
    }
  }
  addAmount(): void {
    if (this.total.length > 0) {
      this.totalAmount = parseFloat(this.total) / 100;
      this.listOfValues.push({ index: this.listOfValues.length, amount: this.totalAmount, descr: '' });
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
  createDigits(value: string) {
    let exploded = value.split('');
    if (exploded.length == 0) {
      this.digit1 = "";
      this.digit2 = "";
      this.digit3 = "";
      this.digit4 = "";
      this.digit5 = "";
    }
    for (var i = 0; i < exploded.length; i++) {      
      if (exploded.length == 1) {
        this.digit1 = exploded[0];
        this.digit2 = "";
        this.digit3 = "";
        this.digit4 = "";
        this.digit5 = "";
      }
      if (exploded.length == 2) {
        this.digit1 = exploded[1];
        this.digit2 = exploded[0];
        this.digit3 = "";
        this.digit4 = "";
        this.digit5 = "";
      }
      if (exploded.length == 3) {
        this.digit1 = exploded[2];
        this.digit2 = exploded[1];
        this.digit3 = exploded[0];
        this.digit4 = "";
        this.digit5 = "";
      }
      if (exploded.length == 4) {
        this.digit1 = exploded[3];
        this.digit2 = exploded[2];
        this.digit3 = exploded[1];
        this.digit4 = exploded[0];
        this.digit5 = "";
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
  addDescr(item: number): void {
    console.log(item);
    let descr = prompt('Please enter a description');
    if (descr?.length != null) {
      this.listOfValues[item].descr = descr;
      localStorage.removeItem('values');
      localStorage.setItem('values', JSON.stringify(this.listOfValues));
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

  percCalc(index: number): void {
    let perc = prompt("Please enter percentage (ie 30)");    
    if (perc?.length != null) {
      let value = this.listOfValues[index].amount;
      this.sumTotal -= value;
      let percentage = parseFloat(perc) / 100;
      let calcValue = (percentage / 100) * value * 100;
      let percValue = Math.floor(calcValue * 100) / 100;
      let output = Math.floor((value - percValue) * 100) / 100;
      alert(`Validation:\n${perc}% of £${value} = £${percValue}\nDiscounted price = £${output.toFixed(2)}\nImportant! Rounding may cause 1p +/- discrepancy`);
      this.listOfValues[index].amount = output;
      this.sumTotal += output;
      this.buildList();
    }    
  }

  buildList(): void {
    let newArray: TotalAmounts[] = [];
    for (var i = 0; i < this.listOfValues.length; i++) {
      newArray.push({ index: i, amount: this.listOfValues[i].amount, descr: this.listOfValues[i].descr });
    }
    this.listOfValues = newArray;
    localStorage.setItem('values', JSON.stringify(this.listOfValues));
    this.calcBudget();
  }

  remove(item: TotalAmounts) {
    let itemDescr = item.descr;
    let message = (itemDescr != '') ? `Do you want to remove ${itemDescr}?` : 'Do you want to remove this item?';
    if (confirm(message)) {
      this.listOfValues = this.listOfValues.filter(x => x.index != item.index);
      this.sumTotal -= item.amount;
      this.buildList();
    }
  }
}
interface TotalAmounts {
  index: number;
  amount: number;
  descr: string;
}
