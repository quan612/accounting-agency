// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV}`,
// })

// require("dotenv").config()
const mailgun = require("mailgun-js")

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
}

const mg = mailgun({
  apiKey: process.env.GATSBY_MAILGUN_API_KEY,
  domain: process.env.GATSBY_MAILGUN_DOMAIN,
})

const successCode = 200
const errorCode = 412

exports.handler = (event, context, callback) {
  let data = JSON.parse(event.body)

  let { name, email, message } = data

  let mailOptions = {
    from: `quan612@yahoo.com`,
    to: "neverlate612@gmail.com",
    subject: "Hello",
    text: `${message}`,
  }

  mg.messages().send(mailOptions, (error, body) => 
  {
       if (error)
       {
           return console.log(error);
       }

       callback(null, {
           statusCode: 200,
           body: "Mail sent"
       });
  });

  // mg.messages().send(mailOptions).then(success =>{
  //   return {
  //     statusCode: 200,
  //     body: "Message sent",
  //   }
  // }).catch(error =>{
  //   return {
  //     statusCode: 412,
  //     body: error,
  //   }
  // })

  // Our Mailgun code
  // mg.messages().send(mailOptions, (error, body) => {
  //   console.log(body)
  //   if (error) {
  //     // return console.log(error)
  //     callback(null, {
  //       statusCode: 412,
  //       headers,
  //       // body: { message: "test" + JSON.stringify(error) },
  //       body: JSON.stringify(error),
  //     })
  //   }

  //   // else {
  //   callback(null, {
  //     statusCode: 200,
  //     // body: { message: "test" },
  //     headers,
  //     body: JSON.stringify(body),
  //   })
  //   // }
  // })
}
