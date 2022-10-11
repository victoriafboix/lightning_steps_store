import {LightningElement, api, wire} from 'lwc';
// messageChannels
import { publish, MessageContext } from "lightning/messageService";
import CART_CHANNEL from "@salesforce/messageChannel/shoppingCartChannel__c";


export default class ShoeProduct extends LightningElement {
   
   // To expose public property
   @api shoe;


   quantity = 1;
   isAddedToCart = false;
   
   // shopping cart
   @wire(MessageContext)
	messageContext;

	publishChange(cartData, cartAction) {
		const message = {
			cartData: cartData,
			action:{
				cartAction : cartAction
			}
		};
		console.log("publishing message " + JSON.stringify(message));
		publish(this.messageContext, CART_CHANNEL, message);
	}

	@api
	get addedToCart() {
		return this.isAddedToCart;
	}

	set addedToCart(value) {
		this.isAddedToCart = value;
	}

	@api
	get defaultQuantity() {
		return this.quantity;
	}

	set defaultQuantity(value) {
		this.quantity = value;
	}

	addToCart() {
		console.log("Adding to cart ");
		this.isAddedToCart = true;
		let cartData = {
			productId: this.shoe.Id,
			Id : this.shoe.Id,
			quantity: this.quantity,
			Name : this.shoe.Name,
			price : this.shoe.Price__c,
			totalPrice : (this.quantity * this.shoe.Price__c),
		}
		this.publishChange(cartData, 'Add');
	}

	removeFromCart() {
		console.log("Removing from cart ");
		this.isAddedToCart = false;
		let cartData = {
			shoeId: this.shoe.Id,
		}
		this.publishChange(cartData, 'Remove');
		
	}

	change(event) {
		this.quantity = event.target.value;
	}


	get totalPrice() {
		return this.quantity * this.shoe.Price__c;
	}

}