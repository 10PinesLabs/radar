/**
 * Created by pino on 21/10/16.
 */
angular.module('ruben-radar')
    .service('VoteService', function (Vote) {
        this.newVote = function newVote(axes) {
            var vote = new Vote();
            vote.answers = _.map(axes, function (axis) {
                return {axis: axis, points: undefined};
            });
            return vote;
        };
        this.createVote = function createVote(vote) {
            return vote.$save();
        };
    });