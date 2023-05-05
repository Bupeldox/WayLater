

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

try{
  const setSecrets = require("./shiznics.secret");
  setSecrets();
  console.log("using shiznics");
}
catch(ex){

}


//glitch environment
var emailSec = {};
emailSec.emailFrom = process.env.emailFrom;
emailSec.key = process.env.key;
emailSec.actuallySend = process.env.actuallySend;

var testEmail = {};
testEmail = {};
testEmail.username = process.env.testEmailUsername
testEmail.password = process.env.testEmailPassword

secrets.email = emailSec;
secrets.testEmail = testEmail;



module.exports = secrets
