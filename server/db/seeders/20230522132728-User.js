"use strict";

const users = [
  {
    user_name: "Dimas",
    user_email: "dimon@gmail.com",
    user_password: "123456789",
    user_avatar: "/assets/avatars/default.png",
    user_rating: 123,
  },
  {
    user_name: "John",
    user_email: "john@example.com",
    user_password: "password123",
    user_avatar: "/assets/avatars/1.png",
    user_rating: 456,
  },
  {
    user_name: "Alice",
    user_email: "alice@gmail.com",
    user_password: "qwerty123",
    user_avatar: "/assets/avatars/2.png",
    user_rating: 789,
  },
  {
    user_name: "Emma",
    user_email: "emma@example.com",
    user_password: "password456",
    user_avatar: "/assets/avatars/3.png",
    user_rating: 234,
  },
  {
    user_name: "Michael",
    user_email: "michael@gmail.com",
    user_password: "123456",
    user_avatar: "/assets/avatars/4.png",
    user_rating: 567,
  },
  {
    user_name: "Sophia",
    user_email: "sophia@example.com",
    user_password: "qwertyui",
    user_avatar: "/assets/avatars/5.png",
    user_rating: 890,
  },
  {
    user_name: "Daniel",
    user_email: "daniel@gmail.com",
    user_password: "password789",
    user_avatar: "/assets/avatars/1.png",
    user_rating: 345,
  },
  {
    user_name: "Olivia",
    user_email: "olivia@example.com",
    user_password: "abcdef",
    user_avatar: "/assets/avatars/2.png",
    user_rating: 678,
  },
  {
    user_name: "William",
    user_email: "william@gmail.com",
    user_password: "987654321",
    user_avatar: "/assets/avatars/3.png",
    user_rating: 912,
  },
  {
    user_name: "Ava",
    user_email: "ava@example.com",
    user_password: "password1234",
    user_avatar: "/assets/avatars/4.png",
    user_rating: 234,
  },
  {
    user_name: "James",
    user_email: "james@gmail.com",
    user_password: "qwerty12345",
    user_avatar: "/assets/avatars/5.png",
    user_rating: 567,
  },
  {
    user_name: "Isabella",
    user_email: "isabella@example.com",
    user_password: "password678",
    user_avatar: "/assets/avatars/1.png",
    user_rating: 890,
  },
  {
    user_name: "Benjamin",
    user_email: "benjamin@gmail.com",
    user_password: "password987",
    user_avatar: "/assets/avatars/2.png",
    user_rating: 123,
  },
  {
    user_name: "Mia",
    user_email: "mia@example.com",
    user_password: "qwertyuiop",
    user_avatar: "/assets/avatars/3.png",
    user_rating: 456,
  },
  {
    user_name: "Alexander",
    user_email: "alexander@gmail.com",
    user_password: "password246",
    user_avatar: "/assets/avatars/4.png",
    user_rating: 789,
  },
  {
    user_name: "Charlotte",
    user_email: "charlotte@example.com",
    user_password: "abcdefg",
    user_avatar: "/assets/avatars/1.png",
    user_rating: 234,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
