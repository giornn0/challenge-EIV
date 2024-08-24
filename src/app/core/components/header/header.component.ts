import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from 'app/core/services';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [RouterLink],
  providers: [ThemeService],
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  themeService = inject(ThemeService);

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
