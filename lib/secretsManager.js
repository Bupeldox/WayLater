

var secrets = {
  email: {
    emailFrom: "",
    key: "",
    actuallySend: false,
  },
  testEmail:{
    username:"",
    password:"",
  }

};
if (require.resolve("./shiznics.secret")) {
  
  const setSecrets = require("./shiznics.secret");
  setSecrets();

}


//glitch environment
var emailSec = {};
emailSec.emailFrom = process.env.emailFrom
emailSec.key = process.env.key
emailSec.actuallySend = process.env.actuallySend

var testEmail = {};
testEmail = {};
testEmail.username = process.env.testEmailUsername
testEmail.password = process.env.testEmailPassword

secrets.email = emailSec;
secrets.testEmail = testEmail;



module.exports = secrets
