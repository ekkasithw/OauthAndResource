/**
 * DayPlaceController
 *
 * @description :: Server-side logic for managing Dayplaces
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  updatePlacesOrder: function (req, res) {
    DayPlace.destroy({day: req.param('dayId'), town: req.param('townId')})
    .then(function(dayPlaces) {
      var newDayPlaces = [];

      req.param('item').forEach(function(placeId, index) {
        newDayPlaces.push({
          day: req.param('dayId'),
          place: placeId,
          town: req.param('townId'),
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
    var filter = {
      day: req.param('dayId'),
      town: req.param('townId'),
    };

    DayPlace.find(filter).sort('weight ASC').populate('place')
    .then(function(dayPlaces) {
      var places = [];

      sails.log(dayPlaces);

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

