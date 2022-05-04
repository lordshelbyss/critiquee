const requireLogin=require('../middleware/requireLogin');
const requireCredits=require('../middleware/requireCredits');

const mongoose=require('mongoose');
const surveys=mongoose.model('surveys');

const recipientSchema=require('../model/Recipient');

// Instead of requiring it everytime a survey is being created, require it only when the survey Routes are loaded into the app.
const callSendGridForMail=require('../services/sendGrid');

module.exports = (app) => {

    // Create survey 
  app.post("/api/survey/create",requireLogin,requireCredits,async (req, res) => {
    
    const {title,body,subject,recipients}=req.body;

    const survey=new surveys({
        title,
        body,
        subject,
        recipients: convertToRecipientSchema(recipients),
        _user: req.user.id,
        date: Date.now()
    });

    try{
        // Send email to all recipients before saving the survey 
        callSendGridForMail(body,subject,recipients);
        await survey.save();
        req.user.credits-=1;
        await user.save();

    }catch(error){
        res.status(403).send({error: 'Could\'nt save survey'});
    }
    
    // User credits has been updated, so should trigger the reducer to update credits on UI 
    res.send(user);

  });

  const convertToRecipientSchema=(recipients)=>{
      recipients.split(',').map((recipient)=>{
        return new recipientSchema({
            email: recipient.trim()
        });
      });
  }
 
};
