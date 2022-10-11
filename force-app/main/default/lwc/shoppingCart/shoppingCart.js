
import {LightningElement, wire} from 'lwc';

//Import our apex method from the renderShoppingCart class

import getOrderRecords from '@salesforce/apex/RenderShoppingCart.getOrderRecords';


export default class renderShoppingCartt extends LightningElement {

   //Retrieve the product records

   @wire(getOrderRecords) orders;

}

