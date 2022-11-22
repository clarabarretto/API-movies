import path from 'path';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c1300dbe838faf",
    pass: "f5682235e8ae6b"
  }
});

const options = {
  viewEngine: {
    extName: '.hbs',
    layoutsDir: path.resolve('./src/email'),
    defaultLayout: 'index',
  },
  viewPath: path.resolve('./src/email'),
  extName: '.hbs',
};

transport.use('compile', hbs(options));

export default transport;
