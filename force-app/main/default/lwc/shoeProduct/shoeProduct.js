import {LightningElement, api, wire} from 'lwc';

// messageChannels
import {
	publish,
	subscribe,
	unsubscribe,
	MessageContext
} from "lightning/messageService";

import CART_CHANNEL from "@salesforce/messageChannel/shoppingCartChannel__c";
import FILTER_PRODUCTS from '@salesforce/messageChannel/filterProductsChannel__c';

import getProducts from '@salesforce/apex/RenderShoeList.getProducts';

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
			totalPrice : (this.quantity * this.shoe.Price__c)
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


	//Filter

	/**
     * Whether to display the search bar.
     * TODO - normalize value because it may come as a boolean, string or otherwise.
     */
	 @api searchBarIsVisible = false;

	 /**
	  * Whether the product tiles are draggable.
	  * TODO - normalize value because it may come as a boolean, string or otherwise.
	  */
	 @api tilesAreDraggable = false;
 
	 /** Current page in the product list. */
	 pageNumber = 1;
 
	 /** The number of items on a page. */
	 pageSize;
 
	 /** The total number of items matching the selection. */
	 totalItemCount = 0;
 
	 /** JSON.stringified version of filters to pass to apex */
	 filters = {};

	/** Subscription for ProductsFiltered Lightning message */
    filterProductSubscription;

	 /**
     * Load the list of available products.
     */
	  @wire(getProducts, { filters: '$filters', pageNumber: '$pageNumber' })
	  products;
  
	  connectedCallback() {
		  // Subscribe to ProductsFiltered message
		  this.FilterProductsSubscription = subscribe(
			  this.messageContext,
			  FILTER_PRODUCTS,
			  (message) => this.handleFilterChange(message)
		  );

	 }

	 handleProductSelected(event) {
        // Published ProductSelected message
        publish(this.messageContext, FILTER_PRODUCTS, {
            productId: event.detail
        });
    }

    handleSearchKeyChange(event) {
        this.filters = {
            searchKey: event.target.value.toLowerCase()
        };
        this.pageNumber = 1;
    }

    handleFilterChange(message) {
        this.filters = { ...message.filters };
        this.pageNumber = 1;
    }

    handlePreviousPage() {
        this.pageNumber = this.pageNumber - 1;
    }

    handleNextPage() {
        this.pageNumber = this.pageNumber + 1;
    }
	

}