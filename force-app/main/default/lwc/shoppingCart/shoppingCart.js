import { LightningElement, track, wire, api } from 'lwc';
// messageChannels
import {
	subscribe,
	unsubscribe,
	MessageContext
} from "lightning/messageService";
import CART_CHANNEL from "@salesforce/messageChannel/shoppingCartChannel__c";

export default class ShoppingCart extends LightningElement {
   @track cartData = [];

   @wire(MessageContext)
	messageContext;

   shoeListSubscription;
   isCartEmpty = true;

   connectedCallback() {
      if (this.shoeListSubscription == null) {
         this.shoeListSubscription = subscribe(
            this.messageContext,
            CART_CHANNEL,
            (message) => this.handleIncomingMessage(message)
         );
      }
	}

	disconnectedCallback() {
      unsubscribe(this.shoeListSubscription);
		this.shoeListSubscription = null;
	}

   handleIncomingMessage(message) {
      let cartAction = message.action.cartAction;

      if (cartAction == 'Add') {
         this.cartData.push(message.cartData);
         
      } else if (cartAction == 'Remove') {
         this.cartData = this.cartData.filter(it => it.productId != cartData.productId);
      }

      this.isCartEmpty = this.cartData.length == 0;
   }


   @api
	get cartEmpty() {
		return this.isCartEmpty;
	}

	set cartEmpty(value) {
		this.isCartEmpty = value;
	}
}