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
submitBtn.val("processing").prop('disabled', true);

//Collect the  credit card fields ,
var ccNum = $('#card_number').val(),
      cvcNum = $('card_code').val(),
      expMonth = $('card_month').val(),
      expYear = $('card_year').val();


//Use Stripe JS library to check for card errors.
var error = false;
//Validate card number
//if there is an error-below line show error
//as stripecardnyumber()will be true only when its correct
//so negative of that will get  true when its not wrong
//and if line will run only then
// if(wrong) or if(!false) or if(true)
if(!Stripe.card.validateCardNumber(ccNum))
{error =true;
alert('The card number entered is incorrect');
}

if(!Stripe.card.validateCVC(cvcNum))
{error =true;
alert('The cvc number entered is incorrect');
}

if(!Stripe.card.validateExpiry(expMonth, expYear))
{error =true;
alert('The Expiry Month or Date entered is incorrect');
}





if(error){
submitBtn.prop('disabled',false).val("Sign Up");
    // if there are error dont send to stripe
}

else {
      //Send the card info to Stripe.
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }


//Send the card info to stripe.
Stripe.createToken({
    number: ccNum,
    cvc: cvcNum,
    exp_mont: expMonth,
    exp_year: expYear    
}, stripeResponseHandler);

    return false;
});
//Stripe will return a card token
function stripeResponseHandler(status, response)
{
//Get token from response
    
var token =  response .id;
//Inject card token as hiddenfield into form and 

 theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    //Submit form to our Rails app.
    theForm.get(0).submit();    
} 
});