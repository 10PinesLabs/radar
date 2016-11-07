/**
 * Created by pino on 21/10/16.
 */
angular.module('ruben-radar')
    .service('VoteService', function (Vote) {
        this.newVote = function newVote(radar, answers) {
            var vote = new Vote();
            vote.radar_id = radar.id;
            vote.answers = answers;
            return vote;
        };
        this.createVote = function createVote(vote) {
            return vote.$save().catch(function (response) {
                return Promise.reject(response.data.errors);
            });
        };
    });
