import twilio from 'twilio';

const accountSid = 'ACa03c90ba6a443011c098d149bb4aedc5';
const authToken = '52c5e6965e161f3397a1eafca28b4c00';


const client = new twilio(accountSid, authToken);



const sms = async ({to, otp}) => {
  
  client.messages
    .create({
      body: `your otp is ${otp}`,
      from: '+12184003703',
      to: to
  })
    .then(message => console.log(message.sid))
    .catch(err => console.log(err));

};

export default sms;
