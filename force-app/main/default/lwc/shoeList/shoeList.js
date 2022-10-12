import {LightningElement, wire} from 'lwc';

// messageChannels
import {
	subscribe,
	unsubscribe,
	MessageContext
} from "lightning/messageService";

//Import our apex method from the RenderShoeList class
import getProducts from '@salesforce/apex/RenderShoeList.getProducts';
import FILTER_PRODUCTS from '@salesforce/messageChannel/filterProductsChannel__c';

export default class ShoeList extends LightningElement {

   /**
   * Load the list of available products.
   */
   @wire(getProducts, { filters: '$filters' }) shoes;

   @wire(MessageContext) messageContext;
 
	 /** JSON.stringified version of filters to pass to apex */
	 filters = {};

	/** Subscription for ProductsFiltered Lightning message */
    filterProductSubscription;
  
	connectedCallback() {
		if (this.filterProductsSubscription == null) {
			this.filterProductsSubscription = subscribe(
				this.messageContext,
				FILTER_PRODUCTS,
				(message) => this.handleFilterChange(message)
			);
		}
	}
	
	disconnectedCallback() {
		unsubscribe(this.filterProductsSubscription);
		this.filterProductsSubscription = null;
	}

	handleFilterChange(message) {
		this.filters = message
	}
}


	

	







