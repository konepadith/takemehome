import { Component, OnInit } from '@angular/core';
import { RestService } from '../shared/rest.service';

@Component({
  selector: 'app-newsevent',
  templateUrl: './newsevent.component.html',
  styleUrls: ['./newsevent.component.css']
})
export class NewseventComponent implements OnInit {

  pageNewsevent=true
  eventsList:any=[]
  checkevent=false
  constructor(private service : RestService) { }

  ngOnInit(): void {
  this.service.events_data().subscribe(response=>{
    console.log(response.data.length)
    if (response.data.length<=0) {
      this.checkevent=true
    } else {
      this.eventsList=response.data
    }

  })
  }

}
