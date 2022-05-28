const requireLogin = require("../middleware/requireLogin");
const requireCredits = require("../middleware/requireCredits");
const { Path } = require("path-parser");
const { URL } = require("url");
const _ = require("lodash");
const mongoose = require("mongoose");
const surveys = mongoose.model("surveys");

const recipientSchema = require("../model/Recipient");

// Instead of requiring it everytime a survey is being created, require it only when the survey Routes are loaded into the app.
const callSendGridForMail = require("../services/sendGrid");

const callMailjetForMail = require("../services/mailjet");

module.exports = (app) => {
  // Create survey
  app.post(
    "/api/survey/create",
    requireLogin,
    requireCredits,
    async (req, res) => {
      const { title, body, subject, recipients } = req.body;

      const survey = new surveys({
        title,
        body,
        subject,
        recipients: convertToRecipientSchema(recipients),
        _user: req.user.id,
        date: Date.now(),
      });

      try {
        // Send email to all recipients before saving the survey
        callMailjetForMail(body, subject, convertToMailjetFormat(recipients),survey);
        await survey.save();
        req.user.credits -= 1;
        await req.user.save();
      } catch (error) {
        res.status(403).send({ error: "Could'nt save survey" });
      }

      // User credits has been updated, so should trigger the reducer to update credits on UI
      res.send(req.user);
    }
  );

  // listen to webhooks
  app.post("/surveys/webhooks", (req, res) => {
    // here we will pre-process the webhook payload data so that only the click events with relevant responses are handled
    // in this route handler

    // path to match against
    const path = new Path("/api/surveys/:surveyId/:choice");

    console.log(req.body);
    // pre process data here
    _.chain(req.body)
      .map(({ email, url }) => {
        // check if the url is as required in the correct form 
        const match = path.test(new URL(url).pathname);
        console.log(match);
        if (match){
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
          
      })
      // clears all undefined events 
      .compact()
      // clears all duplicate events for the same survey and by the same email (user)
      .uniqBy("email", "surveyId")
      // updates the  surveys according to the valid webhook events 
      .forEach(({ surveyId, email, choice }) => {
        console.log(surveyId,email,choice);
        surveys
          .updateOne(
            {
              _id: surveyId,
              recipients: { $elemMatch: { 'email': email, 'responded': false } },
            },
            {
              $inc: { [choice]: 1 },
              $set: { 'recipients.$.responded': true },
            }
          )
          .exec();
      })
      .value();

      res.send({});
  });

  // This is while storing in survey collection
  const convertToRecipientSchema = (recipients) => {
    return recipients.split(",").map((recipient) => {
      return {
        email: recipient.trim(),
      };
    });
  };

  // This conversion is neccessary for the mailjet api ,
  // It wants the recipients in a certain format

  const convertToMailjetFormat = (recipients) => {
    return recipients.split(",").map((recipient) => {
      return { Email: recipient.trim() };
    });
  };
};
