import { LightningElement, wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';

// Product schema
import CATEGORY_FIELD from '@salesforce/schema/New_Shoe__c.Category__c';


// Lightning Message Service and a message channel
import { publish, MessageContext } from 'lightning/messageService';
import FILTER_PRODUCTS from '@salesforce/messageChannel/filterProductsChannel__c';

// The delay used when debouncing event handlers before firing the event
const DELAY = 350;

/**
 * Displays a filter panel to search for Product__c[].
 */
export default class searchFilter extends LightningElement {
    searchKey = '';
    maxPrice = 10000;
    categories;

    filters = {
        searchKey: '',
        maxPrice: 10000
    };

    @wire(MessageContext)
    messageContext;

    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: CATEGORY_FIELD
    })

    handleSearchKeyChange(event) {
        this.filters.searchKey = event.target.value;
        this.delayedFireFilterChangeEvent();
    }

    handleMaxPriceChange(event) {
        const maxPrice = event.target.value;
        this.filters.maxPrice = maxPrice;
        this.delayedFireFilterChangeEvent();
    }

    handleCheckboxChange(event) {
        const value = event.target.dataset.value;
        const filterArray = this.filters[event.target.dataset.filter];

        if (!this.filters.categories) {
            // Lazy initialize filters with all values initially set
            this.filters.categories = this.categories.data.values.map((item) => item.value);
        }

        if (event.target.checked) {
            if (!filterArray.includes(value)) {
                filterArray.push(value);
            }
        } else {
            this.filters[event.target.dataset.filter] = filterArray.filter((item) => item !== value);
        }
        
        // Published ProductsFiltered message
        publish(this.messageContext, FILTER_PRODUCTS, { filters: this.filters });
    }

    delayedFireFilterChangeEvent() {
        // Debouncing this method: Do not actually fire the event as long as this function is
        // being called within a delay of DELAY. This is to avoid a very large number of Apex
        // method calls in components listening to this event.
        window.clearTimeout(this.delayTimeout);
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            // Published FilterProducts message
            publish(this.messageContext, FILTER_PODUCTS, {
                filters: this.filters
            });
        }, DELAY);
    }
    
}