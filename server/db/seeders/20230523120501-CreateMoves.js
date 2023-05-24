'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      
      await queryInterface.bulkInsert('Moves', [{
          game_id: 1,
          move_number: 13,
          player_id: 1,
          move: 'e4-e5',
      },{
        game_id: 1,
        move_number: 14,
        player_id: 1,
        move: 'b4-a5',
    },
    {
      game_id: 1,
      move_number: 15,
      player_id: 1,
      move: 'e4-a5',
    },
    {
      game_id: 1,
      move_number: 16,
      player_id: 1,
      move: 'b8 -c3',
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
