import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { SiteInformation, ISiteInformation } from './site-information';

@Component({
  moduleId: __filename,
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    ...ROUTER_DIRECTIVES,
  ],
  providers: [SiteInformation]
})
export class App {}
