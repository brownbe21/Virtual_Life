'use strict';
const AWS = require('aws-sdk');
const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });

/** Set your phone numbers here. They must be 11-digit numbers that start with
  * the "1" for phones within the United States.
  * 
  * Use commas after each number except for the last number.
  */
const PHONE_NUMBER_ARRAY = [
   
  "12293951253" 
   
]; 

/** Set your 3 messages here. */
const SINGLE_CLICK_MESSAGE = "ONE CLICK OF THE BUTTON";
const DOUBLE_CLICK_MESSAGE = "Let's do lunch this week.";
const LONG_CLICK_MESSAGE = "I need help. Please come over now!";

exports.handler = (event, context, callback) => {
  let clickMessage = SINGLE_CLICK_MESSAGE;
  if (event.clickType === "LONG") {
    clickMessage = LONG_CLICK_MESSAGE;
  }
  if (event.clickType === "DOUBLE") {
    clickMessage = DOUBLE_CLICK_MESSAGE;
  }
  for (var i = 0; i < PHONE_NUMBER_ARRAY.length; i++) {
    const params = {
      PhoneNumber: PHONE_NUMBER_ARRAY[i],
      Message: clickMessage,
    };
    SNS.publish(params, callback);
  }
};
  