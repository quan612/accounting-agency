const sgMail = require("@sendgrid/mail")
const { GATSBY_SENDGRID_API_KEY, SENDGRID_TO_EMAIL } = process.env

sgMail.setApiKey(GATSBY_SENDGRID_API_KEY)

exports.handler = async (event, context, callback) => {
  const payload = JSON.parse(event.body)
  const { email } = payload

  const body = Object.keys(payload)
    .map(k => {
      return `${k}: ${payload[k]}`
    })
    .join("<br><br>")

  const msg = {
    to: "neverlate612@gmail.com",
    from: "neverlate612@gmail.com",
    subject: "Contact Form Submission",
    html: body,
    text: `From ${email}`,
  }

  try {
    await sgMail.send(msg)

    return {
      statusCode: 200,
      body: "Message sent",
    }
  } catch (error) {
    console.error(error)

    if (error.response) {
      // Extract error msg
      const { message, code, response } = error

      // Extract response msg
      const { headers, body } = response

      console.error(body)
    }
    return {
      statusCode: error.code,
      body: error.message,
    }
  }
}
