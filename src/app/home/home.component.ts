import { Component, OnInit } from '@angular/core';

import { RestService } from '../shared/rest.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

pagehome=true
dogcount:any
adoptcount:any
  constructor(private service:RestService) { }

  ngOnInit(): void {
    this.service.dog_count().subscribe(response=>{
      console.log(response.data)
      this.dogcount=response.data[0]
    })

    this.service.adopt_count().subscribe(response=>{
      console.log(response.data)
      this.adoptcount=response.data[0]
    })


  }


}
