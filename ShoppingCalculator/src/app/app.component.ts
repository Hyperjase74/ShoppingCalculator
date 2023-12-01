import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shopping Calculator';

  onNgInit() {
    document.ondblclick = function (e) {
      e.preventDefault();
    }
  }
}
