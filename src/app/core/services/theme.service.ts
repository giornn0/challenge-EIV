import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, pairwise, startWith } from 'rxjs';

export enum ThemeOption {
  Dark = 'dark-theme',
  Light = 'light-theme',
}

const themeMapper: { [key in ThemeOption]: ThemeOption } = {
  [ThemeOption.Dark]: ThemeOption.Light,
  [ThemeOption.Light]: ThemeOption.Dark,
};

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  #selectedTheme = new BehaviorSubject(ThemeOption.Dark);

  get $selectedTheme() {
    return this.#selectedTheme.asObservable();
  }
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.$selectedTheme
      .pipe(pairwise(), startWith([ThemeOption.Light, ThemeOption.Dark]))
      .subscribe({
        next: ([prev, curr]) => {
          if (this.document.body.classList.contains(prev)) {
            this.document.body.classList.replace(prev, curr);
          } else {
            this.document.body.classList.add(curr);
          }
        },
      });
  }

  toggleTheme() {
    this.#selectedTheme.next(this.getOpposite());
  }

  getOpposite() {
    return themeMapper[this.#selectedTheme.value];
  }
}
