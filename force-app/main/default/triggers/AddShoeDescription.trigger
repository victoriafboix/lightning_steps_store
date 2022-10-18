trigger AddShoeDescription on New_Shoe__c (before insert) {
    for(New_Shoe__c d : Trigger.new) {
       d.description__c = 'Hello automatic description';
   }
}