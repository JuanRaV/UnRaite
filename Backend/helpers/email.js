// import nodemailer from 'nodemailer'

// export const forgotPasswordEmail = async(data) =>{
//     const {email, name, token} = data
//     var transport = nodemailer.createTransport({
//         host: process.env.EMAIL_HOST ,
//         port: process.env.EMAIL_PORT,
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass:  process.env.EMAIL_PASSWORD
//         }
//       });
    
//     //Email information
//     const info = await transport.sendMail({
//         from:'"UpTask - Project Administrator"<cuentas@uptask.com>',
//         to:email,
//         subject:"UpTask - Recover your Password",
//         text:"Recover your Password in UpTask",
//         html:`
//             <p>Hi ${name}! Recover your Password in UpTask</p>
//             <p>Follow the next link to generate the new password:</p>
//             <a href="${process.env.FRONTEND_URL}/newPassword/${token}">Recover Password </a>
//             <p>If you don't know about this, ignore the mail</p>
//         `
//       })
// }