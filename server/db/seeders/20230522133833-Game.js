"use strict";

const games = [
  {
    game_player1_id: 1,
    game_player2_id: 2,
    game_status: true,
    game_winner_id: 1,
    game_looser_id: 2,
    game_tie: false,
    game_start_time: new Date(),
    game_end_time: new Date(),
  },
  {
    game_player1_id: 3,
    game_player2_id: 4,
    game_status: true,
    game_winner_id: 3,
    game_looser_id: 4,
    game_tie: false,
    game_start_time: new Date(),
    game_end_time: new Date(),
  },
  {
    game_player1_id: 5,
    game_player2_id: 6,
    game_status: true,
    game_winner_id: 5,
    game_looser_id: 6,
    game_tie: false,
    game_start_time: new Date(),
    game_end_time: new Date(),
  },
  {
    game_player1_id: 7,
    game_player2_id: 8,
    game_status: true,
    game_winner_id: 7,
    game_looser_id: 8,
    game_tie: false,
    game_start_time: new Date(),
    game_end_time: new Date(),
  },
  {
    game_player1_id: 9,
    game_player2_id: 10,
    game_status: true,
    game_winner_id: 9,
    game_looser_id: 10,
    game_tie: false,
    game_start_time: new Date(),
    game_end_time: new Date(),
  },
  {
    game_player1_id: 11,
    game_player2_id: 12,
    game_status: true,
    game_winner_id: 11,
    game_looser_id: 12,
    game_tie: false,
    game_start_time: new Date(),
    game_end_time: new Date(),
  },
  {
    game_player1_id: 13,
    game_player2_id: 14,
    game_status: true,
    game_winner_id: 13,
    game_looser_id: 14,
    game_tie: false,
    game_start_time: new Date(),
    game_end_time: new Date(),
  },
  {
    game_player1_id: 15,
    game_player2_id: 1,
    game_status: true,
    game_winner_id: 1,
    game_looser_id: 15,
    game_tie: false,
    game_start_time: new Date(),
    game_end_time: new Date(),
  },
  {
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
    game_player1_id: 4,
    game_player2_id: 5,
    game_status: true,
    game_winner_id: 5,
    game_looser_id: 4,
    game_tie: false,
    game_start_time: new Date(),
    game_end_time: new Date(),
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Games", games, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Games", null, {});
  },
};
