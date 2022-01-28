import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RestService {

   url = "http://localhost:3000/"

  constructor( private http : HttpClient) { }

  dogs_data(){
    return this.http.get<any>(this.url+'dogs_data')
  }

  createCreditCardCharge(data:any){
    const url='http://localhost:3000/donate'
    console.log(data)
    return this.http.post(url, data);
  }
  register(data:any){
    const url='http://localhost:3000/add_user_data'
    // const data={data_image,data_text}
    return this.http.post<any>(url,data)
  }

  village(){
    const url='http://localhost:3000/village'
    return this.http.get<any>(url)
  }

  district(){
    const url='http://localhost:3000/district'
    return this.http.get<any>(url)
  }

  province(){
    const url='http://localhost:3000/province'
    return this.http.get<any>(url)
  }
  data_dog_id(id:any){
    const url='http://localhost:3000/data_dog_id?id='+id
    return this.http.get<any>(url)
  }

}
