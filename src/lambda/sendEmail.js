require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

// require("dotenv").config()
const mailgun = require("mailgun-js")

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
}

// const apiKey = process.env.MAILGUN_API_KEY
// const domain = process.env.MAILGUN_DOMAIN

console.log(apiKey)

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
})

const successCode = 200
const errorCode = 412

export function handler(event, context, callback) {
  let data = JSON.parse(event.body)

  let { name, email, message } = data

  let mailOptions = {
    from: `${name}`,
    to: "neverlate612@gmail.com",
    // replyTo: email,
    text: `${message}`,
  }

  // Our Mailgun code
  mg.messages().send(mailOptions, (error, body) => {
    if (error) {
      // return console.log(error)
      callback(null, {
        errorCode,
        headers,
        body: JSON.stringify(error),
      })
    }

    // else {
    callback(null, {
      statusCode: 200,
      // body: "Mail sent",
      headers,
      body: JSON.stringify(body),
    })
    // }
  })
}
