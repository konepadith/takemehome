import { Component, OnInit } from '@angular/core';
import { RestService } from '../shared/rest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user_info=JSON.parse(localStorage.getItem("user") || "[]")

  edit=false
  notedit=false

  personal:any=FormGroup

  villageList:any=[]    //set Data for Filter
  districtList:any=[]  //set Data for filter
  provinceList:any=[] //set Data for Filter

  province_data:any=[]  //Represent Data Filtered
  district_data:any=[] //Represent Data Filtered
  village_data:any=[] //Represent Data Filtered

  user_province='' //give default value for Show Selected option default
  user_district=this.user_info.data[0].user_district //give default value for Show Selected option default
  user_village=this.user_info.data[0].user_village //give default value for Show Selected option default

  checkeform=false

  doante_data:any=[]
  form_data:any=[]
  constructor(private service:RestService,private fb:FormBuilder,private spinner : NgxSpinnerService,private router:Router) { }

  ngOnInit(): void {
    this.spinner.show();
    this.personal = this.fb.group({
      user_id:          [this.user_info.data[0].user_id,Validators.required],
      user_name:        [this.user_info.data[0].user_name,Validators.required],
      user_surname:     [this.user_info.data[0].user_surname,Validators.required],
      user_gender:      [this.user_info.data[0].user_gender,Validators.required],
      user_dob:         ['',Validators.required],
      user_village:     [this.user_info.data[0].user_village,Validators.required],
      user_district:    [this.user_info.data[0].user_district,Validators.required],
      user_province:    [this.user_info.data[0].user_province,Validators.required],
      user_workplace:   [this.user_info.data[0].user_workplace,Validators.required],
      user_phoneNumber: [this.user_info.data[0].user_phoneNumber,Validators.compose([Validators.required,Validators.pattern("^[+][0-9]{10,15}$")])],
    })
    this.personal.get('user_dob').patchValue(this.formatDate(this.user_info.data[0].user_dob));

    this.edit=true
    this.service.village().subscribe(response=>{
      this.villageList=response.data
      this.village_data=this.villageList.filter((res: { id_district: string; })=>{
        return res.id_district.toLowerCase().match(this.user_info.data[0].user_district.toLocaleLowerCase())
      })
      this.spinner.hide();
    })

    this.service.district().subscribe(response=>{
      this.districtList=response.data
      this.district_data=this.districtList.filter((res: { id_province: string; })=>{
        return res.id_province.toLowerCase().match(this.user_info.data[0].user_province.toLocaleLowerCase())
      })

    })

    this.service.province().subscribe(response=>{
      this.provinceList=response.data

    })
    this.service.data_donate(this.user_info.data[0].user_id).subscribe(response=>{
      // console.log(response.data)

      this.doante_data=response.data
    })
    this.service.show_form_uid(this.user_info.data[0].user_id).subscribe(response=>{
      console.log(response)

      if (response.status == 0) {
        this.checkeform=true
      }else if (response.status==1) {
        this.checkeform=false
        this.form_data=response.data
      }
    })

    this.personal.disable();
  }

  updateUser(){
    if (this.personal.invalid) {
      console.log("form is empty")
    } else {

    this.service.update_user(this.personal.value).subscribe(response=>{
      if (response.status==0) {
        Swal.fire({
          icon: 'warning',
          title: 'This email is already exits',
          text: 'Please Select other email',
          })
      } else if(response.status==1){
        Swal.fire({
          icon: 'success',
          title: 'Successfully',
          text: 'Sign in again to see changing',
          }).then(()=>{
            this.edit=true
      this.notedit=false
      this.personal.disable();
          })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'something went wrong',
          text: 'Please contact administrator',
          })
      }
    })

    }

  }
  canedit(){
    this.notedit=true
    this.edit=false
    this.personal.enable();
  }
  canotedit(){
    this.edit=true
    this.notedit=false
    this.personal.disable();
  }


  onSelectprovince(province:any){
    let data=this.districtList.filter((res: { id_province: string; })=>{
      return res.id_province.toLowerCase().match(province.target.value.toLocaleLowerCase())
    })
    this.district_data=data
    this.village_data=null
    this.user_district=''
    this.user_village=''
  }

  onSelectdistrict(district:any){
    let data=this.villageList.filter((res: { id_district: string; })=>{
      return res.id_district.toLowerCase().match(district.target.value.toLocaleLowerCase())
    })
    this.village_data=data
    this.user_village=''
  }

routing(id:any){
  this.router.navigate(['adoptdetail',id])
}
private formatDate(date:any) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}
}
