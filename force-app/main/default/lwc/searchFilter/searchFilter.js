import { LightningElement, wire } from 'lwc';

// Lightning Message Service and a message channel
import { publish, MessageContext } from 'lightning/messageService';
import FILTER_PRODUCTS from '@salesforce/messageChannel/filterProductsChannel__c';

/**
 * Displays a filter panel to search for Product__c[].
 */
export default class searchFilter extends LightningElement {
    searchKey = '';

    filters = {
        searchKey: ''
    };

    @wire(MessageContext) messageContext;

    handleSearchKeyChange(event) {
        if (event.target) {
            this.searchKey = event.target.value;
            this.filters.searchKey = this.searchKey;
        }
    }

    handleFormSubmit(event) {
        publish(this.messageContext, FILTER_PRODUCTS, this.filters);
    }

}
