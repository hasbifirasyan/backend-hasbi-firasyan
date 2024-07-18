"use strict";

const { hashPassword } = require('../helpers/hashPassword');

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
    await queryInterface.bulkInsert(
      "Customers",
      [
        {
          name: "Budi",
          email: "budi@example.com",
          password: hashPassword(`123456`), // hashed password 'password123'
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Toni",
          email: "toni@example.com",
          password: hashPassword(`123456`), // hashed password 'password123'
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Customers", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
