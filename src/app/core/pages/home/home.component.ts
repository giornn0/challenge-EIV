import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UpperCasePipe } from '@angular/common';

export type AppNavigator = {
  text: string;
  iconPath: string;
  route: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, UpperCasePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  navigators: AppNavigator[] = [
    { text: 'Localidad', iconPath: '/icons/map.svg', route: '/localidades' },
    {
      text: 'Vendedor',
      iconPath: '/icons/briefcase-business.svg',
      route: '/vendedores',
    },
  ];
}
