/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');
const APP_ID = 'amzn1.ask.skill.8b7a4f33-3e5d-4f11-a03f-30db5f213b17';

const languageStrings = {
	'es-MX': {
		translation: {
			MEDICINES: [
				'1 tableta de Penicilina 200 gramos',
        '2 tabletas de Naproxeno 500 gramos'
			],
			SKILL_NAME: 'Mi receta medica',
			GET_MEDICINE_MESSAGE: "Esta es la medicina que te toca: ",
			HELP_MESSAGE: 'Puedes decir, abrir receta médica y checar cuál me toca',
			HELP_REPROMPT: '¿En qué te puedo ayudar?',
			STOP_MESSAGE: '¡Adios!',
		},
	}
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('getMedicine');
    },
    'getCorrectMedicine': function () {
        this.emit('getMedicine');
    },
    'getMedicine': function () {
        console.log('getMedicine')
	    const factArr = this.t('MEDICINES');
	    const factIndex = Math.floor(Math.random() * factArr.length);
	    const randomFact = factArr[factIndex];

	    // Create speech output
	    const speechOutput = this.t('GET_MEDICINE_MESSAGE') + randomFact;
	    this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = (event, context) => {
	const alexa = Alexa.handler(event, context);
	alexa.APP_ID = APP_ID;
	// To enable string internationalization (i18n) features, set a resources object.
	alexa.resources = languageStrings;
	alexa.registerHandlers(handlers);
	alexa.execute();
};
