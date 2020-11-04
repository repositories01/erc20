import 'dotenv/config'

import nodemailer from 'nodemailer'
import { resolve } from 'path'
import exphbs from 'express-handlebars'
import nodemailerhbs from 'nodemailer-express-handlebars'

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails')

transporter.use(
  'compile',
  nodemailerhbs({
    viewEngine: exphbs.create({
      layoutsDir: resolve(viewPath, 'layouts'),
      partialsDir: resolve(viewPath, 'partials'),
      defaultLayout: 'default',
      extname: '.hbs',
    }),
    viewPath,
    extName: '.hbs',
  })
)
//         viewEngine: exphbs.create({
//           layoutsDir: resolve(viewPath, 'layout'),
//           partialsDir: resolve(viewPath, 'partials'),
//           defaultLayout: 'default',
//           extname: '.hbs',
//         }),
//         viewPath,
//         extName: '.hbs',
//       })
export default transporter

