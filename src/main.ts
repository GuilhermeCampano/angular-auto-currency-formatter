import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { CurrencyFormatterDirective } from './directive';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, CurrencyFormatterDirective],
  template: `
    <input type="text" currencyFormatter value=100 />
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
