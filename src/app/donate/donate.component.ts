import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../shared/rest.service';
import Swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  pageDonate=true
  OmiseCard:any = null;
  // email:any=JSON.parse(localStorage.getItem("user") || "[]").data[0].user_email
  // name:any=JSON.parse(localStorage.getItem("user") || "[]").data[0].user_name
  cart={
    user_id:'',
    email:'',
    name:'',
    amount:0,
    token:''
  }
  customedonate:any
  constructor(private service:RestService , private router : Router, private spinner : NgxSpinnerService) { }

  ngOnInit() {
    this.invokeOmise()
  }



  invokeOmise(){
    const script=window.document.createElement("script");
    script.type="text/javascript";
    script.src="https://cdn.omise.co/omise.js";
    script.onload=()=>{
      this.OmiseCard=(<any>window).OmiseCard
      this.OmiseCard.configure({
        publicKey: 'pkey_test_5qi21f51nhvekd18gs9',
        currency: 'thb',
        frameLabel : 'give me home',
        frameDescription: 'Donate'
      });

    }
    window.document.body.appendChild(script);
  }

  creditCardConfigure= ()=>{
    this.OmiseCard.configure({
      defaultPaymentMethod:'credit_card',
      otherPaymentMethods:[]
    });
    this.OmiseCard.configureButton('#credit-card');
    this.OmiseCard.attach();
  }

  omisecardHandler = ()=>{
    this.OmiseCard.open({
      frameDescription:'Invoice #3847',
      amount: this.cart.amount,
      onCreateTokenSuccess: (nonce: any) => {

      this.cart.token=nonce
      this.spinner.show();
      this.service.createCreditCardCharge(this.cart).subscribe(response=>{
        // console.log(response.status)
        this.spinner.hide();
        if (response.status ==0 && response.error==true) {
          Swal.fire({
            icon: 'error',
            title: 'Transaction error',
            text: 'try again',
            })
        }else if(response.status ==1 && response.error==false){
          Swal.fire({
            icon: 'success',
            title: 'Thank you',
            text: 'You give a life',
            })
        }
      })

      },
      onFormClosed: () => {
        /* Handler on form closure. */
        window.location.reload()

      },
    })
  }

  handleclick =  (e:any,amount:number) => {

    if (!localStorage.getItem("user")) {
      Swal.fire({
        icon: 'warning',
        title: 'Please Log in',
        text: 'Log in Before donating',
        })
    } else {
      if (amount < 20) {
        Swal.fire({
          icon: 'warning',
          title: 'not enough Amount',
          text: 'Amount must more than 20 Baht',
          })
      } else {

        e.preventDefault();
      console.log(amount)
      console.log(this.customedonate)
      this.cart.amount=amount*100
      this.cart.email=JSON.parse(localStorage.getItem("user") || "[]").data[0].user_email
      this.cart.name=JSON.parse(localStorage.getItem("user") || "[]").data[0].user_name
      this.cart.user_id=JSON.parse(localStorage.getItem("user") || "[]").data[0].user_id
      this.creditCardConfigure()
      this.omisecardHandler()
      }
    }



}
}
