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
   }
}