'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
      "CustomerProducts",
      [
        {
          customerId: 1,
          productId: 1,
          quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          customerId: 1,
          productId: 2,
          quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          customerId: 2,
          productId: 3,
          quantity: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          customerId: 2,
          productId: 4,
          quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("CustomerProducts", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
