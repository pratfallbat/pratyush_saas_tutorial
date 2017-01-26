/* global $,Stripe */
//Document ready
$(document).on('turbolinks:load' , function(){
var theForm = $('#pro_form');   
var submitBtn = $('#form-submit-btn');   
//Set stripe public key
Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
//when user click form submit method we will ,
submitBtn.click(function(){
//prevent the form default submit method
   event.preventDefault(); 
//Collect the  credit card fields ,
var ccNum = $('#card_number').val(),
      cvcNum = $('card_code').val(),
      expMonth = $('card_month').val(),
      expYear = $('card_year').val();
//Send the card info to stripe.
Stripe.createToken({
    number: ccNum,
    cvc: cvcNum,
    exp_mont: expMonth,
    exp_year: expYear    
}, stripeResponseHandler);
    
});
//Stripe will return a card token
//Inject card token as hiddenfield into form and 
//Submit form to our rails app
});