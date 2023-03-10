import { CurrencyPipe } from '@angular/common';
import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[currencyFormatter]',
  standalone: true,
  providers: [CurrencyPipe],
})
export class CurrencyFormatterDirective implements OnInit {
  private el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private currencyPipe: CurrencyPipe
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.autoFormat();
  }

  private stripAllNonNumeric(value: string): number {
    return Number(value.replace(/\D/g, ''));
  }

  private autoFormat() {
    const value = this.el.value;
    const inOnlyNumbers = /^[0-9]+$/.test(value);
    let newValue = value;
    if (inOnlyNumbers) {
      newValue = this.currencyPipe.transform(
        Number(value),
        'EUR',
        'symbol',
        '1.2-2',
        'en-IE'
      );
    } else {
      const numericValue = this.stripAllNonNumeric(value);
      newValue = this.currencyPipe.transform(
        Number(numericValue / 100),
        'EUR',
        'symbol',
        '1.2-2',
        'en-IE'
      );
    }
    this.el.value = newValue;
  }

  @HostListener('focus', ['$event.target.value'])
  @HostListener('blur', ['$event.target.value'])
  onFocus() {
    this.autoFormat();
  }
}
