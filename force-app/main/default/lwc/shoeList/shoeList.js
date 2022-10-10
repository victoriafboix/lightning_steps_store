
import {LightningElement, wire} from 'lwc';

//Import our apex method from the RenderListExample class

import getShoeRecords from '@salesforce/apex/RenderShoeList.getShoeRecords';


export default class RenderShoeList extends LightningElement {



   //Retrieve the account records

   @wire(getShoeRecords) shoes;

}



