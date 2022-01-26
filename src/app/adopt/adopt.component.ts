import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestService } from '../shared/rest.service';
@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.component.html',
  styleUrls: ['./adopt.component.css']
})
export class AdoptComponent implements OnInit {

  pageAdopt=true

   agecompare :any

  dogList:any=[]
  dog_data:any=[]

  dog_age=0
  dog_gender=''
  dog_name=''
  constructor(private service : RestService, private fb:FormBuilder) { }

  ngOnInit(): void {



    this.service.dogs_data().subscribe(response=>{
      console.log(response.data)
      this.dogList = response.data
      this.dog_data=response.data
    })
  }


  searcher(){
    console.log(this.dog_age)
    if (this.dog_age == -1) {
      let data=this.dogList.filter((res: { dog_name: string;dog_gender:number;age:number })=>{
        return res.dog_name.toLowerCase().match(this.dog_name.toLocaleLowerCase())
              && res.dog_gender.toString().match(this.dog_gender.toLocaleLowerCase())
              })
              this.dog_data=data
    } else if (this.dog_age >= 0 && this.dog_age <= 1 ) {
       this.agecompare = 0
       console.log(this.agecompare)
       let data=this.dogList.filter((res: { dog_name: string;dog_gender:number;age:number })=>{
        return res.dog_name.toLowerCase().match(this.dog_name.toLocaleLowerCase())
              && res.dog_gender.toString().match(this.dog_gender.toLocaleLowerCase())
              && res.age >= this.agecompare && res.age <= this.dog_age
              })
              this.dog_data=data
    } else if (this.dog_age >= 2 && this.dog_age <= 5 ) {
      this.agecompare = 2
      console.log(this.agecompare)
      let data=this.dogList.filter((res: { dog_name: string;dog_gender:number;age:number })=>{
        return res.dog_name.toLowerCase().match(this.dog_name.toLocaleLowerCase())
              && res.dog_gender.toString().match(this.dog_gender.toLocaleLowerCase())
              && res.age > this.agecompare && res.age <= this.dog_age
      })
    this.dog_data=data
    }else if(this.dog_age >= 6 && this.dog_age <= 9){
      this.agecompare = 6
      console.log(this.agecompare)
      let data=this.dogList.filter((res: { dog_name: string;dog_gender:number;age:number })=>{
        return res.dog_name.toLowerCase().match(this.dog_name.toLocaleLowerCase())
              && res.dog_gender.toString().match(this.dog_gender.toLocaleLowerCase())
              && res.age >= this.agecompare && res.age <= this.dog_age
      })
    this.dog_data=data
    }else if(this.dog_age >= 10){
      this.agecompare = 10
      console.log(this.agecompare)
      let data=this.dogList.filter((res: { dog_name: string;dog_gender:number;age:number })=>{
        return res.dog_name.toLowerCase().match(this.dog_name.toLocaleLowerCase())
              && res.dog_gender.toString().match(this.dog_gender.toLocaleLowerCase())
              && res.age >= this.agecompare && res.age <= this.dog_age
      })
    this.dog_data=data
    }



  }

}
