import { Component, OnInit } from '@angular/core';
import { RestService } from '../../shared/rest.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-adoptdetail',
  templateUrl: './adoptdetail.component.html',
  styleUrls: ['./adoptdetail.component.css']
})
export class AdoptdetailComponent implements OnInit {
  formrequired:any = FormGroup;
  pageAdopt=true
  id:any
  dog_list:any
  user_info:any
  constructor(private service : RestService , private fb:FormBuilder, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {

    this.service.data_dog_id(this.activatedRoute.snapshot.params['id']).subscribe(response=>{
      console.log(response.data)
      this.dog_list=response.data
    })

    this.formrequired = this.fb.group({
      user_id :[JSON.parse(localStorage.getItem("user") || "[]").data[0].user_id,Validators.required],
      dog_id  :[parseInt(this.activatedRoute.snapshot.params['id']),Validators.required],
      q_1     :['2',Validators.required],
      q_2     :['3',Validators.required],
      q_3     :['3',Validators.required],
      q_4     :'',
      q_5     :'3',
      q_6     :'',
      q_7     :['3',Validators.required],
      q_8     :[null,Validators.required],
      q_9     :[null,Validators.required],
      q_10    :[null,Validators.required],
      q_11    :[null,Validators.required],
      q_12    :[null,Validators.required],
      q_13    :[null,Validators.required],
      q_14    :[null,Validators.required],
      q_15    :[null,Validators.required],
      q_16    :[null,Validators.required],
      q_17    :[null,Validators.required],
      q_18    :['2',Validators.required],
      q_19    :[null,Validators.required],
    })

    this.q_5_disable_q_6()
    this.q_1_diable_q_2()
    this. q_3_diable_q_4()
  }
  get f() { return this.formrequired.controls; }

  submit_adopt(){
    if (this.formrequired.invalid) {
      console.log("Form invalid")
    } else {
      this.service.required_adopt(this.formrequired.value).subscribe(response=>{
        console.log(response)
      })
    }
  }
  q_1_diable_q_2(){
    if (this.formrequired.value.q_1==1) {
      this.formrequired.controls['q_2'].enable();
      this.formrequired.value.q_6 = ''
    }else{
      this.formrequired.controls['q_2'].disable();
    }
  }

  q_3_diable_q_4(){
    if (this.formrequired.value.q_3==1) {
      this.formrequired.controls['q_4'].enable();
      this.formrequired.value.q_3 = ''
    }else{
      this.formrequired.controls['q_4'].disable();
    }
  }

  q_5_disable_q_6(){
    if (this.formrequired.value.q_5==1) {
      this.formrequired.controls['q_6'].enable();
      this.formrequired.value.q_6 = ''
    }else{
      this.formrequired.controls['q_6'].disable();
    }
  }




test(){
  console.log(this.formrequired.value)
}
}
