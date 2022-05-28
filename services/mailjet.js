const mailjet = require("node-mailjet");
const keys = require("../config/keys");
const client = mailjet.connect(keys.mailjetPublicKey, keys.mailjetPrivateKey);

module.exports = async (body, subject, recipients,survey) => {
  const renderHTMLBody = (body) => {
    return `
            <div>
            <p>${body}</p>
            <div>
                <a href="${keys.domainName}/api/surveys/${survey.id}/yes">Yes</a>
            </div>
            <div>
                <a href="${keys.domainName}/api/surveys/${survey.id}/no">No</a>
            </div>
            </div>
        `;
  };

  const response = await client.post("send").request({
    FromEmail: "sam.thechampion@gmail.com",
    FromName: "No reply",
    Subject: subject,
    "Html-part": renderHTMLBody(body),
    Recipients: recipients,
  });

  console.log(response);
};
