import {
  Component, Renderer, ElementRef,
  Input, ViewChild, ViewEncapsulation
} from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as showdown from 'showdown';

@Component({
  moduleId: __filename,
  selector: 'ngu-markdown,[ngu-markdown]',
  template: '<div [innerHTML]="content"></div>',
  host: {
    'class': 'flex column content'
  },
  encapsulation: ViewEncapsulation.None
})
export class MarkdownComponent {

  @Input('src') src: string;
  @ViewChild('div') div;

  private md: any;
  private content: string = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer,
    private http: Http
  ){
    this.md = new (<any>showdown).Converter();
  }

  ngOnInit() {
    //this.src = records.src.currentValue || '';

    if(this.src) {
      this.load();
    }
  }

  ngOnChanges(records) {

  }

  load() {
    let headers = new Headers();
    headers.append('Content-Type', 'text/markdown');
    this.http.get(this.src, { headers })
    .map( res => res.text() )
    .subscribe(
      text => {
        this.content = this.md.makeHtml( text );
      }
    );
  }

}
