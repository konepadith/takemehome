import { Component, OnInit } from '@angular/core';
import { RestService } from '../shared/rest.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  pageDonate=true
  OmiseCard:any = null;
  cart={
    email:'guest@test.com',
    name:'Guest',
    amount:0,
    token:''
  }
  constructor(private service:RestService) { }

  ngOnInit(): void {
    this.invokeOmise();
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
      this.service.createCreditCardCharge(this.cart).subscribe(response=>{
        console.log(response)
        window.location.reload()
      })

      },
      onFormClosed: () => {
        /* Handler on form closure. */
      },
    })
  }

  handleclick =  (e:any,amount:number) => {
    e.preventDefault();

    this.cart.amount=amount*100

    this.creditCardConfigure()
    this.omisecardHandler()
}

}
