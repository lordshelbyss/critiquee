
const stripe = require("stripe")(require('../config/keys').stripeSecretKey);


module.exports = (app) => {
  // Handle creation of paymentIntent
  app.post("/api/create-payment-intent", async (req, res) => {
    // Create paymentIntent by invoking stripe API
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.credits,
      currency: 'usd',
      description: 'Software development services',
      shipping: {
        name: 'Jenny Rosen',
        address: {
          line1: '510 Townsend St',
          postal_code: '98140',
          city: 'San Francisco',
          state: 'CA',
          country: 'US',
        },
      },
      automatic_payment_methods: {
        enabled: true,
      }
    });

    res.send({
        clientSecret: paymentIntent.client_secret
    });

  });

  app.post("/api/user/add-credits",async(req,res)=>{

    const {credits}=req.body;

    // remember that the user is stored in the req.user field 
    req.user.credits+= credits;
    const user =await req.user.save();
    res.send(user);

  });
};
