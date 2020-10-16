import nodemailer from 'nodemailer'
import { resolve } from 'path'
import exphbs from 'express-handlebars'
import nodemailerhbs from 'nodemailer-express-handlebars'
import mailConfig from '../config/mail'

const { host, port, secure, user, pass } = mailConfig

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: { user, pass },
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

// class Mail {
//   constructor() {

//     this.transporter = nodemailer.createTransport({
//       host,
//       port,
//       secure,
//       auth: auth.user ? auth : null,
//     })

//     this.configureTemplates()
//   }

//   configureTemplates() {

//     this.transporter.use(
//       'compile',
//       nodemailerhbs({
//         viewEngine: 'handlebars',
//         viewPath,
//         extName: '.html',
//       })
//       nodemailerhbs({
//         viewEngine: exphbs.create({
//           layoutsDir: resolve(viewPath, 'layout'),
//           partialsDir: resolve(viewPath, 'partials'),
//           defaultLayout: 'default',
//           extname: '.hbs',
//         }),
//         viewPath,
//         extName: '.hbs',
//       })
//     )
//   }

//   sendMail(message) {
//     return this.transporter.sendMail({
//       ...mailConfig.default,
//       ...message,
//     })
//   }
// }

// export default new Mail()
