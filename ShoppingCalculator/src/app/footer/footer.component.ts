import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  year!: string;

  ngOnInit(): void {
    this.year = new Date().getFullYear().toString();
  }
}
