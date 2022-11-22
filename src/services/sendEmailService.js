import EmailService from './EmailService'

const sendEmail = (options, to) => new Promise((resolve, reject) => EmailService.sendMail({
  ...options,
  from: 'fullstream <naoresponda@fullstream.com>',
  to: [to],
}, (error) => {
  if (error) {
    reject(error);
    return;
  }

  resolve();
}));

export default {
  sendEmail,
};
