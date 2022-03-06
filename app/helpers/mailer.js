const axios = require('axios');
const qs = require('qs');
const sendMail = (to, subject, content) => {
  const data = qs.stringify({
    'from': 'Admin <mailgun@mail.kma-news.tech>',
    'to': to,
    'subject': subject,
    'html': content
  });
  const config = {
    method: 'post',
    url: 'https://api.mailgun.net/v3/mail.kma-news.tech/messages',
    headers: {
      'Authorization': 'Basic YXBpOjEwMzI1YzZlMWQ2OTI2NWRiNWFlNjY0ODJhMmZhMzE4LWMzZDFkMWViLWRhNDg5ZjIw',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };
  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}


module.exports = { sendMail };
