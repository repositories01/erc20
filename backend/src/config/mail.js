import 'dotenv/config'

// export default {
//   host: process.env.MAIL_HOST,
//   port: process.env.MAIL_PORT,
//   secure: false,
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS,
//   }
// }

export default {
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '6ec96641b02fd8',
    pass: '845026aed3de53',
  },
}
