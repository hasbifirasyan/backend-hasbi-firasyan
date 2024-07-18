"use strict";

const { hashPassword } = require("../helpers/hashPassword");

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
      "Merchants",
      [
        {
          name: "Merchant Merah",
          email: "merchantMerah@mail.com",
          password: hashPassword(`123456`),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Merchant Kuning",
          email: "merchantKuning@mail.com",
          password: hashPassword(`123456`),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Merchant Hijau",
          email: "merchantHijau@mail.com",
          password: hashPassword(`123456`),
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
    await queryInterface.bulkDelete("Merchants", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
