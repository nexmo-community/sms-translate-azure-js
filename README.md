# SMS Translation with Azure Translator Text

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://nexmo.dev/azure-nexmo-sms-translation-heroku)

This example uses Azure Translator Text to translate SMS messages.

SMS messages sent through Nexmo will be sent to Azure Translator Text and a translation is returned to the console.

## Azure Text Analyzer

+ Reference: [https://azure.microsoft.com/en-us/services/cognitive-services/translator-text-api/](https://azure.microsoft.com/en-us/services/cognitive-services/translator-text-api/)
+ API Docs: [https://docs.microsoft.com/en-us/azure/cognitive-services/translator/translator-info-overview](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/translator-info-overview)
+ GitHub: [https://github.com/Azure/azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js)

Sign up for [Azure Translator Text](https://portal.azure.com/#create/Microsoft.CognitiveServicesTextTranslation) and copy the `Subscription key` from the service `Quick Start` page.


## Running the App

This sample app uses a `.env` file to provide the API key and URL.

Copy the provided `.env.example` file to a new file called `.env`:

```
cp .env.example > .env
```

Then update the values with those from the Azure Text Analyzer service `Quick Start` page, and then save.

```
TEXT_TRANSLATION_SUBSCRIPTION_KEY=
TEXT_TRANSLATION_ENDPOINT=https://gateway.watsonplatform.net/language-translator/api
```

Also, expose the application to the internet using tools like [ngrok](https://ngrok.com/). To see how, [check out this guide](https://www.nexmo.com/blog/2017/07/04/local-development-nexmo-ngrok-tunnel-dr/).

### Using Docker

To run the app using Docker, run the following command in a terminal:

```
docker-compose up
```

This will create a new image with all the dependencies and run it at http://localhost:3000.

### Using Node

To run the app using node, run the following command in a terminal:

```
npm install && node index.js
```

This will install all the dependencies and run it at http://localhost:3000.

## Linking the app to Nexmo

For this example app a Nexmo number and SMS webhook setup is needed.

This can be achieved with the Nexmo CLI. Install the CLI by following [these instructions](https://github.com/Nexmo/nexmo-cli#installation).

### Rent a New Virtual Number

Renting a number will need to be in place. This can also be achieved using the CLI by running this command:

```
nexmo number:buy --country_code US
```

### Adding the SMS Webhook

Update the number created with the URL of the hosted or local server.

```
nexmo link:sms phone_number https://my-hostname/message
```

## Try it out

With the example Node application running in the terminal, send various SMS messages to the virtual number.  The terminal will output the response from Azure Text Analyzer.

## Extend
This app prints out to the console. For integration with an application, extend the `translateText` function to suit your needs.
