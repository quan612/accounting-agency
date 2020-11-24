require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
}

const apiKey = process.env.MAILGUN_API_KEY
const domain = process.env.MAILGUN_DOMAIN

console.log(apiKey)

const mailgun = require("mailgun-js")
const mg = mailgun({
  apiKey,
  domain,
})

const successCode = 200
const errorCode = 400

export function handler(event, context, callback) {
  let data = JSON.parse(event.body)

  let { name, email, message } = data

  let mailOptions = {
    from: `${name} >`,
    to: "neverlate612@gmail.com",
    replyTo: email,
    text: `${message}`,
  }
  console.log(123)
  // Our Mailgun code
  mg.messages().send(mailOptions, function (error, body) {
    if (error) {
      callback(null, {
        errorCode,
        headers,
        body: JSON.stringify(error),
      })
    } else {
      callback(null, {
        successCode,
        headers,
        body: JSON.stringify(body),
      })
    }
  })
}
