/**
 * Created by pino on 21/10/16.
 */
angular.module('ruben-radar')
    .service('VoteService', function (Vote) {
        this.newVote = function newVote(radar) {
            var vote = new Vote();
            vote.radar_id = radar.id;
            vote.answers = _.map(radar.axes, function (axis) {
                return {axis: axis, points: undefined};
            });
            return vote;
        };
        this.createVote = function createVote(vote) {
            debugger;
            return vote.$save().catch(function (response) {
                return Promise.reject(response.data.errors);
            });
        };
    });
