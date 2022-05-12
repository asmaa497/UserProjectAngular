export interface User {
fullName:string;
email:string;
mobileNum:string[];
address:{
   city:string;
   postalCode:string;
   street:string;
}
password:string;
deliveryOptions:string;
specificDays?:string


}
