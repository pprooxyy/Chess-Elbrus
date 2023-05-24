'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('Games', [{
        game_player1_id: 1,
        game_player2_id: 2,
        game_status: true,
        game_winner_id: 1,
        game_looser_id: 2,
        game_tie: false,
        game_start_time: new Date(),
        game_end_time: new Date(),
      },{
        game_player1_id: 2,
        game_player2_id: 3,
        game_status: true,
        game_winner_id: 3,
        game_looser_id: 2,
        game_tie: false,
        game_start_time: new Date(),
        game_end_time: new Date(),
      },
      {
        game_player1_id: 2,
        game_player2_id: 3,
        game_status: true,
        game_winner_id: 2,
        game_looser_id: 3,
        game_tie: true,
        game_start_time: new Date(),
        game_end_time: new Date(),
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
