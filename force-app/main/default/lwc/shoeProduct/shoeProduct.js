// import module elements
import { LightningElement } from 'lwc';
// declare class to expose the component
export default class ShoeProduct extends LightningElement {
    name = 'Fancy Crocs';
    description = 'Summer comfort.';
    category = 'Summer';
    price = '85.50€';
    pictureUrl = 'https://images.vestiairecollective.com/cdn-cgi/image/w=1000,q=80,f=auto,/produit/23570986-1_2.jpg';
   ready = false;
   // use lifecycle hook
   connectedCallback() {
       setTimeout(() => {
           this.ready = true;
       }, 3000);
   }
}