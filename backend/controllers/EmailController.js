import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'

const sendOTP = (reciever, otp) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nibmjobportal@gmail.com',
      pass: 'NibmJob2021',
    },
  })

  const body = `Please use <b>${otp}</b> as your OTP to reset your password!`

  const mailOptions = {
    from: 'noreply@qurantimeapp.com', // sender address
    to: reciever, // list of receivers
    subject: 'Reset Password - Qurantime Application', // Subject line
    html: body, // plain text body
  }

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info)
    }
  })
}

export { sendOTP }
