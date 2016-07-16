import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export interface ISiteInformation {
  title: string;
  routes?: Array<{
    href: string;
    text: string;
  }>;
  links: {
    github: string;
  };
  hero: {
    logo: {
      src: string;
      alt: string;
    },
    title: string;
    description: string;
  };
  views: any;
}

@Injectable()
export class SiteInformation {

  constructor(private http: Http){}

  get() {
    return this.http.get('/nguconfig.json')
      .map( res => {
        let response = res.json();
        if(typeof response === 'string') {

          // @todo(WCH): res.json() returns a string when run by Universal
          // it should returns a JSON object instead.
          return JSON.parse(response);
        }
        return <ISiteInformation>res.json();
      });
  }
}
