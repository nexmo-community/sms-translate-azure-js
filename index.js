'use strict';
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const CognitiveServicesCredentials = require("@azure/ms-rest-js");
const { TranslatorTextClient } = require("@azure/cognitiveservices-translatortext");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Express server listening on port ${server.address().port} in ${app.settings.env} mode`);
});

// Reading the inbound SMS messages
const handleRoute = (req, res) => {

  let params = req.body;

  if (req.method === "GET") {
    params = req.query
  }

  if (!params.to || !params.msisdn) {
    res.status(400).send({'error': 'This is not a valid inbound SMS message!'});
  } else {
    translateText(params);
    res.status(200).end();
  }

};

// Using route here to allow for GET or POST from https://dashboard.nexmo.com/settings
app.route('/message')
  .get(handleRoute)
  .post(handleRoute)
  .all((req, res) => res.status(405).send());


function translateText(params) {
  const creds = new CognitiveServicesCredentials.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': process.env.TEXT_TRANSLATION_SUBSCRIPTION_KEY } });
  const client = new TranslatorTextClient(creds, process.env.TEXT_TRANSLATION_ENDPOINT);

  client.translator
    .translate(["en"], [{text:params.text}])
    .then(result => {
      console.log(`Original Text ${params.text}`);
      console.log(`Translation ${result[0].translations[0].text}`)
    })
    .catch(err => {
      console.error("error:", err);
    });
}
