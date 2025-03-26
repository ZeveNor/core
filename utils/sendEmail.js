import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import env from 'dotenv';
env.config();

const sendEmail = async (to, subject, text) => {
  

};

export default sendEmail;


// const mailgun = new Mailgun(FormData);
  // const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });
  // try {
  //   const data = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
  //     from: '<postmaster@sandbox3f192d8f9ea3482a93dc2d05b20f32e2.mailgun.org>',
  //     to: "<panthep094@gmail.com>",
  //     subject: subject,
  //     text: text,
  //   });
  //   console.log(data);
    
  // }
  // catch (error) {
  //   console.log(error);
    
  // }