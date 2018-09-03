/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');
const APP_ID = 'amzn1.ask.skill.8b7a4f33-3e5d-4f11-a03f-30db5f213b17';

const MEDICINES = [
	'1 tableta de Penicilina 200 gramos',
	'2 tabletas de Naproxeno 500 gramos'
]
const SKILL_NAME =  'Mi receta medica'
const GET_MEDICINE_MESSAGE = "Esta es la medicina que te toca: "
const HELP_MESSAGE = 'Puedes decir, abrir receta médica y checar cuál me toca'
const STOP_MESSAGE = '¡Adios!'


const handlers = {
    'LaunchRequest': function () {
        this.emit('getMedicine');
    },
    'getCorrectMedicine': function () {
        this.emit('getMedicine');
    },
    'getMedicine': function () {
        console.log('getMedicine')
	    const factArr = MEDICINES;
	    const factIndex = Math.floor(Math.random() * factArr.length);
	    const randomFact = factArr[factIndex];

	    // Create speech output
	    const speechOutput = GET_MEDICINE_MESSAGE + randomFact;
	    this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_MESSAGE;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
};

exports.handler = (event, context) => {
	const alexa = Alexa.handler(event, context);
	alexa.APP_ID = APP_ID;
	alexa.registerHandlers(handlers);
	alexa.execute();
};
