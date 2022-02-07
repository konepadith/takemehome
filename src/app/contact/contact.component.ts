import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RestService } from '../shared/rest.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  formmailing:any = FormGroup;
  pageContact=true
  siteKey="6Lf1ml8eAAAAAOajJs_dt2BdNfOhj-Xz2aj_ll27"
  constructor(private service : RestService , private fb:FormBuilder) { }

  ngOnInit(): void {
    this.formmailing = this.fb.group({
      mail_name:        [null,Validators.required],
      mail_surname:     [null,Validators.required],
      mail_email:       [null,Validators.compose([Validators.required,Validators.email])],
      mail_phone:       [null,Validators.compose([Validators.required,Validators.pattern("^[+][0-9]{10,15}$")])],
      mail_call:        [null,Validators.required],
      mail_topic:       [null,Validators.required],
      mail_msg:         [null,Validators.required],
      recaptcha:        [null,Validators.required],
    })
  }

  get f() { return this.formmailing.controls; }
  submit_mailing(){
    if (this.formmailing.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Form',
        text: 'Please Check your Form Contact',
        })
    } else {
      this.service.receive(this.formmailing.value).subscribe(response=>{
        console.log(response)
        if (response.status == 1) {
          Swal.fire({
            icon: 'success',
            title: 'Successfull',
            text: 'We will contact you later',
            })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Please try again',
            })
        }
      })
    }
  }

}
