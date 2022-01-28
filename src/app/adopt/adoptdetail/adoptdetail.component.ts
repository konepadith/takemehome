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
  constructor(private service : RestService , private fb:FormBuilder, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {

    this.service.data_dog_id(this.activatedRoute.snapshot.params['id']).subscribe(response=>{
      console.log(response.data)
      this.dog_list=response.data
    })

    this.formrequired = this.fb.group({
      user_id :[null,Validators.required],
      dog_id  :[this.activatedRoute.snapshot.params['id'],Validators.required],
      q_1     :[null,Validators.required],
      q_2     :'',
      q_3     :'',
      q_4     :'',
      q_5     :'',
      q_6     :'',
      q_7     :[null,Validators.required],
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
      q_18    :[null,Validators.required],
      q_19    :[null,Validators.required],
    })


    console.log(this.formrequired.value)

  }
  get f() { return this.formrequired.controls; }

}
