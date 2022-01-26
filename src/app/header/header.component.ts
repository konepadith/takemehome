import { Component, OnInit, Input,ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../shared/rest.service';
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
  @ViewChild('closebutton') closebutton: any;
  Registration:any = FormGroup;
  submitted = false;
  email_exist = false
  genderList:[]=[]


  villageList:any=[]    //set Data for Filter
  districtList:any=[]  //set Data for filter
  provinceList:any=[] //set Data for Filter

  province_data:any=[]  //Represent Data Filtered
  district_data:any=[] //Represent Data Filtered
  village_data:any=[] //Represent Data Filtered

  selectFile: any

  user_district='' //give default value for Show Selected option default
  user_village='' //give default value for Show Selected option default

  constructor(private service: RestService , private fb:FormBuilder,private cd: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.Registration = this.fb.group({
      user_name:        [null,Validators.required],
      user_surname:     [null,Validators.required],
      user_gender:      [null,Validators.required],
      user_password:    [null,Validators.compose([Validators.required,Validators.minLength(8)])],
      confirm_password: [null,Validators.compose([Validators.required])],
      image:            [null,Validators.required],
      user_email:       [null,Validators.compose([Validators.required,Validators.email])],
      user_dob:         [null,Validators.required],
      user_village:     [null,Validators.required],
      user_district:    [null,Validators.required],
      user_province:    [null,Validators.required],
      user_workplace:   [null,Validators.required],
      user_phoneNumber: [null,Validators.required],
    },{
      validators:this.MustMatch('user_password','confirm_password') //Corfirm password function
    })

    this.service.village().subscribe(response=>{
      // console.log(response.data)
      this.villageList=response.data
    })

    this.service.district().subscribe(response=>{
      // console.log(response.data)
      this.districtList=response.data
    })

    this.service.province().subscribe(response=>{
      // console.log(response.data)
      this.provinceList=response.data
    })
  }

  get f() { return this.Registration.controls; }

  //CONFIRM PASSWORD
  MustMatch(controlName:string,matchingControlName:string){
    return(Registration:FormGroup)=>{
      const control = Registration.controls[controlName]
      const matchingControl = Registration.controls[matchingControlName]
      if (matchingControl.errors && !matchingControl.errors['MustMatch']) {
        return
      }if (control.value !==matchingControl.value) {
        matchingControl.setErrors({MustMatch:true})
      }else{
        matchingControl.setErrors(null)
      }
    }
  }

  //I don't know But it works with Upload Image and text to API together
onFIleSelect(event:any, field:any) {
  if (event.target.files && event.target.files.length) {
    const [file] = event.target.files;
    // just checking if it is an image, ignore if you want
    if (!file.type.startsWith('image')) {
      this.Registration.get(field).setErrors({
        required: true
      });
      this.cd.markForCheck();
    } else {
      // unlike most tutorials, i am using the actual Blob/file object instead of the data-url
      this.Registration.patchValue({
        [field]: file
      });
      // need to run CD since file load runs outside of zone
      this.cd.markForCheck();
    }
  }}
  submit_registration(){

    if (this.Registration.invalid) {
      this.submitted = true;
      console.log("Valid form",this.submitted)
    } else {
      const data= new FormData(); //Create Data Store by FormData()
      Object.entries(this.Registration.value).forEach(([key,value]:any[])=>{
      data.set(key,value)
    })
    this.service.register(data).subscribe(response=>{
          console.log(response)
          if (response.status ==0 ) {
            this.email_exist=true
          }else if (response.error == true) {
            alert("Something went Wrong")
          }
          else {
            this.closebutton.nativeElement.click();
          }

        })
    }

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

}
