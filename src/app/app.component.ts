import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, FooterComponent, ThemeService } from '@core';
import { MessageComponent, SpinnerComponent } from '@shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MessageComponent,
    SpinnerComponent,
  ],
  providers: [ThemeService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  themeSelected = inject(ThemeService).$selectedTheme;
}
