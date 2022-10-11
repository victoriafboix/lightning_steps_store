import {LightningElement, wire} from 'lwc';

//Import our apex method from the RenderShoeList class

import getShoeRecords from '@salesforce/apex/RenderShoeList.getShoeRecords';


export default class ShoeList extends LightningElement {



   //Retrieve the account records

   @wire(getShoeRecords) shoes;

}


	

	







