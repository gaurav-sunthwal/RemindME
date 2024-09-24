const accountSid = "AC2f051a96d06783a74c1a37efc40afe49";
const authToken = "ca5d5c9a2e9ba2bbbb1b9b0c7e3910f3";
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    body: "Your appointment is coming Want Add as a Task??",
    from: "whatsapp:+14155238886",
    to: "whatsapp:+918329526333",
  })
  .then((message) => console.log(message.sid))
  .done();
