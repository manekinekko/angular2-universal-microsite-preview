import { RouterConfig } from '@angular/router';
import { Documentation } from './documentation/documentation.component';

export const routes: RouterConfig = [
  { path: 'd/:documentation', component: Documentation },
  { path: '', redirectTo: '/d/'}
];
