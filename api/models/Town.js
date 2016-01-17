/**
* Town.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    days: {
      collection: 'Day',
      via: 'towns'
    },
    places: {
      collection: 'Place',
      via: 'town'
    },
    dayPlaces: {
      collection: 'DayPlace',
      via: 'town'
    }
  }
};

