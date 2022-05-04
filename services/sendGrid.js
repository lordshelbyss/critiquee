const sgMail=require('@sendgrid/mail');
sgMail.setApiKey(require('../config/keys').sendGridAPIKey);

module.exports= async(body,subject,recipients)=>{
    const msg={
        to: recipients,
        from: '',
        subject,
        html: renderMailHTML(body)
    };
    await sgMail.send(msg);

    const renderMailHTML=(body)=>{
        return `
            <p>${body}</p>
            <a href="">Yes</a>
            <a href="">No</a>
        `;
    }
}
