/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');
const APP_ID = 'amzn1.ask.skill.8b7a4f33-3e5d-4f11-a03f-30db5f213b17';

const MEDICINES_API = [
    {
        id: 0,
        name: 'Aspirina 500 miligramos',
        dose: "dos tabletas",
        time: 9
    },
    {
        id: 1,
        name: "Penicilina 200 miligramos",
        dose: "una tableta",
        time: 13
    },
    {
        id: 2,
        name: "Naproxeno 500 miligramos",
        dose: "dos tabletas",
        time: 19
    }
]

const SKILL_NAME =  'Mi receta medica'
const GET_MEDICINE_MESSAGE = "Esta es la medicina que te toca: "
const HELP_MESSAGE = 'Puedes decir, abrir receta médica y checar cuál me toca'
const STOP_MESSAGE = '¡Adios!'

let getHour = new Date().getHours();
let myNextMedicines = []

function takeThePillNow(medicine){
    const response = 'Es la hora exacta de tomar esta pastilla: ' + medicine.name + '.'
    this.emit(':tellWithCard', response, SKILL_NAME, response);
    
}
function nextMedicine(medicine){
    myNextMedicines.push(medicine)
}
function generateSpeech(){
    const response = 'Tu siguiente medicina es: ' + myNextMedicines[0].name + '. Dosis: ' + myNextMedicines[0].dose + '. Y por último: ' + myNextMedicines[1].name + '. Dosis: ' + myNextMedicines[1].dose + '.'
    this.emit(':tellWithCard', response, SKILL_NAME, response);
}

const handlers = {
    'LaunchRequest': function () {
        this.emit('getMedicine');
    },
    'getCorrectMedicine': function () {
        this.emit('getMedicine');
    },
    'getMedicine': function () {
        let i = 0

        MEDICINES_API.forEach((medicine) => {
            i++
            if(medicine.time === getHour){
                takeThePillNow(medicine)
                return
            }
            if(medicine.time > getHour){
                nextMedicine(medicine)
            }
            if(i === MEDICINES_API.length){
                generateSpeech()
            }
        })

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
