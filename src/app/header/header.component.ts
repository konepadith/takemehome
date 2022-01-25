import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() home:any  // Send data from Child to Parent HEADER is Parent ,HOME is child
  @Input() about:any
  @Input() adopt:any
  @Input() donate:any
  @Input() news_event:any
  @Input() contact:any

  constructor() { }

  ngOnInit(): void {
  }

  // Active(page:any){
  //   switch (page) {
  //     case 'home':
  //       this.home = true
  //       this.about = false
  //       this.adopt = false
  //       this.donate = false
  //       this.news_event = false
  //       this.contact = false
  //       break;
  //     case 'about':
  //       this.home = false
  //       this.about = true
  //       this.adopt = false
  //       this.donate = false
  //       this.news_event = false
  //       this.contact = false
  //       break;
  //     case 'adopt':
  //       this.home = false
  //       this.about = false
  //       this.adopt = true
  //       this.donate = false
  //       this.news_event = false
  //       this.contact = false
  //       break;
  //     case 'donate':
  //       this.home = false
  //       this.about = false
  //       this.adopt = false
  //       this.donate = true
  //       this.news_event = false
  //       this.contact = false
  //       break;
  //     case 'news_event':
  //       this.home = false
  //       this.about = false
  //       this.adopt = false
  //       this.donate = false
  //       this.news_event = true
  //       this.contact = false
  //       break;
  //     case 'contact':
  //       this.home = false
  //       this.about = false
  //       this.adopt = false
  //       this.donate = false
  //       this.news_event = false
  //       this.contact = true
  //       break;

  //     default:
  //       break;
  //   }
  // }

}
