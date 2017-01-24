class ContactsController < ApplicationController
 #GET request to /contact us
 #show new contact form
 
 
  def  new
@contact = Contact.new
  end
#POST request /contact
def create
#Mass assignment  of form fireld into contact object 
  @contact = Contact.new(contact_params)

#store formfield via parameter into variables

  if @contact.save
 name = params[:contact][:name]
email = params[:contact][:email]
body = params[:contact][:comments]

#plug variable into Contact Mailer
#email method and send email
ContactMailer.contact_email(name, email, body).deliver
 
 #store sucess message in flash hash
#and redirect to the new action
   flash[:success] = "Message sent."
     redirect_to new_contact_path

  else

#if contact object doesnt save
#store error in flash hash
#and redirect to the new action
flash[:danger] = @contact.errors.full_messages.join(", ")
     redirect_to new_contact_path
  end
end
private
#to collect data from form we need to use  
#strong parameter and whitelist the form field

  def contact_params
     params.require(:contact).permit(:name, :email, :comments)
  end
end