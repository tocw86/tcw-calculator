import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor() {}

  public dispatchBlur(el: ElementRef): void {
    if (el && el.nativeElement) {
      const inputEl: HTMLElement = el.nativeElement;
      inputEl.dispatchEvent(new Event('blur'));
    }
  }
}
