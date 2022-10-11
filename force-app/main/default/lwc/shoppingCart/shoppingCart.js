import { LightningElement, track, wire } from 'lwc';
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

   connectedCallback() {
      console.log("subscribing to shoeListSubscription")
      this.shoeListSubscription = subscribe(
         this.messageContext,
         CART_CHANNEL,
         (message) => handleIncomingMessage(message)
      )
	}

	disconnectedCallback() {
      console.log("unsubscribing to shoeListSubscription")
		unsubscribe(this.shoeListSubscription);
		this.shoeListSubscription = null;
	}

   handleIncomingMessage(message) {
      console.log("message " + JSON.stringify(message));
      let cartAction = message.action.cartAction;

      if (cartAction == 'Add') {
         this.cartData.push(message.cartData);
      } else if (cartAction == 'Remove') {
         let selectedProductId = cartData.productId;
         this.cartData = this.cartData.filter(it => it.productId != selectedProductId);
      }

      console.log(this.cartData);
   }
}