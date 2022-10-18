public with sharing class RenderShoeList {
    public class Filters {
       @AuraEnabled
       public String searchKey { get; set; }
    
   }
   @AuraEnabled(Cacheable=true scope='global')
   public static List<New_Shoe__c> getProducts(Filters filters) {
       String key = '%';

       if (filters != null) {
           if (!String.isEmpty(filters.searchKey)) {
               key = '%' + filters.searchKey + '%';
           }
       }
  
       return [
          SELECT Id, 
              Name, 
              Category__c, 
              Price__c, 
              Product_image__c, 
              image_url__c, 
              Description__c 
           FROM New_Shoe__c
           WHERE Name Like :key
      ];
   }
}
