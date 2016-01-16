/**
 * DayPlaceController
 *
 * @description :: Server-side logic for managing Dayplaces
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  updatePlacesOrder: function (req, res) {
    DayPlace.destroy({day: req.param('parentId'), place: req.param('item')})
    .then(function(dayPlaces) {
      var newDayPlaces = [];

      sails.log(req.param('item'));

      req.param('item').forEach(function(placeId, index) {
        newDayPlaces.push({
          day: req.param('parentId'),
          place: placeId,
          weight: index
        });
      });

      return DayPlace.create(newDayPlaces);
    })
    .then(function(dayPlaces) {
      return res.json();
    })
    .catch(function(err) {
      return res.serverError(err.message);
    });
  },

  getPlacesOfDayByTown: function (req, res) {
    Place.find({town: req.param('townId')})
    .then(function(places) {
      var placeIds = [];
      places.forEach(function(place) {
        placeIds.push(place.id);
      });

      return DayPlace.find({day: req.param('dayId'), place: placeIds}).populate('place');
    })
    .then(function(dayPlaces) {
      var places = [];
      dayPlaces.forEach(function(dayPlace) {
        places.push(dayPlace.place);
      });

      return res.json(places);
    })
    .catch(function(err) {
      return res.serverError(err.message);
    });
  }

};

