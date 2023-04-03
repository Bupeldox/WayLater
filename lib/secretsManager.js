

var secrets = {};

if(process && process.env){
  //glitch environment
   var emailSec = 
  emailSec.emailFrom = process.env.emailFrom
  emailSec.key = process.env.key
  emailSec.actuallySend = process.env.actuallySend
  
  var testEmail= {};
  testEmail={};
  testEmail.username=process.env.testEmailUsername
  testEmail.password=process.env.testEmailPassword
  
  secrets.email = emailSec;
  secrets.testEmail = testEmail;
  
}else if(require.resolve("./shizniks.secret")){
  
  const secrets = require("./shizniks.secret");
  
  var emailSec = secrets.email
  
  var testEmail= {};
  testEmail={};
  testEmail.username=""
  testEmail.password=""
  
  secrets.email = emailSec;
  secrets.testEmail = testEmail;
}


module.exports = secrets
