import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RestService {

   url = "http://localhost:3000"

  constructor( private http : HttpClient) { }

  dogs_data(){
    return this.http.get<any>(this.url+'/dogs_data')
  }

  createCreditCardCharge(data:any){
    const url=this.url+'/donate'
    // console.log(data)
    return this.http.post<any>(url, data);
  }
  register(data:any){
    const url=this.url+'/add_user_data'
    // const data={data_image,data_text}
    return this.http.post<any>(url,data)
  }
  login(data:any){
    const url =this.url+'/login'
    return this.http.post<any>(url,data)
  }

  village(){
    const url=this.url+'/village'
    return this.http.get<any>(url)
  }

  district(){
    const url=this.url+'/district'
    return this.http.get<any>(url)
  }

  province(){
    const url=this.url+'/province'
    return this.http.get<any>(url)
  }
  data_dog_id(id:any){
    const url=this.url+'/data_dog_id?id='+id
    return this.http.get<any>(url)
  }
  required_adopt(data:any){
    const url=this.url+'/required'
    return this.http.post<any>(url,data)
  }
  receive(data:any){
    const url=this.url+'/receive'
    return this.http.post<any>(url,data)
  }
  events_data(){
    const url=this.url+'/events_data'
    return this.http.get<any>(url)
  }
  update_user(data:any){
    const url=this.url+'/update_user'
    return this.http.post<any>(url,data)
  }
  data_donate(id:any){
    const url=this.url+'/data_donate?id='+id
    return this.http.get<any>(url)
  }
  show_form_uid(id:any){
    const url=this.url+'/show_form_uid?id='+id
    return this.http.get<any>(url)
  }

}
