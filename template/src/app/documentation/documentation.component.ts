import { MdButton } from '@angular2-material/button';
import { MdToolbar } from '@angular2-material/toolbar';
import { Component, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { SiteInformation, ISiteInformation } from '../site-information';
import { MarkdownComponent } from '../markdown';

@Component({
  moduleId: __filename,
  selector: 'documentation',
  styleUrls: ['documentation.component.css'],
  templateUrl: 'documentation.component.html',
  directives: [
    MdButton,
    MdToolbar,
    MarkdownComponent,
    ...ROUTER_DIRECTIVES
  ],
  providers: [SiteInformation]
})
export class Documentation {

  @Input() section: string;
  private site: any;
  private view: any;
  private documentation: string;

  constructor(private siteInfo: SiteInformation){}

  ngAfterViewInit() {
    this.siteInfo.get().subscribe(
      data => {
        this.site = data;
        this.view = data.views[ this.section ];
      }
    );
  }

}
