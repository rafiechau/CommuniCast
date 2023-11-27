"use strict";

/** @type {import('sequelize-cli').Migration} */
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
    return queryInterface.bulkInsert("Users", [
      {
        fullName: "Ahmad Alif Sofian",
        email: "alif12sofian@gmail.com",
        role: "pro",
        isVerify: false,
        imagePath: "/uploads/default.jpg",
        password:
          "$2b$10$rEqIEgzRz2D9yZ697IkdTO0UBfExxHGt1nskAK8chjJoWNabCnG0O",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "pro",
        email: "pro@user.com",
        role: "pro",
        isVerify: false,
        imagePath: "/uploads/default.jpg",
        password:
          "$2b$10$rEqIEgzRz2D9yZ697IkdTO0UBfExxHGt1nskAK8chjJoWNabCnG0O",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "standart",
        email: "standart@user.com",
        role: "standard",
        isVerify: false,
        imagePath: "/uploads/default.jpg",
        password:
          "$2b$10$rEqIEgzRz2D9yZ697IkdTO0UBfExxHGt1nskAK8chjJoWNabCnG0O",
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
