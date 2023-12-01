"use strict";

/** @type {import('sequelize-cli').Migration} */

const { hashPassword } = require("../utils/bcryptUtil");
const { chatStreamClient } = require("../utils/streamChatUtil");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await chatStreamClient.upsertUsers([
      {
        id: "1",
        name: "Ahmad Alif Sofian",
        image: `${process.env.SERVER_HOST}uploads/default.jpg`,
      },
      {
        id: "2",
        name: "pro",
        image: `${process.env.SERVER_HOST}uploads/default.jpg`,
      },
      {
        id: "3",
        name: "standart",
        image: `${process.env.SERVER_HOST}uploads/default.jpg`,
      },
    ]);

    return queryInterface.bulkInsert("Users", [
      {
        id: 1,
        fullName: "Ahmad Alif Sofian",
        email: "alif12sofian@gmail.com",
        role: "pro",
        imagePath: "uploads/default.jpg",
        password: hashPassword("password123"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        fullName: "pro",
        email: "pro@user.com",
        role: "pro",
        imagePath: "uploads/default.jpg",
        password: hashPassword("password123"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        fullName: "standart",
        email: "standart@user.com",
        role: "standard",
        imagePath: "uploads/default.jpg",
        password: hashPassword("password123"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null, {});
  },
};
