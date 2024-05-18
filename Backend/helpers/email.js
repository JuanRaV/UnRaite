import nodemailer from 'nodemailer'

export const passengerForgotPasswordEmail = async(data) =>{
    const {email, name, token} = data
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST ,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass:  process.env.EMAIL_PASSWORD
        }
      });
    
    //Email information
    const info = await transport.sendMail({
        from:'"UnRaite"<cuentas@unRaite.com>',
        to:email,
        subject:"UnRaite - Recover your Password",
        text:"Recover your Password in unRaite",
        html:`
            <p>Hi ${name}! Recover your Password in UnRaite</p>
            <p>Follow the next link to generate the new password:</p>
            <a href="${process.env.FRONTEND_URL}/newPassword/passenger/${token}">Recover Password </a>
            <p>If you don't know about this, ignore the mail</p>
        `
      })
}

export const driverForgotPasswordEmail = async(data) =>{
  const {email, name, token} = data
  var transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST ,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass:  process.env.EMAIL_PASSWORD
      }
    });
  
  //Email information
  const info = await transport.sendMail({
      from:'"UnRaite"<cuentas@unRaite.com>',
      to:email,
      subject:"UnRaite - Recover your Password",
      text:"Recover your Password in unRaite",
      html:`
          <p>Hi ${name}! Recover your Password in UnRaite</p>
          <p>Follow the next link to generate the new password:</p>
          <a href="${process.env.FRONTEND_URL}/newPassword/driver/${token}">Recover Password </a>
          <p>If you don't know about this, ignore the mail</p>
      `
    })
}