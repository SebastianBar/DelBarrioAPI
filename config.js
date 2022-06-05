import knexFile from './knexfile.js';

let secret;
let secretEncrypt;
let apiPort;
let apiHost;
let knexConfig;
let mail;
let mailName;
let mailPsw;
let mailFrom;
const env = process.env.NODE_ENV || 'development';

switch (env) {
  case 'production':
    secret = process.env.SECRET;
    secretEncrypt = process.env.SECRET_ENCRYPT;

    apiPort = process.env.API_PORT;
    apiHost = process.env.API_HOST;

    knexConfig = knexFile.production;

    mail = process.env.MAIL;
    mailName = process.env.MAIL_NAME;
    mailPsw = process.env.MAIL_PSW;
    mailFrom = process.env.MAIL_FROM;
    break;

  case 'development':
    secret = 'claveultrasecreta';
    secretEncrypt = 'provWeb';

    apiPort = '3000';
    apiHost = 'http://localhost';

    knexConfig = knexFile.development;

    mail = '';
    mailName = '';
    mailPsw = '';
    mailFrom = '';
    break;
  default:
    break;
}

export default {
  secret,
  secretEncrypt,
  apiPort,
  apiHost,
  knexConfig,
  mail,
  mailName,
  mailPsw,
  mailFrom,
};
